











import React from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../hooks/useAuth';
import useAxiosSecure from '../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import useRole from '../hooks/useRole';

const TeacherRequest = () => {
  const { user } = useAuth();
  const [role]=useRole();
  
  const axiosSecure = useAxiosSecure();
  const { register, handleSubmit, reset } = useForm();

  const { data = {}, refetch } = useQuery({
    queryKey: ['teacher-req'],
    queryFn: async () => {
      const res = await axiosSecure.get(`/teacher-requests/${user?.email}`);
      return res.data; // Ensure API returns an object with teacher and status
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
      await axiosSecure.patch(`/teacher-requests/resubmit/${user?.email}`,requestData);
      refetch();
    } catch (error) {
      console.error('Failed to resubmit request:', error);
    }
  };
  console.log(status);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Teach on [Your Website Name]</h2>

      {status === 'accepted' ? (
        <div className="text-center p-4 bg-green-100 rounded">
          <h3 className="text-xl font-semibold">Congratulations!</h3>
          <p>You are now a teacher. Enjoy teaching on our platform!</p>
        </div>
      ) : status === 'pending' ? (
        <div className="text-center p-4 bg-yellow-100 rounded">
          <h3 className="text-xl font-semibold">Your request is under review.</h3>
          <p>Please wait for admin approval.</p>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white p-6 rounded shadow-md space-y-4"
        >
          <div>
            <label className="block font-semibold">Name</label>
            <input
              type="text"
              value={user?.displayName || ''}
              readOnly
              className="input input-bordered w-full"
            />
          </div>

          <div>
            <label className="block font-semibold">Profile Image</label>
            <img
              src={user?.photoURL}
              alt="Profile"
              className="w-16 h-16 rounded-full"
            />
          </div>

          <div>
            <label className="block font-semibold">Email</label>
            <input
              type="email"
              value={user?.email || ''}
              readOnly
              className="input input-bordered w-full"
            />
          </div>

          <div>
            <label className="block font-semibold">Experience</label>
            <select
              {...register('experience', { required: true })}
              className="select select-bordered w-full"
            >
              <option value="beginner">Beginner</option>
              <option value="mid-level">Mid-Level</option>
              <option value="experienced">Experienced</option>
            </select>
          </div>

          <div>
            <label className="block font-semibold">Title</label>
            <input
              type="text"
              {...register('title', { required: true })}
              placeholder="Enter your title"
              className="input input-bordered w-full"
            />
          </div>

          <div>
            <label className="block font-semibold">Category</label>
            <select
              {...register('category', { required: true })}
              className="select select-bordered w-full"
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
  className={`btn btn-primary w-full ${status === 'rejected' ? 'hidden' : ''}`}
>
  Submit for Review
</button>

        </form>
      )}

      {status === 'rejected' && (
        <div className="mt-4">
          <p className="text-red-500 mb-2">Your request was rejected.</p>
          <button onClick={handleResubmit} className="btn btn-warning w-full">
            Request Again
          </button>
        </div>
      )}
    </div>
  );
};

export default TeacherRequest;

