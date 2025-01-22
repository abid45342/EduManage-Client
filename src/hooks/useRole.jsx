import React from 'react';
import useAxiosSecure from './useAxiosSecure';

import useAuth from './useAuth';
import { useQuery } from '@tanstack/react-query';

const useRole = () => {
const {user}= useAuth();
const axiosSecure = useAxiosSecure();




const {data:role='' ,refetch, isPending:isLoading} = useQuery({
    queryKey:['role', user?.email],
    queryFn: async()=>{
        const res = await axiosSecure.get(`/users/role/${user.email}`);
        console.log(res.data);
        return res.data?.role;

    }
})
return [role ,isLoading,refetch]
};

export default useRole;