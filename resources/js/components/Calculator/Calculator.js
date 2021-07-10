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

export const MIN_PRICE = 200;

const TEMPLATE_CALCULATOR = {
    width: 5,
    height: 5,
    ftHeight: calculatorValues.height[1],
    price: MIN_PRICE,
    quantity: 1,
    currentServiceType: serviceTypeOptions[0],
    currentService: servicesForOptions['Vinyl'][0]
};

function Calculator({ onUpdate, data = {}, resetAllFields }) {
    const { values, errors, handleSubmit, setFieldValue, setValues } = useFormik({
        validationSchema: ServiceCalculatorSchema,
        initialValues: {
            currentTab: 0,
            total: data?.total || MIN_PRICE,
            services: data?.services || [TEMPLATE_CALCULATOR]
        },
        onSubmit: values => {
        }
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
            const currentPrice = calculatePrice(service);
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
    };

    const updateServiceByIndex = (services, field, value, index) => {
        return services.map((service, idx) => {
            if (idx === index) {
                const updatedService = { ...service };
                updatedService[field] = value;
                return updatedService;
            }

            return service;
        })
    }

    const setFieldValueNested = (field, value, index) => {
        const copyServices = [...values.services];
        const updatedServiceByUserField = updateServiceByIndex(copyServices, field, value, index);
        const updatedServicePrice = updateServiceByIndex(
            updatedServiceByUserField,
            'price',
            countTotal(calculatePrice(updatedServiceByUserField[index])),
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
            <div className="d-flex p-0 col-md-12">
                <h3 className="card-title p-3">Calculator</h3>
                <ul className="nav nav-pills ml-auto p-2">
                    {values.services.map((_, index) => (
                        <li key={`tab` + index} className="nav-item" onClick={() => setFieldValue('currentTab', index)}><a className={values.currentTab === index ? 'nav-link active' : 'nav-link'} >Tab {index + 1}</a></li>
                    ))}
                    <li className="nav-item" onClick={() => addNewService()}><a className='nav-link' >Add more</a></li>
                </ul>
            </div>
            {renderTabsContent()}
        </div>
    );
}

export default Calculator;