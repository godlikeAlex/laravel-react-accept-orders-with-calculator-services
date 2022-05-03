import React from 'react';
import img from './image.svg';
import installation from './installation.svg';

const WelcomeScreen = () => {
  return (
    <div className="row tab-row">
      <div className="col-md-6">
        <h2>What do you want?</h2>
      </div>

      <div className="col-md-6">
        <div  style={{
          display: 'flex',
          flexDirection: 'column', 
          boxShadow: 'rgba(0, 0, 0, 0.24)  0px 3px 8px',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px 0px',
          background: '#fafafa'
        }}>
            <img src={installation} style={{width: '50%', height: ''}} />
            <div style={{fontSize: '22px', marginTop: '20px'}}>
              Installation
            </div>
        </div>

        <div style={{
          display: 'flex',
          flexDirection: 'column', 
          boxShadow: 'rgba(0, 0, 0, 0.24)  0px 3px 8px',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px 0px',
          background: '#fafafa',
          marginTop: '25px'
        }}>
            <img src={img} style={{width: '50%', height: ''}} />
            <div style={{fontSize: '22px', marginTop: '20px'}}>
              Removal
            </div>
        </div>
      </div>
    </div>
  )
}

export default WelcomeScreen;