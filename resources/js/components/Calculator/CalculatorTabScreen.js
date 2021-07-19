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

    const customStyles = {
        option: (styles, { data, isDisabled, isFocused, isSelected }) => {
            return {
                ...styles,
                backgroundColor: isSelected && '#05d5c7',
                ':active': {
                    ...styles[':active'],
                    color: 'white',
                    backgroundColor: '#05d5c7',
                },
            };
        },
        container: (provided) => ({
            ...provided,
            fontSize: '18px',
            // none of react-select's styles are passed to <Control />
        }),
        indicatorSeparator: (provided) => ({
            ...provided,
            display: 'none'
        }),
        indicatorsContainer: () => ({
            position: 'absolute',
            background: 'red',
            right: 0,
            height: '100%',
            top: 0,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '80px',
            backgroundColor: '#792F7E'
        }),
        control: (provided) => ({
            ...provided,
            padding: '15px 40px 17px',
            border: 'none'
        }),
        dropdownIndicator: () => ({
            color: 'white'
        }),
        valueContainer: (provided) => ({
            ...provided,
        }),
    }

    const onChangeMaterialType = (serviceType, index) => {
        const services = [...values.services];

        services[index] = {
            ...services[index],
            currentServiceType: serviceType,
            currentService: servicesForOptions[serviceType.value][0]
        }

        const { total, totalPerSqFt, totalPerItem } = calculatePrice(services[index]);

        services[index].price = total;
        services[index].totalPerSqFt = totalPerSqFt;
        services[index].totalPerItem = totalPerItem;
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
                            <label className="form-check-label" style={{ marginLeft: 10 }}>{title}</label>
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
                        styles={customStyles}
                        className={'reselect2-order'}
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
                        className={'reselect2-order'}
                        styles={customStyles}
                        onChange={service => setFieldValueNested('currentService', service, index)}
                        value={service.currentService}
                    />
                </div>
            </div>

            <h6 className="col-md-12">Price for current service - ${service.price}</h6>
            <h6 className="col-md-12">Total Per Item - ${service.totalPerItem || 0}</h6>
            <h6 className="col-md-12">Total Per SqFt - ${service.totalPerSqFt || 0}</h6>
        </React.Fragment>
    )
};

export default CalculatorScreen;
