import React from 'react';
import Inspire from './Inspire';
import Banner from './Banner';
import Partners from './Partners';
import Feedback from './Feedback';
import Popular from './Popular';
import Testimonials from './Testimonials';
import NewArrivals from './NewArrivals';
import TotalUsersSection from './TotalUsersSection';

const Home = () => {
    return (
        <div className='mx-auto overflow-hidden'>
            <Banner></Banner>
            <Partners></Partners>
          <Popular></Popular>
            <NewArrivals></NewArrivals>
            <TotalUsersSection></TotalUsersSection>
           <Inspire></Inspire>
           <Feedback></Feedback>
           <Testimonials></Testimonials>
        </div>
    );
};

export default Home;