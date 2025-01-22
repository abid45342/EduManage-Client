// import React from 'react';
// import { useQuery, useMutation } from '@tanstack/react-query';
// import useAxiosSecure from '../../hooks/useAxiosSecure';
// import { toast } from 'react-toastify';
// import { useNavigate } from 'react-router-dom';

// const AllClassesRequest = () => {
//   const navigate = useNavigate();
//   const axiosSecure = useAxiosSecure();

//   // Fetching classes data
//   const { data: classes = [], isLoading, error, refetch } = useQuery({
//     queryKey: ['classes'],
//     queryFn: async () => {
//       const res = await axiosSecure.get('/classes'); // Fetch data from backend
//       return res.data;
//     },
//   });
//   console.log(classes)

//   // Mutation to update class status
//   const updateClassStatus = useMutation({
//     mutationFn: async ({ classId, newStatus }) => {
//       const res = await axiosSecure.patch(`/class/update-status/${classId}`, {
//         status: newStatus,
//       });
//       return res.data;
//     },
//     onSuccess: () => {
//       // Refetch the classes list after status update
//       refetch();
//     },
//   });

//   // Handle approve and reject actions
//   const handleApprove = (classId) => {
//     updateClassStatus.mutate({ classId, newStatus: 'accepted' });
//     toast.success('Class approved successfully!');
//   };

//   const handleReject = (classId) => {
//     updateClassStatus.mutate({ classId, newStatus: 'rejected' });
//     toast.error('Class rejected.');
//   };

//   // Loading and Error handling
//   if (isLoading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>Error loading class requests.</div>;
//   }

//   return (
//     <div className="container mx-auto p-4 overflow-x-scroll">
//       <h2 className="text-2xl font-bold mb-4">Class Requests</h2>

//       {/* Classes Request Table */}
//       <table className="table-auto w-full border-collapse border border-gray-300">
//         <thead className="bg-gray-100">
//           <tr>
//             <th className="border border-gray-300 p-2">Title</th>
//             <th className="border border-gray-300 p-2">Image</th>
//             <th className="border border-gray-300 p-2">Posted By</th>
//             <th className="border border-gray-300 p-2">Description</th>
//             <th className="border border-gray-300 p-2">Status</th>
//             <th className="border border-gray-300 p-2">Actions</th>
//             <th className="border border-gray-300 p-2">Progress</th>
//           </tr>
//         </thead>
//         <tbody>
//           {classes.map((classItem) => (
//             <tr key={classItem._id}>
//               <td className="border border-gray-300 p-2">{classItem.title}</td>
//               <td className="border border-gray-300 p-2">
//                 <img
//                   src={classItem.image}
//                   alt={classItem.title}
//                   className="w-12 h-12 rounded"
//                 />
//               </td>
//               <td className="border border-gray-300 p-2">{classItem.email}</td>
//               <td className="border border-gray-300 p-2">
//                 {classItem.description}
//               </td>
//               <td className="border border-gray-300 p-2">{classItem.status}</td>
//               <td className="border border-gray-300 p-2">
//                 {classItem.status === 'pending' && (
//                   <div className="flex gap-4">
//                     <button
//                       onClick={() => handleApprove(classItem._id)}
//                       className="btn-approve"
//                     >
//                       Approve
//                     </button>
//                     <button
//                       onClick={() => handleReject(classItem._id)}
//                       className="btn-reject"
//                     >
//                       Reject
//                     </button>
//                   </div>
//                 )}
//                 {classItem.status !== 'pending' && (
//                   <span className="text-gray-500">
//                     {classItem.status === 'accepted'
//                       ? 'Approved'
//                       : 'Rejected'}
//                   </span>
//                 )}
//               </td>
//               <td className="border border-gray-300 p-2">
//                 <button
//                   className={`btn-progress ${
//                     classItem.status === 'accepted'
//                       ? ''
//                       : 'btn-disabled'
//                   }`}
//                   onClick={() =>
//                     // classItem.status === 'accepted' &&
//                     // console.log('View Progress')
//                     navigate(`/dashboard/my-class/${classItem._id}`,{ state:classItem})
//                   }
//                   disabled={classItem.status !== 'accepted'}
//                 >
                  
//                   View Progress
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       <button onClick={refetch} className="btn btn-primary mt-4">
//         Refetch Classes
//       </button>
//     </div>
//   );
// };

// export default AllClassesRequest;









import React, { useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const AllClassesRequest = () => {
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Number of items per page

  // Fetching classes data
  const { data: allClasses = [], isLoading, error, refetch } = useQuery({
    queryKey: ['classes'],
    queryFn: async () => {
      const res = await axiosSecure.get('/classes'); // Fetch data from backend
      return res.data;
    },
  });

  // Calculate paginated classes
  const totalPages = Math.ceil(allClasses.length / itemsPerPage);
  const paginatedClasses = allClasses.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Mutation to update class status
  const updateClassStatus = useMutation({
    mutationFn: async ({ classId, newStatus }) => {
      const res = await axiosSecure.patch(`/class/update-status/${classId}`, {
        status: newStatus,
      });
      return res.data;
    },
    onSuccess: () => {
      refetch(); // Refetch the classes list after status update
    },
  });

  // Handle approve and reject actions
  const handleApprove = (classId) => {
    updateClassStatus.mutate({ classId, newStatus: 'accepted' });
    toast.success('Class approved successfully!');
  };

  const handleReject = (classId) => {
    updateClassStatus.mutate({ classId, newStatus: 'rejected' });
    toast.error('Class rejected.');
  };

  // Pagination controls
  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  // Loading and Error handling
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading class requests.</div>;
  }

  return (
    <div className="container mx-auto p-4 overflow-x-scroll">
      <h2 className="text-2xl font-bold mb-4">Class Requests</h2>

      {/* Classes Request Table */}
      <table className="table-auto w-full   ">
        <thead className="bg-gray-100">
          <tr>
            <th className=" p-2">Title</th>
            <th className=" p-2">Image</th>
            <th className=" p-2">Posted By</th>
            <th className=" p-2">Description</th>
            <th className=" p-2">Status</th>
            <th className=" p-2">Actions</th>
            <th className=" p-2">Progress</th>
          </tr>
        </thead>
        <tbody>
          {paginatedClasses.map((classItem) => (
            <tr key={classItem._id}>
              <td className="  p-2">{classItem.title}</td>
              <td className="  p-2">
                <img
                  src={classItem.image}
                  alt={classItem.title}
                  className="w-12 h-12 rounded"
                />
              </td>
              <td className="  p-2">{classItem.email}</td>
              <td className="  p-2">
                {classItem.description}
              </td>
              <td className="  p-2">{classItem.status}</td>
              <td className="  p-2">
                {classItem.status === 'pending' && (
                  <div className="flex gap-4">
                    <button
                      onClick={() => handleApprove(classItem._id)}
                      className="btn-approve"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleReject(classItem._id)}
                      className="btn-reject"
                    >
                      Reject
                    </button>
                  </div>
                )}
                {classItem.status !== 'pending' && (
                  <span className="text-gray-500">
                    {classItem.status === 'accepted'
                      ? 'Approved'
                      : 'Rejected'}
                  </span>
                )}
              </td>
              <td className="  p-2">
                <button
                  className={`btn-progress ${
                    classItem.status === 'accepted'
                      ? ''
                      : 'btn-disabled'
                  }`}
                  onClick={() =>
                    navigate(`/dashboard/my-class/${classItem._id}`, {
                      state: classItem,
                    })
                  }
                  disabled={classItem.status !== 'accepted'}
                >
                  View Progress
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

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

export default AllClassesRequest;








