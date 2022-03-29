import React, {useEffect} from 'react';
import { useFormik } from 'formik';
import utils from './utils.js';
import * as Yup from 'yup';
import { calculatorValues } from './calculator-values.js';
import CalculatorScreen from './CalculatorTabScreen.js';
import {countService, countAllCart} from '../../common/cart';
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
    ftHeight: calculatorValues.height[0],
    price: 0,
    quantity: 1,
    prices: {
        installation: 1,
        removal: 0
    },
    currentServiceType: serviceTypeOptions[0],
    currentService: servicesForOptions['Adhesive Vinyl'][0],
    total: 0
    // totalPerItem auto generate
    // totalPerSqFt
};


export const generateTemplate = () => {
    const { total, totalPerItem, totalPerSqFt } = countService(TEMPLATE_CALCULATOR);

    return {
        ...TEMPLATE_CALCULATOR,
        total,
        totalPerSqFt,
        totalPerItem
    }
}

const generateTemplateCustom = () => {
    return {
        ...generateTemplate(),
    }
}


function Calculator({ onUpdate, data = {}, resetAllFields, showOptions = true, calculateOptionalPrices = false, bottomAddMore, renderFooter, onAddCart }) {
    const topBlockRef = React.useRef(null);

    const { values, errors, handleSubmit, setFieldValue, setValues } = useFormik({
        validationSchema: ServiceCalculatorSchema,
        initialValues: {
            currentTab: 0,
            total: data?.total || MIN_PRICE,
            services: data?.services || [generateTemplateCustom()],
            additional: data?.additional || {
                urgencyInstsllstion: 0,
                survey: 0
            },
            delivery: false
        },
    });

    useEffect(() => {
        onUpdate(values);
    }, [values]);

    useEffect(() => {
        const {additional, total} = countAllCart({
            services: values.services,
            additional: values.additional,
            total: values.total
        });

        setValues({
            ...values,
            additional,
            total: total < MIN_PRICE ? MIN_PRICE : total
        });

    }, [values.services, values.additional]);

    useEffect(() => {
        const {total} = countAllCart({
            services: values.services,
            additional: values.additional,
            total: 0
        });

        setFieldValue('total', total);
    }, [values.services]);

    useEffect(() => {
        if (resetAllFields) {
            setValues({
                currentTab: 0,
                total: MIN_PRICE,
                removal: false,
                installation: false,
                delivery: false,
                services: [generateTemplateCustom()],
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

    useEffect(() => {
        const servicesError = Array.isArray(errors?.services) ? errors.services : [];
        for (let i = 0; servicesError.length > i; i++) {
            if (servicesError[i]) { // has error and it is defined
                setFieldValue('currentTab', i);
                break;
            }
        }

    }, [errors]);

    const addNewService = () => {
        const services = [...values.services];
        services.push(generateTemplateCustom());
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
                updatedService[field] = value;

                const { total, price, totalPerSqFt, totalPerItem } = countService(updatedService);

                updatedService['price'] = price;
                updatedService['total'] = total;
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
        setFieldValue('services', updatedServiceByUserField);
    }

    const updateNesterPrices = (type, index) => {
        const updatedServices = values.services.map((service, idx) => {
            if (idx === index) {
                let serviceToUpdate = service;
                const {total: price} = calculatePrice(serviceToUpdate);

                let prices = {
                    ...serviceToUpdate.prices
                }

                switch (type) {
                    case 'installation':
                        prices.installation = prices.installation ? 0 : price;
                        break;
                    case 'removal':
                        prices.removal = prices.removal ? 0 : price * 0.5;
                        break;
                }

                const countedService = countService({
                    ...serviceToUpdate,
                    prices
                });

                return {
                    ...serviceToUpdate,
                    prices: countedService.prices,
                    total: countedService.total
                };
            }

            return service;
        });

        setValues({
            ...values,
            services: updatedServices
        });
    }

    const renderTabsContent = () => (
        values.services.map((service, index) => (
            values.currentTab === index && (
                <CalculatorScreen 
                    key={`${index}-${service.currentService.value}`} 
                    {...{ index, values, setFieldValue, service, setFieldValueNested, updateNesterPrices }} 
                />
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

    const onUpdateAddationServices = type => {
        const countTotalOfServices = values.services.reduce((total, service) => {
            return total + service.total;
        }, 0);

        const { urgencyInstsllstion, survey } = values.additional;

        let additional = {
            urgencyInstsllstion,
            survey,
        };
        
        switch (type) {
            case 'urgencyInstsllstion':
                additional.urgencyInstsllstion = urgencyInstsllstion ? 0 : countTotalOfServices * 0.20;
                break;
            case 'survey':
                additional.survey = survey ? 0 : 250;
                break;
        }

        setFieldValue('additional', additional);
    }

    return (
        <div className="row">
            <hr />

            <div className="form-group col-md-12">
                <h4>Additional services</h4>
            </div>

            <div
                className="form-group col-md-12"
            >
                <input
                    type="checkbox"
                    onClick={() => onUpdateAddationServices('survey')}
                    checked={values.additional.survey > 0}
                />
                <label style={{ marginLeft: 15 }} onClick={() => onUpdateAddationServices('survey')}>Survey</label>
            </div>

            <div
                className="form-group col-md-12"
            >
                <input
                    type="checkbox"
                    onClick={() => onUpdateAddationServices('urgencyInstsllstion')}
                    checked={values.additional.urgencyInstsllstion > 0}
                />
                <label style={{ marginLeft: 15 }} onClick={() => onUpdateAddationServices('urgencyInstsllstion')}>Urgency Instsllstion ⚡</label>
            </div>

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
