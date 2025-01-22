// import React from 'react';
// import { useQuery } from '@tanstack/react-query';
// import useAxiosPublic from '../../hooks/useAxiosPublic'; // Make sure the path is correct

// // Fetch users data
// const TotalUsersSection = () => {
//     const axiosPublic = useAxiosPublic();

//     const fetchUsers = async () => {
//         const response = await axiosPublic.get('/usersH'); // Adjust with your API endpoint
//         return response.data; // Assuming data is an array of users
//     };

//     // Fetch classes data, filtering only "accepted" classes
//     const fetchClasses = async () => {
//         const response = await axiosPublic.get('/classesH'); // Adjust with your API endpoint
//         return response.data.filter(classItem => classItem.status === 'accepted'); // Filter "accepted" classes
//     };

//     // Fetch enrollments data
//     const fetchEnrollments = async () => {
//         const response = await axiosPublic.get('/enrollmentsH'); // Adjust with your API endpoint
//         return response.data; // Assuming data is an array of enrollments
//     };

//     // Use React Query to fetch data with v5 format
//     const { data: usersData, isLoading: isLoadingUsers, isError: isErrorUsers } = useQuery({
//         queryKey: ['users'],
//         queryFn: fetchUsers,
//     });
//     const { data: classesData, isLoading: isLoadingClasses, isError: isErrorClasses } = useQuery({
//         queryKey: ['classes'],
//         queryFn: fetchClasses,
//     });
//     const { data: enrollmentsData, isLoading: isLoadingEnrollments, isError: isErrorEnrollments } = useQuery({
//         queryKey: ['enrollments'],
//         queryFn: fetchEnrollments,
//     });

//     // Loading State
//     if (isLoadingUsers || isLoadingClasses || isLoadingEnrollments) {
//         return <div className="text-center">Loading data... Please wait.</div>; // Display loading state until data is fetched
//     }

//     // Error Handling
//     if (isErrorUsers || isErrorClasses || isErrorEnrollments) {
//         return <div className="text-center text-red-500">There was an error fetching the data.</div>;
//     }

//     const totalUsers = usersData.length;
//     const totalClasses = classesData.length;
//     const totalEnrollments = enrollmentsData.length;

//     return (
//         <div className="flex items-center justify-between p-10  gap-5">
//             {/* Left side: Info Cards */}
//             <div className="w-1/2  flex flex-col justify-between justify-items-between "> 
//                 <div className="bg-white p-6 rounded-lg shadow-lg mb-4">
//                     <h3 className="text-xl font-semibold text-gray-800">Total Users</h3>
//                     <p className="text-gray-600 text-2xl mt-2">{totalUsers}</p>
//                 </div>
//                 <div className="bg-white p-6 rounded-lg shadow-lg mb-4">
//                     <h3 className="text-xl font-semibold text-gray-800">Total Classes</h3>
//                     <p className="text-gray-600 text-2xl mt-2">{totalClasses}</p>
//                 </div>
//                 <div className="bg-white p-6 rounded-lg shadow-lg mb-4">
//                     <h3 className="text-xl font-semibold text-gray-800">Total Enrollments</h3>
//                     <p className="text-gray-600 text-2xl mt-2">{totalEnrollments}</p>
//                 </div>
//             </div>

//             {/* Right side: Image */}
//             <div className="w-1/2">
//                 <img
//                     src="https://i.ibb.co.com/kS2GzJX/image.png" // Add an appropriate image here
//                     alt="Website image"
//                     className="w-full h-full object-cover rounded-lg shadow-lg"
//                 />
//             </div>
//         </div>
//     );
// };

// export default TotalUsersSection;






import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from '../../hooks/useAxiosPublic'; // Make sure the path is correct

// Fetch users data
const TotalUsersSection = () => {
    const axiosPublic = useAxiosPublic();

    const fetchUsers = async () => {
        const response = await axiosPublic.get('/usersH'); // Adjust with your API endpoint
        return response.data; // Assuming data is an array of users
    };

    // Fetch classes data, filtering only "accepted" classes
    const fetchClasses = async () => {
        const response = await axiosPublic.get('/classesH'); // Adjust with your API endpoint
        return response.data.filter(classItem => classItem.status === 'accepted'); // Filter "accepted" classes
    };

    // Fetch enrollments data
    const fetchEnrollments = async () => {
        const response = await axiosPublic.get('/enrollmentsH'); // Adjust with your API endpoint
        return response.data; // Assuming data is an array of enrollments
    };

    // Use React Query to fetch data with v5 format
    const { data: usersData, isLoading: isLoadingUsers, isError: isErrorUsers } = useQuery({
        queryKey: ['users'],
        queryFn: fetchUsers,
    });
    const { data: classesData, isLoading: isLoadingClasses, isError: isErrorClasses } = useQuery({
        queryKey: ['classes'],
        queryFn: fetchClasses,
    });
    const { data: enrollmentsData, isLoading: isLoadingEnrollments, isError: isErrorEnrollments } = useQuery({
        queryKey: ['enrollments'],
        queryFn: fetchEnrollments,
    });

    // Loading State
    if (isLoadingUsers || isLoadingClasses || isLoadingEnrollments) {
        return <div className="text-center">Loading data... Please wait.</div>; // Display loading state until data is fetched
    }

    // Error Handling
    if (isErrorUsers || isErrorClasses || isErrorEnrollments) {
        return <div className="text-center text-red-500">There was an error fetching the data.</div>;
    }

    const totalUsers = usersData.length;
    const totalClasses = classesData.length;
    const totalEnrollments = enrollmentsData.length;

    return (
        <div className="flex flex-col lg:flex-row items-center justify-between p-10 gap-5">
            {/* Left side: Info Cards */}
            <div className="w-full lg:w-1/2 flex flex-col justify-between gap-4"> 
                <div className="bg-white p-6 rounded-lg shadow-lg">
                    <h3 className="text-xl font-semibold text-gray-800">Total Users</h3>
                    <p className="text-gray-600 text-2xl mt-2">{totalUsers}</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-lg">
                    <h3 className="text-xl font-semibold text-gray-800">Total Classes</h3>
                    <p className="text-gray-600 text-2xl mt-2">{totalClasses}</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-lg">
                    <h3 className="text-xl font-semibold text-gray-800">Total Enrollments</h3>
                    <p className="text-gray-600 text-2xl mt-2">{totalEnrollments}</p>
                </div>
            </div>

            {/* Right side: Image */}
            <div className="w-full lg:w-1/2 mt-4 lg:mt-0">
                <img
                    src="https://i.ibb.co.com/kS2GzJX/image.png" // Add an appropriate image here
                    alt="Website image"
                    className="w-full h-full object-cover rounded-full shadow-lg"
                />
            </div>
        </div>
    );
};

export default TotalUsersSection;

