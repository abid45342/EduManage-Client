







// import React, { useState } from 'react';
// import useAxiosSecure from '../../hooks/useAxiosSecure';
// import { useQuery, useMutation } from '@tanstack/react-query';
// import { toast } from 'react-toastify';

// const TeacherApproval = () => {
//   const axiosSecure = useAxiosSecure();
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 10; // Number of items per page

//   // Fetching teacher data using TanStack Query
//   const { data: teachers = [], isLoading, error, refetch } = useQuery({
//     queryKey: ['teachers'],
//     queryFn: async () => {
//       const res = await axiosSecure.get('/teacher');
//       return res.data;
//     },
//   });

//   // Mutation to update teacher status
//   const updateTeacherStatus = useMutation({
//     mutationFn: async ({ email, newStatus }) => {
//       const res = await axiosSecure.patch(`/teacher/update-status/${email}`, { status: newStatus });
//       return res.data;
//     },
//     onSuccess: () => {
//       refetch();
//     },
//   });

//   const handleApprove = (teacher) => {
//     updateTeacherStatus.mutate({ email: teacher.email, newStatus: 'accepted' });

//     axiosSecure
//       .patch(`/updateRole/${teacher.email}`, { role: 'teacher' })
//       .then(() => {
//         toast.success('User role updated to teacher successfully!');
//         refetch();
//       })
//       .catch((err) => {
//         toast.error('Error updating user role!', err);
//       });
//   };

//   const handleReject = (email) => {
//     updateTeacherStatus.mutate({ email, newStatus: 'rejected' });
//   };

//   // Pagination logic
//   const totalPages = Math.ceil(teachers.length / itemsPerPage);
//   const paginatedTeachers = teachers.slice(
//     (currentPage - 1) * itemsPerPage,
//     currentPage * itemsPerPage
//   );

//   // Loading and Error handling
//   if (isLoading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>Error loading teacher requests.</div>;
//   }

//   return (
//     <div className="container mx-auto p-4 overflow-x-scroll">
//       <h2 className="text-2xl font-bold mb-4">Teacher Requests</h2>

//       {/* Teacher Request Table */}
//       <table className="table-auto w-full border-collapse border border-gray-300">
//         <thead className="bg-gray-100">
//           <tr>
//             <th className="border border-gray-300 p-2">Name</th>
//             <th className="border border-gray-300 p-2">Image</th>
//             <th className="border border-gray-300 p-2">Experience</th>
//             <th className="border border-gray-300 p-2">Title</th>
//             <th className="border border-gray-300 p-2">Category</th>
//             <th className="border border-gray-300 p-2">Status</th>
//             <th className="border border-gray-300 p-2">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {paginatedTeachers.map((teacher) => (
//             <tr key={teacher.email}>
//               <td className="border border-gray-300 p-2">{teacher.name}</td>
//               <td className="border border-gray-300 p-2">
//                 <img
//                   src={teacher.photoURL}
//                   alt={teacher.name}
//                   className="w-12 h-12 rounded-full"
//                 />
//               </td>
//               <td className="border border-gray-300 p-2">{teacher.experience}</td>
//               <td className="border border-gray-300 p-2">{teacher.title}</td>
//               <td className="border border-gray-300 p-2">{teacher.category}</td>
//               <td className="border border-gray-300 p-2">{teacher.status}</td>
//               <td className="border border-gray-300 p-2">
//                 {teacher.status === 'pending' && (
//                   <div className="flex gap-4">
//                     <button
//                       onClick={() => handleApprove(teacher)}
//                       className="btn btn-approve"
//                     >
//                       Approve
//                     </button>
//                     <button
//                       onClick={() => handleReject(teacher.email)}
//                       className="btn btn-reject"
//                     >
//                       Reject
//                     </button>
//                   </div>
//                 )}
//                 {teacher.status === 'rejected' && (
//                   <button className="btn btn-gray" disabled>
//                     Rejected
//                   </button>
//                 )}
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       {/* Pagination Controls */}
//       <div className="flex justify-center items-center mt-4 gap-4">
//         <button
//           onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
//           disabled={currentPage === 1}
//           className="btn btn-primary"
//         >
//           Previous
//         </button>
//         <p>
//           Page {currentPage} of {totalPages}
//         </p>
//         <button
//           onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
//           disabled={currentPage === totalPages}
//           className="btn btn-primary"
//         >
//           Next
//         </button>
//       </div>
//     </div>
//   );
// };

// export default TeacherApproval;



















import React, { useState } from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useQuery, useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';

const TeacherApproval = () => {
  const axiosSecure = useAxiosSecure();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const { data: teachers = [], isLoading, error, refetch } = useQuery({
    queryKey: ['teachers'],
    queryFn: async () => {
      const res = await axiosSecure.get('/teacher');
      return res.data;
    },
  });

  const updateTeacherStatus = useMutation({
    mutationFn: async ({ email, newStatus }) => {
      const res = await axiosSecure.patch(`/teacher/update-status/${email}`, { status: newStatus });
      return res.data;
    },
    onSuccess: () => refetch(),
  });

  const handleApprove = (teacher) => {
    updateTeacherStatus.mutate({ email: teacher.email, newStatus: 'accepted' });
    axiosSecure.patch(`/updateRole/${teacher.email}`, { role: 'teacher' })
      .then(() => toast.success('User promoted to teacher!'))
      .catch(() => toast.error('Error updating role'));
  };

  const handleReject = (email) => {
    updateTeacherStatus.mutate({ email, newStatus: 'rejected' });
  };

  const totalPages = Math.ceil(teachers.length / itemsPerPage);
  const paginatedTeachers = teachers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  if (isLoading) return <div className="text-center py-10">Loading...</div>;
  if (error) return <div className="text-center py-10 text-red-500">Failed to load.</div>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-center">Teacher Requests</h2>

      <div className="overflow-x-auto">
        <table className="w-full border border-gray-200 rounded-lg overflow-hidden">
          <thead className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white">
            <tr>
              {['Name', 'Image', 'Experience', 'Title', 'Category', 'Status', 'Actions'].map((head) => (
                <th key={head} className="p-3">{head}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedTeachers.map((teacher) => (
              <tr key={teacher.email} className="border-b hover:bg-gray-50">
                <td className="p-3">{teacher.name}</td>
                <td className="p-3">
                  <img src={teacher.photoURL} alt={teacher.name} className="w-10 h-10 rounded-full" />
                </td>
                <td className="p-3">{teacher.experience}</td>
                <td className="p-3">{teacher.title}</td>
                <td className="p-3">{teacher.category}</td>
                <td className="p-3 capitalize">
                  <span className={`px-2 py-1 rounded-full text-sm 
                    ${teacher.status === 'pending' ? 'bg-yellow-100 text-yellow-600' :
                      teacher.status === 'accepted' ? 'bg-green-100 text-green-600' :
                      'bg-red-100 text-red-600'}`}>
                    {teacher.status}
                  </span>
                </td>
                <td className="p-3">
                  {teacher.status === 'pending' ? (
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleApprove(teacher)}
                        className="px-3 py-1 rounded-md bg-green-500 text-white hover:bg-green-600"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleReject(teacher.email)}
                        className="px-3 py-1 rounded-md bg-red-500 text-white hover:bg-red-600"
                      >
                        Reject
                      </button>
                    </div>
                  ) : (
                    <span className="text-gray-500">No Actions</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-4 mt-6">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 rounded-md bg-indigo-500 text-white disabled:opacity-50"
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="px-4 py-2 rounded-md bg-indigo-500 text-white disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default TeacherApproval;

