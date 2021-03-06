import React, { useEffect } from 'react';
import { calculatorValues } from '../Calculator/calculator-values';
import { calculatePrice } from '../Calculator/utils';

function FormTab({values, setValues, setFieldValue, resetCalculator}) {

    useEffect(() => {
        resetCalculator();
    }, []);

    useEffect(() => {
        const {total, totalPerItem, totalPerSqFt} = calculatePrice(values);
        
        let prices = {
            ...values.prices,
            installation: values.installation ? total : 0,
            removal: values.removal ? total * 0.5 : 0,
        }

        setValues({
            price: total,
            prices,
            totalPerItem,
            totalPerSqFt,
        })
    }, [values.width, values.height, values.quantity, values.ftHeight, values.installation, values.removal]);


    useEffect(() => {
        const { prices } = values;
        const total = Object.keys(prices).reduce((total, item) => {
            return total + prices[item];
        }, 0);
        setFieldValue('total', total);
    }, [values.prices]);


    const setOnlyPassitiveValue = (field, e) => {
        e.preventDefault();
        const { value } = e.target;
        const regex = /^(0*[1-9][0-9]*(\.[0-9]*)?|0*\.[0-9]*[1-9][0-9]*)$/;

        if (value.toString() === '') {
            setFieldValue(field, value);
        }

        if (regex.test(value.toString())) {
            setFieldValue(field, value);
        }
    }

    return (
        <div className='row'>
            
            <div className="col-md-12">
                <h3 className="section_header text-center" style={{marginBottom: '40px'}}>Last Step To Order</h3>
            </div>

            <div className="col-md-4">
                <div className="form-group">
                    <label>Width (inches)</label>
                    <input type="text"
                        // disabled={values.currentvalues.disable === 'WIDTH:HEIGHT:HEIGHT-FOOT'}
                        className="form-control"
                        type="number"
                        min={1}
                        placeholder="Width"
                        name="width"
                        onChange={(e) => setOnlyPassitiveValue('width', e)}
                        value={values.width}
                    />
                </div>

            </div>

            <div className="col-md-4">
                <div className="form-group">
                    <label>Height (inches)</label>
                    <input type="text"
                        className="form-control"
                        // disabled={service.currentService.disable === 'WIDTH:HEIGHT:HEIGHT-FOOT'}
                        placeholder="Height"
                        type="number"
                        min={1}
                        name="height"
                        onChange={(e) => setOnlyPassitiveValue('height', e)}
                        value={values.height}
                    />
                </div>
            </div>


            <div className="col-md-4">
                <div className="form-group">
                    <label>Quantity</label>
                    <input type="text"
                        className="form-control"
                        placeholder="Quantity"
                        name="quantity"
                        onChange={(e) => setOnlyPassitiveValue('quantity', e)}
                        value={values.quantity}
                    />
                </div>


                {/* <h6>Total Per Item - ${service.totalPerItem || 0}</h6>
                <h6>Total Per SqFt - ${service.totalPerSqFt || 0}</h6>
                <h6>Price for current service - $ {service.price.toLocaleString()}</h6> */}
            </div>

            <div className="col-md-4">
                <div className="form-group">
                    <label>Total Elevation</label>
                    {calculatorValues.height.map(({ title, price, img, width }, idx) => (
                        <div className="form-check display-flex v-center" key={title} style={{ marginBottom: 15 }} onClick={e => setFieldValue('ftHeight', { title, price })}>
                            <input
                                className="form-check-input"
                                type="radio"
                                value={values.ftHeight.price}
                                checked={values.ftHeight.title === title}
                                style={{marginTop: 0}}
                            />
                            <label className="form-check-label" style={{ marginLeft: 15, display: 'flex', alignItems: 'center', minWidth: '255px', justifyContent: 'space-between', marginBottom:0 }}>
                                {title}
                                <img
                                    src={img}
                                    style={{
                                        width
                                    }}
                                    alt={`${idx}`}
                                />
                            </label>
                        </div>
                    ))}
                </div>
            </div>

            <div className="col-md-4">
                <label style={{color: '#ED0598'}}>Additional services</label>
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

            <div className='col-md-4'>
            <h2>Your price</h2>
            <p>Total Per Item - $ {values.totalPerItem || 0}</p>
            <p>Total Per SqFt - $ {values.totalPerSqFt || 0}</p>
            <h3>Subtotal: {values.total.toLocaleString()} $</h3>
            </div>
        </div>
    )
}

export default FormTab;