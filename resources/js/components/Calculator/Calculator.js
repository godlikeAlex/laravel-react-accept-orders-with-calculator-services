import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { calculatorValues } from './calculator-values.js';
import { calculatePrice, countTotal } from './utils.js';
import CalculatorScreen from './CalculatorTabScreen.js';

const ServiceCalculatorSchema = Yup.object().shape({
    services: Yup.array().of(
        Yup.object().shape({
            width: Yup.string()
                .required('Required'),
            height: Yup.string()
                .required('Required'),
            quantity: Yup.string()
                .required('Required'),
            currentServiceType: Yup.object()
                .required('Required'),
            currentService: Yup.object()
                .required('Required'),
        })
    )
});


export const serviceTypeOptions = Object.keys(calculatorValues.services).reduce((accum, service) => {
    accum.push({ value: service, label: service });
    return accum;
}, []);

export const servicesForOptions = Object.keys(calculatorValues.services).reduce((accum, serviceType) => {
    accum[serviceType] = calculatorValues.services[serviceType].map(service => {
        return { value: service.name, label: service.name, price: service.price, disable: service.disable || null }
    });
    return accum;
}, {});

export const MIN_PRICE = 250;

const TEMPLATE_CALCULATOR = {
    width: 5,
    height: 5,
    ftHeight: { label: calculatorValues.height[1].title, value: calculatorValues.height[1].title, price: calculatorValues.height[1].price },
    price: MIN_PRICE,
    quantity: 1,
    currentServiceType: serviceTypeOptions[0],
    currentService: servicesForOptions['Vinyl'][0]
};

function Calculator({ onUpdate, data = {}, resetAllFields, bottomAddMore, renderFooter, onAddCart }) {
    const topBlockRef = React.useRef(null)
    const { values, errors, handleSubmit, setFieldValue, setValues } = useFormik({
        validationSchema: ServiceCalculatorSchema,
        initialValues: {
            currentTab: 0,
            total: data?.total || MIN_PRICE,
            services: data?.services || [TEMPLATE_CALCULATOR]
        },
    });

    React.useEffect(() => {
        if (resetAllFields) {
            setValues({
                currentTab: 0,
                total: MIN_PRICE,
                services: [TEMPLATE_CALCULATOR]
            })
        }
    }, [resetAllFields]);

    React.useEffect(() => {
        const servicesError = Array.isArray(errors?.services) ? errors.services : [];
        for (let i = 0; servicesError.length > i; i++) {
            if (servicesError[i]) { // has error and it is defined
                setFieldValue('currentTab', i);
                break;
            }
        }

    }, [errors]);

    React.useEffect(() => {
        const totalCalculated = values.services.reduce((total, service) => {
            const { total: currentPrice } = calculatePrice(service);
            return total + currentPrice;
        }, 0);
        const total = countTotal(totalCalculated);


        onUpdate({ services: values.services, total })
        setFieldValue('total', total);
    }, [values.services]);

    const addNewService = () => {
        const services = [...values.services];
        services.push(TEMPLATE_CALCULATOR);
        setFieldValue('services', services);
        setFieldValue('currentTab', values.currentTab + 1);
        if (bottomAddMore) {
            topBlockRef.current.scrollIntoView();
        }
    };

    const updateServiceByIndex = (services, field, value, index) => {
        return services.map((service, idx) => {
            if (idx === index) {
                const updatedService = { ...service };
                const { total, totalPerSqFt, totalPerItem } = calculatePrice(updatedService);
                updatedService[field] = value;
                updatedService['price'] = total;
                updatedService['totalPerSqFt'] = totalPerSqFt;
                updatedService['totalPerItem'] = totalPerItem;
                return updatedService;
            }

            return service;
        })
    }

    const setFieldValueNested = (field, value, index) => {
        const copyServices = [...values.services];
        const updatedServiceByUserField = updateServiceByIndex(copyServices, field, value, index);
        const price = countTotal(calculatePrice(updatedServiceByUserField[index]).total);
        const updatedServicePrice = updateServiceByIndex(
            updatedServiceByUserField,
            'price',
            price,
            index
        );
        setFieldValue('services', updatedServicePrice);
    }

    const renderTabsContent = () => (
        values.services.map((service, index) => (
            values.currentTab === index && (
                <CalculatorScreen key={`${index}-${service.currentService.value}`} {...{ index, values, setFieldValue, service, setFieldValueNested }} />
            )
        ))
    )

    return (
        <div className="row">
            <div ref={topBlockRef} style={{ position: 'absolute', top: 20 }}></div>
            <div className="d-flex p-0 col-md-12">
                <ul className="nav nav-tabs color2" style={{ borderBottom: '5px solid #ED0598' }}>
                    {values.services.map((_, index) => (
                        <li key={`tab` + index} className={values.currentTab === index ? 'active' : ''} onClick={() => setFieldValue('currentTab', index)}><a>Tab {index + 1}</a></li>
                    ))}
                    {!bottomAddMore && (
                        <li className="nav-item" onClick={() => addNewService()}><a className='nav-link' >Add more</a></li>
                    )}
                </ul>
            </div>
            {renderTabsContent()}
            {renderFooter && (
                <div className="col-md-12">
                    <hr />
                    <h4>Total price: ${values.total}</h4>
                    {bottomAddMore && (
                        <a
                            className="theme_button bg_button color1 btn-calc"
                            onClick={() => addNewService()}
                            style={{ minWidth: '215px' }}
                        >
                            Add More
                        </a>
                    )}
                    <a className="theme_button bg_button color1 btn-calc" style={{ minWidth: '215px' }} onClick={onAddCart}>Add to cart</a>


                </div>
            )}

        </div>
    );
}

export default Calculator;