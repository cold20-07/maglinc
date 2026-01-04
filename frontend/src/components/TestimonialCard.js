import { Quote } from 'lucide-react';

/**
 * TestimonialCard Component - Pfizer-Inspired Design
 * 
 * Features:
 * - White card with shadow
 * - Quote icon in primary blue
 * - Professional typography
 * - Client info with border separator
 * 
 * @param {string} content - Testimonial quote text
 * @param {string} name - Client name
 * @param {string} role - Client role/position
 * @param {string} company - Client company name
 * @param {string} avatar - Optional avatar image URL
 */
const TestimonialCard = ({ 
  content, 
  name, 
  role, 
  company,
  avatar 
}) => {
  return (
    <article 
      className="bg-white rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-100"
      aria-label={`Testimonial from ${name}`}
    >
      {/* Quote Icon */}
      <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#E3F2FD] flex items-center justify-center mb-5 sm:mb-6">
        <Quote 
          size={24} 
          className="text-[#0052CC] sm:w-7 sm:h-7" 
          aria-hidden="true" 
        />
      </div>

      {/* Testimonial Content */}
      <blockquote className="mb-5 sm:mb-6">
        <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
          "{content}"
        </p>
      </blockquote>

      {/* Client Information */}
      <footer className="border-t border-gray-200 pt-4 sm:pt-5">
        <div className="flex items-center gap-3">
          {/* Avatar (optional) */}
          {avatar && (
            <img 
              src={avatar} 
              alt={`${name}'s profile`}
              className="w-12 h-12 rounded-full object-cover"
            />
          )}
          
          <div>
            {/* Client Name - Navy */}
            <cite className="not-italic font-semibold text-[#001F3F] text-base block">
              {name}
            </cite>
            
            {/* Role and Company */}
            <p className="text-sm text-gray-500">
              {role}{company && `, ${company}`}
            </p>
          </div>
        </div>
      </footer>
    </article>
  );
};

export default TestimonialCard;
