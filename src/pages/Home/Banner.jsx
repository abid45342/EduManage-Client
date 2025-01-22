// import React from 'react';
// import Slider from 'react-slick';
// import "slick-carousel/slick/slick.css"; 
// import "slick-carousel/slick/slick-theme.css";
// import banner from '../../assets/banner.jpg'
// import banner1 from '../../assets/banner1.jpg'

// const Banner = () => {
//     const settings = {
//         dots: true,          // Show navigation dots
//         infinite: true,      // Infinite loop scrolling
//         speed: 500,          // Transition speed
//         slidesToShow: 1,     // Show one image at a time
//         slidesToScroll: 1,   // Scroll one image at a time
//     };

//     return (
//         <div className="banner-container w-full overflow-hidden">
//             <Slider {...settings}>
//                 <div>
//                     <img src={banner} alt="Banner 1" className="w-[1500px] h-[500px] object-cover " />
//                 </div>
//                 <div>
//                 <img src={banner1} alt="Banner 1" className="w-[1500px] h-[500px]  object-cover " />
//                 </div>
//                 <div>
//                     <img src={banner} alt="Banner 1" className="w-[1500px] h-[500px] object-cover " />
//                 </div>
//             </Slider>
//         </div>
//     );
// };

// export default Banner;








import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import banner from '../../assets/banner.jpg'
import banner1 from '../../assets/banner1.png'
import banner3 from '../../assets/banner3.jpg'

const Banner = () => {
    const settings = {
        dots: true,          // Show navigation dots
        infinite: true,      // Infinite loop scrolling
        speed: 500,          // Transition speed
        slidesToShow: 1,     // Show one image at a time
        slidesToScroll: 1,   // Scroll one image at a time
    };

    return (
        <div className="banner-container w-full overflow-hidden">
            <Slider {...settings}>
                <div>
                    <img src={banner} alt="Banner 1" className="w-full h-[300px] sm:h-[400px] md:h-[500px] object-cover" />
                </div>
                <div>
                    <img src={banner1} alt="Banner 2" className="w-full h-[300px] sm:h-[400px] md:h-[500px]  " />
                </div>
                {/* <div>
                    <img src={banner3} alt="Banner 3" className="w-full h-[300px] sm:h-[400px] md:h-[500px] object-cover" />
                </div> */}
            </Slider>
        </div>
    );
};

export default Banner;

