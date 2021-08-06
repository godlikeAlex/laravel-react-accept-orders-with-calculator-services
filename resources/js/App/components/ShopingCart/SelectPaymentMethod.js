import React, { useEffect, useState } from 'react';
import usePaymentMethods from '../Dashboard/usePaymentMethods';
import ReactLoading from 'react-loading';
import Select, { components } from 'react-select';
const { Option, SingleValue } = components;

const customStyles = {
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
        backgroundColor: '#f2f2f2'
    }),
    dropdownIndicator: () => ({
        color: 'white'
    }),
    valueContainer: (provided) => ({
        ...provided,
    }),
}

function SelectPaymentMethod({ currentPaymentMethod, setCurrentPaymentMethod }) {
    const [paymentMethods, isLoading] = usePaymentMethods();
    const paymentMethodsOptions = paymentMethods.map(pm => {
        return {
            label: `
                **** **** **** ${pm.card.last4}
            `,
            value: pm.id,
            brand: pm.card.brand
        }
    })

    useEffect(() => {
        if (paymentMethodsOptions.length > 0) setCurrentPaymentMethod(paymentMethodsOptions[0]);
    }, [isLoading]);

    useEffect(() => {
        console.log(paymentMethods.length === 0 && !isLoading);
        console.log('is', isLoading);
        if (paymentMethods.length === 0 && !isLoading) {
            setCurrentPaymentMethod({
                label: 'Select new card',
                value: 'new',
                brand: 'stripe'
            })
        }
    }, [paymentMethods, isLoading])

    const IconOption = (props) => (
        <Option {...props}>
            <i className={`fa fa-cc-${props.data.brand}`} aria-hidden="true"></i>
            <span style={{ marginLeft: 20 }}>
                {props.data.label}
            </span>
        </Option>
    );

    const ValueContainerIcon = (props) => (
        <SingleValue {...props}>
            <i className={`fa fa-cc-${props.data.brand}`} aria-hidden="true"></i>
            <span style={{ marginLeft: 20 }}>
                {props.data.label}
            </span>
        </SingleValue>
    );


    if (isLoading) {
        return (
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <ReactLoading width={'20px'} height={'20px'} color="black" type="spin" /> <span style={{ marginLeft: '20px' }}>Loading payment methods </span>
            </div>
        )
    }


    return (
        <>
            {paymentMethods.length > 0 && (
                <div style={{ marginBottom: '25px' }}>
                    <Select
                        className="basic-single"
                        classNamePrefix="select"
                        styles={customStyles}
                        components={{ Option: IconOption, SingleValue: ValueContainerIcon }}
                        className={'reselect2-order'}
                        defaultValue={paymentMethodsOptions[0]}
                        value={currentPaymentMethod}
                        onChange={pm => setCurrentPaymentMethod(pm)}
                        isLoading={isLoading}
                        options={[
                            ...paymentMethodsOptions,
                            {
                                label: 'Select new card',
                                value: 'new',
                                brand: 'stripe'
                            }
                        ]}
                    />
                </div>
            )}
        </>
    )
}

export default SelectPaymentMethod;