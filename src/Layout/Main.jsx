// import React from 'react';
// import Navbar from '../Shared/Navbar';
// import { Outlet } from 'react-router-dom';
// import Footer from '../Footer';

// const Main = () => {
//     return (
//         <div>
//             <Navbar></Navbar>
//             <Outlet></Outlet>
//             <Footer></Footer>
//         </div>

//     );
// };

// export default Main;


import React from 'react';
import Navbar from '../Shared/Navbar';
import { Outlet } from 'react-router-dom';
import Footer from '../Footer';

const Main = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <div className="flex-grow">
                <Outlet />
            </div>
            <Footer />
        </div>
    );
};

export default Main;
