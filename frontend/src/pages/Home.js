import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  CheckCircle2, Clock, TrendingUp, Globe,
  MapPin, FileText, ShieldCheck, PenTool, AlertTriangle, Folder, ArrowRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import HeroSection from '@/components/HeroSection';
import ServiceCard from '@/components/ServiceCard';
import StatsDisplay from '@/components/StatsDisplay';
import TestimonialCard from '@/components/TestimonialCard';
import BlogCard from '@/components/BlogCard';
import CTASection from '@/components/CTASection';
import { getStats, getTestimonials, getServices, getBlogPosts } from '@/lib/api';
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
 * Home Page - Pfizer-Inspired Design
 * 
 * Sections:
 * 1. Hero - Full-width with gradient option
 * 2. Stats - Animated counters
 * 3. Services - 3-column grid
 * 4. Testimonials - Carousel
 * 5. Blog/Insights - Latest articles
 * 6. CTA - Final call to action
 */
const Home = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [testimonials, setTestimonials] = useState([]);
  const [services, setServices] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  
  // Scroll animation refs
  const [statsRef] = useScrollAnimation({ threshold: 0.1 });
  const [servicesRef] = useScrollAnimation({ threshold: 0.1 });
  const [testimonialsRef] = useScrollAnimation({ threshold: 0.1 });
  const [blogsRef] = useScrollAnimation({ threshold: 0.1 });

  useEffect(() => {
    fetchData();
  }, []);

  // Horizontal scroll functionality
  useEffect(() => {
    const container = document.getElementById('services-scroll-container');
    const progressBar = document.getElementById('scroll-progress');
    const leftBtn = document.getElementById('scroll-left');
    const rightBtn = document.getElementById('scroll-right');

    if (!container || !progressBar || !leftBtn || !rightBtn) return;

    const updateProgress = () => {
      const scrollPercentage = (container.scrollLeft / (container.scrollWidth - container.clientWidth)) * 100;
      progressBar.style.width = `${Math.min(scrollPercentage, 100)}%`;
    };

    const scrollLeft = () => {
      container.scrollBy({ left: -340, behavior: 'smooth' });
    };

    const scrollRight = () => {
      container.scrollBy({ left: 340, behavior: 'smooth' });
    };

    container.addEventListener('scroll', updateProgress);
    leftBtn.addEventListener('click', scrollLeft);
    rightBtn.addEventListener('click', scrollRight);

    return () => {
      container.removeEventListener('scroll', updateProgress);
      leftBtn.removeEventListener('click', scrollLeft);
      rightBtn.removeEventListener('click', scrollRight);
    };
  }, [services]);

  // Auto-rotate testimonials
  useEffect(() => {
    if (testimonials.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentTestimonial(prev => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  const fetchData = async () => {
    try {
      const [statsData, testimonialsData, servicesData, blogsData] = await Promise.all([
        Promise.resolve(getStats()),
        getTestimonials(),
        getServices(),
        getBlogPosts()
      ]);
      setStats(statsData);
      setTestimonials(testimonialsData);
      setServices(servicesData); // Show all services
      setBlogs(blogsData.slice(0, 3));
    } catch (e) {
      console.error('Error fetching data:', e);
    }
  };

  return (
    <div className="overflow-hidden">
      {/* ============================================
          HERO SECTION
          ============================================ */}
      <HeroSection
        titlePart1="Get Your Therapy to Market —"
        titlePart2="30% Faster."
        subtitle="Expert pharmaceutical consulting that accelerates regulatory approvals, ensures compliance, and turns complex challenges into competitive advantages."
        primaryCTA={{
          text: 'Request Free Strategy Call',
          onClick: () => navigate('/contact')
        }}
        secondaryCTA={{
          text: 'Explore Services',
          onClick: () => navigate('/services')
        }}
        imageSrc="/hero-image.png"
        imageAlt="Pharmaceutical consulting professional"
      />

      {/* ============================================
          ABOUT & STATS SECTION
          ============================================ */}
      <section 
        className="py-16 sm:py-20 md:py-24 bg-white"
        aria-labelledby="about-heading"
      >
        <div 
          className="container mx-auto px-6 lg:px-8" 
          style={{ maxWidth: '1400px' }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left: About Content */}
            <div ref={statsRef} className="fade-in-section">
              <h2 
                id="about-heading"
                className="text-sm font-semibold text-gray-600 mb-4 uppercase tracking-wide"
              >
                About
              </h2>
              <p className="text-2xl sm:text-3xl md:text-4xl leading-relaxed text-gray-900 mb-8">
                Starting with Charles Pfizer inventing an almond-flavored antiparasite medicine in 1849, 
                our people have always been innovators and trailblazers, committed to finding the next cure.
              </p>
              <Button 
                onClick={() => navigate('/about')} 
                className="bg-[#0052CC] hover:bg-[#003BA3] text-white px-8 py-6 text-base font-medium rounded-full"
              >
                Learn More About Us
              </Button>
            </div>

            {/* Right: Stats Grid */}
            <div>
              <p className="text-sm text-gray-600 mb-6">
                Pipeline Snapshot as of November 4, 2025
              </p>
              <StatsDisplay 
                stats={[
                  { label: 'Successful Submissions', value: 34 },
                  { label: 'Project Weeks Saved', value: 112 },
                  { label: 'Years of Experience', value: 25 },
                  { label: 'Countries Served', value: 9 }
                ]}
                columns="grid-cols-2"
                animate={true}
                variant="cards"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
          AREAS OF FOCUS SECTION
          ============================================ */}
      <section 
        className="min-h-screen flex items-center py-16 sm:py-20 bg-[#F9FAFB]"
        aria-labelledby="services-heading"
      >
        <div className="w-full">
          <div 
            className="container mx-auto px-6 lg:px-8 mb-12" 
            style={{ maxWidth: '1400px' }}
          >
            <div ref={servicesRef} className="fade-in-section">
              <h2 
                id="services-heading"
                className="text-sm font-semibold text-gray-600 mb-6 uppercase tracking-wide"
              >
                Areas of Focus
              </h2>
              <p className="text-2xl sm:text-3xl md:text-4xl leading-relaxed text-gray-900 max-w-4xl">
                Revolutionary medicines enable us to enrich and extend life for people living with all types of diseases.
              </p>
            </div>
          </div>

          {/* Horizontal Scrollable Services */}
          <div className="relative">
            <div 
              id="services-scroll-container"
              className="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory scrollbar-hide"
              style={{ 
                scrollBehavior: 'smooth',
                paddingLeft: 'max(1.5rem, calc((100vw - 1400px) / 2))',
                paddingRight: 'max(1.5rem, calc((100vw - 1400px) / 2))'
              }}
            >
              {services.map((service) => {
                const IconComponent = iconMap[service.icon] || MapPin;
                return (
                  <div 
                    key={service.id}
                    className="flex-shrink-0 w-[280px] sm:w-[320px] snap-start"
                  >
                    <div 
                      className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer group h-full"
                      onClick={() => navigate(`/services/${service.id}`)}
                    >
                      {/* Service Image */}
                      <div className="relative h-[280px] sm:h-[320px] bg-gradient-to-br from-blue-100 to-blue-200 overflow-hidden">
                        {service.image ? (
                          <img 
                            src={service.image} 
                            alt={service.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <IconComponent className="w-24 h-24 text-[#0052CC] opacity-30" />
                          </div>
                        )}
                      </div>
                      
                      {/* Service Info */}
                      <div className="p-6 flex items-center justify-between">
                        <h3 className="text-xl font-bold text-[#0052CC] group-hover:text-[#003BA3] transition-colors">
                          {service.title}
                        </h3>
                        <button 
                          className="w-10 h-10 rounded-full border-2 border-[#0052CC] flex items-center justify-center text-[#0052CC] hover:bg-[#0052CC] hover:text-white transition-all duration-300"
                          aria-label={`Learn more about ${service.title}`}
                        >
                          <span className="text-2xl leading-none">+</span>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Scroll Progress Bar */}
            <div className="container mx-auto px-6 lg:px-8 mt-8" style={{ maxWidth: '1400px' }}>
              <div className="h-1 bg-gray-300 rounded-full overflow-hidden">
                <div 
                  id="scroll-progress"
                  className="h-full bg-[#0052CC] rounded-full transition-all duration-300"
                  style={{ width: '25%' }}
                />
              </div>
              
              {/* Navigation Arrows */}
              <div className="flex gap-4 mt-6">
                <button
                  id="scroll-left"
                  className="w-12 h-12 rounded-full border-2 border-gray-400 flex items-center justify-center text-gray-600 hover:border-[#0052CC] hover:text-[#0052CC] transition-all duration-300"
                  aria-label="Scroll left"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  id="scroll-right"
                  className="w-12 h-12 rounded-full border-2 border-gray-400 flex items-center justify-center text-gray-600 hover:border-[#0052CC] hover:text-[#0052CC] transition-all duration-300"
                  aria-label="Scroll right"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
          TESTIMONIALS SECTION
          ============================================ */}
      {testimonials.length > 0 && (
        <section 
          className="py-16 sm:py-20 md:py-24 bg-[#F9FAFB]"
          aria-labelledby="testimonials-heading"
        >
          <div 
            className="container mx-auto px-4 sm:px-6 lg:px-8" 
            style={{ maxWidth: '1200px' }}
          >
            <h2 
              ref={testimonialsRef}
              id="testimonials-heading"
              className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#001F3F] text-center mb-10 sm:mb-12 fade-in-section"
            >
              What Our Clients Say
            </h2>
            
            <div className="max-w-3xl mx-auto">
              {/* Current Testimonial */}
              <div 
                role="region" 
                aria-live="polite"
                aria-label={`Testimonial ${currentTestimonial + 1} of ${testimonials.length}`}
              >
                <TestimonialCard
                  content={testimonials[currentTestimonial]?.content}
                  name={testimonials[currentTestimonial]?.name}
                  role={testimonials[currentTestimonial]?.role}
                  company={testimonials[currentTestimonial]?.company}
                />
              </div>
              
              {/* Navigation Dots */}
              {testimonials.length > 1 && (
                <div 
                  className="flex justify-center mt-6 sm:mt-8 gap-2" 
                  role="tablist" 
                  aria-label="Testimonial navigation"
                >
                  {testimonials.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentTestimonial(idx)}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        idx === currentTestimonial 
                          ? 'bg-[#0052CC] w-8' 
                          : 'bg-gray-300 hover:bg-gray-400'
                      }`}
                      role="tab"
                      aria-label={`View testimonial ${idx + 1}`}
                      aria-selected={idx === currentTestimonial}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* ============================================
          LATEST ARTICLES SECTION
          ============================================ */}
      {blogs.length > 0 && (
        <section 
          className="min-h-screen flex items-center py-16 sm:py-20 bg-white"
          aria-labelledby="insights-heading"
        >
          <div className="w-full">
            <div 
              className="container mx-auto px-6 lg:px-8 mb-12" 
              style={{ maxWidth: '1400px' }}
            >
              <div ref={blogsRef} className="fade-in-section">
                <h2 
                  id="insights-heading"
                  className="text-sm font-semibold text-gray-600 mb-6 uppercase tracking-wide"
                >
                  Latest Articles
                </h2>
              </div>
            </div>

            {/* Blog Articles */}
            <div className="container mx-auto px-6 lg:px-8" style={{ maxWidth: '1400px' }}>
              <div className="space-y-12">
                {blogs.map((post, index) => (
                  <article 
                    key={post.id}
                    className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center cursor-pointer group"
                    onClick={() => navigate(`/blog/${post.slug}`)}
                  >
                    {/* Left: Category & Content */}
                    <div className={`order-2 ${index % 2 === 0 ? 'lg:order-1' : 'lg:order-2'}`}>
                      {post.category && (
                        <span className="inline-block text-sm text-gray-600 mb-4">
                          {post.category.charAt(0).toUpperCase() + post.category.slice(1)}
                        </span>
                      )}
                      <h3 className="text-2xl sm:text-3xl font-bold text-[#0052CC] mb-4 group-hover:text-[#003BA3] transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-base text-gray-700 leading-relaxed">
                        {post.excerpt || 'Read this article to learn more...'}
                      </p>
                    </div>

                    {/* Right: Image */}
                    <div className={`order-1 ${index % 2 === 0 ? 'lg:order-2' : 'lg:order-1'}`}>
                      <div className="relative aspect-video rounded-lg overflow-hidden shadow-lg">
                        {post.featured_image ? (
                          <img 
                            src={post.featured_image} 
                            alt={post.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                            <span className="text-[#0052CC] text-sm font-medium">No image</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ============================================
          FINAL CTA SECTION
          ============================================ */}
      <CTASection
        title="Ready to Accelerate Your Approval?"
        subtitle="Let's discuss how we can help you reach the market faster with our proven regulatory expertise."
        cta={{
          text: 'Schedule Your Strategy Call',
          onClick: () => navigate('/contact')
        }}
        variant="navy"
      />
    </div>
  );
};

export default Home;
