import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  MapPin, FileText, ShieldCheck, PenTool, AlertTriangle, Folder,
  CheckCircle2, ArrowLeft, ArrowRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import CTASection from '@/components/CTASection';
import { getServices } from '@/lib/api';
import useScrollAnimation from '@/hooks/useScrollAnimation';

// Icon mapping
const iconMap = {
  'map-pin': MapPin,
  'file-text': FileText,
  'shield-check': ShieldCheck,
  'pen-tool': PenTool,
  'alert-triangle': AlertTriangle,
  'folder': Folder
};

/**
 * ServiceDetail Page - Pfizer-Inspired Design
 * 
 * Displays detailed information about a specific service.
 */
const ServiceDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [service, setService] = useState(null);
  const [relatedServices, setRelatedServices] = useState([]);
  const [headerRef] = useScrollAnimation({ threshold: 0.1 });
  const [contentRef] = useScrollAnimation({ threshold: 0.1 });

  useEffect(() => {
    fetchService();
  }, [id]);

  const fetchService = async () => {
    try {
      const servicesData = await getServices();
      const foundService = servicesData.find(s => s.id === id);
      setService(foundService);
      const related = servicesData.filter(s => s.id !== id).slice(0, 3);
      setRelatedServices(related);
    } catch (e) {
      console.error('Error fetching service:', e);
    }
  };

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#0052CC] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-lg text-gray-600">Loading service...</p>
        </div>
      </div>
    );
  }

  const IconComponent = iconMap[service.icon] || MapPin;

  return (
    <div className="min-h-screen bg-white">
      {/* ============================================
          PAGE HEADER
          ============================================ */}
      <section 
        className="bg-[#F9FAFB] pt-28 sm:pt-32 pb-12 sm:pb-16"
        aria-labelledby="service-heading"
      >
        <div 
          ref={headerRef}
          className="container mx-auto px-4 sm:px-6 lg:px-8 fade-in-section" 
          style={{ maxWidth: '1000px' }}
        >
          {/* Back Button */}
          <Button 
            variant="ghost" 
            onClick={() => navigate('/services')}
            className="mb-6 text-gray-600 hover:text-[#0052CC]"
          >
            <ArrowLeft size={18} className="mr-2" aria-hidden="true" />
            Back to Services
          </Button>
          
          <div className="flex flex-col md:flex-row items-start gap-6 md:gap-8">
            {/* Icon Container */}
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-[#E3F2FD] flex items-center justify-center flex-shrink-0">
              <IconComponent size={36} className="text-[#0052CC] md:w-10 md:h-10" aria-hidden="true" />
            </div>
            
            {/* Title and Description */}
            <div className="flex-1">
              <h1 
                id="service-heading"
                className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#001F3F] mb-4 leading-tight"
              >
                {service.title}
              </h1>
              <p className="text-lg sm:text-xl text-gray-600 leading-relaxed">
                {service.description}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
          FEATURES SECTION
          ============================================ */}
      <section 
        className="bg-white py-12 sm:py-16 md:py-20"
        aria-labelledby="features-heading"
      >
        <div 
          ref={contentRef}
          className="container mx-auto px-4 sm:px-6 lg:px-8 fade-in-section" 
          style={{ maxWidth: '1000px' }}
        >
          <h2 
            id="features-heading"
            className="text-2xl sm:text-3xl font-bold text-[#001F3F] mb-8"
          >
            What's Included
          </h2>
          
          {/* Features Grid */}
          <div className="grid sm:grid-cols-2 gap-4 mb-10">
            {service.features && service.features.map((feature, idx) => (
              <div 
                key={idx} 
                className="flex items-start gap-3 p-5 bg-white border border-gray-200 rounded-xl hover:border-[#0052CC]/30 hover:shadow-md transition-all"
              >
                <CheckCircle2 
                  size={22} 
                  className="text-[#4CAF50] flex-shrink-0 mt-0.5" 
                  aria-hidden="true"
                />
                <span className="text-gray-700 leading-relaxed">
                  {feature}
                </span>
              </div>
            ))}
          </div>

          {/* Success Story */}
          {service.case_study_snippet && (
            <div className="bg-[#E3F2FD] rounded-xl p-6 sm:p-8 border border-[#BBDEFB]">
              <h3 className="text-xl font-bold text-[#001F3F] mb-3">
                Success Story
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {service.case_study_snippet}
              </p>
            </div>
          )}

          {/* CTA Button */}
          <div className="mt-10 text-center">
            <Button 
              onClick={() => navigate('/contact')}
              variant="default"
              size="lg"
            >
              Get Started with {service.title}
              <ArrowRight className="ml-2" size={18} aria-hidden="true" />
            </Button>
          </div>
        </div>
      </section>

      {/* ============================================
          RELATED SERVICES
          ============================================ */}
      {relatedServices.length > 0 && (
        <section 
          className="bg-[#F9FAFB] py-12 sm:py-16 md:py-20"
          aria-labelledby="related-heading"
        >
          <div 
            className="container mx-auto px-4 sm:px-6 lg:px-8" 
            style={{ maxWidth: '1200px' }}
          >
            <h2 
              id="related-heading"
              className="text-2xl sm:text-3xl font-bold text-[#001F3F] mb-10 text-center"
            >
              Related Services
            </h2>
            
            <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
              {relatedServices.map((relatedService) => {
                const RelatedIcon = iconMap[relatedService.icon] || MapPin;
                return (
                  <article
                    key={relatedService.id}
                    className="bg-white rounded-xl p-6 sm:p-8 shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer group border border-gray-100"
                    onClick={() => navigate(`/services/${relatedService.id}`)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        navigate(`/services/${relatedService.id}`);
                      }
                    }}
                    role="button"
                    tabIndex={0}
                    aria-label={`View ${relatedService.title}`}
                  >
                    {/* Icon */}
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-[#E3F2FD] flex items-center justify-center mb-5 group-hover:bg-[#0052CC] transition-colors">
                      <RelatedIcon 
                        size={24} 
                        className="text-[#0052CC] group-hover:text-white transition-colors" 
                        aria-hidden="true" 
                      />
                    </div>
                    
                    {/* Title */}
                    <h3 className="text-lg sm:text-xl font-bold text-[#001F3F] mb-2 group-hover:text-[#0052CC] transition-colors">
                      {relatedService.title}
                    </h3>
                    
                    {/* Description */}
                    <p className="text-gray-600 text-sm sm:text-base mb-4 line-clamp-2">
                      {relatedService.description}
                    </p>
                    
                    {/* Learn More */}
                    <div className="flex items-center text-[#0052CC] font-semibold text-sm group-hover:translate-x-1 transition-transform">
                      <span>Learn More</span>
                      <ArrowRight size={16} className="ml-1" aria-hidden="true" />
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ============================================
          CTA SECTION
          ============================================ */}
      <CTASection
        title="Ready to Get Started?"
        subtitle="Let's discuss how this service can help your pharmaceutical project succeed."
        cta={{
          text: "Schedule a Consultation",
          onClick: () => navigate('/contact')
        }}
        variant="navy"
      />
    </div>
  );
};

export default ServiceDetail;
