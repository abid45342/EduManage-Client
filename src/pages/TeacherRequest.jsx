import React from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../hooks/useAuth';
import useAxiosSecure from '../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import useRole from '../hooks/useRole';
import { FaCheckCircle, FaHourglassHalf, FaTimesCircle } from 'react-icons/fa';

const TeacherRequest = () => {
  const { user } = useAuth();
  const [role] = useRole();
  const axiosSecure = useAxiosSecure();
  const { register, handleSubmit, reset } = useForm();

  const { data = {}, refetch } = useQuery({
    queryKey: ['teacher-req'],
    queryFn: async () => {
      const res = await axiosSecure.get(`/teacher-requests/${user?.email}`);
      return res.data;
    },
  });

  const { teacher = [], status } = data;

  const onSubmit = async (data) => {
    try {
      const requestData = {
        ...data,
        name: user?.name || user?.displayName || '',
        email: user?.email || '',
        photoURL: user?.photoURL || '',
        status: 'pending',
      };
      await axiosSecure.post('/teacher-requests', requestData);
      reset();
      refetch();
    } catch (error) {
      console.error('Failed to submit request:', error);
    }
  };

  const handleResubmit = async () => {
    try {
      const requestData = {
        ...data,
        name: user?.name || user?.displayName || '',
        email: user?.email || '',
        photoURL: user?.photoURL || '',
        status: 'pending',
      };
      await axiosSecure.patch(`/teacher-requests/resubmit/${user?.email}`, requestData);
      refetch();
    } catch (error) {
      console.error('Failed to resubmit request:', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-100 py-10 px-2">
      <div className="w-full max-w-lg mx-auto">
        <div className="bg-white/90 rounded-2xl shadow-2xl border border-blue-100 p-8 relative">
          <h2 className="text-3xl font-extrabold text-center mb-8 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent tracking-tight">
            Apply to Teach on EduManage
          </h2>

          {status === 'accepted' ? (
            <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-gradient-to-br from-green-50 to-green-100 border border-green-200 shadow-lg">
              <FaCheckCircle className="text-5xl text-green-500 mb-2" />
              <h3 className="text-2xl font-bold text-green-700 mb-1">Congratulations!</h3>
              <p className="text-gray-700">You are now a teacher. Enjoy teaching on our platform!</p>
            </div>
          ) : status === 'pending' ? (
            <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-gradient-to-br from-yellow-50 to-yellow-100 border border-yellow-200 shadow-lg">
              <FaHourglassHalf className="text-5xl text-yellow-500 mb-2" />
              <h3 className="text-2xl font-bold text-yellow-700 mb-1">Request Under Review</h3>
              <p className="text-gray-700">Please wait for admin approval.</p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-6"
            >
              <div className="flex flex-col items-center mb-4">
                <img
                  src={user?.photoURL}
                  alt="Profile"
                  className="w-20 h-20 rounded-full border-4 border-blue-200 shadow-lg mb-2 object-cover"
                />
                <h3 className="text-xl font-bold text-gray-800">{user?.displayName}</h3>
                <p className="text-gray-500 text-sm">{user?.email}</p>
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">Experience</label>
                <select
                  {...register('experience', { required: true })}
                  className="w-full border-2 border-blue-100 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
                >
                  <option value="beginner">Beginner</option>
                  <option value="mid-level">Mid-Level</option>
                  <option value="experienced">Experienced</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">Title</label>
                <input
                  type="text"
                  {...register('title', { required: true })}
                  placeholder="Enter your title"
                  className="w-full border-2 border-blue-100 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">Category</label>
                <select
                  {...register('category', { required: true })}
                  className="w-full border-2 border-blue-100 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
                >
                  <option value="web-development">Web Development</option>
                  <option value="digital-marketing">Digital Marketing</option>
                  <option value="data-science">Data Science</option>
                  <option value="graphic-design">Graphic Design</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-blue-300 text-lg"
              >
                Submit for Review
              </button>
            </form>
          )}

          {status === 'rejected' && (
            <div className="flex flex-col items-center text-center mt-6 p-6 rounded-2xl bg-gradient-to-br from-red-50 to-red-100 border border-red-200 shadow-lg">
              <FaTimesCircle className="text-5xl text-red-500 mb-2" />
              <h3 className="text-xl font-bold text-red-700 mb-1">Request Rejected</h3>
              <p className="text-gray-700 mb-2">Your request was rejected.</p>
              <button
                onClick={handleResubmit}
                className="w-full bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white font-bold py-2 px-6 rounded-xl transition-all duration-300 shadow focus:outline-none focus:ring-2 focus:ring-red-300"
              >
                Request Again
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TeacherRequest;

