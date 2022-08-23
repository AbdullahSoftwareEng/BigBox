import React, { Fragment } from 'react'
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Payment from './Payment';
const WrappedPayment = ({ stripeApiKey }) => {
  return (
    // <Fragment>
    //     {stripeApiKey &&
    //     <Elements stripe={loadStripe(stripeApiKey)}>
    //         <Payment/>
    //     </Elements>
    //     } 
    // </Fragment>

    <Fragment>
    {stripeApiKey &&
    <Elements stripe={loadStripe(stripeApiKey)}>
        <Payment/>
    </Elements>
    } 
    </Fragment>
  )
}

export default WrappedPayment