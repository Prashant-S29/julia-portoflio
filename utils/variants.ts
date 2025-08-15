export const fadeIn = (direction: 'up' | 'down') => {
  return {
    initial: { opacity: 0, y: direction === 'up' ? 20 : -20 },
    animate: { 
      opacity: 1, 
      y: 0,
    },
    exit: { opacity: 0 },
  };
};
