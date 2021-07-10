import React from 'react'
import { calculatorValues } from './calculator-values';
import Select from 'react-select';
import { servicesForOptions, serviceTypeOptions } from './Calculator';
import { calculatePrice } from './utils';

function CalculatorScreen({ index, service, setFieldValueNested, setFieldValue, values }) {
    const setOnlyPassitiveValue = (e, field, index) => {
        e.preventDefault();
        const { value } = e.target;
        const regex = /^(0*[1-9][0-9]*(\.[0-9]*)?|0*\.[0-9]*[1-9][0-9]*)$/;
        if (regex.test(value.toString())) {
            setFieldValueNested(field, value, index);
        }
    }

    // const updateTypeMaterial = () => {
    //     const services
    //     const updateServiceByIndex = (services, field, value, index) => {
    //         services[index] = {
    //             ...services[index],
    //             [field]: value
    //         };
    //         return services;
    //     }
    // }

    const onChangeMaterialType = (serviceType, index) => {
        const services = [...values.services];
        services[index] = {
            ...services[index],
            currentServiceType: serviceType,
            currentService: servicesForOptions[serviceType.value][0]
        }
        services[index].price = calculatePrice(services[index]);
        // console.log(services[index]);
        setFieldValue('services', services);
    }

    return (
        <React.Fragment>
            <div className="col-md-6">
                <div className="form-group">
                    {calculatorValues.height.map(({ title, price }) => (
                        <div className="form-check" key={title}>
                            <input
                                className="form-check-input"
                                type="radio"
                                value={service.ftHeight.price}
                                onChange={e => setFieldValueNested('ftHeight', { title, price }, index)}
                                checked={service.ftHeight.title === title}
                            />
                            <label className="form-check-label">{title}</label>
                        </div>
                    ))}
                </div>
            </div>

            <div className="col-md-6">
                <div className="form-group">
                    <label>Height</label>
                    <input type="text"
                        className="form-control"
                        disabled={service.currentService.disable === 'WIDTH:HEIGHT:HEIGHT-FOOT'}
                        placeholder="Height"
                        type="number"
                        min={1}
                        name="height"
                        onChange={(e) => setOnlyPassitiveValue(e, 'height', index)}
                        value={service.height}
                    />
                </div>

                <div className="form-group">
                    <label>Width</label>
                    <input type="text"
                        disabled={service.currentService.disable === 'WIDTH:HEIGHT:HEIGHT-FOOT'}
                        className="form-control"
                        type="number"
                        min={1}
                        placeholder="Width"
                        name="width"
                        onChange={(e) => setOnlyPassitiveValue(e, 'width', index)}
                        value={service.width}
                    />
                </div>
            </div>

            <div className="col-md-12">
                <div className="form-group">
                    <label>Quantity</label>
                    <input type="text"
                        className="form-control"
                        placeholder="Quantity"
                        name="quantity"
                        onChange={(e) => setOnlyPassitiveValue(e, 'quantity', index)}
                        value={service.quantity}
                    />
                </div>
            </div>

            <div className="col-md-6">
                <div className="form-group">
                    <label>Material Type</label>
                    <Select
                        options={serviceTypeOptions}
                        onChange={service => {
                            onChangeMaterialType(service, index);
                        }}
                        value={service.currentServiceType}
                    />
                </div>
            </div>

            <div className="col-md-6">
                <div className="form-group">
                    <label>Material Type</label>
                    <Select
                        options={servicesForOptions[service.currentServiceType.value]}
                        onChange={service => setFieldValueNested('currentService', service, index)}
                        value={service.currentService}
                    />
                </div>
            </div>

            <h4>Price current service ${service.price}</h4>
        </React.Fragment>
    )
};

export default CalculatorScreen;
