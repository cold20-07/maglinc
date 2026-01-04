# UI Redesign Requirements Document

## Introduction

This document outlines the requirements for redesigning the Mevoq Pharmaceutical Consulting website UI. The redesign will take inspiration from modern medical/healthcare website design patterns while maintaining all existing functionality and content. The goal is to create a cleaner, more professional, and trustworthy visual presentation that better serves pharmaceutical consulting clients.

## Glossary

- **System**: The Mevoq Pharmaceutical Consulting website frontend
- **User**: Website visitors, potential clients, and existing clients
- **Admin**: Authenticated users managing content through the admin panel
- **Hero Section**: The primary above-the-fold content area on each page
- **CTA**: Call-to-action button or section
- **Card Component**: Reusable UI element displaying service, team member, or blog post information
- **Navigation Bar**: Fixed header containing site navigation and branding
- **Footer**: Bottom section containing links, contact info, and legal information

## Requirements

### Requirement 1: Modern Hero Section Design

**User Story:** As a potential client, I want to immediately understand the value proposition and see professional imagery, so that I can quickly assess if this service is right for me.

#### Acceptance Criteria

1. WHEN a user visits the homepage THEN the System SHALL display a hero section with a large professional image on the right side and content on the left side
2. WHEN the hero section loads THEN the System SHALL display the main headline, subheadline, statistics, and primary CTA button with clear visual hierarchy
3. WHEN a user views the hero section THEN the System SHALL present key statistics (years of experience, success metrics) in a prominent, easy-to-read format
4. WHEN a user scrolls THEN the System SHALL maintain the navigation bar in a fixed position at the top
5. WHEN the hero section is displayed THEN the System SHALL use a clean white or light background instead of gradient backgrounds

### Requirement 2: Clean Card-Based Layout

**User Story:** As a user, I want to see services and information presented in clean, organized cards, so that I can easily scan and understand the offerings.

#### Acceptance Criteria

1. WHEN services are displayed THEN the System SHALL present each service in a white card with subtle shadow and rounded corners
2. WHEN a user hovers over a service card THEN the System SHALL provide subtle visual feedback (shadow increase, slight scale)
3. WHEN service cards are rendered THEN the System SHALL display an icon, title, description, and "Learn More" link in a consistent format
4. WHEN multiple cards are displayed THEN the System SHALL maintain consistent spacing, alignment, and sizing across all cards
5. WHEN cards contain images THEN the System SHALL display them with consistent aspect ratios and proper loading states

### Requirement 3: Professional Color Scheme

**User Story:** As a potential client in the pharmaceutical industry, I want to see a professional, trustworthy color scheme, so that I feel confident in the company's expertise.

#### Acceptance Criteria

1. WHEN the System renders any page THEN it SHALL use a primary color palette of navy blue (#1E3A8A or similar), white (#FFFFFF), and light gray (#F3F4F6) as base colors
2. WHEN accent colors are needed THEN the System SHALL use teal/cyan (#06B6D4 or similar) for primary actions and links
3. WHEN displaying success states or positive metrics THEN the System SHALL use green (#10B981 or similar) sparingly
4. WHEN text is displayed THEN the System SHALL use dark gray (#1F2937) for body text and navy blue for headings
5. WHEN backgrounds are needed THEN the System SHALL prefer white or very light gray instead of colorful gradients

### Requirement 4: Typography and Readability

**User Story:** As a user, I want to easily read and understand the content, so that I can make informed decisions about the services.

#### Acceptance Criteria

1. WHEN text content is displayed THEN the System SHALL use a professional sans-serif font (Inter, Poppins, or similar) for all text
2. WHEN headings are rendered THEN the System SHALL use font weights of 600-700 and sizes that create clear hierarchy (H1: 48-56px, H2: 36-40px, H3: 24-28px)
3. WHEN body text is displayed THEN the System SHALL use 16-18px font size with 1.6-1.8 line height for optimal readability
4. WHEN text blocks exceed 3 lines THEN the System SHALL limit line length to 65-75 characters for comfortable reading
5. WHEN displaying important information THEN the System SHALL use appropriate font weights (500-600) to create emphasis without using color alone

### Requirement 5: About Section with Professional Image

**User Story:** As a potential client, I want to see information about the doctor/consultant with a professional photo, so that I can build trust and connection.

#### Acceptance Criteria

1. WHEN the about section is displayed THEN the System SHALL show a professional photo of the consultant on the left side with content on the right
2. WHEN the consultant's information is shown THEN the System SHALL display name, credentials, specializations, and a brief bio in a structured format
3. WHEN credentials are listed THEN the System SHALL display them in badge/pill format with icons
4. WHEN the about section loads THEN the System SHALL use a clean white background with subtle borders or shadows
5. WHEN displaying the consultant's approach THEN the System SHALL use icon-based feature cards showing key differentiators

### Requirement 6: Service Cards with Icons

**User Story:** As a user, I want to quickly understand different services through visual icons and clear descriptions, so that I can identify relevant offerings.

#### Acceptance Criteria

1. WHEN services are displayed THEN the System SHALL show each service in a card with a medical/professional icon at the top
2. WHEN a service card is rendered THEN the System SHALL display the icon in a circular or rounded square container with a colored background
3. WHEN service information is shown THEN the System SHALL include service name, brief description, and key features in bullet points
4. WHEN multiple services are displayed THEN the System SHALL arrange them in a responsive grid (3 columns on desktop, 2 on tablet, 1 on mobile)
5. WHEN a user clicks a service card THEN the System SHALL navigate to the detailed service page

### Requirement 7: Blog/Education Section

**User Story:** As a user, I want to access educational content and blog posts presented in an organized manner, so that I can learn more about pharmaceutical consulting topics.

#### Acceptance Criteria

1. WHEN blog posts are displayed THEN the System SHALL show each post in a card with featured image, title, excerpt, and read time
2. WHEN a blog card is rendered THEN the System SHALL display the featured image at the top with consistent aspect ratio (16:9 or 4:3)
3. WHEN blog metadata is shown THEN the System SHALL display publication date, category, and estimated read time
4. WHEN multiple blog posts are displayed THEN the System SHALL arrange them in a grid layout with consistent spacing
5. WHEN a user clicks a blog card THEN the System SHALL navigate to the full blog post page

### Requirement 8: Appointment Booking Section

**User Story:** As a potential client, I want to easily schedule a consultation, so that I can discuss my regulatory needs.

#### Acceptance Criteria

1. WHEN the booking section is displayed THEN the System SHALL show available time slots, contact information, and a prominent booking CTA
2. WHEN time slots are shown THEN the System SHALL display them in a calendar-like format or list with clear availability indicators
3. WHEN contact information is displayed THEN the System SHALL show phone number, email, and office hours in an easy-to-read format
4. WHEN a user clicks the booking CTA THEN the System SHALL navigate to the contact form or open a booking modal
5. WHEN the booking section loads THEN the System SHALL use a light background color to differentiate it from other sections

### Requirement 9: Responsive Navigation

**User Story:** As a user on any device, I want to easily navigate the website, so that I can access all pages and sections.

#### Acceptance Criteria

1. WHEN the navigation bar is displayed THEN the System SHALL show the logo on the left and menu items on the right
2. WHEN on desktop THEN the System SHALL display all navigation links horizontally in the header
3. WHEN on mobile or tablet THEN the System SHALL display a hamburger menu icon that opens a mobile navigation drawer
4. WHEN the user scrolls down THEN the System SHALL keep the navigation bar fixed at the top with a subtle shadow
5. WHEN the navigation bar is rendered THEN the System SHALL use a white background with dark text for maximum contrast

### Requirement 10: Footer with Contact Information

**User Story:** As a user, I want to find contact information and important links in the footer, so that I can reach out or navigate to key pages.

#### Acceptance Criteria

1. WHEN the footer is displayed THEN the System SHALL show company information, quick links, contact details, and social media links
2. WHEN contact information is shown THEN the System SHALL display phone, email, and address with appropriate icons
3. WHEN quick links are displayed THEN the System SHALL organize them in columns by category (Services, Company, Legal)
4. WHEN the footer is rendered THEN the System SHALL use a dark background (navy or dark gray) with white text
5. WHEN social media links are shown THEN the System SHALL display them as icon buttons with hover effects

### Requirement 11: Consistent Spacing and Layout

**User Story:** As a user, I want a consistent visual experience across all pages, so that the website feels professional and cohesive.

#### Acceptance Criteria

1. WHEN any section is rendered THEN the System SHALL use consistent padding (80-120px vertical, responsive horizontal)
2. WHEN content containers are displayed THEN the System SHALL maintain a maximum width of 1280px centered on the page
3. WHEN elements are spaced THEN the System SHALL use a consistent spacing scale (8px base unit: 8, 16, 24, 32, 48, 64, 96px)
4. WHEN cards or components are displayed THEN the System SHALL use consistent border radius (8-16px)
5. WHEN shadows are applied THEN the System SHALL use subtle, consistent shadow values across all elevated elements

### Requirement 12: Accessibility and Performance

**User Story:** As a user with accessibility needs, I want the website to be accessible and fast, so that I can use it effectively.

#### Acceptance Criteria

1. WHEN any interactive element is displayed THEN the System SHALL provide sufficient color contrast (WCAG AA minimum 4.5:1)
2. WHEN images are loaded THEN the System SHALL include descriptive alt text for screen readers
3. WHEN the user navigates via keyboard THEN the System SHALL provide visible focus indicators on all interactive elements
4. WHEN the page loads THEN the System SHALL display content within 3 seconds on standard connections
5. WHEN images are rendered THEN the System SHALL use lazy loading for images below the fold

### Requirement 13: Maintain Existing Functionality

**User Story:** As an admin or user, I want all existing features to continue working after the redesign, so that no functionality is lost.

#### Acceptance Criteria

1. WHEN the redesign is complete THEN the System SHALL maintain all existing routes and navigation paths
2. WHEN the admin panel is accessed THEN the System SHALL continue to function with all existing features (blog management, services management, image upload)
3. WHEN forms are submitted THEN the System SHALL continue to save data to Supabase as before
4. WHEN authentication is required THEN the System SHALL continue to protect admin routes and require login
5. WHEN dynamic content is loaded THEN the System SHALL continue to fetch and display data from Supabase correctly

### Requirement 14: Mobile-First Responsive Design

**User Story:** As a mobile user, I want the website to work perfectly on my device, so that I can access information on the go.

#### Acceptance Criteria

1. WHEN viewed on mobile (< 768px) THEN the System SHALL stack all multi-column layouts into single columns
2. WHEN images are displayed on mobile THEN the System SHALL resize them appropriately while maintaining aspect ratio
3. WHEN text is displayed on mobile THEN the System SHALL use appropriate font sizes (minimum 16px for body text)
4. WHEN buttons are displayed on mobile THEN the System SHALL ensure they are at least 44x44px for easy tapping
5. WHEN the hero section is viewed on mobile THEN the System SHALL stack the image below the text content

### Requirement 15: Smooth Animations and Transitions

**User Story:** As a user, I want smooth, professional animations that enhance the experience, so that the website feels modern and polished.

#### Acceptance Criteria

1. WHEN elements enter the viewport THEN the System SHALL animate them with subtle fade-in or slide-up effects
2. WHEN a user hovers over interactive elements THEN the System SHALL provide smooth transition feedback (200-300ms duration)
3. WHEN page transitions occur THEN the System SHALL use smooth scrolling behavior
4. WHEN loading states are needed THEN the System SHALL display skeleton screens or subtle loading indicators
5. WHEN animations are applied THEN the System SHALL respect user's prefers-reduced-motion settings

## Design Principles

### Visual Hierarchy
- Use size, weight, and color to create clear information hierarchy
- Most important information should be largest and most prominent
- Use whitespace generously to separate sections and improve readability

### Professional Trust
- Clean, minimal design that conveys expertise and reliability
- Use professional photography and medical/pharmaceutical imagery
- Avoid overly playful or casual design elements

### Consistency
- Maintain consistent spacing, typography, and color usage throughout
- Reuse components and patterns across pages
- Create a cohesive visual language

### Accessibility First
- Ensure all users can access and use the website
- Provide multiple ways to access information (visual, text, icons)
- Test with screen readers and keyboard navigation

## Technical Constraints

1. Must use existing React and Tailwind CSS stack
2. Must maintain compatibility with existing Supabase backend
3. Must not break existing authentication and admin functionality
4. Must maintain current routing structure
5. Must be deployable to existing Vercel/Netlify setup

## Success Metrics

1. Improved visual consistency across all pages
2. Increased time on site and engagement metrics
3. Positive user feedback on professional appearance
4. Maintained or improved page load performance
5. Zero regression in existing functionality

## Out of Scope

1. Backend changes or database schema modifications
2. New features or functionality not currently present
3. Content changes (text, images, etc.) - only UI/styling changes
4. SEO optimization beyond current implementation
5. Third-party integrations or new external services

## References

- Inspiration: Modern medical/healthcare website design (screenshot provided)
- Current implementation: Mevoq Pharmaceutical Consulting website
- Design system: Tailwind CSS utility classes
- Component library: Radix UI (shadcn/ui)
