'use client';

import React, { useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { AnimatePresence, motion } from 'framer-motion';

const works: Work[] = [
  {
    title: 'Portfolio Website',
    desc: 'A personal portfolio website showcasing skills and projects.',
    slug: 'portfolio-website',
    coverImages: [
      'bg-red-500',
      'bg-green-500',
      'bg-blue-500',
      'bg-yellow-500',
      'bg-pink-500',
      'bg-purple-500',
      'bg-indigo-500',
      'bg-orange-500',
      'bg-gray-500',
    ],
  },
  {
    title: 'E-Commerce App',
    desc: 'An online shopping platform with cart and checkout features.',
    slug: 'ecommerce-app',
    coverImages: [
      'bg-teal-500',
      'bg-rose-500',
      'bg-cyan-500',
      'bg-lime-500',
      'bg-fuchsia-500',
      'bg-emerald-500',
      'bg-sky-500',
      'bg-violet-500',
      'bg-amber-500',
    ],
  },
  {
    title: 'Chat Application',
    desc: 'A real-time chat application with user authentication.',
    slug: 'chat-app',
    coverImages: [
      'bg-red-400',
      'bg-green-400',
      'bg-blue-400',
      'bg-yellow-400',
      'bg-pink-400',
      'bg-purple-400',
      'bg-indigo-400',
      'bg-orange-400',
      'bg-gray-400',
    ],
  },
  {
    title: 'Analytics Dashboard',
    desc: 'An admin dashboard with charts, tables, and reports.',
    slug: 'analytics-dashboard',
    coverImages: [
      'bg-teal-400',
      'bg-rose-400',
      'bg-cyan-400',
      'bg-lime-400',
      'bg-fuchsia-400',
      'bg-emerald-400',
      'bg-sky-400',
      'bg-violet-400',
      'bg-amber-400',
    ],
  },
  {
    title: 'Blog Platform',
    desc: 'A blogging platform with markdown support and comments.',
    slug: 'blog-platform',
    coverImages: [
      'bg-red-300',
      'bg-green-300',
      'bg-blue-300',
      'bg-yellow-300',
      'bg-pink-300',
      'bg-purple-300',
      'bg-indigo-300',
      'bg-orange-300',
      'bg-gray-300',
    ],
  },
];

// example positions (fixed slots for 9 images)
const SLOT_POSITIONS = [
  { width: '200px', height: '250px', top: '0', left: '0' },
  { width: '200px', height: '150px', top: '10', left: '30' },
  { width: '200px', height: '150px', top: '35', left: '50' },
  { width: '300px', height: '250px', top: '30', left: '10' },
  { width: '200px', height: '250px', top: '10', left: '70' },
  { width: '200px', height: '250px', top: '16', left: '60' },
  { width: '200px', height: '100px', top: '40', left: '78' },
  { width: '150px', height: '200px', top: '23', left: '40' },
  { width: '150px', height: '200px', top: '35', left: '4' },
];

// sample work data type
type Work = {
  title: string;
  desc: string;
  slug: string;
  coverImages: string[]; // always 9
};

export const Work: React.FC = () => {
  const workContainerRef = useRef<HTMLDivElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const workBoxRef = useRef<HTMLDivElement>(null);
  const workImagesWrapperRef = useRef<HTMLDivElement>(null);

  const [activeWork, setActiveWork] = useState(0);
  const [activeWorkDetails, setActiveWorkDetails] = useState(0);
  const [workPhotoAtCenter, setWorkPhotoAtCenter] = useState(true);
  const [workPhotoAppear, setWorkPhotoAppear] = useState(false);
  const [showControllers, setShowControllers] = useState(false);

  const handleWorkPhotoChange = (action: 'next' | 'prev') => {
    let newIndex;
    if (action === 'next') {
      newIndex = activeWork === works.length - 1 ? 0 : activeWork + 1;
    } else {
      newIndex = activeWork === 0 ? works.length - 1 : activeWork - 1;
    }

    setWorkPhotoAtCenter(true);
    setActiveWorkDetails(newIndex);

    setTimeout(() => {
      setActiveWork(newIndex);
    }, 1500);

    setTimeout(() => {
      setWorkPhotoAtCenter(false);
    }, 1000);
  };

  // scroll animation
  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: workContainerRef.current,
        scrub: 1,
        start: 'top top',
        end: 'bottom top',
        // markers: true,
        pin: true,
        onUpdate: (self) => {
          const progress = self.progress;
          if (progress >= 0.8) {
            setWorkPhotoAtCenter(false);
            setShowControllers(true);
            setWorkPhotoAppear(true);
          } else {
            setWorkPhotoAtCenter(true);
            setShowControllers(false);
            setWorkPhotoAppear(false);
          }
        },
      },
    });

    if (workImagesWrapperRef.current) {
      timeline
        .to(boxRef.current, {
          scale: 1,
          ease: 'power2.inOut',
        })
        .to(boxRef.current, {
          scale: 0,
          ease: 'power2.inOut',
        })
        .to(
          workBoxRef.current,
          {
            minWidth: '900px',
            ease: 'power2.inOut',
            onStart: () => {
              setWorkPhotoAtCenter(true);
              // setWorkPhotoAppear(false);
            },
            onComplete: () => {
              setWorkPhotoAtCenter(false);
            },
          },
          '<',
        );
    }

    return () => {
      timeline.kill();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div
      ref={workContainerRef}
      className='w-full h-[100vh] flex flex-col z-[70] items-center justify-center relative'
    >
      <div className='absolute w-full h-[200px] top-0 bg-white font-dante text-[22px] text-brand-primary flex gap-[550px] justify-center  pt-8 z-[70]'>
        <AnimatePresence mode='wait'>
          {showControllers && (
            <motion.p
              key={`title-${activeWorkDetails}`}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0, transition: { duration: 0.1 } }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className='text-[30px] w-[400px] text-right'
            >
              {works[activeWorkDetails].title}
            </motion.p>
          )}
        </AnimatePresence>

        <AnimatePresence mode='wait'>
          {showControllers && (
            <motion.p
              key={`index-${activeWorkDetails}`}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0, transition: { duration: 0.1 } }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className='absolute left-1/2 -translate-x-1/2'
            >
              0{activeWorkDetails + 1}
            </motion.p>
          )}
        </AnimatePresence>

        <AnimatePresence mode='wait'>
          {showControllers && (
            <motion.p
              key={`desc-${activeWorkDetails}`}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0, transition: { duration: 0.1 } }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className='w-[400px] leading-none'
            >
              {works[activeWorkDetails].desc}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      <div className='flex gap-8 w-full justify-center items-center '>
        <div className='flex items-center gap-3 text-[80px] font-dante text-brand-primary'>
          <AnimatePresence mode='wait'>
            {showControllers && (
              <motion.button
                onClick={() => handleWorkPhotoChange('prev')}
                className='text-[28px] font-medium  font-satoshi leading-none cursor-pointer w-[100px]'
                initial={{ y: 20 }}
                animate={{ y: 0 }}
                exit={{ y: 20, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                Prev
              </motion.button>
            )}
          </AnimatePresence>
          {'('}
        </div>

        <div
          ref={workBoxRef}
          className={`${
            activeWork > 0 ? 'min-w-[900px]' : 'min-w-[300px]'
          } flex justify-center ease-in-out `}
        >
          <div
            ref={boxRef}
            className='size-[200px] absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 flex justify-center items-center scale-[0.1] bg-brand-primary'
          >
            <p className='text-[40px] font-dante text-white leading-0'>Works</p>
          </div>

          <div
            ref={workImagesWrapperRef}
            className='w-full relative  h-[400px]'
          >
            {works[activeWork].coverImages.map((src, i) => {
              const slot = SLOT_POSITIONS[i];
              const bgColor = works[0].coverImages[i];

              const sizeClasses = Object.entries(slot)
                .map(([prop, value]) => {
                  if (prop === 'width') return `min-w-[${value}]`;
                  if (prop === 'height') return `min-h-[${value}]`;
                  return '';
                })
                .filter(Boolean)
                .join(' ');

              return (
                <div
                  key={i}
                  className={`absolute ${sizeClasses} ${bgColor}  duration-300 ease-in-out origin-top w-[200px] h-[300px] `}
                  style={{
                    top: `${workPhotoAtCenter ? '50' : slot.top}%`,
                    left: `${workPhotoAtCenter ? '50' : slot.left}%`,
                    transform: `${
                      workPhotoAtCenter ? 'translate(-50%, -50%)' : ''
                    }`,
                    opacity: `${workPhotoAppear ? 1 : 0}`,
                    scale: `${workPhotoAppear ? 1 : 0.5}`,
                  }}
                ></div>
              );
            })}
          </div>
        </div>

        <div className='flex items-center gap-3 text-[80px] font-dante text-brand-primary'>
          {')'}

          <AnimatePresence mode='wait'>
            {showControllers && (
              <motion.button
                onClick={() => handleWorkPhotoChange('next')}
                className='text-[28px] font-medium  font-satoshi leading-none cursor-pointer w-[100px]'
                initial={{ y: 20 }}
                animate={{ y: 0 }}
                exit={{ y: 20, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                Next
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
