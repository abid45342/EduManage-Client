



// import React from 'react';
// import Slider from 'react-slick';
// import 'slick-carousel/slick/slick.css';
// import 'slick-carousel/slick/slick-theme.css';

// const Popular = () => {
//     const popularClasses = [
//         {
//             _id: '1',
//             classDetails: {
//                 title: 'Full-Stack Web Development',
//                 description: 'Learn web development with the latest technologies.',
//                 image: 'https://images.unsplash.com/photo-1593642532973-d31b6557fa68?crop=entropy&cs=tinysrgb&fit=max&ixid=MXwyMDg0OHwwfDF8c2VhY2h8MnwxfGZ1bmN0aW9uYWx8ZW58MHx8fHx8&ixlib=rb-1.2.1&q=80&w=1080',
//             },
//         },
//         {
//             _id: '2',
//             classDetails: {
//                 title: 'Data Structures and Algorithms',
//                 description: 'Master DSA with real-world problem-solving.',
//                 image: 'https://images.unsplash.com/photo-1593642532973-d31b6557fa68?crop=entropy&cs=tinysrgb&fit=max&ixid=MXwyMDg0OHwwfDF8c2VhY2h8MnwxfGZ1bmN0aW9uYWx8ZW58MHx8fHx8&ixlib=rb-1.2.1&q=80&w=1080',
//             },
//         },
//         {
//             _id: '3',
//             classDetails: {
//                 title: 'Introduction to Machine Learning',
//                 description: 'Explore machine learning fundamentals and algorithms.',
//                 image: 'https://images.unsplash.com/photo-1593642532973-d31b6557fa68?crop=entropy&cs=tinysrgb&fit=max&ixid=MXwyMDg0OHwwfDF8c2VhY2h8MnwxfGZ1bmN0aW9uYWx8ZW58MHx8fHx8&ixlib=rb-1.2.1&q=80&w=1080',
//             },
//         },
//         {
//             _id: '4',
//             classDetails: {
//                 title: 'Cloud Computing Essentials',
//                 description: 'Learn cloud infrastructure and deployment models.',
//                 image: 'https://images.unsplash.com/photo-1593642532973-d31b6557fa68?crop=entropy&cs=tinysrgb&fit=max&ixid=MXwyMDg0OHwwfDF8c2VhY2h8MnwxfGZ1bmN0aW9uYWx8ZW58MHx8fHx8&ixlib=rb-1.2.1&q=80&w=1080',
//             },
//         },
//         {
//             _id: '5',
//             classDetails: {
//                 title: 'iOS App Development with Swift',
//                 description: 'Learn to create mobile apps with Swift and Xcode.',
//                 image: 'https://images.unsplash.com/photo-1593642532973-d31b6557fa68?crop=entropy&cs=tinysrgb&fit=max&ixid=MXwyMDg0OHwwfDF8c2VhY2h8MnwxfGZ1bmN0aW9uYWx8ZW58MHx8fHx8&ixlib=rb-1.2.1&q=80&w=1080',
//             },
//         },
//     ];

//     // Slider settings
//     const settings = {
//         dots: false,
//         infinite: true,
//         speed: 5000,
//         slidesToShow: 3,
//         slidesToScroll: 1,
//         autoplay: true,
//         autoplaySpeed: 1000,
        
//         responsive: [
//             { breakpoint: 1024, settings: { slidesToShow: 2 } },
//             { breakpoint: 600, settings: { slidesToShow: 1 } },
//         ],
//     };

//     return (
//         <div className="py-20 px-4 sm:px-8 lg:px-16  ">
//             <h2 className="text-3xl font-bold text-center mb-6">Popular Classes</h2>
//             <div className="max-w-screen-xl mx-auto">

//                 <Slider {...settings}>

// {popularClasses.map((classItem) => (

// <div
//     key={classItem._id}
//     className="p-4 bg-white rounded-lg shadow-xl hover:scale-105 transition-transform duration-300 mx-2"
// >
//     {/* Fixed height and aspect ratio for images */}
//     <div className="overflow-hidden rounded-lg h-64">
//         <img
//             src={classItem.classDetails.image || 'https://via.placeholder.com/300x200.png?text=Default+Image'}
//             alt={classItem.classDetails.title}
//             className="w-full h-full object-cover"
//         />
//     </div>
//     <div className="mt-4 text-center">
//         {/* Ensure consistent height for text */}
//         <h3 className="text-xl font-semibold text-gray-800 h-12 overflow-hidden">
//             {classItem.classDetails.title}
//         </h3>
//         <p className="text-gray-600 mt-2 h-16 overflow-hidden">
//             {classItem.classDetails.description}
//         </p>
//     </div>
// </div>



//                     ))}


//                 </Slider>
//             </div>
//         </div>
//     );
// };

// export default Popular;

















import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const Popular = () => {
  const axiosSecure = useAxiosSecure();

  // Fetch popular classes from the database
  const { data: popularClasses = [], isLoading } = useQuery({
    queryKey: ['popularClasses'],
    queryFn: async () => {
      const res = await axiosSecure.get('/popular-classes');
      return res.data; // Ensure the backend provides sorted and unique classes
    },
  });

  // Slider settings
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 600, settings: { slidesToShow: 1 } },
    ],
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="py-20 px-4 sm:px-8 lg:px-16">
      <h2 className="text-3xl font-bold text-center mb-6">Popular Classes</h2>
      <div className="max-w-screen-xl mx-auto">
        <Slider {...settings}>
          {popularClasses.map((classItem) => (
            <div
              key={classItem._id}
              className="p-4 bg-white rounded-lg shadow-xl hover:scale-105 transition-transform duration-300 mx-2"
            >
              <div className="overflow-hidden rounded-lg h-64">
                <img
                  src={
                    classItem.image ||
                    'https://via.placeholder.com/300x200.png?text=No+Image+Available'
                  }
                  alt={classItem.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="mt-4 text-center">
                <h3 className="text-xl font-semibold text-gray-800 h-12 overflow-hidden">
                  {classItem.title}
                </h3>
                <p className="text-gray-600 mt-2 h-16 overflow-hidden">
                  {classItem.description}
                </p>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Popular;
