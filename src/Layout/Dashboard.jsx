







// import React from 'react';
// import { FaAd, FaCalendar, FaEnvelope, FaHome, FaList, FaSearch, FaShoppingCart, FaUsers, FaUtensils } from 'react-icons/fa';
// import { NavLink, Outlet } from 'react-router-dom';

// import useRole from '../hooks/useRole';

// const Dashboard = () => {
//     const [role, isLoading, refetch] = useRole();
//     console.log(role);

//     refetch();
//     if(isLoading)
//     {
        
//         return  <progress className="progress w-56"></progress>
//     }
//     return (
//         <div className='flex '>
//             {/* Sidebar */}
//             <div className="w-64 min-h-screen bg-gray-700 text-white">
//                 <ul className='menu p-4'>



//                     {role === 'admin' && (
//                         <>
//                             <li>
//                                 <NavLink to="/dashboard/teacherRequest">
//                                     <FaHome /> Teacher Request
//                                 </NavLink>
//                             </li>
                 
//                             <li>
//                                 <NavLink to="/dashboard/classReq">
//                                     <FaList /> All Classes
//                                 </NavLink>
//                             </li>
//                             <li>
//                         <NavLink to="/dashboard/myProfile">
//                             <FaUtensils /> My Profile
//                         </NavLink>
//                     </li>
//                             <li>
//                                 <NavLink to="/dashboard/users">
//                                     <FaUsers /> All Users
//                                 </NavLink>
//                             </li>
//                         </>
//                     )}
//                     {role === 'teacher' && (
//                         <>
//                             <li>
//                                 <NavLink to="/dashboard/addClass">
//                                     <FaHome /> Add class
//                                 </NavLink>
//                             </li>
//                             <li>
//                                 <NavLink to="/dashboard/myClass">
//                                     <FaList /> My class
//                                 </NavLink>
//                             </li>
//                             <li>
//                         <NavLink to="/dashboard/myProfile">
//                             <FaUtensils /> My Profile
//                         </NavLink>
//                     </li>
                      
//                         </>
//                     )}
//                     {role==='student'  && (
//                      <>
//                                          <li>
//                     <NavLink to="/dashboard/myEnroll">
//                         <FaHome />My enroll class
//                     </NavLink>
//                 </li>
//                 {/* <li>
//                     <NavLink to="/order/salad">
//                         <FaSearch />My enroll class details
//                     </NavLink>
//                 </li> */}
//    <li>
//                         <NavLink to="/dashboard/myProfile">
//                             <FaUtensils /> My Profile
//                         </NavLink>
//                     </li>
//                    </>
//                     )}




//                     {/* Common Links */}
//                     <div className="divider"></div>
//                     <li>
//                         <NavLink to="/">
//                             <FaHome />Home
//                         </NavLink>
//                     </li>
//                     <li>
//                         <NavLink to="/order/salad">
//                             <FaSearch />Help
//                         </NavLink>
//                     </li>
//                     {/* <li>
//                         <NavLink to="/dashboard/myProfile">
//                             <FaUtensils /> My Profile
//                         </NavLink>
//                     </li> */}
//                 </ul>
//             </div>

//             {/* Main Content */}
//             <div className='flex-1 p-8 overflow-hidden'>
//                 <Outlet />
//             </div>
//         </div>
//     );
// };

// export default Dashboard;








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
            <div className={`w-${isSidebarMinimized ? '16' : '64'} min-h-screen bg-gray-700 text-white transition-all duration-300`}>
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
