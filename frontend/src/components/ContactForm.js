import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { submitContact } from '@/lib/api';
import { Send, Loader2 } from 'lucide-react';

/**
 * ContactForm Component - Pfizer-Inspired Design
 * 
 * Features:
 * - Clean white background with shadow
 * - Primary blue focus states
 * - Responsive grid layout
 * - Form validation
 * - Loading states with spinner
 * - Success/error handling
 * 
 * @param {string} title - Form heading
 * @param {string} submitButtonText - Submit button text
 * @param {string} leadType - Lead type for tracking
 * @param {function} onSuccess - Callback on successful submission
 * @param {string} className - Additional CSS classes
 */
const ContactForm = ({ 
  title = "Get in Touch",
  submitButtonText = "Send Message",
  leadType = "general_inquiry",
  onSuccess,
  className = ""
}) => {
  const [formData, setFormData] = useState({ 
    name: '', 
    email: '', 
    company: '', 
    message: '', 
    phone: '' 
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  // Simple validation
  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validate()) return;
    
    setIsSubmitting(true);
    
    try {
      await submitContact({ 
        ...formData, 
        lead_type: leadType 
      });
      toast.success('Thank you! We\'ll be in touch within 24 hours.');
      setFormData({ name: '', email: '', company: '', message: '', phone: '' });
      setErrors({});
      if (onSuccess) onSuccess();
    } catch (error) {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (field) => (e) => {
    setFormData({ ...formData, [field]: e.target.value });
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors({ ...errors, [field]: null });
    }
  };

  const inputClasses = (field) => `
    w-full px-4 py-3 rounded-md border bg-white transition-all duration-200 text-base
    ${errors[field] 
      ? 'border-[#F44336] focus:border-[#F44336] focus:ring-2 focus:ring-[#F44336]/20' 
      : 'border-gray-300 focus:border-[#0052CC] focus:ring-2 focus:ring-[#0052CC]/10'
    }
    focus:outline-none
  `;

  return (
    <div className={`bg-white rounded-xl p-6 sm:p-8 shadow-lg border border-gray-100 ${className}`}>
      {title && (
        <h3 className="text-2xl sm:text-3xl font-bold mb-6 text-[#001F3F]">
          {title}
        </h3>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-5" noValidate>
        {/* Name & Email Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label 
              htmlFor="contact-name"
              className="block text-sm font-semibold mb-2 text-gray-700"
            >
              Name <span className="text-[#F44336]">*</span>
            </label>
            <input
              id="contact-name"
              type="text"
              value={formData.name}
              onChange={handleChange('name')}
              className={inputClasses('name')}
              placeholder="Your name"
              aria-required="true"
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? 'name-error' : undefined}
            />
            {errors.name && (
              <p id="name-error" className="mt-1 text-sm text-[#F44336]" role="alert">
                {errors.name}
              </p>
            )}
          </div>
          
          <div>
            <label 
              htmlFor="contact-email"
              className="block text-sm font-semibold mb-2 text-gray-700"
            >
              Email <span className="text-[#F44336]">*</span>
            </label>
            <input
              id="contact-email"
              type="email"
              value={formData.email}
              onChange={handleChange('email')}
              className={inputClasses('email')}
              placeholder="your@email.com"
              aria-required="true"
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? 'email-error' : undefined}
            />
            {errors.email && (
              <p id="email-error" className="mt-1 text-sm text-[#F44336]" role="alert">
                {errors.email}
              </p>
            )}
          </div>
        </div>
        
        {/* Company & Phone Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label 
              htmlFor="contact-company"
              className="block text-sm font-semibold mb-2 text-gray-700"
            >
              Company
            </label>
            <input
              id="contact-company"
              type="text"
              value={formData.company}
              onChange={handleChange('company')}
              className={inputClasses('company')}
              placeholder="Your company"
            />
          </div>
          
          <div>
            <label 
              htmlFor="contact-phone"
              className="block text-sm font-semibold mb-2 text-gray-700"
            >
              Phone
            </label>
            <input
              id="contact-phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange('phone')}
              className={inputClasses('phone')}
              placeholder="+1 (555) 123-4567"
            />
          </div>
        </div>
        
        {/* Message */}
        <div>
          <label 
            htmlFor="contact-message"
            className="block text-sm font-semibold mb-2 text-gray-700"
          >
            How can we help?
          </label>
          <textarea
            id="contact-message"
            value={formData.message}
            onChange={handleChange('message')}
            className={`${inputClasses('message')} h-32 resize-none`}
            placeholder="Tell us about your project or regulatory challenge..."
          />
        </div>
        
        {/* Submit Button */}
        <Button 
          type="submit" 
          disabled={isSubmitting}
          variant="default"
          size="lg"
          className="w-full"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" aria-hidden="true" />
              Sending...
            </>
          ) : (
            <>
              {submitButtonText}
              <Send className="ml-2 h-5 w-5" aria-hidden="true" />
            </>
          )}
        </Button>
        
        {/* Privacy Note */}
        <p className="text-xs text-gray-500 text-center">
          By submitting this form, you agree to our{' '}
          <a href="#" className="text-[#0052CC] hover:underline">Privacy Policy</a>.
        </p>
      </form>
    </div>
  );
};

export default ContactForm;
