import React, {useEffect, useState} from "react";
import { MemoryRouter, Route, useHistory, useLocation } from "react-router-dom";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Typewriter from 'typewriter-effect';

import { generateTemplate, MIN_PRICE } from '../Calculator/Calculator';
import SelectServiceTab from './SelectServiceTab';
import SelectMaterialTab from './SelectMaterialTab';
import {frontendCalculatorValues} from "./FrontendCalculatorValues";
import FormTab from "./FormTab";
import './style.css';
import { CSSTransition } from "react-transition-group";
import Navigation from "./Navigation";

const FormSchema = Yup.object().shape({
  width: Yup.string().required('Width required'),
  height: Yup.string().required('Width required'),
  ftHeight: Yup.string().required('Height required'),
  quantity: Yup.string().required()
});

function Calculator() {
  const topBlockRef = React.useRef(null);
  // const [currentTab, setCurrentTab] = useState(1); 
  const [selectedService, setSelectedService] = useState(null); 
  const [selectedMaterial, setSelectedMaterial] = useState(null);
  const [materials, setMaterials] = useState(frontendCalculatorValues.services[1]);

  const formik = useFormik({
    validationSchema: FormSchema,
    initialValues: {
      ...generateTemplate(),
      currentService: {price: 0},
      prices:  {
        installation: MIN_PRICE,
        urgencyInstsllstion: 0,
        removal: 0,
        survey: 0,
      },
      removal: false,
      installation: true,
      urgencyInstsllstion: false,
      survey: false,
      delivery: false,
      total: MIN_PRICE
    }
  });

  const selectService = service => {
    setSelectedService(service);
    setSelectedMaterial(null);
    topBlockRef.current.scrollIntoView();
  }

  const selectMaterial = material => {
    const currentMaterial = materials.find(m => m.id == material);
    setSelectedMaterial(currentMaterial);
    formik.setFieldValue('currentService', {...currentMaterial, value: currentMaterial.name, label: currentMaterial.name, })
    topBlockRef.current.scrollIntoView();
  }

  const goBackCallBack = (cb) => {
    topBlockRef.current.scrollIntoView();
    cb();
  }

  const addToCartCallBack = (cb) => {
    cb(formik.values);
  }

  const routes = [
    { path: '/', name: 'Main', Component: SelectServiceTab, props: {selectService, selectedService} },
    { path: '/select-material', name: 'Select material', Component: SelectMaterialTab, props: {selectMaterial, selectedMaterial, materials} },
    { path: '/form-tab', name: 'Check out', Component: FormTab, props: {selectedMaterial, formik} },
  ]  

  useEffect(() => {
    setMaterials(
      frontendCalculatorValues.services.find(service => service.id === selectedService)?.services || []
    )
  }, [selectedService]);
 
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
                    <div className="page" style={{marginBottom: match != null && path === '/' ? 0 : '110px'}}>
                      <Component {...props} />
                    </div>
                  </CSSTransition>
                )}
              </Route>
            ))}
            <Navigation {...{goBackCallBack, addToCartCallBack, formik}} />
        </MemoryRouter>

      </div>
    </div>
  )

}

function CalculatorTitle() {
  const history = useHistory();
  const location = useLocation();

  return (
    <h2 class="section_header text-center section-header-calc" style={{display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      {location.pathname !== '/' && (<ion-icon name="chevron-back-outline"
        style={{
          cursor: 'pointer',
          left: 0,
          position: 'absolute',
          color: '#ED0598'
        }}
        onClick={() => history.goBack()}
      ></ion-icon>)}
      Calculate Your &nbsp;<span style={{color: '#ED0598'}}> <Typewriter
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
        /> </span> Services
    </h2>
  )
}

export default Calculator;
