import { CheckCircle2, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

/**
 * ServiceCard Component - Pfizer-Inspired Design
 * 
 * Features:
 * - White background with subtle shadow
 * - Icon container with primary blue background
 * - Navy title, gray description
 * - Feature list with checkmarks
 * - "Learn More" link in primary blue
 * - Hover: shadow increase, slight lift
 * 
 * @param {string} id - Service ID for navigation
 * @param {Component} icon - Lucide icon component
 * @param {string} title - Service title
 * @param {string} description - Service description
 * @param {Array} features - List of feature strings
 * @param {number} maxFeatures - Max features to display
 * @param {function} onClick - Custom click handler
 */
const ServiceCard = ({ 
  id,
  icon: IconComponent, 
  title, 
  description, 
  features = [],
  maxFeatures = 3,
  onClick 
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else if (id) {
      navigate(`/services/${id}`);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  };

  // Limit features to display
  const displayFeatures = features.slice(0, maxFeatures);

  return (
    <article
      className="bg-white rounded-xl p-6 sm:p-8 shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer group border border-gray-100"
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-label={`View details for ${title}`}
    >
      {/* Icon Container - Primary Blue Background */}
      <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-[#E3F2FD] flex items-center justify-center mb-4 sm:mb-6 group-hover:bg-[#0052CC] group-hover:scale-105 transition-all duration-300">
        {IconComponent && (
          <IconComponent 
            size={28} 
            className="text-[#0052CC] group-hover:text-white transition-colors duration-300 sm:w-8 sm:h-8" 
            aria-hidden="true" 
          />
        )}
      </div>

      {/* Service Title - Navy */}
      <h3 className="text-xl sm:text-2xl font-bold text-[#001F3F] mb-3 sm:mb-4 group-hover:text-[#0052CC] transition-colors">
        {title}
      </h3>

      {/* Description - Gray */}
      <p className="text-base text-gray-600 mb-4 sm:mb-6 leading-relaxed">
        {description}
      </p>

      {/* Feature List with Checkmarks */}
      {displayFeatures.length > 0 && (
        <ul className="space-y-2 mb-4 sm:mb-6" aria-label={`${title} features`}>
          {displayFeatures.map((feature, idx) => (
            <li key={idx} className="flex items-start gap-2">
              <CheckCircle2 
                size={18} 
                className="text-[#4CAF50] flex-shrink-0 mt-0.5" 
                aria-hidden="true"
              />
              <span className="text-sm sm:text-base text-gray-700 leading-relaxed">
                {feature}
              </span>
            </li>
          ))}
        </ul>
      )}

      {/* Learn More Link - Primary Blue */}
      <div className="flex items-center text-[#0052CC] font-semibold group-hover:translate-x-2 transition-transform duration-300 min-h-[44px]">
        <span className="text-base">Learn More</span>
        <ArrowRight size={18} className="ml-2" aria-hidden="true" />
      </div>
    </article>
  );
};

export default ServiceCard;
