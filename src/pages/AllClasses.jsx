import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from '../hooks/useAxiosPublic';
import { useNavigate } from 'react-router-dom';
import ReactPaginate from 'react-paginate';

const AllClasses = () => {
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();
  const [currentPage, setCurrentPage] = useState(0);
  const [sortOrder, setSortOrder] = useState('');
  const itemsPerPage = 10;

  const { data: allClasses = [], isLoading, isError } = useQuery({
    queryKey: ['classes'],
    queryFn: async () => {
      const res = await axiosPublic.get('/AllClass');
      console.log(res.data);
      return res.data.filter((cls) => cls.status === 'accepted');
    },
  });

  if (isLoading) return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
        <p className="text-indigo-600 text-lg font-medium">Loading classes...</p>
      </div>
    </div>
  );
  
  if (isError) return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-50 flex items-center justify-center">
      <div className="text-center">
        <p className="text-red-600 text-lg font-medium">Error loading classes.</p>
      </div>
    </div>
  );

  const sortedClasses = [...allClasses].sort((a, b) => {
    if (sortOrder === 'asc') return a.price - b.price;
    else if (sortOrder === 'desc') return b.price - a.price;
    return 0;
  });

  const offset = currentPage * itemsPerPage;
  const currentClasses = sortedClasses.slice(offset, offset + itemsPerPage);
  const pageCount = Math.ceil(sortedClasses.length / itemsPerPage);

  const handlePageChange = ({ selected }) => setCurrentPage(selected);

  const handleEnroll = (cls) => {
    navigate(`/class/${cls._id}`, { state: { classDetails: cls } });
  };

  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
    setCurrentPage(0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Discover Amazing Classes</h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Explore our curated collection of high-quality educational content designed to help you grow and succeed.
          </p>
        </div>

        {/* Controls Section */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 bg-white rounded-xl shadow-sm p-6">
          <div className="mb-4 sm:mb-0">
            <span className="text-gray-700 font-medium">Total Classes: </span>
            <span className="text-indigo-600 font-bold text-lg">{sortedClasses.length}</span>
          </div>
          <div className="flex items-center space-x-4">
            <label className="text-gray-700 font-medium">Sort by:</label>
            <select
              value={sortOrder}
              onChange={handleSortChange}
              className="px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
            >
              <option value="">Default</option>
              <option value="asc">Price: Low to High</option>
              <option value="desc">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Classes Grid */}
        <div className=" mx-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  gap-16 mb-12">
          {currentClasses.map((cls) => (
            <div
              key={cls._id}
              className="   bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden group flex flex-col h-full"
            >
              {/* Image Container */}
              <div className="relative overflow-hidden">
                <img
                  src={cls.image}
                  alt={cls.title}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
              
              {/* Content */}
              <div className="p-6 flex flex-col flex-grow">
                <h2 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2 group-hover:text-indigo-600 transition-colors duration-200">
                  {cls.title}
                </h2>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3 leading-relaxed flex-grow">
                  {cls.description}
                </p>
                
                {/* Price */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl font-bold text-indigo-600">${cls.price}</span>
                  <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                    Premium Class
                  </span>
                </div>
                
                {/* Enroll Button */}
                <button
                  onClick={() => handleEnroll(cls)}
                  className="w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl hover:from-indigo-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl mt-auto"
                >
                  Enroll Now
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        {pageCount > 1 && (
          <div className="flex justify-center">
            <div className="bg-white rounded-xl shadow-sm p-4">
              <ReactPaginate
                pageCount={pageCount}
                onPageChange={handlePageChange}
                previousLabel="← Previous"
                nextLabel="Next →"
                breakLabel="..."
                marginPagesDisplayed={2}
                pageRangeDisplayed={3}
                containerClassName="flex items-center space-x-1"
                pageClassName="px-4 py-2 border border-gray-300 rounded-lg hover:bg-indigo-50 hover:border-indigo-300 transition-all duration-200"
                activeClassName="bg-indigo-600 text-white border-indigo-600"
                previousClassName="px-4 py-2 border border-gray-300 rounded-lg hover:bg-indigo-50 hover:border-indigo-300 transition-all duration-200"
                nextClassName="px-4 py-2 border border-gray-300 rounded-lg hover:bg-indigo-50 hover:border-indigo-300 transition-all duration-200"
                breakClassName="px-4 py-2"
                disabledClassName="opacity-50 cursor-not-allowed"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllClasses;