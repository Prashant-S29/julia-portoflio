'use client';

import React, { useEffect } from 'react';

import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Lenis Smooth Scroll
import Lenis from 'lenis';

interface Props {
  children: React.ReactNode;
}

export const Provider: React.FC<Props> = ({ children }) => {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 2,
    });
    function raf(time: number) {
      lenis.raf(time);
      ScrollTrigger.update();
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  });

  return children;
};
