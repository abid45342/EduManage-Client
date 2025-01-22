// import React from 'react';
// import { useQuery } from '@tanstack/react-query';
// import useAuth from '../../hooks/useAuth';
// import useAxiosSecure from '../../hooks/useAxiosSecure';
// import { useLocation, useNavigate } from 'react-router-dom';


// const MyEnroll = () => {
//   const location = useLocation();
//   const { user } = useAuth();
//   const navigate = useNavigate();
//   const axiosSecure = useAxiosSecure();
//   // Fetch enrolled classes using TanStack Query
//   const { data: enrolledClasses = [], isLoading, error } = useQuery({
//     queryKey: ['enrolledClasses', user?.email],
//     queryFn: async () => {
//       const res = await axiosSecure.get(`myEnroll/${user.email}`);
//       return res.data;
//     },

//   });
//   console.log(enrolledClasses)

//   // Loading and error states
//   if (isLoading) {
//     return <p>Loading enrolled classes...</p>;
//   }

//   if (error) {
//     return <p>Error loading classes: {error.message}</p>;
//   }
//   const handleContinue = (classId, title) => {
   
//     navigate(`/dashboard/myenroll-class/${classId}`, { state:{title:title} });
//   };
//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
//       {enrolledClasses.map((classItem) => (
//         <div
//           key={classItem._id}
//           className="border rounded-lg shadow-md overflow-hidden"
//         >
//           <img
//             src={classItem.classDetails.image}
//             alt={classItem.classDetails.title}
//             className="w-full h-40 object-cover"
//           />
//           <div className="p-4">
//             <h2 className="text-xl font-semibold mb-2">{classItem.classDetails.title}</h2>
//             <p className="text-gray-600 mb-4">By: {classItem.classDetails.name}</p>
//            {console.log(classItem.classDetails.title)}
//             <button

//               className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
//               onClick={() => handleContinue(classItem.classDetails._id,classItem.classDetails.title)}  // Pass the classId to navigate
//             >
//               Continue
//             </button>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default MyEnroll;







import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useLocation, useNavigate } from 'react-router-dom';

const MyEnroll = () => {
  const location = useLocation();
  const { user } = useAuth();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  // Fetch enrolled classes using TanStack Query
  const { data: enrolledClasses = [], isLoading, error } = useQuery({
    queryKey: ['enrolledClasses', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`myEnroll/${user.email}`);
      return res.data;
    },
  });

  // Loading and error states
  if (isLoading) {
    return <p>Loading enrolled classes...</p>;
  }

  if (error) {
    return <p>Error loading classes: {error.message}</p>;
  }

  const handleContinue = (classId, title) => {
    navigate(`/dashboard/myenroll-class/${classId}`, { state: { title: title } });
  };

  return (
    <div className="p-6">
      {/* Display a message if no enrolled classes */}
      {enrolledClasses.length === 0 ? (
        <p className="text-center text-gray-600 text-lg">
          You didn't enroll in any class.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {enrolledClasses.map((classItem) => (
            <div
              key={classItem._id}
              className="border rounded-lg shadow-md overflow-hidden"
            >
              <img
                src={classItem.classDetails.image}
                alt={classItem.classDetails.title}
                className="w-full h-40 object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">
                  {classItem.classDetails.title}
                </h2>
                <p className="text-gray-600 mb-4">
                  By: {classItem.classDetails.name}
                </p>
                <button
                  className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
                  onClick={() =>
                    handleContinue(
                      classItem.classDetails._id,
                      classItem.classDetails.title
                    )
                  }
                >
                  Continue
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyEnroll;

