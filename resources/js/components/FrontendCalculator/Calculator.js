import React, {useEffect, useState, useRef} from "react";
import { MemoryRouter, Route, useHistory, useLocation } from "react-router-dom";
import Typewriter from 'typewriter-effect';

import { generateTemplate, MIN_PRICE } from '../Calculator/Calculator';
import SelectServiceTab from './SelectServiceTab';
import SelectMaterialTab from './SelectMaterialTab';
import {frontendCalculatorValues} from "./FrontendCalculatorValues";
import FormTab from "./FormTab";
import './style.css';
import { CSSTransition } from "react-transition-group";
import Navigation from "./Navigation";
import WelcomeScreen from './Welcome';

import { calculatorValues } from "../Calculator/calculator-values";

function Calculator() {
  const topBlockRef = useRef(null);
  const [materials, setMaterials] = useState(frontendCalculatorValues.services[1]);
  const [values, setValues] = useState({
    selectedService: null,
    selectedMaterial: null,
    selectedServiceType: null,
    calculator: {
      ...generateTemplate(),
      currentService: null,
      prices:  {
        installation: 0,
        removal: 0,
      },
      removal: true,
      installation: true,
      survey: false,
      urgencyInstsllstion: false,
      total: 0
    }
  });

  console.log(values);

  useEffect(() => {
    setMaterials(
      frontendCalculatorValues.services.find(service => service.id === values.selectedService)?.services || []
    )
  }, [values.selectedService]);

  const selectService = service => {
    setValues({
      ...values,
      selectedService: service,
      selectedMaterial: null
    });
    topBlockRef.current.scrollIntoView();
  }

  const selectMaterial = material => {
    const currentMaterial = materials.find(m => m.id == material);
    setValues({
      ...values,
      selectedMaterial: currentMaterial,
      calculator: {
        ...values.calculator,
        currentService: {...currentMaterial, value: currentMaterial.name, label: currentMaterial.name, }
      }
    });

    topBlockRef.current.scrollIntoView();
  }

  const goBackCallBack = (cb) => {
    topBlockRef.current.scrollIntoView();
    cb();
  }

  const addToCartCallBack = (cb) => {
    cb(values.calculator);
  }

  const selectAddtionalService = service => {
    setValues(values => {
      return {
        ...values,
        selectedServiceType: service,
        calculator: {
          ...values.calculator,
          removal: false,
          installation: service != 'installation' && service == 'survey' && true,
          [service]: true
        }
      }
    });
  }

  const resetCalculator = () => {
    setValues({
      ...values,
      calculator: {
        ...values.calculator,
        width: 1,
        height: 1,
        ftHeight: calculatorValues.height[0],
        price: 0,
        quantity: 1,
        prices: {
            installation: 1,
            removal: 0
        },
        totalPerItem: 0,
        totalPerSqFt: 0,
        total: 0,
      }
    });
  }

  const setFieldValue = (field, value) => {
    setValues(values => {
      return {
        ...values,
        calculator: {
          ...values.calculator,
          [field]: value
        }
      }
    });
  }

  const setValuesCalculator = (newValues) => {
    setValues(values => {
      return {
        ...values,
        calculator: {
          ...values.calculator,
          ...newValues
        }
      }
    })
  }


  const routes = [
    // Welcome
    { path: '/', name: 'Welcome', Component: WelcomeScreen, props: {selectedServiceType: values.selectedServiceType, selectAddtionalService} },
    { path: '/select-service', name: 'Main', Component: SelectServiceTab, props: {selectService, selectedService: values.selectedService} },
    // { path: '/', name: 'Main', Component: SelectServiceTab, props: {selectService, selectedService: values.selectedService} },
    { path: '/select-material', name: 'Select material', Component: SelectMaterialTab, props: {selectMaterial, selectedMaterial: values.selectedMaterial, materials} },
    { 
      path: '/form-tab', 
      name: 'Check out', 
      Component: FormTab, 
      props: {values: values.calculator, resetCalculator, setValues: setValuesCalculator, setFieldValue} 
    },
  ]
 
  return (
    <div className="container">
      <div ref={topBlockRef} style={{ position: 'absolute', top: 20 }}></div>
      {/* <img src="/frontend/calculator/left-arrow.png" className="left-arrow-calc swing" /> */}
      <img src="/frontend/calculator/left-arrow.png" className="right-arrow-calc swing-right" />

      <div className="row" style={{position: 'relative'}} >

        <MemoryRouter>
          <CalculatorTitle />
          {routes.map(({ path, Component, props }) => (
              <Route key={path} exact path={path}>
                {({ match }) => (
                  <CSSTransition
                    in={match != null}
                    timeout={300}
                    classNames="page"
                    unmountOnExit
                  >
                    <div className="page" style={{marginBottom: '110px'}}>
                      <Component {...props} />
                    </div>
                  </CSSTransition>
                )}
              </Route>
            ))}
            <Navigation {...{goBackCallBack, addToCartCallBack, resetCalculator}} />
        </MemoryRouter>

      </div>
    </div>
  )

}

function CalculatorTitle() {
  const history = useHistory();
  const location = useLocation();

  return (
    <h2 className="section_header text-center section-header-calc" style={{display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#ed0598' }}>
      {location.pathname !== '/' && (<ion-icon name="chevron-back-outline"
        style={{
          cursor: 'pointer',
          left: 0,
          position: 'absolute',
          color: '#ED0598'
        }}
        onClick={() => history.goBack()}
      ></ion-icon>)}

      Calculate your price
      {/* Calculate Your &nbsp;<span style={{color: '#ED0598'}}> <Typewriter
        options={{
          loop: true
        }}
        onInit={(typewriter) => {
          typewriter
            .typeString('Installation')
            .pauseFor(4500)
            .deleteChars(12)
            .typeString('Removal')
            .pauseFor(4500)
            .start()
        }}
        /> </span> Services */}
    </h2>
  )
}

export default Calculator;
