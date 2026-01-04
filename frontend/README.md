# Mevoq Frontend - Pfizer-Inspired Design System

A modern, professional pharmaceutical consulting website built with React and Tailwind CSS.

## Design System

This frontend implements a Pfizer-inspired design system optimized for enterprise pharmaceutical/healthcare consulting.

### Color Palette

| Color | Hex | Usage |
|-------|-----|-------|
| Primary Blue | `#0052CC` | Primary CTAs, links, trust elements |
| Primary Dark | `#003BA3` | Hover states |
| Navy | `#001F3F` | Headings, dark backgrounds |
| Accent (Teal) | `#1DD1A1` | Secondary CTAs, highlights |
| Light Blue | `#E3F2FD` | Subtle backgrounds, badges |
| Gray 50 | `#F9FAFB` | Section backgrounds |
| Success | `#4CAF50` | Success states, checkmarks |
| Error | `#F44336` | Error states |

### Typography

- **Font Family**: Inter (with system fallbacks)
- **H1**: 48px, Bold
- **H2**: 36px, Semibold
- **H3**: 24px, Semibold
- **Body**: 16px, Regular

### Components

- `Button` - Primary, Accent, Outline, Ghost variants
- `HeroSection` - Full-width hero with gradient option
- `ServiceCard` - Service display with icon, features
- `StatsDisplay` - Animated counter statistics
- `TestimonialCard` - Client testimonials
- `BlogCard` - Blog post previews
- `CTASection` - Call-to-action sections
- `ContactForm` - Contact form with validation

## Project Structure

```
frontend/
├── public/
│   └── index.html          # SEO-optimized HTML template
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── ui/            # Base UI components (Button, etc.)
│   │   ├── HeroSection.js
│   │   ├── ServiceCard.js
│   │   ├── StatsDisplay.js
│   │   ├── TestimonialCard.js
│   │   ├── BlogCard.js
│   │   ├── CTASection.js
│   │   ├── ContactForm.js
│   │   └── Layout.js
│   ├── pages/             # Page components
│   │   ├── Home.js
│   │   ├── About.js
│   │   ├── Services.js
│   │   ├── Blog.js
│   │   ├── BlogPost.js
│   │   ├── Contact.js
│   │   └── Admin.js
│   ├── hooks/             # Custom React hooks
│   │   └── useScrollAnimation.js
│   ├── lib/               # Utilities and API
│   │   ├── api.js
│   │   ├── supabase.js
│   │   └── utils.js
│   ├── styles/            # CSS modules
│   │   ├── design-tokens.css
│   │   ├── base.css
│   │   ├── utilities.css
│   │   ├── animations.css
│   │   └── index.css
│   ├── App.js
│   ├── App.css
│   └── index.js
└── tailwind.config.js
```

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build
```

## SEO Features

- Semantic HTML structure
- Open Graph meta tags
- Twitter Card meta tags
- Structured data (JSON-LD)
- Canonical URLs
- Accessible navigation

## Accessibility

- WCAG 2.1 AA compliant
- Keyboard navigation
- Screen reader support
- Focus visible states
- Reduced motion support
- Minimum 44x44px touch targets

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
