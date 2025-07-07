import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import CheckOutForm from './CheckOutForm';
import { useLoaderData, useLocation, useParams } from 'react-router-dom';

const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);
const Payment = () => {
    const id = useParams();
    console.log(id);
    const location = useLocation();
    const classDetails = location.state?.classDetails;
    console.log(classDetails);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-100 py-8 px-2">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 flex flex-col items-center">
                <h1 className="text-3xl font-bold text-blue-700 mb-6 text-center">Pay Here</h1>
                <Elements stripe={stripePromise}>
                    <div className="w-full">
                        <CheckOutForm classDetails={classDetails} />
                    </div>
                </Elements>
            </div>
        </div>
    );
};

export default Payment;