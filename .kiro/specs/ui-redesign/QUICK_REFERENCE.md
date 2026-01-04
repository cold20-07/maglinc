# UI Redesign - Quick Reference Guide

## 🎨 Design System

### Colors
```css
--primary-navy: #1E3A8A    /* Headings, nav, footer */
--primary-blue: #2563EB    /* Links, hover states */
--primary-teal: #06B6D4    /* CTAs, accents */
--white: #FFFFFF           /* Backgrounds */
--gray-50: #F9FAFB         /* Light backgrounds */
--gray-600: #4B5563        /* Body text */
--gray-700: #374151        /* Secondary text */
--gray-900: #111827        /* Dark backgrounds */
--success-green: #10B981   /* Success states */
```

### Typography
```css
Font Family: 'Inter', sans-serif
H1: 48-60px, font-weight: 700
H2: 36-48px, font-weight: 700
H3: 24-30px, font-weight: 600
Body: 16-18px, line-height: 1.6-1.8
```

### Spacing (8px base unit)
```css
--space-2: 8px
--space-4: 16px
--space-6: 24px
--space-8: 32px
--space-12: 48px
--space-16: 64px
--space-20: 80px
--space-24: 96px
```

### Section Padding
```css
Mobile: 40px vertical
Tablet: 80px vertical
Desktop: 120px vertical
```

---

## 📦 Component Usage

### HeroSection
```jsx
<HeroSection
  title="Your Title"
  subtitle="Your subtitle"
  primaryCTA={{ text: "Button Text", onClick: handler }}
  secondaryCTA={{ text: "Button Text", onClick: handler }}
  stats={[{ label: "Label", value: 100, suffix: "+", icon: Icon }]}
  imageSrc="path/to/image.jpg"
  imageAlt="Description"
/>
```

### ServiceCard
```jsx
<ServiceCard
  id="service-id"
  icon={IconComponent}
  title="Service Title"
  description="Service description"
  features={["Feature 1", "Feature 2"]}
  maxFeatures={3}
/>
```

### BlogCard
```jsx
<BlogCard
  post={{
    id: "1",
    slug: "post-slug",
    title: "Post Title",
    excerpt: "Post excerpt",
    featured_image: "path/to/image.jpg",
    category: "Category",
    content: "Full content..."
  }}
/>
```

### StatsDisplay
```jsx
<StatsDisplay
  stats={[
    { label: "Label", value: 100, suffix: "+", icon: IconComponent }
  ]}
  columns="grid-cols-3"
  animate={true}
/>
```

### TestimonialCard
```jsx
<TestimonialCard
  content="Testimonial text"
  name="Client Name"
  role="Client Role"
  company="Company Name"
/>
```

### CTASection
```jsx
<CTASection
  title="CTA Title"
  subtitle="CTA subtitle"
  cta={{ text: "Button Text", onClick: handler }}
  variant="navy" // or "white"
/>
```

---

## 🎯 Common Patterns

### Page Structure
```jsx
<div className="min-h-screen">
  {/* Hero Section */}
  <section className="pt-32 pb-20 bg-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Content */}
    </div>
  </section>

  {/* Content Section */}
  <section className="section-padding-y bg-gray-50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Content */}
    </div>
  </section>

  {/* CTA Section */}
  <CTASection {...props} />
</div>
```

### Card Grid
```jsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
  {items.map(item => (
    <Card key={item.id} {...item} />
  ))}
</div>
```

### Two-Column Layout
```jsx
<div className="grid md:grid-cols-2 gap-12 items-center">
  <div>{/* Left content */}</div>
  <div>{/* Right content */}</div>
</div>
```

---

## 📱 Responsive Classes

### Breakpoints
```
sm: 640px   (mobile landscape)
md: 768px   (tablet)
lg: 1024px  (desktop)
xl: 1280px  (large desktop)
```

### Common Responsive Patterns
```jsx
// Text sizing
className="text-base sm:text-lg md:text-xl"

// Padding
className="p-4 sm:p-6 md:p-8"

// Grid columns
className="grid-cols-1 md:grid-cols-2 lg:grid-cols-3"

// Spacing
className="gap-4 sm:gap-6 md:gap-8"

// Visibility
className="hidden md:block"
className="block md:hidden"
```

---

## ♿ Accessibility Checklist

### Images
```jsx
<img src="..." alt="Descriptive text" />
```

### Buttons
```jsx
<button
  aria-label="Descriptive label"
  className="min-h-[44px] min-w-[44px]"
>
  Button Text
</button>
```

### Links
```jsx
<a
  href="..."
  aria-label="Descriptive label"
  className="min-h-[44px]"
>
  Link Text
</a>
```

### Interactive Elements
```jsx
<div
  role="button"
  tabIndex={0}
  onKeyDown={(e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  }}
  onClick={handleClick}
  aria-label="Descriptive label"
>
  Content
</div>
```

---

## 🎬 Animations

### Fade In on Scroll
```jsx
import useScrollAnimation from '@/hooks/useScrollAnimation';

const [ref] = useScrollAnimation({ threshold: 0.1 });

<div ref={ref} className="fade-in-section">
  Content
</div>
```

### Hover Effects
```css
/* Lift effect */
.hover-lift {
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}
.hover-lift:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
}

/* Scale effect */
.hover-scale {
  transition: transform 0.25s ease;
}
.hover-scale:hover {
  transform: scale(1.05);
}
```

### Loading States
```jsx
import ImageWithLoading from '@/components/ImageWithLoading';
import SkeletonLoader from '@/components/SkeletonLoader';

// Image with loading
<ImageWithLoading
  src="path/to/image.jpg"
  alt="Description"
  className="w-full h-full object-cover"
  skeletonClassName="w-full aspect-video"
/>

// Skeleton loader
<SkeletonLoader variant="card" />
<SkeletonLoader variant="text" />
<SkeletonLoader variant="heading" />
```

---

## 🔧 Common Tasks

### Adding a New Page
1. Create page component in `src/pages/`
2. Add route in `App.js`
3. Add navigation link in `Layout.js`
4. Follow page structure pattern
5. Use existing components
6. Test responsiveness

### Adding a New Component
1. Create component in `src/components/`
2. Follow design system colors and spacing
3. Add prop types/TypeScript types
4. Make it responsive
5. Add accessibility features
6. Test on all devices

### Updating Styles
1. Use CSS variables from App.css
2. Follow 8px spacing system
3. Use Tailwind utility classes
4. Add custom CSS only when necessary
5. Test on all breakpoints

### Optimizing Images
1. Use appropriate formats (WebP with fallbacks)
2. Implement lazy loading
3. Use ImageWithLoading component
4. Provide descriptive alt text
5. Optimize file sizes

---

## 🐛 Troubleshooting

### Build Errors
```bash
# Clear cache and rebuild
cd frontend
rm -rf node_modules build
npm install
npm run build
```

### Style Issues
1. Check CSS variable usage
2. Verify Tailwind classes
3. Check responsive breakpoints
4. Inspect with browser DevTools
5. Test on different browsers

### Performance Issues
1. Check bundle size: `npm run build`
2. Optimize images
3. Implement code splitting
4. Use lazy loading
5. Check for unnecessary re-renders

### Accessibility Issues
1. Run Lighthouse audit
2. Test keyboard navigation
3. Check color contrast
4. Verify ARIA labels
5. Test with screen reader

---

## 📚 Resources

### Documentation
- Design Document: `.kiro/specs/ui-redesign/design.md`
- Requirements: `.kiro/specs/ui-redesign/requirements.md`
- Tasks: `.kiro/specs/ui-redesign/tasks.md`
- Spacing Guidelines: `.kiro/specs/ui-redesign/SPACING_GUIDELINES.md`

### Testing Guides
- Accessibility: `frontend/accessibility-testing-guide.md`
- Animations: `frontend/ANIMATIONS_GUIDE.md`
- Cross-Browser: `.kiro/specs/ui-redesign/cross-browser-testing-guide.md`
- Functional: `.kiro/specs/ui-redesign/functional-test-checklist.md`

### Component Examples
- HeroSection: `frontend/src/components/HeroSection.example.js`
- CTASection: `frontend/src/components/CTASection.example.js`

---

## 🚀 Deployment Commands

### Development
```bash
cd frontend
npm start
```

### Build
```bash
cd frontend
npm run build
```

### Test Build Locally
```bash
cd frontend
npm install -g serve
serve -s build
```

---

## 📞 Support

### Common Questions
**Q: How do I add a new color?**
A: Add it to `:root` in `App.css` and create utility classes.

**Q: How do I change spacing?**
A: Use the 8px base unit system. Modify CSS variables if needed.

**Q: How do I make a component responsive?**
A: Use Tailwind responsive prefixes: `sm:`, `md:`, `lg:`, `xl:`.

**Q: How do I add animations?**
A: Use `useScrollAnimation` hook or CSS animation classes.

**Q: How do I ensure accessibility?**
A: Follow the accessibility checklist above and test with Lighthouse.

---

**Last Updated**: December 14, 2025  
**Version**: 1.0.0  
**Status**: Production Ready
