import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';


const LoadingSpinner = () => {
  return (
    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
      <CircularProgress />
    </div>
  )
};

export default LoadingSpinner;