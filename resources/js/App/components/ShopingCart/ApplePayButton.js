import React, { useEffect, useState } from 'react';
import { PaymentRequestButtonElement, useElements, useStripe } from '@stripe/react-stripe-js';

const ApplePayButton = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [paymentRequest, setPaymentRequest] = useState(null);

  useEffect(() => {
    if (!stripe || !elements) {
      return;
    }

    const pr = stripe.paymentRequest({
      currency: 'usd',
      country: 'US',
      requestPayerEmail: false,
      requestPayerName: false,
      total: {
        label: 'Demo payment',
        amount: 1999
      }
    });

    pr.canMakePayment().then((result) => {
      if (result) {
        setPaymentRequest(pr);
      }
    })
  }, [stripe, elements]);
  
  return (
    <>
      {paymentRequest && <PaymentRequestButtonElement options={{paymentRequest}} />}
    </>
  )
}

export default ApplePayButton;