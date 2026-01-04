import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Linkedin, Users, Award, Target, Heart, Shield, 
  CheckCircle2, TrendingUp, Globe, ArrowRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import CTASection from '@/components/CTASection';
import { getTeam } from '@/lib/api';
import useScrollAnimation from '@/hooks/useScrollAnimation';

/**
 * About Page - Pfizer-Inspired Design
 * 
 * Sections:
 * 1. Hero - Simple centered headline
 * 2. Story - Two-column with image
 * 3. Approach/Values - 3-column cards
 * 4. Team - Grid of team members
 * 5. CTA - Final call to action
 */
const About = () => {
  const navigate = useNavigate();
  const [team, setTeam] = useState([]);
  const [storyRef] = useScrollAnimation({ threshold: 0.1 });
  const [approachRef] = useScrollAnimation({ threshold: 0.1 });
  const [teamRef] = useScrollAnimation({ threshold: 0.1 });

  useEffect(() => {
    fetchTeam();
  }, []);

  const fetchTeam = async () => {
    try {
      const data = await getTeam();
      setTeam(data);
    } catch (e) {
      console.error('Error fetching team:', e);
    }
  };

  // Credentials data
  const credentials = [
    { icon: Award, text: 'FDA Regulatory Expert' },
    { icon: Shield, text: 'Quality Systems Certified' },
    { icon: Globe, text: 'Global Regulatory Affairs' },
    { icon: TrendingUp, text: '50+ Successful Approvals' }
  ];

  // Approach/Values data
  const approaches = [
    {
      icon: Target,
      title: 'Strategic',
      description: 'Data-driven regulatory strategies tailored to your specific goals and timeline requirements.'
    },
    {
      icon: Heart,
      title: 'Personalized',
      description: 'One-on-one guidance from experienced consultants who understand your unique challenges.'
    },
    {
      icon: Shield,
      title: 'Compliant',
      description: 'Ensuring adherence to all regulatory requirements across global markets.'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* ============================================
          HERO SECTION
          ============================================ */}
      <section 
        className="bg-white pt-28 sm:pt-32 md:pt-36 pb-12 sm:pb-16"
        aria-labelledby="about-heading"
      >
        <div 
          className="container mx-auto px-4 sm:px-6 lg:px-8 text-center" 
          style={{ maxWidth: '800px' }}
        >
          <h1 
            id="about-heading"
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#001F3F] mb-4 sm:mb-6"
          >
            About Mevoq
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 leading-relaxed">
            We've sat on both sides of the table. As former regulators and scientists, 
            we use our inside experience to clear the path for your innovation.
          </p>
        </div>
      </section>

      {/* ============================================
          STORY SECTION - Two Column
          ============================================ */}
      <section 
        className="bg-[#F9FAFB] py-16 sm:py-20 md:py-24"
        aria-labelledby="story-heading"
      >
        <div 
          className="container mx-auto px-4 sm:px-6 lg:px-8" 
          style={{ maxWidth: '1200px' }}
        >
          <div 
            ref={storyRef}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center fade-in-section"
          >
            {/* Left: Professional Photo */}
            <div className="order-2 lg:order-1">
              <div className="rounded-2xl overflow-hidden shadow-xl">
                <img 
                  src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=800&h=1000&fit=crop" 
                  alt="Professional pharmaceutical consultant"
                  className="w-full h-full object-cover"
                  style={{ aspectRatio: '4/5' }}
                  loading="lazy"
                />
              </div>
            </div>

            {/* Right: Content */}
            <div className="order-1 lg:order-2">
              <h2 
                id="story-heading"
                className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#001F3F] mb-4 sm:mb-6"
              >
                Expert Guidance from Industry Veterans
              </h2>
              <p className="text-base sm:text-lg text-gray-600 mb-4 leading-relaxed">
                At Mevoq, we believe that life-saving therapies shouldn't be delayed by 
                regulatory complexity. Our mission is to bridge the gap between pharmaceutical 
                innovation and regulatory approval.
              </p>
              <p className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8 leading-relaxed">
                With decades of combined experience in regulatory review, quality systems, 
                and global regulatory strategy, we provide the expertise that transforms 
                regulatory challenges into competitive advantages.
              </p>

              {/* Credentials Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                {credentials.map((credential, idx) => {
                  const Icon = credential.icon;
                  return (
                    <div 
                      key={idx}
                      className="bg-white rounded-lg p-4 shadow-md flex items-center gap-3 hover:shadow-lg transition-shadow border border-gray-100"
                    >
                      <div className="w-10 h-10 rounded-full bg-[#E3F2FD] flex items-center justify-center flex-shrink-0">
                        <Icon className="text-[#0052CC]" size={20} aria-hidden="true" />
                      </div>
                      <span className="text-sm sm:text-base font-medium text-gray-700">
                        {credential.text}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
          APPROACH SECTION
          ============================================ */}
      <section 
        className="bg-white py-16 sm:py-20 md:py-24"
        aria-labelledby="approach-heading"
      >
        <div 
          className="container mx-auto px-4 sm:px-6 lg:px-8" 
          style={{ maxWidth: '1200px' }}
        >
          <div ref={approachRef} className="text-center mb-10 sm:mb-14 fade-in-section">
            <h2 
              id="approach-heading"
              className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#001F3F] mb-3 sm:mb-4"
            >
              Our Approach
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
              How we deliver exceptional results for our clients
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 stagger-children">
            {approaches.map((approach, idx) => {
              const Icon = approach.icon;
              return (
                <article 
                  key={idx}
                  className="bg-white rounded-xl p-6 sm:p-8 shadow-md hover:shadow-xl transition-all border border-gray-100"
                >
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-[#E3F2FD] flex items-center justify-center mb-5 sm:mb-6">
                    <Icon className="text-[#0052CC]" size={28} aria-hidden="true" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-[#001F3F] mb-3">
                    {approach.title}
                  </h3>
                  <p className="text-base text-gray-600 leading-relaxed">
                    {approach.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============================================
          WHY CHOOSE US SECTION
          ============================================ */}
      <section 
        className="bg-[#F9FAFB] py-16 sm:py-20 md:py-24"
        aria-labelledby="why-heading"
      >
        <div 
          className="container mx-auto px-4 sm:px-6 lg:px-8" 
          style={{ maxWidth: '1200px' }}
        >
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div>
              <h2 
                id="why-heading"
                className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#001F3F] mb-4 sm:mb-6"
              >
                Why Choose Mevoq?
              </h2>
              <p className="text-base sm:text-lg text-gray-600 mb-6 leading-relaxed">
                We combine deep regulatory expertise with a client-first approach. 
                Our team has successfully guided over 50 drug approvals across global markets.
              </p>
              
              <ul className="space-y-4" aria-label="Benefits of choosing Mevoq">
                {[
                  '50+ successful drug approvals worldwide',
                  'Global regulatory expertise (FDA, EMA, PMDA)',
                  'Proven track record of accelerating timelines by 30%',
                  'Former regulators on our team',
                  'End-to-end support from strategy to approval'
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle2 
                      className="text-[#4CAF50] flex-shrink-0 mt-0.5" 
                      size={20} 
                      aria-hidden="true"
                    />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
              
              <Button 
                onClick={() => navigate('/services')}
                variant="default"
                size="lg"
                className="mt-8"
              >
                Explore Our Services
                <ArrowRight className="ml-2" size={18} aria-hidden="true" />
              </Button>
            </div>
            
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg border border-gray-100">
              <div className="text-center mb-6">
                <span className="text-6xl sm:text-7xl font-bold text-[#0052CC]">30%</span>
                <p className="text-lg text-gray-600 mt-2">Faster Time to Market</p>
              </div>
              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="p-4 bg-[#F9FAFB] rounded-lg">
                  <span className="text-2xl sm:text-3xl font-bold text-[#001F3F]">50+</span>
                  <p className="text-sm text-gray-600">Approvals</p>
                </div>
                <div className="p-4 bg-[#F9FAFB] rounded-lg">
                  <span className="text-2xl sm:text-3xl font-bold text-[#001F3F]">25+</span>
                  <p className="text-sm text-gray-600">Countries</p>
                </div>
                <div className="p-4 bg-[#F9FAFB] rounded-lg">
                  <span className="text-2xl sm:text-3xl font-bold text-[#001F3F]">15+</span>
                  <p className="text-sm text-gray-600">Years Experience</p>
                </div>
                <div className="p-4 bg-[#F9FAFB] rounded-lg">
                  <span className="text-2xl sm:text-3xl font-bold text-[#001F3F]">98%</span>
                  <p className="text-sm text-gray-600">Success Rate</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
          TEAM SECTION
          ============================================ */}
      {team.length > 0 && (
        <section 
          className="bg-white py-16 sm:py-20 md:py-24"
          aria-labelledby="team-heading"
        >
          <div 
            className="container mx-auto px-4 sm:px-6 lg:px-8" 
            style={{ maxWidth: '1200px' }}
          >
            <div ref={teamRef} className="text-center mb-10 sm:mb-14 fade-in-section">
              <h2 
                id="team-heading"
                className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#001F3F] mb-3 sm:mb-4"
              >
                Meet Our Experts
              </h2>
              <p className="text-base sm:text-lg text-gray-600">
                Ex-regulators, scientists, and industry veterans
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 stagger-children">
              {team.map((member) => (
                <article 
                  key={member.id} 
                  className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all border border-gray-100"
                >
                  <div className="aspect-square bg-[#E3F2FD] flex items-center justify-center">
                    {member.avatar_url ? (
                      <img 
                        src={member.avatar_url} 
                        alt={`${member.name}'s profile photo`}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    ) : (
                      <Users size={60} className="text-[#0052CC]" aria-hidden="true" />
                    )}
                  </div>
                  <div className="p-5 sm:p-6">
                    <h3 className="text-lg sm:text-xl font-bold text-[#001F3F] mb-1">
                      {member.name}
                    </h3>
                    <p className="text-sm font-semibold text-[#0052CC] mb-3">
                      {member.role}
                    </p>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                      {member.bio}
                    </p>
                    
                    {member.expertise && member.expertise.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {member.expertise.slice(0, 3).map((skill, idx) => (
                          <span 
                            key={idx} 
                            className="text-xs bg-[#E3F2FD] text-[#0052CC] px-3 py-1 rounded-full font-medium"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    )}
                    
                    {member.linkedin_url && (
                      <a 
                        href={member.linkedin_url} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-[#0052CC] flex items-center gap-2 text-sm hover:text-[#003BA3] transition-colors font-medium"
                        aria-label={`Connect with ${member.name} on LinkedIn`}
                      >
                        <Linkedin size={16} aria-hidden="true" />
                        <span>Connect on LinkedIn</span>
                      </a>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ============================================
          CTA SECTION
          ============================================ */}
      <CTASection
        title="Ready to Work With Us?"
        subtitle="Let's discuss how our team can help accelerate your regulatory success."
        cta={{
          text: 'Get in Touch',
          onClick: () => navigate('/contact')
        }}
        variant="navy"
      />
    </div>
  );
};

export default About;
