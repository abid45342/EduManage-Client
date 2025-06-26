











import React, { useState } from 'react';
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

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading classes.</p>;

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
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">All Classes</h1>
        <div>
          <select
            value={sortOrder}
            onChange={handleSortChange}
            className="px-4 py-2 border rounded-md bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Sort by Price (Default)</option>
            <option value="asc">Price: Low to High</option>
            <option value="desc">Price: High to Low</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {currentClasses.map((cls) => (
          <div
            key={cls._id}
            className="border rounded-lg shadow-lg p-4 bg-white flex flex-col h-full"
          >
            <img
              src={cls.image}
              alt={cls.title}
              className="w-full h-48 object-cover rounded mb-4"
            />
            <h2 className="text-xl font-semibold mb-2">{cls.title}</h2>
            <p className="text-sm text-gray-500 mb-2 flex-grow">
              Description: {cls.description}
            </p>
            <p className="font-semibold text-lg text-gray-800 mb-2">Price: ${cls.price}</p>
            <button
              onClick={() => handleEnroll(cls)}
              className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 mt-auto"
            >
              Enroll
            </button>
          </div>
        ))}
      </div>

      <div className="mt-6 flex justify-center">
        <ReactPaginate
          pageCount={pageCount}
          onPageChange={handlePageChange}
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