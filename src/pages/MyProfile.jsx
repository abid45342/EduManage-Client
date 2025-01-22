import React from 'react';
import useAuth from '../hooks/useAuth';
import useAxiosSecure from '../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import useRole from '../hooks/useRole';

const MyProfile = () => {

    const { user } = useAuth();

const [role]=useRole();
console.log(role)






    if (!user) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <p>Loading profile...</p>
            </div>
        );
    }

    return (
        <div className="p-4 max-w-md mx-auto bg-white rounded-lg shadow-md">
            <img
                src={user.photoURL || 'https://via.placeholder.com/150'}
                alt={`${user.name}'s profile`}
                className="w-32 h-32 rounded-full mx-auto"
            />
            <h2 className="text-center text-2xl font-semibold mt-4">{user.displayName || 'User Name'}</h2>
            <p className="text-center text-red-600 font-bold">{role}</p>
            <div className="mt-4 space-y-2">
                <p ><strong>Email:</strong> {user.email || 'Not Available'}</p>
                <p><strong>Phone:</strong> { '01674967584'}</p>
               
            </div>
        </div>
    );
};

export default MyProfile;
