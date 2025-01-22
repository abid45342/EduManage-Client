// import React from 'react';
// import Slider from 'react-slick';
// import 'slick-carousel/slick/slick.css';
// import 'slick-carousel/slick/slick-theme.css';

// const NewArrivals = () => {
//     const newClasses = [
//         {
//             _id: '1',
//             classDetails: {
//                 title: 'Web Development Bootcamp',
//                 description: 'Learn full-stack web development from scratch.',
//                 image: 'https://images.unsplash.com/photo-1593642532973-d31b6557fa68?crop=entropy&cs=tinysrgb&fit=max&ixid=MXwyMDg0OHwwfDF8c2VhY2h8MnwxfGZ1bmN0aW9uYWx8ZW58MHx8fHx8&ixlib=rb-1.2.1&q=80&w=1080',
//             },
//         },
//         {
//             _id: '2',
//             classDetails: {
//                 title: 'Data Science for Beginners',
//                 description: 'Dive into the world of data science with hands-on.',
//                 image: 'https://images.unsplash.com/photo-1593642532973-d31b6557fa68?crop=entropy&cs=tinysrgb&fit=max&ixid=MXwyMDg0OHwwfDF8c2VhY2h8MnwxfGZ1bmN0aW9uYWx8ZW58MHx8fHx8&ixlib=rb-1.2.1&q=80&w=1080',
//             },
//         },
//         {
//             _id: '3',
//             classDetails: {
//                 title: 'UI/UX Design Fundamentals',
//                 description: 'Learn design principles and create user-friendly .',
//                 image: 'https://images.unsplash.com/photo-1593642532973-d31b6557fa68?crop=entropy&cs=tinysrgb&fit=max&ixid=MXwyMDg0OHwwfDF8c2VhY2h8MnwxfGZ1bmN0aW9uYWx8ZW58MHx8fHx8&ixlib=rb-1.2.1&q=80&w=1080',
//             },
//         },
//         {
//             _id: '4',
//             classDetails: {
//                 title: 'Python Programming 101',
//                 description: 'Start your journey into programming with Python.',
//                 image: 'https://images.unsplash.com/photo-1593642532973-d31b6557fa68?crop=entropy&cs=tinysrgb&fit=max&ixid=MXwyMDg0OHwwfDF8c2VhY2h8MnwxfGZ1bmN0aW9uYWx8ZW58MHx8fHx8&ixlib=rb-1.2.1&q=80&w=1080',
//             },
//         },
//         {
//             _id: '5',
//             classDetails: {
//                 title: 'Mobile App Development',
//                 description: 'Build mobile apps with React Native and Expo.',
//                 image: 'https://images.unsplash.com/photo-1593642532973-d31b6557fa68?crop=entropy&cs=tinysrgb&fit=max&ixid=MXwyMDg0OHwwfDF8c2VhY2h8MnwxfGZ1bmN0aW9uYWx8ZW58MHx8fHx8&ixlib=rb-1.2.1&q=80&w=1080',
//             },
//         },
//     ];

//     // Slider settings
//     const settings = {
//         dots: false,
//         infinite: true,
//         speed: 5000,
//         slidesToShow: 3, // number of cards to show in one slide
//         slidesToScroll: 1,
//         autoplay: true,
//         autoplaySpeed: 1000,
//         responsive: [
//             { breakpoint: 1024, settings: { slidesToShow: 2 } },
//             { breakpoint: 600, settings: { slidesToShow: 1 } },
//         ],
//     };

//     return (
//         <div className="py-20 ">
//             <h2 className="text-3xl font-bold text-center mb-6">New Arrivals</h2>
//             <div className="max-w-screen-xl mx-auto">
//                 <Slider {...settings}>
//                     {newClasses.map((classItem) => (
//                         <div
//                             key={classItem._id}
//                             className="p-4 bg-white rounded-lg shadow-lg hover:scale-105 transition-transform duration-300 mx-4 mb-4"
//                         >
//                             <div className="overflow-hidden rounded-lg h-64">
//                                 <img
//                                     src={classItem.classDetails.image || 'https://via.placeholder.com/300x200.png?text=Default+Image'}
//                                     alt={classItem.classDetails.title}
//                                     className="w-full h-full object-cover"
//                                 />
//                             </div>
//                             <div className="mt-4 text-center">
//                                 <h3 className="text-xl font-semibold text-gray-800">{classItem.classDetails.title}</h3>
//                                 <p className="text-gray-600 mt-2">{classItem.classDetails.description}</p>
//                             </div>
//                         </div>
//                     ))}
//                 </Slider>
//             </div>
//         </div>
//     );
// };

// export default NewArrivals;










import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const NewArrivals = () => {
    const newClasses = [
        {
            _id: '1',
            classDetails: {
                title: 'Web Development Bootcamp',
                description: 'Learn full-stack web development from scratch.',
                image: 'https://images.unsplash.com/photo-1593642532973-d31b6557fa68?crop=entropy&cs=tinysrgb&fit=max&ixid=MXwyMDg0OHwwfDF8c2VhY2h8MnwxfGZ1bmN0aW9uYWx8ZW58MHx8fHx8&ixlib=rb-1.2.1&q=80&w=1080',
            },
        },
        {
            _id: '2',
            classDetails: {
                title: 'Data Science for Beginners',
                description: 'Dive into the world of data science with hands-on.',
                image: 'https://images.unsplash.com/photo-1593642532973-d31b6557fa68?crop=entropy&cs=tinysrgb&fit=max&ixid=MXwyMDg0OHwwfDF8c2VhY2h8MnwxfGZ1bmN0aW9uYWx8ZW58MHx8fHx8&ixlib=rb-1.2.1&q=80&w=1080',
            },
        },
        {
            _id: '3',
            classDetails: {
                title: 'UI/UX Design Fundamentals',
                description: 'Learn design principles and create user-friendly.',
                image: 'https://images.unsplash.com/photo-1593642532973-d31b6557fa68?crop=entropy&cs=tinysrgb&fit=max&ixid=MXwyMDg0OHwwfDF8c2VhY2h8MnwxfGZ1bmN0aW9uYWx8ZW58MHx8fHx8&ixlib=rb-1.2.1&q=80&w=1080',
            },
        },
        {
            _id: '4',
            classDetails: {
                title: 'Python Programming 101',
                description: 'Start your journey into programming with Python.',
                image: 'https://images.unsplash.com/photo-1593642532973-d31b6557fa68?crop=entropy&cs=tinysrgb&fit=max&ixid=MXwyMDg0OHwwfDF8c2VhY2h8MnwxfGZ1bmN0aW9uYWx8ZW58MHx8fHx8&ixlib=rb-1.2.1&q=80&w=1080',
            },
        },
        {
            _id: '5',
            classDetails: {
                title: 'Mobile App Development',
                description: 'Build mobile apps with React Native and Expo.',
                image: 'https://images.unsplash.com/photo-1593642532973-d31b6557fa68?crop=entropy&cs=tinysrgb&fit=max&ixid=MXwyMDg0OHwwfDF8c2VhY2h8MnwxfGZ1bmN0aW9uYWx8ZW58MHx8fHx8&ixlib=rb-1.2.1&q=80&w=1080',
            },
        },
    ];

    // Slider settings
    const settings = {
        dots: false,
        infinite: true,
        speed: 5000,
        slidesToShow: 3, // number of cards to show in one slide
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 1000,
        responsive: [
            { breakpoint: 1024, settings: { slidesToShow: 2 } },
            { breakpoint: 600, settings: { slidesToShow: 1 } },
        ],
    };

    return (
        <div className="py-20 px-4 sm:px-8 lg:px-16">
            <h2 className="text-3xl font-bold text-center mb-6">New Arrivals</h2>
            <div className="max-w-screen-xl mx-auto">
                <Slider {...settings}>
                    {newClasses.map((classItem) => (
                        <div
                            key={classItem._id}
                            className="p-4 bg-white rounded-lg shadow-lg hover:scale-105 transition-transform duration-300 mx-4 mb-4"
                        >
                            <div className="overflow-hidden rounded-lg h-64">
                                <img
                                    src={classItem.classDetails.image || 'https://via.placeholder.com/300x200.png?text=Default+Image'}
                                    alt={classItem.classDetails.title}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="mt-4 text-center">
                                <h3 className="text-xl font-semibold text-gray-800">{classItem.classDetails.title}</h3>
                                <p className="text-gray-600 mt-2">{classItem.classDetails.description}</p>
                            </div>
                        </div>
                    ))}
                </Slider>
            </div>
        </div>
    );
};

export default NewArrivals;

