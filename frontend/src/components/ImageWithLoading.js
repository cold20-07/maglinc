import React, { useState, useEffect } from 'react';

/**
 * Image component with loading state and skeleton screen
 * Respects prefers-reduced-motion for fade-in animation
 */
const ImageWithLoading = ({ 
  src, 
  alt, 
  className = '', 
  skeletonClassName = '',
  onLoad,
  onError,
  ...props 
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [imageSrc, setImageSrc] = useState(null);

  useEffect(() => {
    if (!src) {
      setIsLoading(false);
      setHasError(true);
      return;
    }

    setIsLoading(true);
    setHasError(false);

    // Preload image
    const img = new Image();
    
    img.onload = () => {
      setImageSrc(src);
      setIsLoading(false);
      if (onLoad) onLoad();
    };

    img.onerror = () => {
      setIsLoading(false);
      setHasError(true);
      if (onError) onError();
    };

    img.src = src;

    // Cleanup
    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [src, onLoad, onError]);

  // Check if user prefers reduced motion
  const prefersReducedMotion = 
    typeof window !== 'undefined' && 
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (hasError) {
    return (
      <div 
        className={`flex items-center justify-center bg-gray-100 ${className}`}
        role="img"
        aria-label={alt || 'Image failed to load'}
      >
        <div className="text-center p-8">
          <svg 
            className="w-16 h-16 mx-auto text-gray-400 mb-2" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" 
            />
          </svg>
          <p className="text-sm text-gray-500">Image unavailable</p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div 
        className={`skeleton ${skeletonClassName || className}`}
        role="img"
        aria-label="Loading image"
        aria-busy="true"
      />
    );
  }

  return (
    <img
      src={imageSrc}
      alt={alt}
      className={`${className} ${prefersReducedMotion ? '' : 'image-loaded'}`}
      loading="lazy"
      {...props}
    />
  );
};

export default ImageWithLoading;
