import React from 'react';
import { HeroContainer } from '@/components/HeroContainer';
import { Work } from '@/components/Work';

const Page: React.FC = () => {
  return (
    <>
      <HeroContainer />
      <Work />
      {/* <div className='w-full h-screen'/> */}
    </>
  );
};

export default Page;
