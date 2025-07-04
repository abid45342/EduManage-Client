





import React, { useState } from 'react';
import { FaAd, FaAddressBook, FaBookOpen, FaCalendar, FaChalkboard, FaClipboardList, FaEnvelope, FaHome, FaList, FaPlusSquare, FaSearch, FaShoppingCart, FaUserCheck, FaUserCircle, FaUsers, FaUtensils } from 'react-icons/fa';
import { NavLink, Outlet } from 'react-router-dom';

import useRole from '../hooks/useRole';

const Dashboard = () => {
    const [role, isLoading, refetch] = useRole();
    const [isSidebarMinimized, setSidebarMinimized] = useState(false); // State for sidebar toggle
    console.log(role);

    refetch();
    if (isLoading) {
        return <progress className="progress w-56"></progress>;
    }

    const toggleSidebar = () => {
        setSidebarMinimized(prev => !prev); // Toggle between minimized and expanded
    };

    return (
        <div className="flex">
            {/* Sidebar */}
            <div className={`w-${isSidebarMinimized ? '16' : '64'} min-h-screen bg-gradient-to-b from-blue-800 via-indigo-900 to-purple-900 text-white transition-all duration-300`}>
                <div className="flex justify-end p-2">
                    <button onClick={toggleSidebar} className="text-white">
                        {isSidebarMinimized ? '>' : '<'}
                    </button>
                </div>
                <ul className='menu p-4'>
                    {role === 'admin' && (
                        <>
                            <li>
                                <NavLink to="/dashboard/teacherRequest">
                                    <FaUserCheck /> {isSidebarMinimized ? '' : 'Teacher Request'}
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/classReq">
                                    <FaChalkboard /> {isSidebarMinimized ? '' : 'All Classes'}
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/myProfile">
                                    <FaUserCircle /> {isSidebarMinimized ? '' : 'My Profile'}
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/users">
                                    <FaAddressBook /> {isSidebarMinimized ? '' : 'All Users'}
                                </NavLink>
                            </li>

                            <li>
                                <NavLink to="/dashboard/overview">
                                    <FaAddressBook /> {isSidebarMinimized ? '' : 'Stats'}
                                </NavLink>
                            </li>
                        </>
                    )}
                    {role === 'teacher' && (
                        <>
                            <li>
                                <NavLink to="/dashboard/addClass">
                                    <FaPlusSquare /> {isSidebarMinimized ? '' : 'Add Class'}
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/myClass">
                                    <FaClipboardList /> {isSidebarMinimized ? '' : 'My Class'}
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/myProfile">
                                    <FaUserCircle /> {isSidebarMinimized ? '' : 'My Profile'}
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/overview">
                                    <FaAddressBook /> {isSidebarMinimized ? '' : 'Stats'}
                                </NavLink>
                            </li>
                        </>
                    )}
                    {role === 'student' && (
                        <>
                            <li>
                                <NavLink to="/dashboard/myEnroll">
                                    <FaBookOpen /> {isSidebarMinimized ? '' : 'My Enrolled Class'}
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/myProfile">
                                    <FaUserCircle /> {isSidebarMinimized ? '' : 'My Profile'}
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/overview">
                                    <FaAddressBook /> {isSidebarMinimized ? '' : 'Stats'}
                                </NavLink>
                            </li>
                        </>
                    )}

                    {/* Common Links */}
                    <div className="divider"></div>
                    <li>
                        <NavLink to="/">
                            <FaHome /> {isSidebarMinimized ? '' : 'Home'}
                        </NavLink>
                    </li>
                    {/* <li>
                        <NavLink to="/order/salad">
                            <FaSearch /> {isSidebarMinimized ? '' : 'Help'}
                        </NavLink>
                    </li> */}
                </ul>
            </div>

            {/* Main Content */}
            <div className='flex-1 p-8 overflow-hidden'>
                <Outlet />
            </div>
        </div>
    );
};

export default Dashboard;
