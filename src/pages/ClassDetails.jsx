import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; // Import useLocation and useNavigate
import useAxiosSecure from '../hooks/useAxiosSecure';

const ClassDetails = () => {
    const location = useLocation(); // To access passed state
    const classDetails = location.state?.classDetails; // Get class details from state
    console.log(classDetails)
    const navigate = useNavigate();

    if (!classDetails) {
        return <p>Class details not available.</p>;
    }

    const handlePay = () => {
        // Redirect user to the payment page
        
        navigate(`/dashboard/payment/${classDetails}`,{state:{classDetails}});
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-6 text-center">{classDetails.title}</h1>
            <div className="max-w-2xl mx-auto">
                <img
                    src={classDetails.image}
                    alt={classDetails.title}
                    className="w-full h-60 object-cover rounded mb-4"
                />
                <p className="text-gray-700 mb-2">Instructor: {classDetails.name}</p>
                <p className="text-gray-700 mb-2">Description: {classDetails.description}</p>
                <p className="font-semibold text-lg text-gray-800 mb-2">Price: ${classDetails.price}</p>
                <p className="text-gray-600 mb-4">Total Enrollments: {classDetails.totalEnrollment}</p>
                <button
                    onClick={handlePay}
                    className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                    Pay
                </button>
            </div>
        </div>
    );
};

export default ClassDetails;
