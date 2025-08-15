'use client';

import React, {
  useEffect,
  useState,
  useCallback,
  useMemo,
  useRef,
} from 'react';

interface Square {
  id: number;
  row: number;
  col: number;
  delay: number;
}

interface GridConfig {
  rows: number;
  cols: number;
  squareSize: number;
}

const SquareCover: React.FC = () => {
  const [squares, setSquares] = useState<Square[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const [gridConfig, setGridConfig] = useState<GridConfig>({
    rows: 0,
    cols: 0,
    squareSize: 0,
  });

  const containerRef = useRef<HTMLDivElement>(null);
  const resizeTimeoutRef = useRef<NodeJS.Timeout>(null);
  const animationStartedRef = useRef(false);

  const calculateSquareSize = useCallback(
    (width: number, height: number): number => {
      return Math.max(30, Math.min(50, Math.min(width, height) / 40));
    },
    [],
  );

  const shuffleArray = useCallback(<T,>(array: T[]): T[] => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }, []);

  const generateGrid = useCallback(() => {
    const containerWidth = window.innerWidth;
    const containerHeight = window.innerHeight;

    const squareSize = calculateSquareSize(containerWidth, containerHeight);
    const cols = Math.ceil(containerWidth / squareSize);
    const rows = Math.ceil(containerHeight / squareSize);

    const newGridConfig = { rows, cols, squareSize };
    setGridConfig(newGridConfig);

    // Create all grid positions
    const allPositions: Omit<Square, 'delay'>[] = [];
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        allPositions.push({
          id: row * cols + col,
          row,
          col,
        });
      }
    }

    const shuffledPositions = shuffleArray(allPositions);

    // Create smooth staggered animation timing
    const totalSquares = shuffledPositions.length;
    const animationDuration = 2000;

    const newSquares: Square[] = shuffledPositions.map((pos, index) => ({
      ...pos,
      delay: (index / totalSquares) * animationDuration,
    }));

    setSquares(newSquares);
  }, [calculateSquareSize, shuffleArray]);

  // Debounced resize handler
  const handleResize = useCallback(() => {
    if (resizeTimeoutRef.current) {
      clearTimeout(resizeTimeoutRef.current);
    }

    resizeTimeoutRef.current = setTimeout(() => {
      generateGrid();
      if (animationStartedRef.current) {
        setIsVisible(false);
        requestAnimationFrame(() => {
          setTimeout(() => setIsVisible(true), 50);
        });
      }
    }, 150);
  }, [generateGrid]);

  const containerStyle = useMemo(
    () => ({
      position: 'fixed' as const,
      zIndex: 50,
      inset: '0',
      width: '100vw',
      height: '100vh',
      backgroundColor: 'transparent',
      overflow: 'hidden',
      pointerEvents: 'none' as const,
    }),
    [],
  );

  useEffect(() => {
    generateGrid();

    const timer = setTimeout(() => {
      setIsVisible(true);
      animationStartedRef.current = true;
    }, 100);

    return () => {
      clearTimeout(timer);
      if (resizeTimeoutRef.current) {
        clearTimeout(resizeTimeoutRef.current);
      }
    };
  }, [generateGrid]);

  useEffect(() => {
    const handleResizeEvent = () => handleResize();

    window.addEventListener('resize', handleResizeEvent, { passive: true });
    return () => {
      window.removeEventListener('resize', handleResizeEvent);
    };
  }, [handleResize]);

  // Memoize square components to prevent unnecessary re-renders
  const squareElements = useMemo(() => {
    return squares.map((square) => (
      <div
        key={square.id}
        className='absolute bg-white will-change-opacity'
        style={{
          width: gridConfig.squareSize,
          height: gridConfig.squareSize,
          left: square.col * gridConfig.squareSize,
          top: square.row * gridConfig.squareSize,
          opacity: isVisible ? 1 : 0,
          transition: 'opacity 0.3s ease-out',
          transitionDelay: isVisible ? `${square.delay}ms` : '0ms',
        }}
      />
    ));
  }, [squares, gridConfig, isVisible]);

  return (
    <div ref={containerRef} style={containerStyle}>
      {squareElements}
    </div>
  );
};

export default SquareCover;
