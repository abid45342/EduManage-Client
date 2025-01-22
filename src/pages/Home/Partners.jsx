


// import React from 'react';
// import company1 from '../../assets/company1.jpg';
// import company2 from '../../assets/company2.jpg';
// import company3 from '../../assets/company3.png';
// import company4 from '../../assets/company4.png';

// const Partners = () => {
//   return (
//     <div className="py-16 ">
//       <div className="max-w-6xl mx-auto text-center">
//         {/* Heading */}
//         <h2 className="text-4xl font-extrabold text-gray-800 mb-4">Our Partners</h2>
//         <p className="text-lg text-gray-600 mb-12 font-medium max-w-3xl mx-auto">
//           We have worked with renowned names. From hotels, offices, and homes, we have collaborated with clients from all backgrounds.
//         </p>

//         {/* Partner logos */}
//         <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8 items-center">
//           <img
//             src={company1}
//             alt="Real Estate Partner"
//             className="mx-auto w-32 h-auto object-contain hover:opacity-90 transition-opacity duration-300"
//           />
//           <img
//             src={company2}
//             alt="Creative Partner"
//             className="mx-auto w-32 h-auto object-contain hover:opacity-90 transition-opacity duration-300"
//           />
//           <img
//             src={company3}
//             alt="Business Estates Partner"
//             className="mx-auto w-32 h-auto object-contain hover:opacity-90 transition-opacity duration-300"
//           />
//           <img
//             src={company4}
//             alt="Green House Partner"
//             className="mx-auto w-32 h-auto object-contain hover:opacity-90 transition-opacity duration-300"
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Partners;





import React from 'react';
import company1 from '../../assets/company1.jpg';
import company2 from '../../assets/company2.jpg';
import company3 from '../../assets/company3.png';
import company4 from '../../assets/company4.png';

const Partners = () => {
  return (
    <div className="py-16">
      <div className="max-w-6xl mx-auto text-center">
        {/* Heading */}
        <h2 className="text-4xl font-extrabold text-gray-800 mb-4">Our Partners</h2>
        <p className="text-lg text-gray-600 mb-12 font-medium max-w-3xl mx-auto">
          We collaborate with industry leaders to bring the best solutions.
        </p>

        {/* Partner logos with brief descriptions */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8 items-center">
          <div className="text-center">
            <img
              src={company1}
              alt="Real Estate Partner"
              className="mx-auto w-32 h-auto object-contain hover:opacity-90 transition-opacity duration-300"
            />
            <p className="mt-2 text-gray-500">Leaders in Programming  development</p>
          </div>

          <div className="text-center">
            <img
              src={company2}
              alt="Creative Partner"
              className="mx-auto w-32 h-auto object-contain hover:opacity-90 transition-opacity duration-300"
            />
            <p className="mt-2 text-gray-600">Innovative creative solutions</p>
          </div>

          <div className="text-center">
            <img
              src={company3}
              alt="Business Estates Partner"
              className="mx-auto w-32 h-auto object-contain hover:opacity-90 transition-opacity duration-300"
            />
            <p className="mt-2 text-gray-600">Trusted in Education management</p>
          </div>

          <div className="text-center">
            <img
              src={company4}
              alt="Green House Partner"
              className="mx-auto w-32 h-auto object-contain hover:opacity-90 transition-opacity duration-300"
            />
            <p className="mt-2 text-gray-600">Sustainable and eco-friendly Support</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Partners;
