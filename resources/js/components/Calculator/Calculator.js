import React from 'react';
import { useFormik } from 'formik';
import utils from './utils.js';
import * as Yup from 'yup';
import { calculatorValues } from './calculator-values.js';
import CalculatorScreen from './CalculatorTabScreen.js';
const { calculatePrice, countTotal } = utils;

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

let TEMPLATE_CALCULATOR = {
    width: 1,
    height: 1,
    ftHeight: calculatorValues.height[1],
    price: 5,
    quantity: 1,
    currentServiceType: serviceTypeOptions[0],
    currentService: servicesForOptions['Adhesive Vinyl'][0],
};

export const generateTemplate = () => {
    const { total, totalPerItem, totalPerSqFt } = calculatePrice(TEMPLATE_CALCULATOR);

    return {
        ...TEMPLATE_CALCULATOR,
        price: total,
        totalPerSqFt,
        totalPerItem
    }
}


function Calculator({ onUpdate, data = {}, resetAllFields, showOptions = true, calculateOptionalPrices = false, bottomAddMore, renderFooter, onAddCart }) {
    const topBlockRef = React.useRef(null);

    const { values, errors, handleSubmit, setFieldValue, setValues } = useFormik({
        validationSchema: ServiceCalculatorSchema,
        initialValues: {
            currentTab: 0,
            total: data?.total || MIN_PRICE,
            totalServices: data?.totalServices || MIN_PRICE,
            services: data?.services || [generateTemplate()],
            prices: data?.prices || {
                installation: MIN_PRICE,
                removal: 0,
                survey: 0,
                urgencyInstsllstion: 0,
            },
            delivery: false,
            removal: data?.prices?.removal && data?.prices?.removal > 0,
            installation: data?.prices?.installation ? data?.prices?.installation > 0 : true,
        },
    });


    React.useEffect(() => {
        if (data.prices) {
            setValues({
                ...values,
                prices: data.prices,
                removal: data.prices.removal > 0 ? true : false
            });
        }
    }, [data?.prices]);

    React.useEffect(() => {
        onUpdate({
            services: values.services,
            totalServices: values.totalServices,
            prices: values.prices,
            total: values.total,
            delivery: data?.prices?.delivery || false
        });
    }, [values]);

    React.useEffect(() => {
        const { removal, total, prices, totalServices, installation } = values;

        const removalPrice = totalServices * 0.5;
        setValues({
            ...values,
            prices: {
                ...prices,
                removal: removal ? removalPrice : 0,
                installation: installation ? totalServices : 0
            }
        })

    }, [values.removal, values.installation]);

    React.useEffect(() => {
        const { prices } = values;
        const total = Object.keys(prices).reduce((total, item) => {
            return total + prices[item];
        }, 0);

        setFieldValue('total', total < MIN_PRICE ? MIN_PRICE : total.toFixed(2));
    }, [values.prices]);

    React.useEffect(() => {
        if (resetAllFields) {
            setValues({
                currentTab: 0,
                total: MIN_PRICE,
                removal: false,
                installation: false,
                delivery: false,
                services: [generateTemplate()],
                totalServices: MIN_PRICE,
                prices: {
                    installation: MIN_PRICE,
                    removal: 0,
                    survey: 0,
                    urgencyInstsllstion: 0,
                },
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

        let prices = {
            ...values.prices,
            installation: values.installation ? totalCalculated : 0,
            removal: values.removal ? totalCalculated * 0.5 : 0
        }

        if (calculateOptionalPrices) {
            if (prices.urgencyInstsllstion != 0) {
                const total = prices.installation + prices.removal + prices?.survey;
                prices.urgencyInstsllstion = total * 0.20;
            }

        }

        setValues({
            ...values,
            totalServices: totalCalculated,
            prices
        });
    }, [values.services]);

    const addNewService = () => {
        const services = [...values.services];
        services.push(generateTemplate());
        setFieldValue('services', services);
        setFieldValue('currentTab', services.length - 1);
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

    const deleteItem = index => {
        if (values.services.length > 1) {
            setFieldValue('services', values.services.filter((_, idx) => idx !== index));

            if (values.currentTab === index) {
                setFieldValue('currentTab', 0);
            }
        }
    };

    const setCurrentTab = (e, index) => {
        if (e.target.tagName !== 'SPAN') {
            setFieldValue('currentTab', index)
        }
    }

    return (
        <div className="row">
            <div ref={topBlockRef} style={{ position: 'absolute', top: 20 }}></div>
            <div className="d-flex p-0 col-md-12">
                <ul className="nav nav-tabs color2" style={{ borderBottom: '5px solid #ED0598' }}>
                    {values.services.map((service, index) => (
                        <li key={`tab` + index} className={values.currentTab === index ? 'active' : ''} onClick={(e) => setCurrentTab(e, index)}>
                            <a style={{ paddingLeft: '10px', paddingRight: '10px' }}>
                                {service.currentService.label} <span onClick={() => deleteItem(index)} style={{ paddingLeft: '40px' }}>&#10005;</span>
                            </a>
                        </li>
                    ))}
                    {!bottomAddMore && (
                        <li className="nav-item" onClick={() => addNewService()}><a className='nav-link' >Add more</a></li>
                    )}
                </ul>
            </div>

            {showOptions && (
                <div className="col-md-12">
                    <label>Additional services</label>
                    <div
                        className="form-group"
                    >
                        <input
                            type="checkbox"
                            onClick={() => setFieldValue('removal', !values.removal)}
                            checked={values.removal}
                        />
                        <label style={{ marginLeft: 15 }} onClick={() => setFieldValue('removal', !values.removal)}>Removal</label>
                    </div>

                    <div className="form-group"

                    >
                        <input
                            onClick={() => setFieldValue('installation', !values.installation)}
                            type="checkbox"
                            checked={values.installation}
                        />
                        <label style={{ marginLeft: 15 }} onClick={() => setFieldValue('installation', !values.installation)}>Installation</label>
                    </div>
                </div>
            )}

            {renderTabsContent()}
            {renderFooter && (
                <div className="col-md-12">
                    <hr />
                    <h4>Subtotal: ${values.total}</h4>
                    <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
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
                        <a href="#contact" className="theme_button bg_button color1 btn-calc" style={{ minWidth: '215px', marginLeft: 'auto' }}>OTHER</a>
                    </div>
                </div>
            )}

        </div>
    );
}

export default Calculator;
