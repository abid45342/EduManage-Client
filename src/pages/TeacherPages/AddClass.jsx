import React from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { toast } from 'react-toastify';

const AddClass = () => {
   
    const {user}=useAuth();
    console.log(user)
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const axiosSecure=useAxiosSecure();

    // Mutation for submitting form data
    const mutation = useMutation({
        mutationFn: async (classData) => {
            const response = await  axiosSecure.post('addClass', classData);
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['classes']); // Invalidate the query to update the class list
            reset(); // Reset the form fields
            // navigate('/dashboard/myClasses'); // Redirect to 'My Classes' page
            toast.success("Class Added successfully")
            navigate('/dashboard/myClass')
        },
        onError: (error) => {
            console.error('Error adding class:', error);
            toast.error("Class Cant Be Added")
        },
    });

    const onSubmit = (data) => {
        const classData = {
            ...data,
            name: user?.name||user?.displayName,
            email: user?.email,
            status: 'pending',
            AssgnmentCount:0,
            modules: [],
        };


        mutation.mutate(classData);

    };

    return (
        <div className="max-w-xl mx-auto p-6 bg-white rounded shadow-md">
            <h2 className="text-2xl font-bold mb-4">Add Class</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* Title */}
                <div>
                    <label className="block font-semibold mb-2">Title</label>
                    <input
                        type="text"
                        {...register('title', { required: 'Title is required' })}
                        className="w-full p-2 border rounded"
                        placeholder="Enter class title"
                    />
                    {errors.title && <span className="text-red-500 text-sm">{errors.title.message}</span>}
                </div>

                {/* Name (not editable) */}
                <div>
                    <label className="block font-semibold mb-2">Name</label>
                    <input
                        type="text"
                        value={user?.name || user?.displayName||''}
                        readOnly
                        className="w-full p-2 border bg-gray-100 rounded"
                    />
                </div>

                {/* Email (not editable) */}
                <div>
                    <label className="block font-semibold mb-2">Email</label>
                    <input
                        type="email"
                        value={user?.email || ''}
                        readOnly
                        className="w-full p-2 border bg-gray-100 rounded"
                    />
                </div>

                {/* Price */}
                <div>
                    <label className="block font-semibold mb-2">Price</label>
                    <input
                        type="number"
                        {...register('price', { required: 'Price is required', min: 0 })}
                        className="w-full p-2 border rounded"
                        placeholder="Enter class price"
                    />
                    {errors.price && <span className="text-red-500 text-sm">{errors.price.message}</span>}
                </div>

                {/* Description */}
                <div>
                    <label className="block font-semibold mb-2">Description</label>
                    <textarea
                        {...register('description', { required: 'Description is required' })}
                        className="w-full p-2 border rounded"
                        rows="4"
                        placeholder="Enter class description"
                    ></textarea>
                    {errors.description && <span className="text-red-500 text-sm">{errors.description.message}</span>}
                </div>

                {/* Image */}
                <div>
                    <label className="block font-semibold mb-2">Image URL</label>
                    <input
                        type="url"
                        {...register('image', { required: 'Image URL is required' })}
                        className="w-full p-2 border rounded"
                        placeholder="Enter image URL"
                    />
                    {errors.image && <span className="text-red-500 text-sm">{errors.image.message}</span>}
                </div>

                {/* Submit Button */}
                <div>
                    <button
                        type="submit"
                        className="w-full bg-gray-500 text-white py-2 rounded hover:bg-gray-600"
                        disabled={mutation.isLoading}
                    >
                        {mutation.isLoading ? 'Adding...' : 'Add Class'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddClass;
