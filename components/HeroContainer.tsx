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
import { Hero } from './Hero';

const INTRO_DURATION = 16000; // 16 seconds

export const HeroContainer: React.FC = () => {
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
    <div className='relative w-full  min-h-screen overflow-hidden'>
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
          <Hero />
        )}
      </AnimatePresence>
    </div>
  );
};
