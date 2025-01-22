// import React from 'react';
// import './Testimonials.css';

// const Testimonials = () => {
//     // Static demo data for testimonials
//     const testimonials = [
//         {
//             id: 1,
//             studentName: 'John Doe',
//             studentPhoto: 'https://randomuser.me/api/portraits/men/1.jpg', // Custom image URL
//             feedback: 'This platform has been life-changing for my learning. I was able to learn at my own pace, and the instructors are amazing!',
//         },
//         {
//             id: 2,
//             studentName: 'Jane Smith',
//             studentPhoto: 'https://randomuser.me/api/portraits/women/2.jpg', // Custom image URL
//             feedback: 'The courses offered here are really well-structured. I gained new skills and enhanced my knowledge in a short time.',
//         },
//         {
//             id: 3,
//             studentName: 'Michael Johnson',
//             studentPhoto: 'https://randomuser.me/api/portraits/men/3.jpg', // Custom image URL
//             feedback: 'I loved how interactive the classes are. The assignments really helped me test my understanding, and the community was very supportive.',
//         },
//     ];


//     return (
//         <div className="testimonials-section">
//             <h2 className="testimonials-title">What Our Students Say</h2>
//             <div className="testimonials-container">
//                 {testimonials.map((testimonial) => (
//                     <div key={testimonial.id} className="testimonial-card">
//                         <img
//                             src={testimonial.studentPhoto}
//                             alt={testimonial.studentName}
//                             className="testimonial-photo"
//                         />
//                         <div className="testimonial-info">
//                             <h3 className="testimonial-name">{testimonial.studentName}</h3>
//                             <p className="testimonial-text">{testimonial.feedback}</p>
//                         </div>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default Testimonials;






import React from 'react';

const Testimonials = () => {
    // Static demo data for testimonials
    const testimonials = [
        {
            id: 1,
            studentName: 'John Doe',
            studentPhoto: 'https://randomuser.me/api/portraits/men/1.jpg', // Custom image URL
            feedback: 'This platform has been life-changing for my learning. I was able to learn at my own pace, and the instructors are amazing!',
        },
        {
            id: 2,
            studentName: 'Jane Smith',
            studentPhoto: 'https://randomuser.me/api/portraits/women/2.jpg', // Custom image URL
            feedback: 'The courses offered here are really well-structured. I gained new skills and enhanced my knowledge in a short time.',
        },
        {
            id: 3,
            studentName: 'Michael Johnson',
            studentPhoto: 'https://randomuser.me/api/portraits/men/3.jpg', // Custom image URL
            feedback: 'I loved how interactive the classes are. The assignments really helped me test my understanding, and the community was very supportive.',
        },
    ];

    return (
        <div className="py-16 ">
            <h2 className="text-3xl font-semibold text-center text-gray-800 mb-12">What Our Students Say</h2>
            <div className="flex justify-center gap-6 flex-wrap">
                {testimonials.map((testimonial) => (
                    <div
                        key={testimonial.id}
                        className="max-w-xs bg-white p-6 rounded-lg shadow-lg text-center"
                    >
                        <img
                            src={testimonial.studentPhoto}
                            alt={testimonial.studentName}
                            className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                        />
                        <h3 className="text-xl font-semibold text-gray-800 mb-3">{testimonial.studentName}</h3>
                        <p className="text-gray-600 text-sm">{testimonial.feedback}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Testimonials;

