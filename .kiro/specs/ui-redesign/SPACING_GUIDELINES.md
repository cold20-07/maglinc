# Spacing System Guidelines

## Overview

The Mevoq UI redesign uses an 8px-based spacing system for consistent and harmonious layouts. This document provides guidelines for using the spacing utilities effectively.

## Spacing Scale

Our spacing scale is based on 8px units (0.5rem):

| Variable | Value | Pixels | Usage |
|----------|-------|--------|-------|
| `--space-1` | 0.25rem | 4px | Minimal spacing, tight layouts |
| `--space-2` | 0.5rem | 8px | Small gaps, compact elements |
| `--space-3` | 0.75rem | 12px | Small spacing between related items |
| `--space-4` | 1rem | 16px | Default spacing, comfortable gaps |
| `--space-5` | 1.25rem | 20px | Medium spacing |
| `--space-6` | 1.5rem | 24px | Medium-large spacing |
| `--space-8` | 2rem | 32px | Large spacing, card padding |
| `--space-10` | 2.5rem | 40px | Extra large spacing |
| `--space-12` | 3rem | 48px | Section spacing |
| `--space-16` | 4rem | 64px | Large section spacing |
| `--space-20` | 5rem | 80px | Extra large section spacing |
| `--space-24` | 6rem | 96px | Major section spacing |
| `--space-32` | 8rem | 128px | Maximum spacing |

## Utility Classes

### Margin Utilities

```css
/* All sides */
.m-4    /* margin: 1rem (16px) */

/* Individual sides */
.mt-4   /* margin-top: 1rem */
.mb-4   /* margin-bottom: 1rem */
.ml-4   /* margin-left: 1rem */
.mr-4   /* margin-right: 1rem */

/* Horizontal (left + right) */
.mx-4   /* margin-left: 1rem; margin-right: 1rem */
.mx-auto /* margin-left: auto; margin-right: auto (centering) */

/* Vertical (top + bottom) */
.my-4   /* margin-top: 1rem; margin-bottom: 1rem */
```

### Padding Utilities

```css
/* All sides */
.p-4    /* padding: 1rem (16px) */

/* Individual sides */
.pt-4   /* padding-top: 1rem */
.pb-4   /* padding-bottom: 1rem */
.pl-4   /* padding-left: 1rem */
.pr-4   /* padding-right: 1rem */

/* Horizontal (left + right) */
.px-4   /* padding-left: 1rem; padding-right: 1rem */

/* Vertical (top + bottom) */
.py-4   /* padding-top: 1rem; padding-bottom: 1rem */
```

### Gap Utilities (Flexbox/Grid)

```css
.gap-4  /* gap: 1rem (16px) */
```

## Section Padding

For consistent section spacing across the site, use the section padding utilities:

```css
/* Full section padding (vertical + horizontal) */
.section-padding

/* Vertical padding only */
.section-padding-y

/* Horizontal padding only */
.section-padding-x
```

**Responsive Behavior:**
- Mobile (< 768px): 40px vertical padding
- Tablet (768px - 1023px): 80px vertical padding
- Desktop (≥ 1024px): 120px vertical padding

## Container Utilities

```css
/* Centered container with max-width of 1280px */
.container

/* Full-width container with horizontal padding */
.container-fluid
```

## Usage Guidelines

### 1. Component Spacing

**Cards:**
```jsx
<div className="p-8">  {/* 32px padding inside cards */}
  <h3 className="mb-4">Title</h3>  {/* 16px margin below heading */}
  <p className="mb-6">Description</p>  {/* 24px margin below paragraph */}
</div>
```

**Lists:**
```jsx
<ul className="space-y-2">  {/* 8px gap between list items */}
  <li>Item 1</li>
  <li>Item 2</li>
</ul>
```

**Buttons:**
```jsx
<div className="flex gap-4">  {/* 16px gap between buttons */}
  <button>Primary</button>
  <button>Secondary</button>
</div>
```

### 2. Section Spacing

**Standard Section:**
```jsx
<section className="section-padding bg-white">
  <div className="container">
    {/* Content */}
  </div>
</section>
```

**Alternating Sections:**
```jsx
<section className="section-padding bg-white">
  {/* Content */}
</section>
<section className="section-padding bg-gray-50">
  {/* Content */}
</section>
```

### 3. Grid Layouts

**Service Cards:**
```jsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
  {/* Cards with 32px gap */}
</div>
```

**Blog Posts:**
```jsx
<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
  {/* Cards with 24px gap */}
</div>
```

### 4. Typography Spacing

**Headings:**
- H1: `mb-6` (24px below)
- H2: `mb-5` (20px below)
- H3: `mb-4` (16px below)
- H4: `mb-3` (12px below)

**Paragraphs:**
- Body text: `mb-4` (16px below)
- Last paragraph: `mb-0` (no margin)

**Sections:**
- Between major sections: `my-16` or `my-20` (64-80px)
- Between subsections: `my-12` (48px)

### 5. Form Elements

**Form Groups:**
```jsx
<div className="mb-6">  {/* 24px between form groups */}
  <label className="mb-2">Label</label>  {/* 8px below label */}
  <input />
</div>
```

**Form Buttons:**
```jsx
<div className="mt-8">  {/* 32px above submit button */}
  <button>Submit</button>
</div>
```

## Best Practices

### DO:
✅ Use the spacing scale consistently across all components
✅ Use section-padding utilities for page sections
✅ Use gap utilities for flex/grid layouts
✅ Maintain vertical rhythm with consistent spacing
✅ Use larger spacing (16, 20, 24) between major sections
✅ Use smaller spacing (2, 3, 4) for related items

### DON'T:
❌ Use arbitrary spacing values (e.g., `margin: 13px`)
❌ Mix spacing systems (stick to the 8px scale)
❌ Use negative margins unless absolutely necessary
❌ Over-space elements (more isn't always better)
❌ Forget responsive considerations

## Common Patterns

### Hero Section
```jsx
<section className="pt-32 pb-20 bg-white">
  <div className="container">
    <div className="grid md:grid-cols-2 gap-12 items-center">
      {/* Content */}
    </div>
  </div>
</section>
```

### Card Grid
```jsx
<section className="section-padding bg-gray-50">
  <div className="container">
    <h2 className="mb-12 text-center">Services</h2>
    <div className="grid md:grid-cols-3 gap-8">
      {/* Cards */}
    </div>
  </div>
</section>
```

### Content Section
```jsx
<section className="section-padding bg-white">
  <div className="container max-w-4xl">
    <h2 className="mb-6">About Us</h2>
    <p className="mb-4">Paragraph 1</p>
    <p className="mb-4">Paragraph 2</p>
    <p>Paragraph 3</p>
  </div>
</section>
```

## Responsive Spacing

For responsive spacing adjustments, use Tailwind's responsive prefixes:

```jsx
<div className="p-4 md:p-8 lg:p-12">
  {/* 16px on mobile, 32px on tablet, 48px on desktop */}
</div>

<div className="mb-6 md:mb-8 lg:mb-12">
  {/* Responsive bottom margin */}
</div>
```

## Debugging Spacing

To visualize spacing during development, you can temporarily add borders:

```css
/* Temporary debugging */
* {
  outline: 1px solid red;
}
```

Or use browser DevTools to inspect computed spacing values.

## Related Documentation

- [Design System](./design.md) - Complete design specifications
- [Requirements](./requirements.md) - Spacing requirements (11.1, 11.2, 11.3)
- [Tasks](./tasks.md) - Implementation tasks

## Questions?

If you're unsure about spacing in a specific context:
1. Check similar components for consistency
2. Refer to the design mockups
3. Use the spacing scale as a guide
4. When in doubt, use `--space-4` (16px) as a default

---

**Last Updated:** December 2025
**Version:** 1.0
