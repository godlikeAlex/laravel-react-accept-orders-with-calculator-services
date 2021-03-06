import React from 'react';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { customStyles } from '../Calculator/CalculatorTabScreen';


const GooglePlaces = ({address, setAddress, styles = customStyles}) => {
  return (
    <GooglePlacesAutocomplete
      apiKey={process.env.MIX_GOOGLE_API_KEY}
      apiOptions={{ language: 'en', region: 'us' }}
      selectProps={{
          styles,
          value: address,
          onChange: setAddress,
          placeholder: 'Type your address..',
      }}
      autocompletionRequest={{
          componentRestrictions: {
              country: ['us'],
          }
      }}
    />
  );
}

export default GooglePlaces;