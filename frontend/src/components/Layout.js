import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, Mail, Phone, MapPin, Linkedin, Twitter, Facebook, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

/**
 * Layout Component - Pfizer-Inspired Design
 * 
 * Features:
 * - Sticky header with shadow on scroll
 * - Clean navigation with hover underlines
 * - Mobile hamburger menu
 * - 4-column footer
 * - Skip to content link for accessibility
 */
const Layout = ({ children }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [headerVisible, setHeaderVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();

  // Handle scroll for glassmorphism effect and retractable header
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Update scrolled state for glassmorphism
      setScrolled(currentScrollY > 10);
      
      // Retractable header logic
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down & past threshold
        setHeaderVisible(false);
      } else {
        // Scrolling up
        setHeaderVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  // Close mobile menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/services', label: 'Services' },
    { path: '/blog', label: 'Insights' },
    { path: '/contact', label: 'Contact' },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Skip to main content - Accessibility */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-[#0052CC] focus:text-white focus:rounded-lg focus:shadow-lg"
      >
        Skip to main content
      </a>
      
      {/* Navigation Header - Glassmorphism with Retractable */}
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          headerVisible ? 'translate-y-0' : '-translate-y-full'
        }`}
        role="banner"
      >
        <div className="container mx-auto px-4 lg:px-6 pt-4">
          <div 
            className={`rounded-full transition-all duration-300 ${
              scrolled 
                ? 'bg-white/80 backdrop-blur-md shadow-lg' 
                : 'bg-white/60 backdrop-blur-sm shadow-md'
            }`}
            style={{
              backdropFilter: scrolled ? 'blur(12px)' : 'blur(8px)',
              WebkitBackdropFilter: scrolled ? 'blur(12px)' : 'blur(8px)',
              maxWidth: '1400px',
              margin: '0 auto'
            }}
          >
            <nav 
              className="px-6 lg:px-8"
              role="navigation" 
              aria-label="Main navigation"
            >
              <div className="flex justify-between items-center h-16">
                {/* Logo */}
                <Link 
                  to="/" 
                  className="flex items-center space-x-2 group"
                  aria-label="Mevoq - Home"
                >
                  <div className="w-8 h-8 rounded-lg bg-[#0052CC] flex items-center justify-center transition-transform group-hover:scale-105">
                    <span className="text-white font-bold text-lg">M</span>
                  </div>
                  <span className="text-xl font-bold text-[#001F3F]">
                    Mevoq
                  </span>
                </Link>
                
                {/* Desktop Navigation - Center */}
                <div className="hidden lg:flex items-center space-x-8">
                  {navLinks.map((link) => (
                    <Link 
                      key={link.path}
                      to={link.path} 
                      className={`text-sm font-medium transition-colors duration-200 ${
                        isActive(link.path) 
                          ? 'text-[#0052CC]' 
                          : 'text-gray-700 hover:text-[#0052CC]'
                      }`}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>

                {/* Right Side - CTA Button */}
                <div className="hidden lg:flex items-center">
                  <Button 
                    onClick={() => navigate('/contact')} 
                    variant="default"
                    size="sm"
                  >
                    Contact Us
                  </Button>
                </div>

                {/* Mobile Menu Toggle */}
                <button 
                  className="lg:hidden p-2 text-gray-700 hover:text-[#0052CC] rounded-lg transition-colors" 
                  onClick={() => setMenuOpen(!menuOpen)}
                  aria-label={menuOpen ? "Close menu" : "Open menu"}
                  aria-expanded={menuOpen}
                  aria-controls="mobile-menu"
                >
                  {menuOpen ? (
                    <X size={24} aria-hidden="true" />
                  ) : (
                    <Menu size={24} aria-hidden="true" />
                  )}
                </button>
              </div>
            </nav>
          </div>
        </div>

        {/* Mobile Menu */}
        <div 
          id="mobile-menu"
          className={`lg:hidden backdrop-blur-md bg-white/90 rounded-b-3xl mx-4 mt-2 border-t border-gray-100/50 shadow-lg transition-all duration-300 ${
            menuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
          }`}
        >
          <div className="container mx-auto px-4 py-4 space-y-1">
            {navLinks.map((link) => (
              <Link 
                key={link.path}
                to={link.path} 
                className={`flex items-center justify-between w-full py-3 px-4 rounded-lg font-medium transition-colors ${
                  isActive(link.path) 
                    ? 'bg-[#E3F2FD] text-[#0052CC]' 
                    : 'text-gray-700 hover:bg-gray-50 hover:text-[#0052CC]'
                }`}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
                <ChevronRight size={18} className="text-gray-400" aria-hidden="true" />
              </Link>
            ))}
            <div className="pt-3">
              <Button 
                onClick={() => { navigate('/contact'); setMenuOpen(false); }} 
                variant="default"
                size="lg"
                className="w-full"
              >
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main id="main-content" role="main">
        {children}
      </main>

      {/* Footer */}
      <footer 
        className="bg-[#0F1A2B] text-white pt-16 pb-8"
        role="contentinfo"
      >
        <div 
          className="container mx-auto px-4 sm:px-6 lg:px-8" 
          style={{ maxWidth: '1200px' }}
        >
          {/* Footer Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12">
            {/* Company Info */}
            <div className="sm:col-span-2 lg:col-span-1">
              <Link to="/" className="flex items-center space-x-2 mb-4 group">
                <div className="w-10 h-10 rounded-lg bg-[#0052CC] flex items-center justify-center transition-transform group-hover:scale-105">
                  <span className="text-white font-bold text-xl">M</span>
                </div>
                <span className="text-2xl font-bold text-white">
                  Mevoq
                  <span className="text-[#0052CC]">.</span>
                </span>
              </Link>
              <p className="text-gray-400 text-sm leading-relaxed mb-4">
                Turning Regulatory Hurdles into Competitive Advantages. Expert pharmaceutical consulting for faster market access.
              </p>
            </div>

            {/* Services Links */}
            <div>
              <h4 className="font-semibold text-white mb-4 text-lg">Services</h4>
              <ul className="space-y-3">
                {['Regulatory Strategy', 'Documentation', 'Quality & Compliance', 'Clinical Trials'].map((item) => (
                  <li key={item}>
                    <Link 
                      to="/services" 
                      className="text-gray-400 text-sm hover:text-[#1DD1A1] transition-colors duration-200 flex items-center gap-1"
                    >
                      <ChevronRight size={14} className="text-gray-600" aria-hidden="true" />
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company Links */}
            <div>
              <h4 className="font-semibold text-white mb-4 text-lg">Company</h4>
              <ul className="space-y-3">
                <li>
                  <Link to="/about" className="text-gray-400 text-sm hover:text-[#1DD1A1] transition-colors duration-200 flex items-center gap-1">
                    <ChevronRight size={14} className="text-gray-600" aria-hidden="true" />
                    About Us
                  </Link>
                </li>
                <li>
                  <Link to="/blog" className="text-gray-400 text-sm hover:text-[#1DD1A1] transition-colors duration-200 flex items-center gap-1">
                    <ChevronRight size={14} className="text-gray-600" aria-hidden="true" />
                    Insights
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="text-gray-400 text-sm hover:text-[#1DD1A1] transition-colors duration-200 flex items-center gap-1">
                    <ChevronRight size={14} className="text-gray-600" aria-hidden="true" />
                    Contact
                  </Link>
                </li>
                <li>
                  <a href="#" className="text-gray-400 text-sm hover:text-[#1DD1A1] transition-colors duration-200 flex items-center gap-1">
                    <ChevronRight size={14} className="text-gray-600" aria-hidden="true" />
                    Privacy Policy
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact Information */}
            <div>
              <h4 className="font-semibold text-white mb-4 text-lg">Contact</h4>
              <ul className="space-y-3">
                <li>
                  <a 
                    href="mailto:info@mevoq.com" 
                    className="flex items-start gap-3 text-gray-400 text-sm hover:text-[#1DD1A1] transition-colors duration-200"
                  >
                    <Mail className="w-4 h-4 text-[#0052CC] flex-shrink-0 mt-0.5" aria-hidden="true" />
                    info@mevoq.com
                  </a>
                </li>
                <li>
                  <a 
                    href="tel:+1234567890" 
                    className="flex items-start gap-3 text-gray-400 text-sm hover:text-[#1DD1A1] transition-colors duration-200"
                  >
                    <Phone className="w-4 h-4 text-[#0052CC] flex-shrink-0 mt-0.5" aria-hidden="true" />
                    +1 (234) 567-890
                  </a>
                </li>
                <li className="flex items-start gap-3 text-gray-400 text-sm">
                  <MapPin className="w-4 h-4 text-[#0052CC] flex-shrink-0 mt-0.5" aria-hidden="true" />
                  <span>
                    123 Business Ave<br />
                    Suite 100, City, ST 12345
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-gray-800 pt-8">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <p className="text-gray-500 text-sm text-center sm:text-left">
                © {new Date().getFullYear()} Mevoq Pharmaceutical Consulting. All rights reserved.
              </p>
              
              {/* Social Links */}
              <div className="flex gap-3">
                {[
                  { icon: Linkedin, label: 'LinkedIn', href: 'https://linkedin.com' },
                  { icon: Twitter, label: 'Twitter', href: 'https://twitter.com' },
                  { icon: Facebook, label: 'Facebook', href: 'https://facebook.com' },
                ].map(({ icon: Icon, label, href }) => (
                  <a 
                    key={label}
                    href={href}
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-[#0052CC] hover:text-white transition-all duration-200"
                    aria-label={label}
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
