import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ImageWithLoading from './ImageWithLoading';
import useScrollAnimation from '../hooks/useScrollAnimation';

/**
 * HeroSection Component - Full-Width Background Image Style
 * 
 * Features:
 * - Full-width background image with overlay
 * - Text overlay on left side
 * - Single CTA button
 * - Responsive height
 */
const HeroSection = ({ 
  title, 
  titlePart1,
  titlePart2,
  subtitle, 
  primaryCTA, 
  secondaryCTA, 
  imageSrc,
  imageAlt = "Professional consulting",
  variant = 'default'
}) => {
  const [contentRef] = useScrollAnimation({ threshold: 0.2 });

  return (
    <section 
      className="relative w-full min-h-screen flex items-center pt-16"
      aria-label="Hero section"
      style={{
        backgroundImage: imageSrc 
          ? `linear-gradient(to right, rgba(0, 31, 63, 0.7), rgba(0, 82, 204, 0.3)), url(${imageSrc})`
          : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Placeholder background if no image */}
      {!imageSrc && (
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.4"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")'
          }}
          aria-hidden="true"
        />
      )}

      <div className="container mx-auto px-6 lg:px-8 relative z-10" style={{ maxWidth: '1400px' }}>
        <div className="max-w-2xl" ref={contentRef}>
          {/* Main Headline */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-white">
            {titlePart1 && titlePart2 ? (
              <>
                {titlePart1} {titlePart2}
              </>
            ) : (
              title
            )}
          </h1>
          
          {/* Subheadline */}
          <p className="text-lg md:text-xl mb-8 leading-relaxed text-white/90 max-w-xl">
            {subtitle}
          </p>
          
          {/* CTA Button */}
          {primaryCTA && (
            <Button
              onClick={primaryCTA.onClick}
              className="bg-[#0052CC] hover:bg-[#003BA3] text-white px-8 py-6 text-base font-medium rounded-full transition-all duration-200"
            >
              {primaryCTA.text}
            </Button>
          )}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
