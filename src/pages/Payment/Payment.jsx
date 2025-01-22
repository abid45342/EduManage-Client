import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import CheckOutForm from './CheckOutForm';
import { useLoaderData, useLocation, useParams } from 'react-router-dom';

const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);
const Payment = () => {
    const id =useParams();
    console.log(id)
    const location = useLocation();
    const classDetails = location.state?.classDetails;
    console.log(classDetails)

    return (
        <div>
           <h1>Pay Here</h1>
           <Elements stripe={stripePromise}>
<CheckOutForm classDetails={classDetails}></CheckOutForm>
           </Elements>

        </div>
    );
};

export default Payment;