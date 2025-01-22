









import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from '../hooks/useAxiosPublic';
import { useNavigate } from 'react-router-dom';
import ReactPaginate from 'react-paginate';

const AllClasses = () => {
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic(); // Public axios instance
  const [currentPage, setCurrentPage] = useState(0); // React-paginate uses 0-based index
  const itemsPerPage = 10; // Number of items per page

  const { data: allClasses = [], isLoading, isError } = useQuery({
    queryKey: ['classes'],
    queryFn: async () => {
      const res = await axiosPublic.get('/AllClass');
      console.log(res.data);
      return res.data.filter((cls) => cls.status === 'accepted'); // Only return accepted classes
    },
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading classes.</p>;

  // Calculate the data for the current page
  const offset = currentPage * itemsPerPage;
  const currentClasses = allClasses.slice(offset, offset + itemsPerPage);
  const pageCount = Math.ceil(allClasses.length / itemsPerPage);

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected); // Update the current page
  };

  const handleEnroll = (cls) => {
    navigate(`/class/${cls._id}`, { state: { classDetails: cls } });
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">All Classes</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {currentClasses.map((cls) => (
          <div key={cls._id} className="border rounded-lg shadow-lg p-4 bg-white">
            <img
              src={cls.image}
              alt={cls.title}
              className="w-full h-48 object-cover rounded mb-4"
            />
            <h2 className="text-xl font-semibold mb-2">{cls.title}</h2>
            <p className="text-sm text-gray-500 mb-2">Description: {cls.description}</p>
            <p className="font-semibold text-lg text-gray-800 mb-2">Price: ${cls.price}</p>
            <button
              onClick={() => handleEnroll(cls)}
              className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Enroll
            </button>
          </div>
        ))}
      </div>

      {/* React-Paginate Component */}
      <div className="mt-6 flex justify-center">
        <ReactPaginate
          pageCount={pageCount} // Total number of pages
          onPageChange={handlePageChange} // Handle page change
          previousLabel="Previous"
          nextLabel="Next"
          breakLabel="..."
          marginPagesDisplayed={2}
          pageRangeDisplayed={3}
          containerClassName="flex items-center space-x-2"
          pageClassName="px-4 py-2 border rounded"
          activeClassName="bg-blue-500 text-white"
          previousClassName="px-4 py-2 border rounded"
          nextClassName="px-4 py-2 border rounded"
          breakClassName="px-4 py-2"
          disabledClassName="opacity-50 cursor-not-allowed"
        />
      </div>
    </div>
  );
};

export default AllClasses;
