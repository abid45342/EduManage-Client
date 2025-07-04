import { useContext, useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FaGraduationCap, FaSearch, FaBell, FaUserCircle } from 'react-icons/fa';
import { AuthContext } from '../providers/AuthProvider';
import useRole from '../hooks/useRole';

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [role] = useRole();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      const mobileMenu = document.getElementById('mobile-menu');
      const mobileButton = document.getElementById('mobile-button');
      
      if (mobileMenu && mobileButton && 
          !mobileMenu.contains(event.target) && 
          !mobileButton.contains(event.target)) {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMobileMenuOpen]);

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

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const navOptions = (
    <>
      <li className="relative">
        <Link to="/" className="text-gray-300 px-3 py-2 rounded-md text-sm font-medium hover:text-blue-300 transition-colors duration-200">
          Home
        </Link>
      </li>
      <li className="relative">
        <Link to="/allClasses" className="text-gray-300 px-3 py-2 rounded-md text-sm font-medium hover:text-blue-300 transition-colors duration-200">
          All Classes
        </Link>
      </li>
      {user && (
        <li className="relative">
          <Link to="/teacherReq" className="text-gray-300 px-3 py-2 rounded-md text-sm font-medium hover:text-blue-300 transition-colors duration-200">
            Teach on EduManage
          </Link>
        </li>
      )}
    </>
  );

  return (
    <nav className="bg-gradient-to-r from-blue-700 via-blue-800 to-indigo-900 shadow-xl sticky top-0 z-50 border-b border-blue-600/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-3">
            <div className="flex-shrink-0">
              <div className="flex items-center space-x-3">
                <div className="bg-gradient-to-r from-yellow-400 to-orange-500 p-2 rounded-lg shadow-lg">
                  <FaGraduationCap className="text-white text-2xl" />
                </div>
                <div className="flex flex-col">
                  <span className="text-white font-bold text-xl tracking-wide">EduManage</span>
                  <span className="text-blue-200 text-xs">Learn. Grow. Succeed.</span>
                </div>
              </div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navOptions}
            </div>
          </div>

          {/* Search Bar */}
          <div className="hidden lg:flex items-center flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search for courses..."
                className="block w-full pl-10 pr-3 py-2 border border-transparent rounded-lg leading-5 bg-white/10 text-white placeholder-gray-300 focus:outline-none focus:bg-white/20 focus:border-blue-300 transition-all duration-200"
              />
            </div>
          </div>

          {/* Right Side - User Actions */}
          <div className="flex items-center space-x-4">
            {/* Notifications */}
            {user && (
              <button className="p-2 text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200 relative">
                <FaBell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  3
                </span>
              </button>
            )}

            {/* User Profile */}
            {user ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={toggleDropdown}
                  className="flex items-center space-x-2 p-2 rounded-lg hover:bg-white/10 transition-all duration-200"
                >
                  <img
                    src={user.photoURL || 'https://via.placeholder.com/40'}
                    alt="Profile"
                    className="w-8 h-8 rounded-full border-2 border-white/30"
                  />
                  <span className="text-white text-sm font-medium hidden sm:block">
                    {user.name || user.displayName}
                  </span>
                </button>

                {/* Dropdown Menu */}
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-2xl border border-gray-200 py-2 z-50 animate-in slide-in-from-top-2 duration-200">
                    {/* User Info */}
                    <div className="px-4 py-3 border-b border-gray-100">
                      <div className="flex items-center space-x-3">
                        <img
                          src={user.photoURL || 'https://via.placeholder.com/40'}
                          alt="Profile"
                          className="w-10 h-10 rounded-full"
                        />
                        <div>
                          <p className="text-sm font-semibold text-gray-900">
                            {user.name || user.displayName}
                          </p>
                          <p className="text-xs text-gray-500 capitalize">{role}</p>
                        </div>
                      </div>
                    </div>

                    {/* Dashboard Link */}
                    <div className="px-2 py-1">
                      {role === 'admin' && (
                        <Link
                          to="/dashboard/teacherRequest"
                          className="flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 rounded-lg transition-colors duration-200"
                        >
                          <FaGraduationCap className="mr-3 h-4 w-4" />
                          Admin Dashboard
                        </Link>
                      )}
                      {role === 'teacher' && (
                        <Link
                          to="/dashboard/addClass"
                          className="flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 rounded-lg transition-colors duration-200"
                        >
                          <FaGraduationCap className="mr-3 h-4 w-4" />
                          Teacher Dashboard
                        </Link>
                      )}
                      {role === 'student' && (
                        <Link
                          to="/dashboard/myEnroll"
                          className="flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 rounded-lg transition-colors duration-200"
                        >
                          <FaGraduationCap className="mr-3 h-4 w-4" />
                          My Learning
                        </Link>
                      )}
                    </div>

                    {/* Logout */}
                    <div className="px-2 py-1 border-t border-gray-100">
                      <button
                        onClick={handleLogOut}
                        className="flex items-center w-full px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
                      >
                        <FaUserCircle className="mr-3 h-4 w-4" />
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link to="/login">
                  <button className="text-white hover:text-blue-200 transition-colors duration-200 font-medium">
                    Sign In
                  </button>
                </Link>
                <Link to="/signup">
                  <button className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 shadow-lg hover:shadow-xl">
                    Get Started
                  </button>
                </Link>
              </div>
            )}

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                id="mobile-button"
                onClick={toggleMobileMenu}
                className="text-gray-300 hover:text-white hover:bg-white/10 rounded-lg p-2 transition-all duration-200"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {isMobileMenuOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div id="mobile-menu" className="md:hidden animate-in slide-in-from-top-2 duration-200">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-blue-800/50 rounded-lg mt-2">
              {navOptions}
              {/* Mobile Search */}
              <div className="px-3 py-2">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaSearch className="h-4 w-4 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search for courses..."
                    className="block w-full pl-10 pr-3 py-2 border border-transparent rounded-lg leading-5 bg-white/10 text-white placeholder-gray-300 focus:outline-none focus:bg-white/20 focus:border-blue-300 transition-all duration-200"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;










