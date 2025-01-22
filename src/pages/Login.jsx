import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../providers/AuthProvider';
import useAxiosPublic from '../hooks/useAxiosPublic';
import Swal from 'sweetalert2';
import useAuth from '../hooks/useAuth';
import { toast } from 'react-toastify';

const Login = () => {
    const {signIn,googleSignIn}= useContext(AuthContext);
    const {user}=useAuth();
    const axiosPublic = useAxiosPublic()
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        // Add login logic here (e.g., Firebase authentication)
        console.log('Login Data:', data);
        const email = data.email;
        const password = data.password;
        signIn(email,password)
        .then(result=>{
            const user = result.user;
            console.log(user);
                      Swal.fire({
                        title: 'login Success!',
                        text: 'You have logged in successfully.',
                        icon: 'success',
                        confirmButtonText: 'OK'
                    });
                    // navigate(from, { replace: true });
                    navigate('/');
  
  
          })
          .catch(err=>{
            toast.error('Invalid email or password');
            console.log(err)
          })



    };
    console.log(user);

    const handleGoogleSignIn = () => {
        googleSignIn()
            .then(result => {
                console.log(result.user);
                const userInfo = {
                    email: result.user?.email,
                    name: result.user?.displayName || result.user?.name,
                    photoURL: result.user.photoURL,
                    role: 'student',
                };
                axiosPublic.post('/users', userInfo)
                    .then(res => {
                        Swal.fire({
                            title: 'Login Success!',
                            text: 'You have logged in successfully.',
                            icon: 'success',
                            confirmButtonText: 'OK',
                        });
                        console.log(res.data);
                        navigate('/');
                    })
                    .catch(err => {
                        toast.error('Error while saving user data');
                        console.error(err);
                    });
            })
            .catch(err => {
                toast.error('Error during Google login');
                console.error(err);
            });
    };
    

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
                <h1 className="text-2xl font-bold text-center mb-6">Login</h1>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            {...register('email', {
                                required: 'Email is required',
                                pattern: {
                                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                    message: 'Invalid email address',
                                },
                            })}
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Enter your email"
                        />
                        {errors.email && (
                            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                        )}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            type="password"
                            {...register('password', {
                                required: 'Password is required',
                                minLength: {
                                    value: 6,
                                    message: 'Password must be at least 6 characters long',
                                },
                            })}
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Enter your password"
                        />
                        {errors.password && (
                            <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
                        )}
                    </div>
                    <button
                        type="submit"
                        className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                        Login
                    </button>
                </form>
                <div className="my-4 flex items-center justify-between">
                    <button
                        onClick={handleGoogleSignIn}
                        className="py-2 px-4 bg-red-500 text-white rounded-lg hover:bg-red-600"
                    >
                        Sign in with Google
                    </button>
                </div>
                <p className="text-center text-sm">
                    Don't have an account?{' '}
                    <Link to="/signUp" className="text-blue-500 hover:underline">
                        Register here
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
