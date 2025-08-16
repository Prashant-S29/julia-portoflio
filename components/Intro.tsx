'use client';

import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
  useRef,
} from 'react';
import { motion, AnimatePresence, cubicBezier } from 'framer-motion';
import SquareCover from '@/components/SquareCover';

const ANIMATION_TIMINGS = {
  LINE_0: 1200,
  LINE_1: 2700,
  LINE_2: 3900,
  HIDE_FULL_NAME: 6000,
  SHOW_PHOTO: 7000,
  PHOTO_TRANSITIONS: [
    7500, 8000, 8400, 8700, 8900, 9100, 9300, 9500, 9700, 9900,
  ],
  SQUARE_COVER: 11900,
} as const;

const PHOTO_COLORS = [
  'bg-pink-200',
  'bg-pink-300',
  'bg-pink-400',
  'bg-pink-500',
  'bg-pink-600',
  'bg-pink-800',
  'bg-pink-800',
  'bg-pink-900',
  'bg-blue-300',
  'bg-blue-400',
  'bg-blue-500',
  'bg-blue-600',
] as const;

interface IntroProps {
  onComplete?: () => void;
}

const Intro: React.FC<IntroProps> = ({ onComplete }) => {
  const [line, setLine] = useState(0);
  const [hideFullName, setHideFullName] = useState(false);
  const [showPhotoContainer, setShowPhotoContainer] = useState(false);
  const [currentPhoto, setCurrentPhoto] = useState(0);
  const [showSquareCover, setShowSquareCover] = useState(false);

  const timeoutsRef = useRef<NodeJS.Timeout[]>([]);

  const clearAllTimeouts = useCallback(() => {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
  }, []);

  const textVariants = useMemo(
    () => ({
      initial: { y: 20, opacity: 0 },
      animate: { y: 0, opacity: 1 },
      exit: { y: -20, opacity: 0 },
    }),
    [],
  );

  const nameVariants = useMemo(
    () => ({
      initial: { maxWidth: 200, opacity: 1 },
      animate: { maxWidth: 200, opacity: 1 },
      exit: { maxWidth: 0, opacity: 0 },
    }),
    [],
  );

  const photoVariants = useMemo(
    () => ({
      initial: { width: 0, height: 0 },
      animate: { width: 300, height: 350 },
    }),
    [],
  );

  const scheduleTimeout = useCallback((callback: () => void, delay: number) => {
    const timeout = setTimeout(callback, delay);
    timeoutsRef.current.push(timeout);
    return timeout;
  }, []);

  useEffect(() => {
    clearAllTimeouts();

    scheduleTimeout(() => setLine(0), ANIMATION_TIMINGS.LINE_0);
    scheduleTimeout(() => setLine(1), ANIMATION_TIMINGS.LINE_1);
    scheduleTimeout(() => setLine(2), ANIMATION_TIMINGS.LINE_2);
    scheduleTimeout(
      () => setHideFullName(true),
      ANIMATION_TIMINGS.HIDE_FULL_NAME,
    );
    scheduleTimeout(
      () => setShowPhotoContainer(true),
      ANIMATION_TIMINGS.SHOW_PHOTO,
    );

    ANIMATION_TIMINGS.PHOTO_TRANSITIONS.forEach((timing, index) => {
      scheduleTimeout(() => setCurrentPhoto(index + 1), timing);
    });

    scheduleTimeout(() => {
      setShowSquareCover(true);
      onComplete?.();
    }, ANIMATION_TIMINGS.SQUARE_COVER);

    return clearAllTimeouts;
  }, [clearAllTimeouts, scheduleTimeout, onComplete]);

  const photoComponent = useMemo(() => {
    if (!showPhotoContainer) return null;

    return (
      <AnimatePresence mode='wait'>
        <motion.div
          initial='initial'
          animate='animate'
          variants={photoVariants}
          transition={{
            duration: 0.3,
            ease: cubicBezier(0.71, 0.68, 0.13, 0.99),
          }}
          className='bg-white mx-5 relative overflow-hidden'
        >
          <div
            className={`w-full h-full transition-colors duration-100 ${
              PHOTO_COLORS[currentPhoto] || 'bg-pink-200'
            }`}
          />
        </motion.div>
      </AnimatePresence>
    );
  }, [showPhotoContainer, currentPhoto, photoVariants]);

  const textContent = useMemo(() => {
    const textComponents = {
      0: (
        <motion.p
          key='hello'
          variants={textVariants}
          initial='initial'
          animate='animate'
          exit='exit'
          transition={{ duration: 0.3 }}
        >
          hello
        </motion.p>
      ),
      1: (
        <motion.p
          key='im'
          variants={textVariants}
          initial='initial'
          animate='animate'
          exit='exit'
          transition={{ duration: 0.3 }}
        >
          i&apos;m
        </motion.p>
      ),
      2: (
        <motion.div
          key='name'
          variants={textVariants}
          initial='initial'
          animate='animate'
          exit='exit'
          transition={{ duration: 0.3 }}
          className='flex items-center'
        >
          <div className='flex items-center'>
            <div className='flex items-center'>
              J
              <AnimatePresence mode='wait'>
                {!hideFullName && (
                  <motion.span
                    variants={nameVariants}
                    initial='initial'
                    animate={hideFullName ? 'exit' : 'animate'}
                    exit='exit'
                    transition={{ duration: 0.3 }}
                    className='overflow-hidden inline-block'
                  >
                    ulia
                  </motion.span>
                )}
              </AnimatePresence>
              &nbsp;
            </div>

            {photoComponent}

            <span>d</span>
          </div>
          <AnimatePresence mode='wait'>
            {!hideFullName && (
              <motion.span
                variants={nameVariants}
                initial='initial'
                animate={hideFullName ? 'exit' : 'animate'}
                exit='exit'
                transition={{ duration: 0.3 }}
                className='overflow-hidden inline-block'
              >
                e&nbsp;
              </motion.span>
            )}
          </AnimatePresence>
          B
          <AnimatePresence mode='wait'>
            {!hideFullName && (
              <motion.span
                variants={nameVariants}
                initial='initial'
                animate={hideFullName ? 'exit' : 'animate'}
                exit='exit'
                transition={{ duration: 0.3 }}
                className='overflow-hidden inline-block'
              >
                laauw
              </motion.span>
            )}
          </AnimatePresence>
        </motion.div>
      ),
    };

    return textComponents[line as keyof typeof textComponents];
  }, [line, hideFullName, photoComponent, textVariants, nameVariants]);

  return (
    <main className='w-full h-screen fixed top-0 z-40 bg-brand-primary overflow-hidden'>
      {showSquareCover && <SquareCover />}

      {/* Main content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.7 }}
        className='absolute flex justify-center gap-8 items-center font-dante text-[60px] text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'
      >
        (
        <motion.div
          transition={{
            duration: 0.6,
            delay: 1.5,
            ease: cubicBezier(0.71, 0.68, 0.13, 0.99),
          }}
          className='flex justify-center min-w-[300px] items-center h-[80px]'
        >
          <div className='w-fit text-white text-[40px]'>
            <AnimatePresence mode='wait'>{textContent}</AnimatePresence>
          </div>
        </motion.div>
        )
      </motion.div>
    </main>
  );
};

export default Intro;
