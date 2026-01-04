import { MapPin, Phone, Mail, Clock, CheckCircle } from 'lucide-react';
import ContactForm from '@/components/ContactForm';
import useScrollAnimation from '@/hooks/useScrollAnimation';

/**
 * Contact Page - Pfizer-Inspired Design
 * 
 * Sections:
 * 1. Hero - Simple centered headline
 * 2. Contact Form + Info - Two-column layout
 */
const Contact = () => {
  const [heroRef] = useScrollAnimation({ threshold: 0.1 });
  const [contentRef] = useScrollAnimation({ threshold: 0.1 });

  // Contact info data
  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      content: 'contact@mevoq.com',
      href: 'mailto:contact@mevoq.com'
    },
    {
      icon: Phone,
      title: 'Phone',
      content: '+1 (555) 123-4567',
      href: 'tel:+15551234567'
    },
    {
      icon: MapPin,
      title: 'Office',
      content: '123 Regulatory Way\nRockville, MD 20850\nUnited States',
      href: null
    }
  ];

  // Why choose us points
  const whyChooseUs = [
    'Former FDA reviewers on staff',
    '200+ successful drug approvals',
    '30% faster approval timelines',
    '25+ years of experience'
  ];

  return (
    <div className="min-h-screen">
      {/* ============================================
          HERO SECTION
          ============================================ */}
      <section 
        className="bg-white pt-28 sm:pt-32 md:pt-36 pb-12 sm:pb-16"
        aria-labelledby="contact-heading"
      >
        <div 
          ref={heroRef}
          className="container mx-auto px-4 sm:px-6 lg:px-8 text-center fade-in-section" 
          style={{ maxWidth: '800px' }}
        >
          <h1 
            id="contact-heading"
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#001F3F] mb-4 sm:mb-6"
          >
            Get in Touch
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 leading-relaxed">
            Ready to accelerate your regulatory approval? Let's discuss how we can help 
            transform your regulatory challenges into competitive advantages.
          </p>
        </div>
      </section>

      {/* ============================================
          CONTACT FORM & INFO
          ============================================ */}
      <section 
        className="bg-[#F9FAFB] py-12 sm:py-16 md:py-20"
        aria-label="Contact form and information"
      >
        <div 
          ref={contentRef}
          className="container mx-auto px-4 sm:px-6 lg:px-8 fade-in-section" 
          style={{ maxWidth: '1200px' }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Contact Form */}
            <div>
              <ContactForm 
                title="Send Us a Message"
                submitButtonText="Request Strategy Call"
                leadType="strategy_call"
              />
            </div>

            {/* Contact Information */}
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#001F3F] mb-6">
                Contact Information
              </h2>
              
              {/* Contact Info Cards */}
              <div className="space-y-4 mb-8">
                {contactInfo.map((item, idx) => {
                  const Icon = item.icon;
                  const ContentWrapper = item.href ? 'a' : 'div';
                  const wrapperProps = item.href ? { href: item.href } : {};
                  
                  return (
                    <div 
                      key={idx}
                      className="bg-white rounded-xl p-5 sm:p-6 shadow-md border border-gray-100 hover:shadow-lg transition-shadow"
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-lg bg-[#0052CC] flex items-center justify-center flex-shrink-0">
                          <Icon size={22} className="text-white" aria-hidden="true" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-[#001F3F] mb-1">
                            {item.title}
                          </h3>
                          <ContentWrapper 
                            {...wrapperProps}
                            className={`text-gray-600 whitespace-pre-line ${item.href ? 'hover:text-[#0052CC] transition-colors' : ''}`}
                          >
                            {item.content}
                          </ContentWrapper>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Business Hours */}
              <div className="bg-white rounded-xl p-5 sm:p-6 shadow-md border border-gray-100 mb-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-[#0052CC] flex items-center justify-center flex-shrink-0">
                    <Clock size={22} className="text-white" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#001F3F] mb-2">
                      Business Hours
                    </h3>
                    <div className="text-gray-600 space-y-1">
                      <p><span className="font-medium">Monday - Friday:</span> 9:00 AM - 6:00 PM EST</p>
                      <p><span className="font-medium">Saturday - Sunday:</span> Closed</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Why Choose Mevoq */}
              <div className="bg-[#E3F2FD] rounded-xl p-6 sm:p-8 border border-[#BBDEFB]">
                <h3 className="text-xl font-bold text-[#001F3F] mb-4">
                  Why Choose Mevoq?
                </h3>
                <ul className="space-y-3" aria-label="Benefits of choosing Mevoq">
                  {whyChooseUs.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <CheckCircle 
                        size={20} 
                        className="text-[#4CAF50] flex-shrink-0 mt-0.5" 
                        aria-hidden="true"
                      />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
          MAP SECTION (Optional placeholder)
          ============================================ */}
      <section className="bg-white py-12 sm:py-16">
        <div 
          className="container mx-auto px-4 sm:px-6 lg:px-8" 
          style={{ maxWidth: '1200px' }}
        >
          <div className="bg-[#E3F2FD] rounded-2xl h-64 sm:h-80 flex items-center justify-center">
            <div className="text-center">
              <MapPin size={48} className="text-[#0052CC] mx-auto mb-4" aria-hidden="true" />
              <p className="text-[#0052CC] font-medium">
                Interactive map coming soon
              </p>
              <p className="text-gray-600 text-sm mt-1">
                123 Regulatory Way, Rockville, MD 20850
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
