import React from 'react'
import { calculatorValues } from './calculator-values';
import Select from 'react-select';
import { servicesForOptions, serviceTypeOptions } from './Calculator';
import { calculatePrice } from './utils';

const weightOptions = calculatorValues.height.map(({ title, price }) => {
    return {
        label: title,
        value: title,
        price,
        title
    }
})

export const customStyles = {
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
        return {
            ...styles,
            backgroundColor: isSelected && '#ED0598',
            ':active': {
                ...styles[':active'],
                color: 'white',
                backgroundColor: '#ED0598',
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
        backgroundColor: '#ED0598'
    }),
    control: (provided) => ({
        ...provided,
        padding: '24px 40px 21px',
        border: 'none',
    }),
    dropdownIndicator: () => ({
        color: 'white'
    }),
    valueContainer: (provided) => ({
        ...provided,
    }),
}

function CalculatorScreen({ index, service, setFieldValueNested, setFieldValue, values, updateNesterPrices }) {
    const setOnlyPassitiveValue = (e, field, index) => {
        e.preventDefault();
        const { value } = e.target;
        const regex = /^(0*[1-9][0-9]*(\.[0-9]*)?|0*\.[0-9]*[1-9][0-9]*)$/;

        if (value.toString() === '') {
            setFieldValueNested(field, value, index);
        }

        if (regex.test(value.toString())) {
            setFieldValueNested(field, value, index);
        }
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
                    <label>Service Type</label>
                    <Select
                        styles={customStyles}
                        isSearchable={false}
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
                        isSearchable={false}
                        options={servicesForOptions[service.currentServiceType.value]}
                        className={'reselect2-order'}
                        styles={customStyles}
                        onChange={service => setFieldValueNested('currentService', service, index)}
                        value={service.currentService}
                    />
                </div>
            </div>


            <div className="col-md-6">
                <div className="form-group">
                    <label>Height (inches)</label>
                    <input
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
            </div>

            <div className="col-md-6">
                <div className="form-group">
                    <label>Width (inches)</label>
                    <input
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

            <div className="col-md-6">
                <div className="form-group">
                    <label>Total Elevation</label>
                    {calculatorValues.height.map(({ title, price }, idx) => (
                        <div className="form-check" key={title} style={{ display: 'flex', marginBottom: 15 }} onClick={e => setFieldValueNested('ftHeight', { title, price }, index)}>
                            <input
                                className="form-check-input"
                                type="radio"
                                value={service.ftHeight.price}
                                checked={service.ftHeight.title === title}
                            />
                            <label className="form-check-label" style={{ marginLeft: 15, display: 'flex', alignItems: 'center', width: '130px', justifyContent: 'space-between' }}>
                                {title}
                                <img
                                    src={`/frontend/icons/${idx + 1}.png`}
                                    style={{
                                        width: '25px'
                                    }}
                                    alt=""
                                />
                            </label>
                        </div>
                    ))}
                </div>
            </div>

            <div className="col-md-6">
                <div className="form-group">
                    <label>Quantity</label>
                    <input 
                        type="number"
                        className="form-control"
                        placeholder="Quantity"
                        name="quantity"
                        onChange={(e) => setOnlyPassitiveValue(e, 'quantity', index)}
                        value={service.quantity}
                    />
                </div>

                <label style={{color: '#ED0598'}}>Additional services</label>
                <div
                    className="form-group"
                >
                    <input
                        type="checkbox"
                        onClick={() => updateNesterPrices('removal', index)}
                        checked={service.prices.removal > 0}
                    />
                    <label style={{ marginLeft: 15 }} onClick={() => updateNesterPrices('removal', index)}>Removal</label>
                </div>

                <div className="form-group"
                >
                    <input
                        onClick={() => updateNesterPrices('installation', index)}
                        type="checkbox"
                        checked={service.prices.installation > 0}
                    />
                    <label style={{ marginLeft: 15 }} onClick={() => updateNesterPrices('installation', index)}>Installation</label>
                </div>


                <h6>Total Per Item - ${service.totalPerItem || 0}</h6>
                <h6>Total Per SqFt - ${service.totalPerSqFt || 0}</h6>
                <h6>Price for current service - $ {service.total.toLocaleString()}</h6>
            </div>
        </React.Fragment>
    )
};

export default CalculatorScreen;
