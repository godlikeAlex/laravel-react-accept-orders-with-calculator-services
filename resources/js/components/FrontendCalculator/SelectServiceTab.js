import React from "react";
import { calculatorValues } from '../Calculator/calculator-values.js';
import { serviceTypeOptions } from '../Calculator/Calculator';
import { frontendCalculatorValues } from "./FrontendCalculatorValues.js";
import { useHistory } from "react-router-dom";

const services = Object.keys(calculatorValues.services).reduce((accum, service) => {
    accum.push({ name: service });
    return accum;
}, []);

function SelectServiceTab({ selectService, selectedService }) {
    const history = useHistory();

    const handleClick = (id) => {
        history.push('/select-material');
        selectService(id);
    }

    return (
        <div className='row d-flex justify-content-center tab-row'>
            <div className="col-md-12">
                <h3 className="section_header text-center section-mini-header" style={{ marginBottom: '40px' }}>
                Service Type
                </h3>
            </div>
            <div className="grid-calc">
                {frontendCalculatorValues.services.map(({ id, image, title, }) => (
                    <div
                        className={selectedService === id ? 'active-calculator-item  text-center calc-item' : ' text-center calc-item'}
                        style={{ marginBottom: 50, cursor: 'pointer' }}
                        onClick={() => handleClick(id)}
                        key={`selected-service-${id}`}
                    >
                        <img src={image} className="rounded-image-calc" />
                        <h6 style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                            {title}  <ion-icon name="chevron-forward-outline" style={{marginLeft: '5px'}}></ion-icon>
                        </h6>
                    </div>
                ))}
            </div>
        </div>
    )

}

export default SelectServiceTab;
