// import React from 'react';
// import teacherImg from '../../assets/teacher image.webp'

// const Inspire = () => {
//     return (
//         <div className='my-10 mx-auto  w-fit '>
//             <div className='flex justify-center gap-32 items-center '>
//       <div className='w-1/2 flex justify-end '>
//       <img className='w-2/3  rounded-xl ' src={teacherImg}alt="" />
//       </div>
//             <div className='w-1/2 space-y-3 '>
//                 <h1 className='text-3xl '>Become an Instructor </h1>
//                 <p className='w-1/3 '>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quam veritatis, natus tenetur eos </p>
//                 <button className='btn text-white bg-gray-800'>Start Teaching Today</button>
//             </div>
//             </div>
//         </div>
//     );
// };

// export default Inspire;







import React from 'react';
import teacherImg from '../../assets/teacher image.webp';
import { useNavigate } from 'react-router-dom';

const Inspire = () => {
    const navigate = useNavigate();
    return (
        <div className="my-10 mx-auto w-full px-4">
            <div className="flex flex-col lg:flex-row justify-center gap-16 items-center">
                {/* Image Section */}
                <div className="w-full lg:w-1/2  flex justify-center lg:justify-end">
                    <img className="w-full lg:w-2/3  rounded-badge" src={teacherImg} alt="Instructor" />
                </div>

                {/* Text Section */}
                <div className="w-full lg:w-1/2 space-y-4 text-center lg:text-left">
                    <h1 className="text-3xl font-semibold">Become an Instructor</h1>
                    <p className="w-full lg:w-2/3 mx-auto lg:mx-0 text-gray-600">
                        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quam veritatis, natus tenetur eos
                    </p>
                    <button onClick={()=>{navigate('/teacherReq')}} className="btn text-white bg-gray-800 py-2 px-4 rounded-lg">
                        Start Teaching Today
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Inspire;




