








// import React, { useState } from 'react';
// import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
// import Swal from 'sweetalert2';
// import { useNavigate } from 'react-router-dom';
// import useAuth from '../../hooks/useAuth';
// import useAxiosSecure from '../../hooks/useAxiosSecure';

// const MyClasses = () => {
//   const axiosSecure = useAxiosSecure();
//   const { user } = useAuth();
//   const navigate = useNavigate();
//   const queryClient = useQueryClient();
//   const [updateClass, setUpdateClass] = useState(null); // For storing the class to update
//   const [formData, setFormData] = useState({});

//   // Fetch classes
//   const { data: classes = [], isLoading } = useQuery({
//     queryKey: ['myClasses'],
//     queryFn: async () => {
//       const res = await axiosSecure.get(`/myClasses/${user.email}`);
//       return res.data;
//     },
//   });

//   // Delete Mutation
//   const deleteMutation = useMutation({
//     mutationFn: async (id) => axiosSecure.delete(`/classes/${id}`),
//     onSuccess: () => {
//       queryClient.invalidateQueries(['myClasses']);
//     },
//   });

//   // Update Mutation
//   const updateMutation = useMutation({
//     mutationFn: async (updatedClass) => axiosSecure.patch(`/classes/${updatedClass._id}`, updatedClass),
//     onSuccess: () => {
//       queryClient.invalidateQueries(['myClasses']);
//       Swal.fire('Updated!', 'Class has been updated.', 'success');
//       setUpdateClass(null); // Close modal after update
//     },
//   });

//   const handleDelete = (cls) => {
//     Swal.fire({
//       title: `Are you sure you want to delete the class: ${cls.title}?`,
//       icon: 'warning',
//       showCancelButton: true,
//       confirmButtonText: 'Yes, Delete',
//       cancelButtonText: 'Cancel',
//     }).then((result) => {
//       if (result.isConfirmed) {
//         deleteMutation.mutate(cls._id);
//       }
//     });
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleUpdate = (e) => {
//     e.preventDefault();
//     updateMutation.mutate({ ...updateClass, ...formData });
//   };

//   if (isLoading) return <p>Loading...</p>;

//   return (
//     <div className="p-4">
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//         {classes.map((cls) => (
//           <div key={cls._id} className="p-4 border rounded shadow">
//             <img src={cls.image} alt={cls.title} className="w-full h-48 object-cover rounded" />
//             <h3 className="text-xl font-bold mt-2">{cls.title}</h3>
//             <p>Teacher: {cls.name}</p>
//             <p>Email: {cls.email}</p>
//             <p>Price: ${cls.price}</p>
//             <p>Status: {cls.status}</p>
//             <p>{cls.description}</p>
//             <div className="mt-4 space-x-2">
//               <button
//                 className="px-4 py-2 bg-blue-500 text-white rounded"
//                 onClick={() => {
//                   setUpdateClass(cls);
//                   setFormData({
//                     title: cls.title,
//                     price: cls.price,
//                     description: cls.description,
//                     image: cls.image, // Add image to formData
//                   });
//                 }}
//               >
//                 Update
//               </button>
//               <button
//                 className="px-4 py-2 bg-red-500 text-white rounded"
//                 onClick={() => handleDelete(cls)}
//               >
//                 Delete
//               </button>
//               <button
//                 className={`px-4 py-2 bg-green-500 text-white rounded ${cls.status !== 'accepted' ? 'opacity-50 cursor-not-allowed' : ''}`}
//                 disabled={cls.status !== 'accepted'}
//                 onClick={() => navigate(`/dashboard/my-class/${cls._id}`, { state:cls})}
//               >
//                 See Details
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* DaisyUI Modal */}
//       {updateClass && (
//         <div className="modal modal-open">
//           <div className="modal-box">
//             <h3 className="font-bold text-lg">Update Class: {updateClass.title}</h3>
//             <form onSubmit={handleUpdate} className="space-y-4">
//               <div>
//                 <label className="block text-sm font-medium">Title</label>
//                 <input
//                   type="text"
//                   name="title"
//                   value={formData.title || ''}
//                   onChange={handleInputChange}
//                   className="input input-bordered w-full"
//                   required
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium">Price</label>
//                 <input
//                   type="number"
//                   name="price"
//                   value={formData.price || ''}
//                   onChange={handleInputChange}
//                   className="input input-bordered w-full"
//                   required
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium">Description</label>
//                 <textarea
//                   name="description"
//                   value={formData.description || ''}
//                   onChange={handleInputChange}
//                   className="textarea textarea-bordered w-full"
//                   required
//                 ></textarea>
//               </div>
//               {/* Image Field */}
//               <div>
//                 <label className="block text-sm font-medium">Image URL</label>
//                 <input
//                   type="text"
//                   name="image"
//                   value={formData.image || ''}
//                   onChange={handleInputChange}
//                   className="input input-bordered w-full"
//                 />
//               </div>
//               <div className="modal-action">
//                 <button type="button" className="btn btn-ghost" onClick={() => setUpdateClass(null)}>
//                   Cancel
//                 </button>
//                 <button type="submit" className="btn btn-primary">
//                   Save Changes
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default MyClasses;

import React, { useState } from 'react';
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
  const [updateClass, setUpdateClass] = useState(null); // For storing the class to update
  const [formData, setFormData] = useState({});
  const [currentPage, setCurrentPage] = useState(0); // Current page for pagination

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
      setUpdateClass(null); // Close modal after update
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
  const itemsPerPage = 3; // Number of classes per page
  const pageCount = Math.ceil(classes.length / itemsPerPage);

  // Calculate classes for the current page
  const offset = currentPage * itemsPerPage;
  const currentClasses = classes.slice(offset, offset + itemsPerPage);

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="p-4 ">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ">
        {currentClasses.map((cls) => (
          <div key={cls._id} className="p-4 border  shadow-xl rounded-xl">
            <img src={cls.image} alt={cls.title} className="w-full h-48 object-cover rounded" />
            <h3 className="text-xl font-bold mt-2">{cls.title}</h3>
            <p>Teacher: {cls.name}</p>
            <p>Email: {cls.email}</p>
            <p>Price: ${cls.price}</p>
            <p>Status: {cls.status}</p>
            <p>{cls.description}</p>
            <div className="mt-4 space-x-2 flex">
              <button
                className="btn  bg-gray-800 text-white rounded"
                onClick={() => {
                  setUpdateClass(cls);
                  setFormData({
                    title: cls.title,
                    price: cls.price,
                    description: cls.description,
                    image: cls.image, // Add image to formData
                  });
                }}
              >
                Update
              </button>
              <button
                className="btn bg-gray-800 text-white rounded"
                onClick={() => handleDelete(cls)}
              >
                Delete
              </button>
              <button
                className={`btn bg-gray-800 text-white rounded ${cls.status !== 'accepted' ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={cls.status !== 'accepted'}
                onClick={() => navigate(`/dashboard/my-class/${cls._id}`, { state:cls})}
              >
                See Details
              </button>
            </div>
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

      {/* DaisyUI Modal */}
      {updateClass && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Update Class: {updateClass.title}</h3>
            <form onSubmit={handleUpdate} className="space-y-4">
              <div>
                <label className="block text-sm font-medium">Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title || ''}
                  onChange={handleInputChange}
                  className="input input-bordered w-full"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Price</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price || ''}
                  onChange={handleInputChange}
                  className="input input-bordered w-full"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Description</label>
                <textarea
                  name="description"
                  value={formData.description || ''}
                  onChange={handleInputChange}
                  className="textarea textarea-bordered w-full"
                  required
                ></textarea>
              </div>
              {/* Image Field */}
              <div>
                <label className="block text-sm font-medium">Image URL</label>
                <input
                  type="text"
                  name="image"
                  value={formData.image || ''}
                  onChange={handleInputChange}
                  className="input input-bordered w-full"
                />
              </div>
              <div className="modal-action">
                <button type="button" className="btn btn-ghost" onClick={() => setUpdateClass(null)}>
                  Cancel
                </button>
                <button  type="submit" className="btn bg-gray-800 text-white">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyClasses;











