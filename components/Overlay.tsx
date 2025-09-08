'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { fadeIn } from '@/utils/variants';

export const Overlay: React.FC = () => {
  const [changeColorToRed, setChangeColorToRed] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setChangeColorToRed(true);
    }, 13000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* <div className='w-full h-screen fixed  top-0 z-[60] grid grid-cols-[repeat(auto-fill,20px)] grid-rows-[repeat(auto-fill,20px)]'>
        {Array.from({
          length: Math.ceil(
            (window.innerWidth * window.innerHeight) / (20 * 20),
          ),
        }).map((_, i) => (
          <div
            key={i}
            className='w-[20px] h-[20px] hover:bg-brand-primary duration-100'
          ></div>
        ))}
      </div> */}

      <motion.p
        className={`fixed z-50 top-8 left-1/2 transition-colors duration-100 leading-tight ${
          changeColorToRed ? 'text-brand-primary' : 'text-white'
        } -translate-x-1/2 text-sm pointer-events-none select-none`}
        variants={fadeIn('down')}
        initial='initial'
        animate='animate'
        transition={{ delay: 0.5, duration: 0.1 }}
      >
        <span>design</span> <br />
        &nbsp;&nbsp;&nbsp;&nbsp;
        <span>art direction</span>
      </motion.p>

      {/* Footer text */}
      <motion.p
        className={`fixed z-50 text-right bottom-8 left-1/2 transition-colors duration-100 leading-tight ${
          changeColorToRed ? 'text-brand-primary' : 'text-white'
        } -translate-x-1/2 text-sm pointer-events-none select-none`}
        variants={fadeIn('up')}
        initial='initial'
        animate='animate'
        transition={{ delay: 0.5, duration: 0.1 }}
      >
        Julia <br />
        de Blaauw&nbsp;&nbsp;&nbsp;&nbsp;
      </motion.p>

      <motion.div
        variants={fadeIn('up')}
        initial='initial'
        animate='animate'
        transition={{ delay: 0.5, duration: 0.1 }}
        className={`w-3 aspect-square  rounded-full transition-colors duration-100 ${
          changeColorToRed ? 'bg-brand-primary' : 'bg-white'
        } bottom-8 left-8 fixed z-50`}
      />
      <motion.div
        variants={fadeIn('up')}
        initial='initial'
        animate='animate'
        transition={{ delay: 0.5, duration: 0.1 }}
        className={`w-3 aspect-square rounded-full transition-colors duration-100 ${
          changeColorToRed ? 'bg-brand-primary' : 'bg-white'
        } bottom-8 right-8 fixed z-50`}
      />
    </>
  );
};
