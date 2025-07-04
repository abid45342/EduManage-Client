import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const NewArrivals = () => {
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const navigate = useNavigate();

    // Fetch the last 5 accepted classes
    const { data: newClasses = [], isLoading, isError } = useQuery({
        queryKey: ['newArrivals'],
        queryFn: async () => {
            const res = await axiosPublic.get('/AllClass');
            // Filter accepted and sort by createdAt or _id (assuming _id is incrementing)
            const accepted = res.data.filter(cls => cls.status === 'accepted');
            // Sort by createdAt if available, else by _id (descending)
            const sorted = accepted.sort((a, b) => {
                if (a.createdAt && b.createdAt) {
                    return new Date(b.createdAt) - new Date(a.createdAt);
                }
                return b._id.localeCompare(a._id); // fallback
            });
            return sorted.slice(0, 5);
        },
    });

    // Fetch user's enrolled classes
    const { data: enrolledClasses = [], isLoading: isEnrolledLoading } = useQuery({
        queryKey: ['enrolledClasses', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`myEnroll/${user.email}`);
            return res.data;
        },
    });

    // Slider settings
    const settings = {
        dots: false,
        infinite: true,
        speed: 5000,
        slidesToShow: 3, // number of cards to show in one slide
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 1000,
        responsive: [
            { breakpoint: 1024, settings: { slidesToShow: 2 } },
            { breakpoint: 600, settings: { slidesToShow: 1 } },
        ],
    };

    // Check if user is enrolled in a class
    const isAlreadyEnrolled = (classId) => {
        return enrolledClasses?.some(
            (enroll) => enroll.classDetails && enroll.classDetails._id === classId
        );
    };

    // Handle Get Started button click
    const handleGetStarted = (cls, alreadyEnrolled) => {
        if (alreadyEnrolled) {
            alert('You have already enrolled in this class!');
            return;
        }
        navigate(`/class/${cls._id}`, { state: { classDetails: cls } });
    };

    return (
        <div className="py-20 px-4 sm:px-8 lg:px-16 bg-gradient-to-br from-orange-50 via-white to-red-50">
            <div className="max-w-screen-xl mx-auto">
                {/* Header Section */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-4">
                        New Arrivals
                    </h2>
                    <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                        Explore our latest courses and stay ahead with cutting-edge skills
                    </p>
                </div>

                {isLoading || isEnrolledLoading ? (
                    <div className="flex justify-center items-center h-40">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
                    </div>
                ) : isError ? (
                    <div className="text-center text-red-500">Failed to load new arrivals.</div>
                ) : newClasses.length === 0 ? (
                    <div className="text-center text-gray-500">No new arrivals found.</div>
                ) : (
                    <Slider {...settings}>
                        {newClasses.map((cls) => {
                            const alreadyEnrolled = isAlreadyEnrolled(cls._id);
                            return (
                                <div
                                    key={cls._id}
                                    className="group p-6 mx-4"
                                >
                                    <div className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden transform hover:-translate-y-2 border border-gray-100 h-[500px] flex flex-col">
                                        {/* Image Container */}
                                        <div className="relative overflow-hidden h-64 flex-shrink-0">
                                            <img
                                                src={cls.image || 'https://via.placeholder.com/300x200.png?text=Default+Image'}
                                                alt={cls.title}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                            <div className="absolute top-4 right-4">
                                                <span className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg">
                                                    New
                                                </span>
                                            </div>
                                        </div>

                                        {/* Content */}
                                        <div className="p-6 flex flex-col flex-grow">
                                            <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2 group-hover:text-orange-600 transition-colors duration-300">
                                                {cls.title}
                                            </h3>
                                            <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-grow">
                                                {cls.description}
                                            </p>
                                            {/* Action Button */}
                                            <button
                                                onClick={() => handleGetStarted(cls, alreadyEnrolled)}
                                                className={`w-full font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform shadow-lg focus:outline-none focus:ring-4 focus:ring-orange-300 flex-shrink-0 ${alreadyEnrolled ? 'bg-gray-400 cursor-not-allowed' : 'bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white hover:scale-105 hover:shadow-xl'}`}
                                                disabled={alreadyEnrolled}
                                            >
                                                <span className="flex items-center justify-center space-x-2">
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                                    </svg>
                                                    <span>{alreadyEnrolled ? 'Already Enrolled' : 'Get Started'}</span>
                                                </span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </Slider>
                )}
            </div>
        </div>
    );
};

export default NewArrivals;

