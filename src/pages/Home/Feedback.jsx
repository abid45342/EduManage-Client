








import React from 'react';
import { useQuery } from '@tanstack/react-query';
import Slider from 'react-slick'; // Carousel library

// Import Slick Carousel styles
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import './Feedback.css'; // Import custom styles

const Feedback = () => {
    const axiosPublic = useAxiosPublic();

    // Fetch feedback data using TanStack Query
    const { data: feedbacks = [], isLoading, isError } = useQuery({
        queryKey: ['feedback'],
        queryFn: async () => {
            const res = await axiosPublic.get('/feedback');
            return res.data;
        },
    });

    // Carousel settings
    const settings = {
        dots: false,
        infinite: true,
        speed: 10000,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true, // Enables auto-slide
        autoplaySpeed: 100, // Slide changes every 3 seconds
        responsive: [
            { breakpoint: 1024, settings: { slidesToShow: 2 } },
            { breakpoint: 600, settings: { slidesToShow: 1 } },
        ],
    };
    
    

    if (isLoading) return <p>Loading feedback...</p>;
    if (isError) return <p>Error loading feedback.</p>;

    return (
        <div className="feedback-section">
            <h2 className="feedback-title">Teacher Feedback</h2>
            <Slider {...settings}>
                {feedbacks.map((feedback) => (
                    <div key={feedback.id} className="feedback-card ">
                        <div className="feedback-image-container ">
                            <img
                                src={feedback.photoURL || 'default-image-url.jpg'}
                                alt={feedback.userName}
                                className="feedback-image"
                            />
                        </div>
                        <div className="feedback-content ">
                            <h3 className="feedback-user">{feedback.userName}</h3>
                            <p className="feedback-title-text">{feedback.title}</p>
                            <blockquote className="feedback-text">
                                {feedback.description || 'No feedback provided.'}
                            </blockquote>
                        </div>
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default Feedback;








