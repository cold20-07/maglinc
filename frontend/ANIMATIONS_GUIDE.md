# Animation System Guide

This document describes the animation system implemented for the UI redesign, covering fade-in animations, hover transitions, smooth scrolling, loading states, and skeleton screens.

## Overview

The animation system follows these principles:
- **Smooth transitions**: All animations use 200-300ms duration as specified in requirements
- **Performance**: Uses CSS transforms and opacity for GPU-accelerated animations
- **Accessibility**: Respects `prefers-reduced-motion` user preference
- **Progressive enhancement**: Works without JavaScript, enhanced with JS

## CSS Animation Classes

### Fade-in Animations

```css
.animate-fade-in
```
- Fades in element with slight upward movement
- Duration: 0.6s
- Use for: Page load animations, initial content reveal

```css
.animate-slide-up
```
- Slides up from below with fade-in
- Duration: 0.6s
- Use for: Section reveals, card animations

```css
.animate-slide-in-left / .animate-slide-in-right
```
- Slides in from left or right with fade-in
- Duration: 0.6s
- Use for: Side-by-side content, alternating sections

```css
.animate-scale-in
```
- Scales up from 95% to 100% with fade-in
- Duration: 0.5s
- Use for: Modal dialogs, popups, emphasis

### Animation Delays

For staggered animations:
```css
.animation-delay-100  /* 0.1s */
.animation-delay-200  /* 0.2s */
.animation-delay-300  /* 0.3s */
.animation-delay-400  /* 0.4s */
.animation-delay-500  /* 0.5s */
.animation-delay-600  /* 0.6s */
```

### Transition Utilities

```css
.transition-all       /* All properties, 0.3s */
.transition-fast      /* All properties, 0.2s */
.transition-slow      /* All properties, 0.4s */
.transition-colors    /* Color properties only */
.transition-transform /* Transform only */
.transition-opacity   /* Opacity only */
.transition-shadow    /* Box-shadow only */
```

### Hover Effects

```css
.hover-lift
```
- Lifts element up 4px on hover
- Increases shadow
- Duration: 0.25s
- Use for: Cards, buttons, interactive elements

```css
.hover-scale
```
- Scales element to 105% on hover
- Duration: 0.25s
- Use for: Images, icons, thumbnails

```css
.hover-brightness
```
- Increases brightness by 10% on hover
- Duration: 0.25s
- Use for: Images, backgrounds

### Loading States

```css
.animate-pulse
```
- Pulses opacity between 100% and 50%
- Duration: 2s infinite
- Use for: Loading indicators, placeholders

```css
.animate-spin
```
- Rotates 360 degrees continuously
- Duration: 1s infinite
- Use for: Loading spinners

### Skeleton Screens

```css
.skeleton
```
- Animated gradient background
- Simulates loading content
- Use for: Content placeholders while loading

Variants:
- `.skeleton-text` - Single line of text
- `.skeleton-text-lg` - Larger text line
- `.skeleton-heading` - Heading placeholder
- `.skeleton-image` - Image placeholder
- `.skeleton-card` - Full card placeholder
- `.skeleton-avatar` - Circular avatar placeholder

## React Hooks

### useScrollAnimation

Triggers animations when elements enter viewport.

```javascript
import useScrollAnimation from '@/hooks/useScrollAnimation';

const MyComponent = () => {
  const [elementRef, isVisible] = useScrollAnimation({
    threshold: 0.1,      // Trigger when 10% visible
    rootMargin: '0px',   // Margin around viewport
    triggerOnce: true    // Only trigger once
  });

  return (
    <div ref={elementRef} className="fade-in-section">
      Content animates when scrolled into view
    </div>
  );
};
```

### useStaggerAnimation

For staggered animations on multiple child elements.

```javascript
import { useStaggerAnimation } from '@/hooks/useScrollAnimation';

const MyComponent = () => {
  const [containerRef, isVisible] = useStaggerAnimation(6, 100);

  return (
    <div ref={containerRef} className="stagger-fade-in">
      <div>Item 1 - animates first</div>
      <div>Item 2 - animates 0.1s later</div>
      <div>Item 3 - animates 0.2s later</div>
      {/* ... */}
    </div>
  );
};
```

## React Components

### ImageWithLoading

Image component with automatic loading states.

```javascript
import ImageWithLoading from '@/components/ImageWithLoading';

<ImageWithLoading
  src="/path/to/image.jpg"
  alt="Description"
  className="w-full h-full object-cover"
  skeletonClassName="w-full aspect-video"
  onLoad={() => console.log('Image loaded')}
  onError={() => console.log('Image failed')}
/>
```

Features:
- Shows skeleton while loading
- Fades in when loaded
- Shows error state if load fails
- Respects prefers-reduced-motion

### SkeletonLoader

Pre-built skeleton components for common patterns.

```javascript
import SkeletonLoader from '@/components/SkeletonLoader';

// Individual components
<SkeletonLoader.Text lines={3} />
<SkeletonLoader.Heading />
<SkeletonLoader.Image aspectRatio="video" />
<SkeletonLoader.Card />
<SkeletonLoader.ServiceCard />
<SkeletonLoader.BlogCard />
<SkeletonLoader.Testimonial />
<SkeletonLoader.Hero />

// Grid of skeletons
<SkeletonLoader.Grid count={6} type="blog" />
```

## Scroll-based Animations

### Fade-in on Scroll

Add to any section that should animate when scrolled into view:

```javascript
const [sectionRef] = useScrollAnimation();

<section ref={sectionRef} className="fade-in-section">
  Content fades in when scrolled into view
</section>
```

### Staggered Grid Animations

For grids of cards that should animate in sequence:

```javascript
<div className="grid grid-cols-3 gap-8 stagger-fade-in">
  <Card /> {/* Animates first */}
  <Card /> {/* Animates 0.1s later */}
  <Card /> {/* Animates 0.2s later */}
  {/* ... up to 8 items */}
</div>
```

## Smooth Scrolling

Smooth scrolling is enabled globally:

```css
html {
  scroll-behavior: smooth;
}
```

This affects:
- Anchor link navigation
- `scrollIntoView()` calls
- Browser back/forward navigation

## Accessibility: prefers-reduced-motion

All animations respect the user's motion preferences:

```css
@media (prefers-reduced-motion: reduce) {
  /* All animations disabled or reduced to instant */
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

When a user has reduced motion enabled:
- Animations complete instantly
- Transitions are near-instant
- Scroll behavior is auto (no smooth scroll)
- Elements appear immediately without fade-in

The React hooks automatically detect this preference and skip animations.

## Performance Considerations

### GPU Acceleration

Animations use GPU-accelerated properties:
- `transform` (translateX, translateY, scale)
- `opacity`
- Avoid animating: `width`, `height`, `top`, `left`

### Will-change

For frequently animated elements, consider adding:

```css
.frequently-animated {
  will-change: transform, opacity;
}
```

But use sparingly - only for elements that animate often.

### Lazy Loading

Images use native lazy loading:

```html
<img loading="lazy" ... />
```

This defers loading of off-screen images.

## Usage Examples

### Hero Section with Animations

```javascript
import HeroSection from '@/components/HeroSection';

<HeroSection
  title="Your Title"
  subtitle="Your subtitle"
  imageSrc="/hero-image.jpg"
  // Component handles animations internally
/>
```

### Service Cards with Hover Effects

```javascript
import ServiceCard from '@/components/ServiceCard';

<ServiceCard
  icon={IconComponent}
  title="Service Name"
  description="Description"
  features={['Feature 1', 'Feature 2']}
  // Hover effects built-in
/>
```

### Blog Cards with Image Loading

```javascript
import BlogCard from '@/components/BlogCard';

<BlogCard
  post={{
    featured_image: '/image.jpg',
    title: 'Post Title',
    excerpt: 'Post excerpt...'
  }}
  // Image loading states handled automatically
/>
```

### Loading State While Fetching Data

```javascript
import SkeletonLoader from '@/components/SkeletonLoader';

{loading ? (
  <SkeletonLoader.Grid count={6} type="blog" />
) : (
  <div className="grid grid-cols-3 gap-8">
    {posts.map(post => <BlogCard key={post.id} post={post} />)}
  </div>
)}
```

## Browser Support

Animations work in all modern browsers:
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

Fallbacks:
- Older browsers: Elements appear without animation
- No JavaScript: CSS animations still work
- Reduced motion: Animations disabled

## Testing Animations

### Test Reduced Motion

In Chrome DevTools:
1. Open DevTools (F12)
2. Press Cmd+Shift+P (Mac) or Ctrl+Shift+P (Windows)
3. Type "Emulate CSS prefers-reduced-motion"
4. Select "prefers-reduced-motion: reduce"

### Test Loading States

In React DevTools:
1. Add artificial delay to data fetching
2. Observe skeleton screens
3. Verify smooth transition to loaded content

### Test Scroll Animations

1. Scroll slowly through page
2. Verify sections fade in at correct time
3. Check staggered animations on grids
4. Test on mobile viewport

## Troubleshooting

### Animations not triggering

- Check if element has correct class (`.fade-in-section`)
- Verify `useScrollAnimation` hook is called
- Check if `ref` is properly attached
- Ensure element is in viewport

### Animations too fast/slow

- Adjust duration in CSS
- Modify `threshold` in `useScrollAnimation`
- Change `animation-delay` for staggered effects

### Images not loading

- Check image URL is correct
- Verify CORS headers if external image
- Check browser console for errors
- Ensure `ImageWithLoading` component is used

### Performance issues

- Reduce number of simultaneous animations
- Use `will-change` sparingly
- Optimize images (compress, use WebP)
- Limit staggered animations to 8 items

## Requirements Validation

This animation system fulfills all requirements from task 25:

✅ **15.1**: Fade-in animations for sections (`.fade-in-section`, `useScrollAnimation`)
✅ **15.2**: Hover transitions 200-300ms (`.hover-lift`, `.hover-scale`, all transitions)
✅ **15.3**: Smooth scroll behavior (`scroll-behavior: smooth`)
✅ **15.4**: Loading states for images (`ImageWithLoading`, `.skeleton`)
✅ **15.5**: Skeleton screens (`SkeletonLoader` components)
✅ **Accessibility**: Respects `prefers-reduced-motion` throughout

## Next Steps

To add animations to additional pages:

1. Import `useScrollAnimation` hook
2. Add `fade-in-section` class to sections
3. Use `ImageWithLoading` for images
4. Add `stagger-fade-in` to grids
5. Use `SkeletonLoader` for loading states

Example:
```javascript
import useScrollAnimation from '@/hooks/useScrollAnimation';
import ImageWithLoading from '@/components/ImageWithLoading';

const MyPage = () => {
  const [sectionRef] = useScrollAnimation();
  
  return (
    <section ref={sectionRef} className="fade-in-section">
      <ImageWithLoading src="/image.jpg" alt="..." />
    </section>
  );
};
```
