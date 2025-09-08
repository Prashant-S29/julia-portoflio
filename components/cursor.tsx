'use client';
import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export const Cursor: React.FC = () => {
  const [cursorScale, setCursorScale] = useState(1);

  const mouse = {
    x: useMotionValue(0),
    y: useMotionValue(0),
  };

  const scale = useMotionValue(1);

  const smoothOptions = { damping: 20, stiffness: 300, mass: 0.1 };
  const smoothMouse = {
    x: useSpring(mouse.x, smoothOptions),
    y: useSpring(mouse.y, smoothOptions),
  };

  const smoothScale = useSpring(scale, smoothOptions);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;

      const hoveredElement = document.elementFromPoint(clientX, clientY);
      let newScale = 1;

      if (hoveredElement) {
        const scaleValue =
          hoveredElement.getAttribute('data-cursor-scale') ||
          hoveredElement
            .closest('[data-cursor-scale]')
            ?.getAttribute('data-cursor-scale');
        if (scaleValue) {
          newScale = parseFloat(scaleValue);
        }
      }

      if (newScale !== cursorScale) {
        setCursorScale(newScale);
        scale.set(newScale);
      }
      mouse.x.set(clientX);
      mouse.y.set(clientY);
    };
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [cursorScale, mouse.x, mouse.y, scale]);

  return (
    <motion.div
      className='fixed w-6 h-6 bg-brand-primary'
      style={{
        left: smoothMouse.x,
        top: smoothMouse.y,
        x: -12,
        y: -12,
        scale: smoothScale,
      }}
    />
  );
};
