import { useState, useEffect, useRef } from 'react';

/**
 * AnimatedCounter - Counts up from 0 to target value with synchronized timing
 */
const AnimatedCounter = ({ value, duration = 6000, startAnimation = false }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!startAnimation) return;
    
    let startTime;
    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      setCount(Math.floor(progress * value));
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    requestAnimationFrame(animate);
  }, [value, duration, startAnimation]);

  return <span>{count}</span>;
};

/**
 * StatsDisplay Component - Pfizer-Inspired Design
 * 
 * Features:
 * - Clean card design with primary blue accent
 * - Large animated numbers
 * - Synchronized counting animation
 * - Responsive grid layout
 * 
 * @param {Array} stats - Array of stat objects { value, label }
 * @param {string} columns - Grid columns class
 * @param {boolean} animate - Enable counter animation
 * @param {string} variant - 'cards' | 'minimal' | 'navy'
 */
const StatsDisplay = ({ 
  stats = [], 
  columns = 'grid-cols-2 md:grid-cols-4',
  animate = true,
  variant = 'cards'
}) => {
  const [startAnimation, setStartAnimation] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    if (!animate) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !startAnimation) {
          setStartAnimation(true);
        }
      },
      { threshold: 0.3 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [animate, startAnimation]);

  if (!stats || stats.length === 0) {
    return null;
  }

  // Variant styles
  const getCardStyles = () => {
    switch (variant) {
      case 'navy':
        return 'bg-[#001F3F] text-white border-2 border-[#0052CC]';
      case 'minimal':
        return 'bg-transparent';
      default:
        return 'bg-white border-2 border-gray-200 hover:border-[#0052CC] shadow-sm hover:shadow-md';
    }
  };

  const getNumberStyles = () => {
    switch (variant) {
      case 'navy':
        return 'text-[#0052CC]';
      case 'minimal':
        return 'text-[#0052CC]';
      default:
        return 'text-[#0052CC]';
    }
  };

  const getLabelStyles = () => {
    switch (variant) {
      case 'navy':
        return 'text-gray-300';
      case 'minimal':
        return 'text-gray-600';
      default:
        return 'text-gray-700';
    }
  };

  return (
    <div 
      ref={containerRef}
      className={`grid ${columns} gap-4 sm:gap-6`}
      role="list"
      aria-label="Statistics"
    >
      {stats.map((stat, index) => (
        <div 
          key={index}
          className={`rounded-lg p-6 sm:p-8 text-center transition-all duration-300 ${getCardStyles()}`}
          role="listitem"
        >
          {/* Large Number */}
          <p className={`text-4xl sm:text-5xl md:text-6xl font-bold mb-3 ${getNumberStyles()}`}>
            {animate ? (
              <AnimatedCounter value={stat.value} duration={6000} startAnimation={startAnimation} />
            ) : (
              stat.value
            )}
          </p>
          
          {/* Label */}
          <p className={`text-sm sm:text-base font-medium ${getLabelStyles()}`}>
            {stat.label}
          </p>
        </div>
      ))}
    </div>
  );
};

export default StatsDisplay;
