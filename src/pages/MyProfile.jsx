import useAuth from '../hooks/useAuth';
import useRole from '../hooks/useRole';

const MyProfile = () => {
    const { user } = useAuth();
    const [role] = useRole();

    if (!user) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
                    <p className="text-gray-600 font-medium">Loading profile...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-8 px-4">
            <div className="max-w-2xl mx-auto">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">My Profile</h1>
                    <p className="text-gray-600">Manage your account information</p>
                </div>

                {/* Profile Card */}
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                    {/* Profile Header */}
                    <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-8 text-center">
                        <div className="relative inline-block">
                            <img
                                src={user.photoURL || 'https://via.placeholder.com/150'}
                                alt={`${user.displayName || 'User'}'s profile`}
                                className="w-24 h-24 rounded-full border-4 border-white shadow-lg object-cover"
                            />
                            <div className="absolute -bottom-1 -right-1 bg-green-500 w-6 h-6 rounded-full border-2 border-white"></div>
                        </div>
                        <h2 className="text-2xl font-bold text-white mt-4">{user.displayName || 'User Name'}</h2>
                        <span className="inline-block bg-white/20 text-white px-4 py-1 rounded-full text-sm font-medium mt-2">
                            {role}
                        </span>
                    </div>

                    {/* Profile Details */}
                    <div className="p-6 space-y-6">
                        {/* Email Section */}
                        <div className="flex items-center p-4 bg-gray-50 rounded-xl">
                            <div className="bg-indigo-100 p-3 rounded-lg mr-4">
                                <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"></path>
                                </svg>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500 font-medium">Email Address</p>
                                <p className="text-gray-800 font-semibold">{user.email || 'Not Available'}</p>
                            </div>
                        </div>

                        {/* Phone Section */}
                        <div className="flex items-center p-4 bg-gray-50 rounded-xl">
                            <div className="bg-green-100 p-3 rounded-lg mr-4">
                                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                                </svg>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500 font-medium">Phone Number</p>
                                <p className="text-gray-800 font-semibold">01674967584</p>
                            </div>
                        </div>

                        {/* Address Section */}
                        <div className="flex items-center p-4 bg-gray-50 rounded-xl">
                            <div className="bg-purple-100 p-3 rounded-lg mr-4">
                                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                </svg>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500 font-medium">Address</p>
                                <p className="text-gray-800 font-semibold">Dhaka, Bangladesh</p>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-3 pt-4">
                            <button className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-4 rounded-xl transition duration-200 transform hover:scale-105">
                                Edit Profile
                            </button>
                            <button className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 px-4 rounded-xl transition duration-200 transform hover:scale-105">
                                Change Password
                            </button>
                        </div>
                    </div>
                </div>

                {/* Stats Section */}
                {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
                    <div className="bg-white p-6 rounded-xl shadow-lg text-center">
                        <div className="text-2xl font-bold text-indigo-600 mb-2">12</div>
                        <div className="text-gray-600 text-sm">Classes Enrolled</div>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-lg text-center">
                        <div className="text-2xl font-bold text-green-600 mb-2">8</div>
                        <div className="text-gray-600 text-sm">Completed</div>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-lg text-center">
                        <div className="text-2xl font-bold text-purple-600 mb-2">4</div>
                        <div className="text-gray-600 text-sm">In Progress</div>
                    </div>
                </div> */}
            </div>
        </div>
    );
};

export default MyProfile;
