import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

/**
 * CTASection Component - Pfizer-Inspired Design
 * 
 * Features:
 * - Navy or gradient background options
 * - Large headline with proper hierarchy
 * - Prominent CTA button
 * - 80px vertical padding
 * 
 * @param {string} title - Main heading text
 * @param {string} subtitle - Subheadline text
 * @param {object} cta - { text, onClick }
 * @param {string} variant - 'navy' | 'gradient' | 'white'
 */
const CTASection = ({ 
  title, 
  subtitle, 
  cta,
  variant = 'navy' 
}) => {
  // Background styles based on variant
  const getBackgroundClass = () => {
    switch (variant) {
      case 'gradient':
        return 'bg-gradient-to-r from-[#0052CC] to-[#001F3F]';
      case 'white':
        return 'bg-white';
      default:
        return 'bg-[#001F3F]';
    }
  };

  const isLight = variant === 'white';
  
  return (
    <section 
      className={`py-16 sm:py-20 md:py-24 ${getBackgroundClass()}`}
      aria-label="Call to action"
    >
      <div 
        className="container mx-auto px-4 sm:px-6 lg:px-8 text-center" 
        style={{ maxWidth: '900px' }}
      >
        {/* Heading */}
        <h2 className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-5 leading-tight ${
          isLight ? 'text-[#001F3F]' : 'text-white'
        }`}>
          {title}
        </h2>
        
        {/* Subheadline */}
        {subtitle && (
          <p className={`text-base sm:text-lg md:text-xl mb-6 sm:mb-8 max-w-2xl mx-auto ${
            isLight ? 'text-gray-600' : 'text-gray-300'
          }`}>
            {subtitle}
          </p>
        )}
        
        {/* CTA Button */}
        {cta && (
          <Button 
            onClick={cta.onClick}
            variant={isLight ? 'default' : 'accent'}
            size="xl"
            className="shadow-lg hover:shadow-xl"
          >
            {cta.text}
            <ArrowRight className="ml-2" size={20} aria-hidden="true" />
          </Button>
        )}
      </div>
    </section>
  );
};

export default CTASection;
