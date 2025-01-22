import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/photo_2025-01-15_22-04-18.jpg'
import { FaBook, FaClipboardList, FaCog, FaGraduationCap, FaLightbulb, FaSchool, FaUsers } from 'react-icons/fa';
import { AuthContext } from '../providers/AuthProvider';
import useRole from '../hooks/useRole';

const Navbar = () => {

  const {user,logOut}=useContext(AuthContext)
  console.log(user)
  const [role]=useRole();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const handleLogOut = () => {
    logOut()
      .then(() => {
        console.log("Logged out successfully");
      })
      .catch((error) => {
        console.error("Error logging out:", error);
      });
  };
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  const navOptions=(
    <> 
    <li className='font-semibold'><Link to="/">Home</Link></li>
      <li className='font-semibold'><Link  to="/allClasses">All Classes</Link></li>
      <li className='font-semibold'><Link to="/teacherReq">Teach on EduManage</Link></li>
      
      </>
  )
    return (
        <div className="navbar bg-base-100">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h8m-8 6h16" />
        </svg>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
       {navOptions}
      </ul>
    </div>
    <FaGraduationCap className="pr-1 text-4xl" />
    <a className=" p-0 m-0 btn btn-ghost text-xl">EduManage</a>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1">
{navOptions}
    </ul>
  </div>
  <div className="navbar-end  ">
  {user ? (
          <div className="relative z-50 ">
            <img
              src={user.photoURL||'https://via.placeholder.com/40' }
              alt="Profile"
              className="w-10 h-10 rounded-full cursor-pointer"
              onClick={toggleDropdown}
            />
            {isDropdownOpen && (
              <ul className="absolute -left-40 mt-2 w-48  border-gray-700 border-2 bg-white rounded-lg shadow-lg py-2">
                <li className=" px-4 py-2 text-sm font-medium text-gray-700">{user.name|| user.displayName}</li>
                <li className="  rounded-xl  px-4 py-2 hover:bg-gray-100">





                {
                  role==='admin'&&   <Link to="/dashboard/teacherRequest">Dashboard</Link>
                  ||

                  role === 'teacher'&&  <Link to="/dashboard/addClass">Dashboard</Link>
                  ||

   role === 'student'&&  <Link to="/dashboard/myEnroll">Dashboard</Link>

                }










                </li>
                <li className=" rounded-xl px-4 py-2 hover:bg-gray-100">
                  <button onClick={handleLogOut} className="w-full text-left">
                    Logout
                  </button>
                </li>
              </ul>
            )}
          </div>
        ) : (
          <Link to="login">
            <button className="btn">Sign In</button>
          </Link>
        )}
  </div>
</div>
    );
};

export default Navbar;