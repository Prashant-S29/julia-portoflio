'use client';

import React, { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type ActiveRole = 'designer' | 'art-director';

export const Hero: React.FC = () => {
  const [activeRole, setActiveRole] = useState<ActiveRole>('art-director');

  const contentVariants = useMemo(
    () => ({
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: -20 },
    }),
    [],
  );

  // Animation variants for the description texts
  const textItemVariants = useMemo(
    () => ({
      initial: { opacity: 0, y: 10 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: -10 },
    }),
    [],
  );

  // Designer descriptions - above the title
  const designerAboveTexts = [
    'graphical',
    'digital',
    { type: 'flex', items: ['visual', 'strategic'] },
  ];

  // Designer descriptions - below the title
  const designerBelowTexts = [
    'design',
    { text: 'direction', indent: 'ml-[100px]' },
    'visual concept',
    { text: 'printed matter', indent: 'ml-7' },
    'visual identity',
    { text: 'branding', indent: 'ml-3' },
    'content creation',
  ];

  // Art Director descriptions
  const artDirectorTexts = [
    'of (moving) images • concepts',
    'on set ideation • design direction',
    'programming • visual space',
    'brand development',
    { text: '• strategic visual and research', indent: 'ml-7' },
  ];

  const renderDesignerAbove = () => {
    return designerAboveTexts.map((item, index) => {
      if (typeof item === 'object' && item.type === 'flex') {
        return (
          <motion.div
            key={`designer-above-${index}`}
            className='flex gap-9'
            variants={textItemVariants}
            initial='initial'
            animate='animate'
            exit='exit'
            transition={{ duration: 0.2, delay: 0.1 + index * 0.1 }}
          >
            <p>{item.items[0]}</p>
            <p>{item.items[1]}</p>
          </motion.div>
        );
      }
      return (
        <motion.p
          key={`designer-above-${index}`}
          variants={textItemVariants}
          initial='initial'
          animate='animate'
          exit='exit'
          transition={{ duration: 0.2, delay: 0.1 + index * 0.1 }}
        >
          {item as string}
        </motion.p>
      );
    });
  };

  const renderDesignerBelow = () => {
    return designerBelowTexts.map((item, index) => {
      const text = typeof item === 'object' ? item.text : item;
      const indent = typeof item === 'object' ? item.indent : '';

      return (
        <motion.p
          key={`designer-below-${index}`}
          className={indent}
          variants={textItemVariants}
          initial='initial'
          animate='animate'
          exit='exit'
          transition={{ duration: 0.2, delay: 0.1 + index * 0.1 }}
        >
          {text}
        </motion.p>
      );
    });
  };

  const renderArtDirectorLayout = () => {
    return artDirectorTexts.map((item, index) => {
      const text = typeof item === 'object' ? item.text : item;
      const indent = typeof item === 'object' ? item.indent : '';

      return (
        <motion.p
          key={`art-director-${index}`}
          className={indent}
          variants={textItemVariants}
          initial='initial'
          animate='animate'
          exit='exit'
          transition={{ duration: 0.2, delay: 0.1 + index * 0.1 }}
        >
          {text}
        </motion.p>
      );
    });
  };

  return (
    <motion.div
      key='main-content'
      variants={contentVariants}
      initial='initial'
      animate='animate'
      exit='exit'
      transition={{
        duration: 0.6,
        delay: 0.2,
        ease: 'easeOut',
      }}
      className='flex flex-col w-full min-h-screen items-center justify-center'
    >
      <div className='relative flex items-center gap-[50px] leading-none'>
        <p className='text-[80px] font-dante text-brand-primary'>{'('}</p>
        <div className='min-w-[900px] flex flex-col gap-5 text-[80px] font-dante text-brand-primary'>
          <p className='ml-[100px]'>I&apos;m a</p>
          <div className='ml-[400px] relative'>
            {/* Designer - Above text */}
            {activeRole === 'designer' && (
              <AnimatePresence mode='wait'>
                <motion.div
                  key='designer-above'
                  className='absolute -top-[130px] flex flex-col gap-2 text-[32px] left-[100px] font-dante'
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {renderDesignerAbove()}
                </motion.div>
              </AnimatePresence>
            )}
            {/* Designer - Below text */}
            {activeRole === 'designer' && (
              <AnimatePresence mode='wait'>
                <motion.div
                  key='designer-below'
                  className='absolute top-[100%] mt-5 flex flex-col gap-2 text-[32px] left-[200px] font-dante'
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {renderDesignerBelow()}
                </motion.div>
              </AnimatePresence>
            )}
            {/* Art Director - Below text */}
            {activeRole === 'art-director' && (
              <AnimatePresence mode='wait'>
                <motion.div
                  key='art-director'
                  className='absolute top-[100%] mt-8 w-full flex flex-col gap-2 text-[32px] left-[100px] font-dante'
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {renderArtDirectorLayout()}
                </motion.div>
              </AnimatePresence>
            )}
            i.{' '}
            <span
              className={`font-chong ml-8 px-4 py-3 ${
                activeRole === 'designer' && 'bg-brand-primary text-white'
              } text-brand-primary duration-150 cursor-pointer`}
              onMouseEnter={() => setActiveRole('designer')}
            >
              designer
            </span>
          </div>
          <div>
            ii.{' '}
            <span
              className={`font-chong px-4 py-3 ${
                activeRole === 'art-director' && 'bg-brand-primary text-white'
              }  text-brand-primary duration-150 cursor-pointer`}
              onMouseEnter={() => setActiveRole('art-director')}
            >
              art director
            </span>
          </div>
        </div>
        <p className='text-[80px] font-dante text-brand-primary'>{')'}</p>
      </div>
    </motion.div>
  );
};
