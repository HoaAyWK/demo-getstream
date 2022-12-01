import React from 'react';

import Baner from '../components/common/Baner'
import Partner from '../components/common/Partner'
import Category from '../components/common/Category'
import FeaturedJobs from '../components/job/FeaturedJobs'
import AddMoney from '../components/payment/AddMoney'



const Home = () => {
  return (
    <div className='body'>
      <Baner />
      <Partner />
      <Category />
      <FeaturedJobs />
      <AddMoney />
    </div>
  );
};

export default Home;
