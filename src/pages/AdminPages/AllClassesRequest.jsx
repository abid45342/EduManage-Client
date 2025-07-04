import { useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const AllClassesRequest = () => {
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const { data: allClasses = [], isLoading, error, refetch } = useQuery({
    queryKey: ['classes'],
    queryFn: async () => {
      const res = await axiosSecure.get('/classes');
      return res.data;
    },
  });

  const totalPages = Math.ceil(allClasses.length / itemsPerPage);
  const paginatedClasses = allClasses.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const updateClassStatus = useMutation({
    mutationFn: async ({ classId, newStatus }) => {
      const res = await axiosSecure.patch(`/class/update-status/${classId}`, {
        status: newStatus,
      });
      return res.data;
    },
    onSuccess: () => {
      refetch();
    },
  });

  const handleApprove = (classId) => {
    updateClassStatus.mutate({ classId, newStatus: 'accepted' });
    toast.success('Class approved successfully!');
  };

  const handleReject = (classId) => {
    updateClassStatus.mutate({ classId, newStatus: 'rejected' });
    toast.error('Class rejected.');
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  if (isLoading) return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600 text-lg">Loading class requests...</p>
      </div>
    </div>
  );
  
  if (error) return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="text-center">
        <div className="text-red-500 text-6xl mb-4">⚠️</div>
        <p className="text-red-600 text-lg">Error loading class requests.</p>
      </div>
    </div>
  );

  return (
    <div className="  min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-1">Class Requests</h1>
              <p className="text-gray-600">Manage and review class submissions from teachers</p>
            </div>
            <div className="bg-blue-100 rounded-full px-4 py-2">
              <span className="text-blue-800 font-semibold">
                Total: {allClasses.length} classes
              </span>
            </div>
          </div>
        </div>

        {/* Table Container */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
                  <th className="px-4 py-4 text-left font-semibold">Class Title</th>
                  <th className="px-3 py-4 text-left font-semibold">Image</th>
                  <th className="px-4 py-4 text-left font-semibold">Teacher</th>
                  <th className="px-4 py-4 text-left font-semibold">Description</th>
                  <th className="px-3 py-4 text-left font-semibold">Status</th>
                  <th className="px-3 py-4 text-left font-semibold">Actions</th>
                  <th className="px-3 py-4 text-left font-semibold">Progress</th>
                </tr>
              </thead>
              <tbody>
                {paginatedClasses.map((classItem, index) => (
                  <tr
                    key={classItem._id}
                    className={`border-b border-gray-100 hover:bg-blue-50 transition-all duration-200 ${
                      index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                    }`}
                  >
                    <td className="px-4 py-4">
                      <div className="font-semibold text-gray-800">{classItem.title}</div>
                    </td>
                    <td className="px-3 py-4">
                      <img
                        src={classItem.image}
                        alt={classItem.title}
                        className="w-14 h-14 object-cover rounded-lg shadow-md"
                      />
                    </td>
                    <td className="px-4 py-4">
                      <div className="text-gray-700 truncate max-w-36">{classItem.email}</div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="text-gray-600 max-w-52 truncate">
                        {classItem.description.length > 70 
                          ? `${classItem.description.substring(0, 70)}...` 
                          : classItem.description}
                      </div>
                    </td>
                    <td className="px-3 py-4">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                        classItem.status === 'accepted'
                          ? 'bg-green-100 text-green-800'
                          : classItem.status === 'rejected'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {classItem.status === 'accepted' && '✓ Accepted'}
                        {classItem.status === 'rejected' && '✗ Rejected'}
                        {classItem.status === 'pending' && '⏳ Pending'}
                      </span>
                    </td>
                    <td className="px-3 py-4">
                      {classItem.status === 'pending' ? (
                        <div className="flex flex-col gap-2">
                          <button
                            onClick={() => handleApprove(classItem._id)}
                            className="bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded text-sm font-medium transition-all duration-200 shadow-md hover:shadow-lg"
                          >
                            ✓ Approve
                          </button>
                          <button
                            onClick={() => handleReject(classItem._id)}
                            className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded text-sm font-medium transition-all duration-200 shadow-md hover:shadow-lg"
                          >
                            ✗ Reject
                          </button>
                        </div>
                      ) : (
                        <span className="text-gray-500 italic text-sm">
                          {classItem.status === 'accepted' ? 'Approved' : 'Rejected'}
                        </span>
                      )}
                    </td>
                    <td className="px-3 py-4">
                      <button
                        className={`px-3 py-2 rounded text-sm font-medium transition-all duration-200 ${
                          classItem.status === 'accepted'
                            ? 'bg-blue-500 hover:bg-blue-600 text-white shadow-md hover:shadow-lg'
                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        }`}
                        onClick={() =>
                          navigate(`/dashboard/my-class/${classItem._id}`, {
                            state: classItem,
                          })
                        }
                        disabled={classItem.status !== 'accepted'}
                      >
                        📊 View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Empty State */}
          {paginatedClasses.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 text-6xl mb-4">📚</div>
              <p className="text-gray-600 text-lg">No class requests found</p>
            </div>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="bg-white rounded-2xl shadow-lg p-4 mt-4">
            <div className="flex justify-between items-center">
              <button
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
                className={`px-4 py-2 rounded-lg font-semibold transition-all duration-200 ${
                  currentPage === 1
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    : 'bg-blue-500 hover:bg-blue-600 text-white shadow-md hover:shadow-lg'
                }`}
              >
                ← Previous
              </button>

              <div className="flex items-center gap-3">
                <span className="text-gray-700 font-medium">
                  Page {currentPage} of {totalPages}
                </span>
                <div className="flex gap-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`w-9 h-9 rounded-lg font-medium transition-all duration-200 ${
                        currentPage === page
                          ? 'bg-blue-500 text-white shadow-md'
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className={`px-4 py-2 rounded-lg font-semibold transition-all duration-200 ${
                  currentPage === totalPages
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    : 'bg-blue-500 hover:bg-blue-600 text-white shadow-md hover:shadow-lg'
                }`}
              >
                Next →
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllClassesRequest;
