'use client';

import React, {
  useEffect,
  useState,
  useCallback,
  useMemo,
  useRef,
} from 'react';
import Intro from './Intro';
import { AnimatePresence, motion } from 'framer-motion';

const INTRO_DURATION = 18000; // 16 seconds

export const Hero: React.FC = () => {
  const [showIntro, setShowIntro] = useState(true);
  const [isIntroComplete, setIsIntroComplete] = useState(false);
  const timerRef = useRef<NodeJS.Timeout>(null);

  // Handle intro completion
  const handleIntroComplete = useCallback(() => {
    setIsIntroComplete(true);
    setTimeout(() => {
      setShowIntro(false);
    }, 500);
  }, []);

  const fadeVariants = useMemo(
    () => ({
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
    }),
    [],
  );

  const contentVariants = useMemo(
    () => ({
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: -20 },
    }),
    [],
  );

  useEffect(() => {
    timerRef.current = setTimeout(() => {
      if (showIntro) {
        setShowIntro(false);
      }
    }, INTRO_DURATION);

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [showIntro]);

  return (
    <div className='relative w-full h-screen overflow-hidden'>
      <AnimatePresence mode='wait'>
        {showIntro ? (
          <motion.div
            key='intro'
            variants={fadeVariants}
            initial='initial'
            animate='animate'
            exit='exit'
            transition={{
              duration: isIntroComplete ? 0.8 : 0.3,
              ease: 'easeInOut',
            }}
            className='absolute inset-0'
          >
            <Intro onComplete={handleIntroComplete} />
          </motion.div>
        ) : (
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
            className='absolute inset-0 flex flex-col items-center justify-center bg-white'
          >
            <div className='text-center'>
              <h1 className='text-4xl font-light text-gray-800 mb-4'>
                Welcome
              </h1>
              <p className='text-lg text-gray-600'>
                Julia de Blaauw - Design & Art Direction
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
