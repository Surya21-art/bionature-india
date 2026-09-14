import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'wouter';

interface PageTransitionProps {
  children: React.ReactNode;
}

export const PageTransition: React.FC<PageTransitionProps> = ({ children }) => {
  const [location] = useLocation();
  const [displayLocation, setDisplayLocation] = useState(location);
  const [transitionStage, setTransitionStage] = useState("fadeIn");

  useEffect(() => {
    if (location !== displayLocation) {
      setTransitionStage("fadeOut");
    }
  }, [location, displayLocation]);

  const variants = {
    fadeIn: {
      opacity: 1,
      scale: 1,
      filter: "blur(0px)",
      rotateY: 0,
      transition: {
        duration: 0.6,
      },
    },
    fadeOut: {
      opacity: 0,
      scale: 0.95,
      filter: "blur(4px)",
      rotateY: -2,
      transition: {
        duration: 0.4,
      },
    },
  };

  return (
    <AnimatePresence
      mode="wait"
      onExitComplete={() => {
        setDisplayLocation(location);
        setTransitionStage("fadeIn");
      }}
    >
      <motion.div
        key={displayLocation}
        variants={variants}
        initial="fadeOut"
        animate="fadeIn"
        exit="fadeOut"
        className="min-h-screen"
        style={{
          transformStyle: "preserve-3d",
          perspective: "1200px",
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

// Scroll-based animation hook
export const useScrollAnimation = () => {
  const [scrollY, setScrollY] = useState(0);
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('down');
  const [prevScrollY, setPrevScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollDirection(currentScrollY > prevScrollY ? 'down' : 'up');
      setScrollY(currentScrollY);
      setPrevScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [prevScrollY]);

  return { scrollY, scrollDirection };
};

// Scroll reveal component
interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  distance?: number;
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  className = '',
  delay = 0,
  direction = 'up',
  distance = 50,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [ref, setRef] = useState<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!ref) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '50px',
      }
    );

    observer.observe(ref);
    return () => observer.disconnect();
  }, [ref]);

  const getInitialTransform = () => {
    switch (direction) {
      case 'up':
        return { y: distance, opacity: 0, rotateX: 5 };
      case 'down':
        return { y: -distance, opacity: 0, rotateX: -5 };
      case 'left':
        return { x: distance, opacity: 0, rotateY: 5 };
      case 'right':
        return { x: -distance, opacity: 0, rotateY: -5 };
      default:
        return { y: distance, opacity: 0 };
    }
  };

  const getAnimateTransform = () => {
    return { 
      x: 0, 
      y: 0, 
      opacity: 1, 
      rotateX: 0, 
      rotateY: 0,
      transition: {
        duration: 0.8,
        delay: delay,
      },
    };
  };

  return (
    <motion.div
      ref={setRef}
      className={className}
      initial={getInitialTransform()}
      animate={isVisible ? getAnimateTransform() : getInitialTransform()}
      style={{ transformStyle: "preserve-3d" }}
    >
      {children}
    </motion.div>
  );
};

// Parallax scroll component
interface ParallaxProps {
  children: React.ReactNode;
  speed?: number;
  className?: string;
}

export const Parallax: React.FC<ParallaxProps> = ({
  children,
  speed = 0.5,
  className = '',
}) => {
  const { scrollY } = useScrollAnimation();

  return (
    <motion.div
      className={className}
      style={{
        transform: `translateY(${scrollY * speed}px) translateZ(0)`,
      }}
    >
      {children}
    </motion.div>
  );
};

// Floating element component
interface FloatingElementProps {
  children: React.ReactNode;
  intensity?: number;
  speed?: number;
  className?: string;
}

export const FloatingElement: React.FC<FloatingElementProps> = ({
  children,
  intensity = 10,
  speed = 2,
  className = '',
}) => {
  return (
    <motion.div
      className={className}
      animate={{
        y: [0, -intensity, 0],
        x: [0, intensity / 2, 0],
        rotateZ: [0, 1, 0],
      }}
      transition={{
        duration: speed,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      style={{ transformStyle: "preserve-3d" }}
    >
      {children}
    </motion.div>
  );
};