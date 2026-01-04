import React from 'react';

/**
 * Skeleton loader components for various content types
 * Used to show loading states while content is being fetched
 */

export const SkeletonText = ({ lines = 3, className = '' }) => {
  return (
    <div className={className}>
      {Array.from({ length: lines }).map((_, index) => (
        <div 
          key={index}
          className="skeleton skeleton-text"
          style={{ width: index === lines - 1 ? '70%' : '100%' }}
        />
      ))}
    </div>
  );
};

export const SkeletonHeading = ({ className = '' }) => {
  return <div className={`skeleton skeleton-heading ${className}`} />;
};

export const SkeletonImage = ({ className = '', aspectRatio = 'video' }) => {
  const aspectClasses = {
    video: 'aspect-video',
    square: 'aspect-square',
    portrait: 'aspect-[4/5]',
  };

  return (
    <div 
      className={`skeleton ${aspectClasses[aspectRatio] || aspectClasses.video} ${className}`}
    />
  );
};

export const SkeletonCard = ({ className = '' }) => {
  return (
    <div className={`bg-white rounded-2xl p-6 shadow-md ${className}`}>
      <div className="skeleton skeleton-image mb-4" style={{ height: '200px' }} />
      <div className="skeleton skeleton-heading mb-3" style={{ width: '80%' }} />
      <SkeletonText lines={3} />
      <div className="skeleton skeleton-text mt-4" style={{ width: '40%' }} />
    </div>
  );
};

export const SkeletonServiceCard = ({ className = '' }) => {
  return (
    <div className={`bg-white rounded-2xl p-8 shadow-md ${className}`}>
      <div className="skeleton skeleton-avatar mb-6" />
      <div className="skeleton skeleton-heading mb-3" style={{ width: '70%' }} />
      <SkeletonText lines={4} className="mb-4" />
      <div className="space-y-2 mb-6">
        <div className="skeleton skeleton-text" style={{ width: '90%' }} />
        <div className="skeleton skeleton-text" style={{ width: '85%' }} />
        <div className="skeleton skeleton-text" style={{ width: '80%' }} />
      </div>
      <div className="skeleton skeleton-text" style={{ width: '30%' }} />
    </div>
  );
};

export const SkeletonBlogCard = ({ className = '' }) => {
  return (
    <div className={`bg-white rounded-2xl overflow-hidden shadow-md ${className}`}>
      <div className="skeleton aspect-video" />
      <div className="p-6">
        <div className="flex gap-4 mb-3">
          <div className="skeleton skeleton-text" style={{ width: '80px' }} />
          <div className="skeleton skeleton-text" style={{ width: '80px' }} />
        </div>
        <div className="skeleton skeleton-heading mb-2" style={{ width: '90%' }} />
        <SkeletonText lines={3} className="mb-4" />
        <div className="skeleton skeleton-text" style={{ width: '30%' }} />
      </div>
    </div>
  );
};

export const SkeletonTestimonial = ({ className = '' }) => {
  return (
    <div className={`bg-white rounded-2xl p-8 shadow-md ${className}`}>
      <div className="skeleton skeleton-text mb-4" style={{ width: '100%', height: '80px' }} />
      <div className="flex items-center gap-4">
        <div className="skeleton skeleton-avatar" />
        <div className="flex-1">
          <div className="skeleton skeleton-text mb-2" style={{ width: '60%' }} />
          <div className="skeleton skeleton-text" style={{ width: '40%' }} />
        </div>
      </div>
    </div>
  );
};

export const SkeletonHero = ({ className = '' }) => {
  return (
    <div className={`grid md:grid-cols-2 gap-12 items-center ${className}`}>
      <div>
        <div className="skeleton skeleton-heading mb-4" style={{ height: '3rem' }} />
        <SkeletonText lines={3} className="mb-6" />
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="skeleton" style={{ height: '80px' }} />
          <div className="skeleton" style={{ height: '80px' }} />
          <div className="skeleton" style={{ height: '80px' }} />
        </div>
        <div className="flex gap-4">
          <div className="skeleton" style={{ width: '150px', height: '48px' }} />
          <div className="skeleton" style={{ width: '150px', height: '48px' }} />
        </div>
      </div>
      <div className="skeleton aspect-square rounded-2xl" />
    </div>
  );
};

export const SkeletonGrid = ({ count = 3, type = 'card', className = '' }) => {
  const SkeletonComponent = {
    card: SkeletonCard,
    service: SkeletonServiceCard,
    blog: SkeletonBlogCard,
    testimonial: SkeletonTestimonial,
  }[type] || SkeletonCard;

  return (
    <div className={`grid md:grid-cols-2 lg:grid-cols-3 gap-8 ${className}`}>
      {Array.from({ length: count }).map((_, index) => (
        <SkeletonComponent key={index} />
      ))}
    </div>
  );
};

const SkeletonLoader = {
  Text: SkeletonText,
  Heading: SkeletonHeading,
  Image: SkeletonImage,
  Card: SkeletonCard,
  ServiceCard: SkeletonServiceCard,
  BlogCard: SkeletonBlogCard,
  Testimonial: SkeletonTestimonial,
  Hero: SkeletonHero,
  Grid: SkeletonGrid,
};

export default SkeletonLoader;
