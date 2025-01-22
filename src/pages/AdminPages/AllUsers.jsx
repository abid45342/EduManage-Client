



import React, { useState } from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';

const AllUsers = () => {
  const axiosSecure = useAxiosSecure();
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Maximum items per page

  // Fetch all users with optional search query
  const { data: allUsers = [], refetch } = useQuery({
    queryKey: ['users', searchQuery],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users`, {
        params: { search: searchQuery },
      });
      return res.data;
    },
  });

  // Paginate users on the frontend
  const totalPages = Math.ceil(allUsers.length / itemsPerPage);
  const paginatedUsers = allUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Pagination controls
  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  // Make admin handler
  const handleMakeAdmin = async (userId) => {
    try {
      await axiosSecure.patch(`/users/role/${userId}`);
      refetch(); // Refresh user list after updating
      toast.success('User is now an admin');
    } catch (error) {
      console.error('Failed to make admin:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">All Users</h2>

      {/* Search Bar */}
      <div className="flex lg:flex-row flex-col gap-2">
        <input
          type="text"
          placeholder="Search by name or email..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="input input-bordered w-full max-w-xs"
        />
        <button
          onClick={() => {
            setCurrentPage(1); // Reset to first page on search
            refetch();
          }}
          className="btn btn-primary"
        >
          Search
        </button>
      </div>

      {/* Users Table */}
      <div className="overflow-x-scroll mt-4">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>Image</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {paginatedUsers.map((user, index) => (
              <tr key={user._id}>
                <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                <td>
                  <img
                    src={user.photoURL}
                    alt="User"
                    className="w-10 h-10 rounded-full"
                  />
                </td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role === 'admin' ? 'Admin' : 'User'}</td>
                <td>
                  <button
                    onClick={() => handleMakeAdmin(user._id)}
                    className="btn btn-sm btn-primary"
                    disabled={user.role === 'admin'}
                  >
                    Make Admin
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={handlePreviousPage}
          className="btn "
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          className="btn "
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AllUsers;
