import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  MapPin, FileText, ShieldCheck, PenTool, AlertTriangle, Folder,
  ArrowRight, Phone, Search, Map, Target
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import ServiceCard from '@/components/ServiceCard';
import CTASection from '@/components/CTASection';
import { getServices } from '@/lib/api';
import useScrollAnimation from '@/hooks/useScrollAnimation';

// Icon mapping for services
const iconMap = {
  'map-pin': MapPin,
  'file-text': FileText,
  'shield-check': ShieldCheck,
  'pen-tool': PenTool,
  'alert-triangle': AlertTriangle,
  'folder': Folder
};

/**
 * Services Page - Pfizer-Inspired Design
 * 
 * Sections:
 * 1. Hero - Simple centered headline
 * 2. Services Grid - All services
 * 3. Process - How we work (4 steps)
 * 4. CTA - Final call to action
 */
const Services = () => {
  const navigate = useNavigate();
  const [services, setServices] = useState([]);
  const [heroRef] = useScrollAnimation({ threshold: 0.1 });
  const [servicesRef] = useScrollAnimation({ threshold: 0.1 });
  const [processRef] = useScrollAnimation({ threshold: 0.1 });

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const data = await getServices();
      setServices(data);
    } catch (e) {
      console.error('Error fetching services:', e);
    }
  };

  // Process steps data
  const processSteps = [
    { 
      step: '01', 
      title: 'Initial Consultation', 
      desc: 'We discuss your goals, challenges, and regulatory requirements in a no-obligation call.',
      icon: Phone
    },
    { 
      step: '02', 
      title: 'Deep-Dive Analysis', 
      desc: 'Our team conducts a thorough assessment of your situation and identifies key opportunities.',
      icon: Search
    },
    { 
      step: '03', 
      title: 'Strategic Roadmap', 
      desc: 'Receive a detailed, actionable plan with clear timelines and milestones.',
      icon: Map
    },
    { 
      step: '04', 
      title: 'Execution & Support', 
      desc: 'We work alongside you, providing ongoing guidance until regulatory approval.',
      icon: Target
    }
  ];

  return (
    <div className="min-h-screen">
      {/* ============================================
          HERO SECTION
          ============================================ */}
      <section 
        className="bg-gradient-to-br from-[#0052CC] via-[#003BA3] to-[#001F3F] pt-28 sm:pt-32 md:pt-36 pb-16 sm:pb-20"
        aria-labelledby="services-hero-heading"
      >
        <div 
          ref={heroRef}
          className="container mx-auto px-4 sm:px-6 lg:px-8 text-center fade-in-section" 
          style={{ maxWidth: '900px' }}
        >
          <h1 
            id="services-hero-heading"
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6"
          >
            Comprehensive Regulatory Solutions
          </h1>
          <p className="text-lg sm:text-xl text-gray-200 mb-8 leading-relaxed">
            Expert pharmaceutical consulting services tailored to accelerate your path 
            to market and ensure compliance at every stage.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => navigate('/contact')}
              variant="accent"
              size="xl"
            >
              Schedule Consultation
              <ArrowRight className="ml-2" size={20} aria-hidden="true" />
            </Button>
            <Button
              onClick={() => {
                document.getElementById('services-grid')?.scrollIntoView({ behavior: 'smooth' });
              }}
              variant="outline"
              size="xl"
              className="border-white text-white hover:bg-white/10"
            >
              View All Services
            </Button>
          </div>
        </div>
      </section>

      {/* ============================================
          SERVICES GRID
          ============================================ */}
      <section 
        id="services-grid" 
        className="bg-[#F9FAFB] py-16 sm:py-20 md:py-24"
        aria-labelledby="services-grid-heading"
      >
        <div 
          className="container mx-auto px-4 sm:px-6 lg:px-8" 
          style={{ maxWidth: '1200px' }}
        >
          <div ref={servicesRef} className="text-center mb-12 sm:mb-16 fade-in-section">
            <h2 
              id="services-grid-heading"
              className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#001F3F] mb-3 sm:mb-4"
            >
              Our Services
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto">
              From regulatory strategy to post-approval support, we provide end-to-end 
              solutions for pharmaceutical companies worldwide.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 stagger-children">
            {services.map((service) => {
              const IconComponent = iconMap[service.icon] || MapPin;
              return (
                <ServiceCard
                  key={service.id}
                  id={service.id}
                  icon={IconComponent}
                  title={service.title}
                  description={service.description}
                  features={service.features}
                  maxFeatures={3}
                />
              );
            })}
          </div>
        </div>
      </section>

      {/* ============================================
          PROCESS SECTION - How We Work
          ============================================ */}
      <section 
        className="bg-white py-16 sm:py-20 md:py-24"
        aria-labelledby="process-heading"
      >
        <div 
          className="container mx-auto px-4 sm:px-6 lg:px-8" 
          style={{ maxWidth: '1200px' }}
        >
          <div ref={processRef} className="text-center mb-12 sm:mb-16 fade-in-section">
            <h2 
              id="process-heading"
              className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#001F3F] mb-3 sm:mb-4"
            >
              How We Work
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto">
              A proven, collaborative process designed to deliver results efficiently
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {processSteps.map((item, idx) => {
              const IconComponent = item.icon;
              return (
                <div key={idx} className="relative">
                  <article className="bg-white rounded-xl p-6 sm:p-8 shadow-md hover:shadow-xl transition-all h-full border border-gray-100">
                    {/* Icon Container */}
                    <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-[#E3F2FD] flex items-center justify-center mb-5 sm:mb-6">
                      <IconComponent className="text-[#0052CC]" size={28} aria-hidden="true" />
                    </div>
                    
                    {/* Step Number */}
                    <div className="text-xs sm:text-sm font-bold text-[#0052CC] mb-2 tracking-wide">
                      STEP {item.step}
                    </div>
                    
                    {/* Title */}
                    <h3 className="text-lg sm:text-xl font-bold text-[#001F3F] mb-3">
                      {item.title}
                    </h3>
                    
                    {/* Description */}
                    <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                      {item.desc}
                    </p>
                  </article>
                  
                  {/* Arrow between steps (desktop only) */}
                  {idx < 3 && (
                    <div 
                      className="hidden lg:flex absolute top-1/2 -right-4 transform -translate-y-1/2 z-10 w-8 h-8 bg-white rounded-full shadow-md items-center justify-center"
                      aria-hidden="true"
                    >
                      <ArrowRight size={16} className="text-[#0052CC]" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============================================
          CTA SECTION
          ============================================ */}
      <CTASection
        title="Ready to Get Started?"
        subtitle="Schedule a free consultation to discuss your regulatory needs and discover how we can help accelerate your path to market."
        cta={{
          text: "Schedule Your Consultation",
          onClick: () => navigate('/contact')
        }}
        variant="navy"
      />
    </div>
  );
};

export default Services;
