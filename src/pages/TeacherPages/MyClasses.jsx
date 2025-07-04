import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import ReactPaginate from 'react-paginate';

const MyClasses = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [updateClass, setUpdateClass] = useState(null);
  const [formData, setFormData] = useState({});
  const [currentPage, setCurrentPage] = useState(0);

  // Fetch classes
  const { data: classes = [], isLoading } = useQuery({
    queryKey: ['myClasses'],
    queryFn: async () => {
      const res = await axiosSecure.get(`/myClasses/${user.email}`);
      return res.data;
    },
  });

  // Delete Mutation
  const deleteMutation = useMutation({
    mutationFn: async (id) => axiosSecure.delete(`/classes/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries(['myClasses']);
    },
  });

  // Update Mutation
  const updateMutation = useMutation({
    mutationFn: async (updatedClass) => axiosSecure.patch(`/classes/${updatedClass._id}`, updatedClass),
    onSuccess: () => {
      queryClient.invalidateQueries(['myClasses']);
      Swal.fire('Updated!', 'Class has been updated.', 'success');
      setUpdateClass(null);
    },
  });

  const handleDelete = (cls) => {
    Swal.fire({
      title: `Are you sure you want to delete the class: ${cls.title}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Delete',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        deleteMutation.mutate(cls._id);
      }
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    updateMutation.mutate({ ...updateClass, ...formData });
  };

  // Pagination logic
  const itemsPerPage = 9;
  const pageCount = Math.ceil(classes.length / itemsPerPage);
  const offset = currentPage * itemsPerPage;
  const currentClasses = classes.slice(offset, offset + itemsPerPage);

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">My Classes</h1>
          <p className="text-gray-600 text-lg">Manage and update your teaching classes</p>
          <div className="mt-4 flex justify-center items-center space-x-4">
            <div className="bg-white px-4 py-2 rounded-lg shadow-sm">
              <span className="text-sm text-gray-500">Total Classes:</span>
              <span className="ml-2 font-semibold text-blue-600">{classes.length}</span>
            </div>
            <div className="bg-white px-4 py-2 rounded-lg shadow-sm">
              <span className="text-sm text-gray-500">Accepted:</span>
              <span className="ml-2 font-semibold text-green-600">
                {classes.filter(cls => cls.status === 'accepted').length}
              </span>
            </div>
          </div>
        </div>

        {/* Classes Grid */}
        {currentClasses.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📚</div>
            <h3 className="text-2xl font-semibold text-gray-700 mb-2">No Classes Found</h3>
            <p className="text-gray-500">You haven't created any classes yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {currentClasses.map((cls) => (
              <div key={cls._id} className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden">
                {/* Image Section */}
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={cls.image} 
                    alt={cls.title} 
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                  />
                  <div className="absolute top-4 right-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      cls.status === 'accepted' 
                        ? 'bg-green-100 text-green-800' 
                        : cls.status === 'pending'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {cls.status}
                    </span>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2">{cls.title}</h3>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                      </svg>
                      {cls.name}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                      </svg>
                      {cls.email}
                    </div>
                    <div className="flex items-center text-sm">
                      <svg className="w-4 h-4 mr-2 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                      </svg>
                      <span className="font-semibold text-green-600">${cls.price}</span>
                    </div>
                  </div>

                  <p className="text-gray-600 text-sm mb-6 line-clamp-3">{cls.description}</p>

                  {/* Action Buttons */}
                  <div className="flex flex-col space-y-2">
                    <button
                      className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-2 px-4 rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-200 transform hover:scale-105"
                      onClick={() => {
                        setUpdateClass(cls);
                        setFormData({
                          title: cls.title,
                          price: cls.price,
                          description: cls.description,
                          image: cls.image,
                        });
                      }}
                    >
                      ✏️ Update Class
                    </button>
                    
                    <div className="flex space-x-2">
                      <button
                        className="flex-1 bg-red-500 text-white py-2 px-4 rounded-lg font-semibold hover:bg-red-600 transition-all duration-200"
                        onClick={() => handleDelete(cls)}
                      >
                        🗑️ Delete
                      </button>
                      <button
                        className={`flex-1 py-2 px-4 rounded-lg font-semibold transition-all duration-200 ${
                          cls.status === 'accepted'
                            ? 'bg-green-500 text-white hover:bg-green-600'
                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        }`}
                        disabled={cls.status !== 'accepted'}
                        onClick={() => navigate(`/dashboard/my-class/${cls._id}`, { state: cls })}
                      >
                        👁️ Details
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {pageCount > 1 && (
          <div className="flex justify-center">
            <ReactPaginate
              pageCount={pageCount}
              onPageChange={handlePageChange}
              previousLabel="← Previous"
              nextLabel="Next →"
              breakLabel="..."
              marginPagesDisplayed={2}
              pageRangeDisplayed={3}
              containerClassName="flex items-center space-x-1 bg-white rounded-lg shadow-lg p-2"
              pageClassName="px-3 py-2 text-gray-700 hover:bg-blue-50 rounded-md transition-colors"
              activeClassName="bg-blue-600 text-white hover:bg-blue-700"
              previousClassName="px-3 py-2 text-gray-700 hover:bg-blue-50 rounded-md transition-colors"
              nextClassName="px-3 py-2 text-gray-700 hover:bg-blue-50 rounded-md transition-colors"
              breakClassName="px-3 py-2 text-gray-500"
              disabledClassName="opacity-50 cursor-not-allowed"
            />
          </div>
        )}

        {/* Update Modal */}
        {updateClass && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-gray-800">Update Class</h3>
                  <button
                    onClick={() => setUpdateClass(null)}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <form onSubmit={handleUpdate} className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Class Title</label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title || ''}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Price ($)</label>
                    <input
                      type="number"
                      name="price"
                      value={formData.price || ''}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                    <textarea
                      name="description"
                      value={formData.description || ''}
                      onChange={handleInputChange}
                      rows="4"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                      required
                    ></textarea>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Image URL</label>
                    <input
                      type="url"
                      name="image"
                      value={formData.image || ''}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="https://example.com/image.jpg"
                    />
                  </div>

                  <div className="flex space-x-3 pt-4">
                    <button
                      type="button"
                      onClick={() => setUpdateClass(null)}
                      className="flex-1 px-4 py-3 text-gray-700 bg-gray-100 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-200"
                    >
                      Save Changes
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyClasses;











