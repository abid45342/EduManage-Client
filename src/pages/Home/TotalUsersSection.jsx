import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import { FaUsers, FaChalkboardTeacher, FaUserCheck } from 'react-icons/fa';

const TotalUsersSection = () => {
    const axiosPublic = useAxiosPublic();

    const fetchUsers = async () => {
        const response = await axiosPublic.get('/usersH');
        return response.data;
    };
    const fetchClasses = async () => {
        const response = await axiosPublic.get('/classesH');
        return response.data.filter(classItem => classItem.status === 'accepted');
    };
    const fetchEnrollments = async () => {
        const response = await axiosPublic.get('/enrollmentsH');
        return response.data;
    };

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

    if (isLoadingUsers || isLoadingClasses || isLoadingEnrollments) {
        return <div className="text-center py-16">Loading data... Please wait.</div>;
    }
    if (isErrorUsers || isErrorClasses || isErrorEnrollments) {
        return <div className="text-center text-red-500 py-16">There was an error fetching the data.</div>;
    }

    const totalUsers = usersData.length;
    const totalClasses = classesData.length;
    const totalEnrollments = enrollmentsData.length;

    return (
        <section className="py-20 px-4 sm:px-8 lg:px-16 bg-gradient-to-br from-orange-50 via-white to-red-50">
            <div className="max-w-screen-xl mx-auto">
                {/* Header Section */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-4">
                        Platform Impact
                    </h2>
                    <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                        See how our platform is growing and making a difference for learners and educators.
                    </p>
                </div>

                {/* Stats Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {/* Users */}
                    <div className="bg-white rounded-2xl shadow-xl border border-orange-100 flex flex-col items-center p-8 hover:shadow-2xl transition-all duration-300">
                        <div className="bg-gradient-to-br from-orange-500 to-red-500 p-4 rounded-full mb-4 shadow-lg">
                            <FaUsers className="text-3xl text-white" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-700 mb-1">Total Users</h3>
                        <p className="text-3xl font-extrabold text-orange-600 mb-1">{totalUsers}</p>
                        <span className="text-xs text-gray-500">Registered</span>
                    </div>
                    {/* Classes */}
                    <div className="bg-white rounded-2xl shadow-xl border border-orange-100 flex flex-col items-center p-8 hover:shadow-2xl transition-all duration-300">
                        <div className="bg-gradient-to-br from-orange-400 to-red-400 p-4 rounded-full mb-4 shadow-lg">
                            <FaChalkboardTeacher className="text-3xl text-white" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-700 mb-1">Total Classes</h3>
                        <p className="text-3xl font-extrabold text-orange-500 mb-1">{totalClasses}</p>
                        <span className="text-xs text-gray-500">Accepted</span>
                    </div>
                    {/* Enrollments */}
                    <div className="bg-white rounded-2xl shadow-xl border border-orange-100 flex flex-col items-center p-8 hover:shadow-2xl transition-all duration-300">
                        <div className="bg-gradient-to-br from-red-400 to-orange-500 p-4 rounded-full mb-4 shadow-lg">
                            <FaUserCheck className="text-3xl text-white" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-700 mb-1">Total Enrollments</h3>
                        <p className="text-3xl font-extrabold text-red-500 mb-1">{totalEnrollments}</p>
                        <span className="text-xs text-gray-500">Completed</span>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TotalUsersSection;

