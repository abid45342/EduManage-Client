// import React, { useEffect } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom'; // Import useLocation and useNavigate
// import useAxiosSecure from '../hooks/useAxiosSecure';

// const ClassDetails = () => {
//     const location = useLocation(); // To access passed state
//     const classDetails = location.state?.classDetails; // Get class details from state
//     console.log(classDetails)
//     const navigate = useNavigate();

//     if (!classDetails) {
//         return <p>Class details not available.</p>;
//     }

//     const handlePay = () => {
//         // Redirect user to the payment page
        
//         navigate(`/dashboard/payment/${classDetails}`,{state:{classDetails}});
//     };

//     return (
//         <div className="p-4">
//             <h1 className="text-2xl font-bold mb-6 text-center">{classDetails.title}</h1>
//             <div className="max-w-2xl mx-auto">
//                 <img
//                     src={classDetails.image}
//                     alt={classDetails.title}
//                     className="w-full h-60 object-cover rounded mb-4"
//                 />
//                 <p className="text-gray-700 mb-2">Instructor: {classDetails.name}</p>
//                 <p className="text-gray-700 mb-2">Description: {classDetails.description}</p>
//                 <p className="font-semibold text-lg text-gray-800 mb-2">Price: ${classDetails.price}</p>
//                 <p className="text-gray-600 mb-4">Total Enrollments: {classDetails.totalEnrollment}</p>
//                 <button
//                     onClick={handlePay}
//                     className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
//                 >
//                     Pay
//                 </button>
//             </div>
//         </div>
//     );
// };

// export default ClassDetails;






import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const ClassDetails = () => {
    const location = useLocation();
    const classDetails = location.state?.classDetails;
    const navigate = useNavigate();

    if (!classDetails) {
        return <p className="text-center text-gray-700 mt-8">Class details not available.</p>;
    }

    const handlePay = () => {
        navigate(`/dashboard/payment/${classDetails}`, { state: { classDetails } });
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
                <img
                    src={classDetails.image}
                    alt={classDetails.title}
                    className="w-full h-64 object-cover"
                />
                <div className="p-6">
                    <h1 className="text-3xl font-semibold text-gray-800 mb-4">{classDetails.title}</h1>
                    <p className="text-gray-600 mb-4">
                        <span className="font-medium text-gray-700">Instructor:</span> {classDetails.name}
                    </p>
                    <p className="text-gray-600 mb-4">
                        <span className="font-medium text-gray-700">Description:</span> {classDetails.description}
                    </p>
                    <p className="text-xl font-bold text-gray-800 mb-4">
                        Price: <span className="text-blue-500">${classDetails.price}</span>
                    </p>
                    <p className="text-gray-600 mb-6">
                        <span className="font-medium text-gray-700">Total Enrollments:</span> {classDetails.totalEnrollment||'0'}
                    </p>
                    <button
                        onClick={handlePay}
                        className="w-full py-3 bg-blue-500 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
                    >
                        Pay Now
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ClassDetails;

