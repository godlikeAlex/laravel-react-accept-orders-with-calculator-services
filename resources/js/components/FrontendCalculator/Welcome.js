import React from 'react';
import { useHistory } from 'react-router-dom';
import InstallationImage from './installation.png';
import RemovalImage from './removal.png';
import SurveyImage from './survey.png';

const WelcomeScreen = ({selectAddtionalService, selectedServiceType}) => {
  const history = useHistory();

  const handleClick = service => {
    selectAddtionalService(service);
    history.push('/select-service');
  }

  return (
    <div className="row">
      <div className="col-md-12">
          <h3 className="section_header text-center" style={{marginBottom: '40px'}}>Choose a service</h3>
      </div>

      <div
        className={`col-md-4 text-center 
          welcome-screen-calculator-item 
          ${selectedServiceType === 'installation' ? 'active' : null}`
        }
        onClick={() => handleClick('installation')}
      >
        <img src={InstallationImage} />

        <h5 className='d-flex justify-content-center align-items-center'>
          Installation <ion-icon name="chevron-forward-outline" style={{marginLeft: '5px'}}></ion-icon>
        </h5>
      </div>

      <div
        className={`col-md-4 text-center 
          welcome-screen-calculator-item 
          ${selectedServiceType === 'removal' ? 'active' : null}`
        }
        onClick={() => handleClick('removal')}
      >
        <img src={RemovalImage} />

        <h5 className='d-flex justify-content-center align-items-center'>
          Removal <ion-icon name="chevron-forward-outline" style={{marginLeft: '5px'}}></ion-icon>
        </h5>
      </div>

      <div
        className={`col-md-4 text-center 
          welcome-screen-calculator-item 
          ${selectedServiceType === 'survey' ? 'active' : null}`
        }
        onClick={() => handleClick('survey')}
      >
        <img src={SurveyImage} />

        <h5 className='d-flex justify-content-center align-items-center'>
          Survey <ion-icon name="chevron-forward-outline" style={{marginLeft: '5px'}}></ion-icon>
        </h5>
      </div>

    </div>
  )
}

export default WelcomeScreen;