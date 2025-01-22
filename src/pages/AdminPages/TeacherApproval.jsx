





// import React, { useEffect } from 'react';
// import useAxiosSecure from '../../hooks/useAxiosSecure';
// import { useQuery, useMutation } from '@tanstack/react-query';
// import app from '../../firebase/firebase.config';
// import { toast } from 'react-toastify';

// const TeacherApproval = () => {
//   const axiosSecure = useAxiosSecure();

//   // Fetching teacher data using TanStack Query
//   const { data: teachers = [], isLoading, error, refetch } = useQuery({
//     queryKey: ['teachers'],
//     queryFn: async () => {
//       const res = await axiosSecure.get('/teacher'); // Fetch data from backend

//       return res.data;
//     },
//   });
//   console.log(teachers)



// const updateTeacherStatus = useMutation({
//     mutationFn:async ({email,newStatus})=>{
//         const res = await axiosSecure.patch(`/teacher/update-status/${email}`,{status:newStatus});
//         return res.data;
//     },
//     onSuccess: () => {
//         // Refetch the teacher list after status update
//         refetch();
//       },
// })

// const handleApprove = (teacher)=>{
//     updateTeacherStatus.mutate({email:teacher.email,newStatus:'accepted'});


// axiosSecure.patch(`/updateRole/${teacher.email}`,{role:'teacher'})
// .then(()=>{
//     toast.success('User role updated to teacher successfully!');
//     refetch();
// })
// .catch((err)=>{
//     toast.error('Error updating user role!',err);
// })
    
// }


// const handleReject = (email) => {
//     updateTeacherStatus.mutate({ email, newStatus: 'rejected' });
//   };



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
//           {teachers.map((teacher) => (
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
//                 {/* Buttons to approve or reject */}
//                 {teacher.status === 'pending' && (
//                   <div className="flex gap-4">
//             <button
//             onClick={() => handleApprove(teacher)}
//             className="btn btn-approve"
//           >
//             Approve
//           </button>
//                     <button
//             onClick={() => handleReject(teacher.email)}
//             className="btn btn-reject"
//           >
//             Reject
//           </button>
//                   </div>
//                 )}

//                 {/* Disable buttons if status is rejected */}
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

//       {/* Optionally, you can manually trigger refetch */}
//       <button onClick={refetch} className="btn btn-primary mt-4">
//         Refetch Teacher Requests
//       </button>
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
  const itemsPerPage = 10; // Number of items per page

  // Fetching teacher data using TanStack Query
  const { data: teachers = [], isLoading, error, refetch } = useQuery({
    queryKey: ['teachers'],
    queryFn: async () => {
      const res = await axiosSecure.get('/teacher');
      return res.data;
    },
  });

  // Mutation to update teacher status
  const updateTeacherStatus = useMutation({
    mutationFn: async ({ email, newStatus }) => {
      const res = await axiosSecure.patch(`/teacher/update-status/${email}`, { status: newStatus });
      return res.data;
    },
    onSuccess: () => {
      refetch();
    },
  });

  const handleApprove = (teacher) => {
    updateTeacherStatus.mutate({ email: teacher.email, newStatus: 'accepted' });

    axiosSecure
      .patch(`/updateRole/${teacher.email}`, { role: 'teacher' })
      .then(() => {
        toast.success('User role updated to teacher successfully!');
        refetch();
      })
      .catch((err) => {
        toast.error('Error updating user role!', err);
      });
  };

  const handleReject = (email) => {
    updateTeacherStatus.mutate({ email, newStatus: 'rejected' });
  };

  // Pagination logic
  const totalPages = Math.ceil(teachers.length / itemsPerPage);
  const paginatedTeachers = teachers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Loading and Error handling
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading teacher requests.</div>;
  }

  return (
    <div className="container mx-auto p-4 overflow-x-scroll">
      <h2 className="text-2xl font-bold mb-4">Teacher Requests</h2>

      {/* Teacher Request Table */}
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="border border-gray-300 p-2">Name</th>
            <th className="border border-gray-300 p-2">Image</th>
            <th className="border border-gray-300 p-2">Experience</th>
            <th className="border border-gray-300 p-2">Title</th>
            <th className="border border-gray-300 p-2">Category</th>
            <th className="border border-gray-300 p-2">Status</th>
            <th className="border border-gray-300 p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginatedTeachers.map((teacher) => (
            <tr key={teacher.email}>
              <td className="border border-gray-300 p-2">{teacher.name}</td>
              <td className="border border-gray-300 p-2">
                <img
                  src={teacher.photoURL}
                  alt={teacher.name}
                  className="w-12 h-12 rounded-full"
                />
              </td>
              <td className="border border-gray-300 p-2">{teacher.experience}</td>
              <td className="border border-gray-300 p-2">{teacher.title}</td>
              <td className="border border-gray-300 p-2">{teacher.category}</td>
              <td className="border border-gray-300 p-2">{teacher.status}</td>
              <td className="border border-gray-300 p-2">
                {teacher.status === 'pending' && (
                  <div className="flex gap-4">
                    <button
                      onClick={() => handleApprove(teacher)}
                      className="btn btn-approve"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleReject(teacher.email)}
                      className="btn btn-reject"
                    >
                      Reject
                    </button>
                  </div>
                )}
                {teacher.status === 'rejected' && (
                  <button className="btn btn-gray" disabled>
                    Rejected
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="flex justify-center items-center mt-4 gap-4">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="btn btn-primary"
        >
          Previous
        </button>
        <p>
          Page {currentPage} of {totalPages}
        </p>
        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="btn btn-primary"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default TeacherApproval;

