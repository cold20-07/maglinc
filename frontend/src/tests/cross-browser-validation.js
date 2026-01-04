/**
 * Cross-Browser Validation Tests
 * 
 * This script validates that the website works consistently across different browsers.
 * It checks for browser-specific issues and ensures consistent rendering.
 * 
 * Requirements: 12.4, 14.1
 */

// Browser detection utilities
const getBrowserInfo = () => {
  const ua = navigator.userAgent;
  let browserName = 'Unknown';
  let browserVersion = 'Unknown';
  let isMobile = false;

  // Detect browser
  if (ua.indexOf('Firefox') > -1) {
    browserName = 'Firefox';
    browserVersion = ua.match(/Firefox\/(\d+)/)?.[1] || 'Unknown';
  } else if (ua.indexOf('Edg') > -1) {
    browserName = 'Edge';
    browserVersion = ua.match(/Edg\/(\d+)/)?.[1] || 'Unknown';
  } else if (ua.indexOf('Chrome') > -1) {
    browserName = 'Chrome';
    browserVersion = ua.match(/Chrome\/(\d+)/)?.[1] || 'Unknown';
  } else if (ua.indexOf('Safari') > -1) {
    browserName = 'Safari';
    browserVersion = ua.match(/Version\/(\d+)/)?.[1] || 'Unknown';
  }

  // Detect mobile
  isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua);

  return {
    browserName,
    browserVersion,
    isMobile,
    userAgent: ua,
    platform: navigator.platform,
    screenWidth: window.screen.width,
    screenHeight: window.screen.height,
    viewportWidth: window.innerWidth,
    viewportHeight: window.innerHeight
  };
};

// CSS Feature Detection
const detectCSSFeatures = () => {
  const testElement = document.createElement('div');
  const features = {};

  // Test CSS Grid
  features.cssGrid = CSS.supports('display', 'grid');

  // Test Flexbox
  features.flexbox = CSS.supports('display', 'flex');

  // Test CSS Variables
  features.cssVariables = CSS.supports('--test', '0');

  // Test Flexbox Gap
  features.flexboxGap = CSS.supports('gap', '1rem');

  // Test Grid Gap
  features.gridGap = CSS.supports('grid-gap', '1rem');

  // Test Backdrop Filter
  features.backdropFilter = CSS.supports('backdrop-filter', 'blur(10px)');

  // Test Sticky Positioning
  features.stickyPosition = CSS.supports('position', 'sticky');

  // Test Aspect Ratio
  features.aspectRatio = CSS.supports('aspect-ratio', '16/9');

  // Test Object Fit
  features.objectFit = CSS.supports('object-fit', 'cover');

  // Test Smooth Scroll
  features.smoothScroll = CSS.supports('scroll-behavior', 'smooth');

  return features;
};

// Layout Validation
const validateLayout = () => {
  const issues = [];

  // Check for horizontal overflow
  const bodyWidth = document.body.scrollWidth;
  const viewportWidth = window.innerWidth;
  if (bodyWidth > viewportWidth) {
    issues.push({
      type: 'layout',
      severity: 'high',
      message: `Horizontal overflow detected: body width (${bodyWidth}px) exceeds viewport (${viewportWidth}px)`
    });
  }

  // Check navigation bar
  const nav = document.querySelector('nav');
  if (nav) {
    const navStyles = window.getComputedStyle(nav);
    if (navStyles.position !== 'fixed' && navStyles.position !== 'sticky') {
      issues.push({
        type: 'layout',
        severity: 'medium',
        message: 'Navigation bar is not fixed or sticky'
      });
    }
  }

  // Check max-width constraint
  const mainContent = document.querySelector('main') || document.querySelector('.container');
  if (mainContent) {
    const maxWidth = parseInt(window.getComputedStyle(mainContent).maxWidth);
    if (maxWidth > 1280 && maxWidth !== Infinity) {
      issues.push({
        type: 'layout',
        severity: 'low',
        message: `Content max-width (${maxWidth}px) exceeds design spec (1280px)`
      });
    }
  }

  return issues;
};

// Typography Validation
const validateTypography = () => {
  const issues = [];

  // Check if Inter font is loaded
  const bodyFont = window.getComputedStyle(document.body).fontFamily;
  if (!bodyFont.includes('Inter')) {
    issues.push({
      type: 'typography',
      severity: 'medium',
      message: 'Inter font not detected in body font-family'
    });
  }

  // Check minimum font size on mobile
  const browserInfo = getBrowserInfo();
  if (browserInfo.isMobile || browserInfo.viewportWidth < 768) {
    const paragraphs = document.querySelectorAll('p');
    paragraphs.forEach((p, index) => {
      const fontSize = parseFloat(window.getComputedStyle(p).fontSize);
      if (fontSize < 16) {
        issues.push({
          type: 'typography',
          severity: 'high',
          message: `Paragraph ${index} has font size ${fontSize}px (minimum 16px required on mobile)`
        });
      }
    });
  }

  return issues;
};

// Color Contrast Validation
const validateColorContrast = () => {
  const issues = [];

  // Helper function to calculate relative luminance
  const getLuminance = (r, g, b) => {
    const [rs, gs, bs] = [r, g, b].map(c => {
      c = c / 255;
      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
  };

  // Helper function to calculate contrast ratio
  const getContrastRatio = (rgb1, rgb2) => {
    const lum1 = getLuminance(rgb1[0], rgb1[1], rgb1[2]);
    const lum2 = getLuminance(rgb2[0], rgb2[1], rgb2[2]);
    const lighter = Math.max(lum1, lum2);
    const darker = Math.min(lum1, lum2);
    return (lighter + 0.05) / (darker + 0.05);
  };

  // Parse RGB color
  const parseRGB = (colorString) => {
    const match = colorString.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
    return match ? [parseInt(match[1]), parseInt(match[2]), parseInt(match[3])] : null;
  };

  // Check text elements
  const textElements = document.querySelectorAll('p, h1, h2, h3, h4, h5, h6, a, button, span, li');
  textElements.forEach((element, index) => {
    const styles = window.getComputedStyle(element);
    const color = parseRGB(styles.color);
    const bgColor = parseRGB(styles.backgroundColor);

    if (color && bgColor) {
      const contrast = getContrastRatio(color, bgColor);
      const fontSize = parseFloat(styles.fontSize);
      const fontWeight = parseInt(styles.fontWeight);
      const isLargeText = fontSize >= 18 || (fontSize >= 14 && fontWeight >= 700);

      const minContrast = isLargeText ? 3 : 4.5;

      if (contrast < minContrast) {
        issues.push({
          type: 'contrast',
          severity: 'high',
          message: `Element ${element.tagName} has insufficient contrast: ${contrast.toFixed(2)}:1 (minimum ${minContrast}:1 required)`,
          element: element.tagName
        });
      }
    }
  });

  return issues;
};

// Touch Target Validation (Mobile)
const validateTouchTargets = () => {
  const issues = [];
  const browserInfo = getBrowserInfo();

  if (browserInfo.isMobile || browserInfo.viewportWidth < 768) {
    const interactiveElements = document.querySelectorAll('button, a, input, select, textarea');
    
    interactiveElements.forEach((element, index) => {
      const rect = element.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;

      if (width < 44 || height < 44) {
        issues.push({
          type: 'touch-target',
          severity: 'high',
          message: `Interactive element ${element.tagName} is too small: ${width}x${height}px (minimum 44x44px required)`,
          element: element.tagName
        });
      }
    });
  }

  return issues;
};

// Image Validation
const validateImages = () => {
  const issues = [];

  const images = document.querySelectorAll('img');
  images.forEach((img, index) => {
    // Check for alt text
    if (!img.alt || img.alt.trim() === '') {
      issues.push({
        type: 'image',
        severity: 'high',
        message: `Image ${index} missing alt text`,
        src: img.src
      });
    }

    // Check if image is loaded
    if (!img.complete || img.naturalHeight === 0) {
      issues.push({
        type: 'image',
        severity: 'medium',
        message: `Image ${index} failed to load`,
        src: img.src
      });
    }

    // Check for aspect ratio distortion
    if (img.complete && img.naturalWidth > 0 && img.naturalHeight > 0) {
      const naturalRatio = img.naturalWidth / img.naturalHeight;
      const displayRatio = img.width / img.height;
      const ratioDiff = Math.abs(naturalRatio - displayRatio);

      if (ratioDiff > 0.1) {
        issues.push({
          type: 'image',
          severity: 'low',
          message: `Image ${index} may be distorted (aspect ratio mismatch)`,
          src: img.src
        });
      }
    }
  });

  return issues;
};

// Performance Validation
const validatePerformance = () => {
  const issues = [];

  if (window.performance && window.performance.timing) {
    const timing = window.performance.timing;
    const loadTime = timing.loadEventEnd - timing.navigationStart;

    if (loadTime > 3000) {
      issues.push({
        type: 'performance',
        severity: 'medium',
        message: `Page load time (${loadTime}ms) exceeds 3 second target`
      });
    }
  }

  // Check for layout shift (if available)
  if (window.PerformanceObserver) {
    try {
      let cls = 0;
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (!entry.hadRecentInput) {
            cls += entry.value;
          }
        }
      });
      observer.observe({ type: 'layout-shift', buffered: true });

      setTimeout(() => {
        if (cls > 0.1) {
          issues.push({
            type: 'performance',
            severity: 'medium',
            message: `Cumulative Layout Shift (${cls.toFixed(3)}) exceeds 0.1 threshold`
          });
        }
      }, 1000);
    } catch (e) {
      // Layout shift API not supported
    }
  }

  return issues;
};

// Responsive Behavior Validation
const validateResponsiveBehavior = () => {
  const issues = [];
  const viewportWidth = window.innerWidth;

  // Check breakpoint-specific layouts
  if (viewportWidth < 768) {
    // Mobile: Check for single-column layouts
    const grids = document.querySelectorAll('[class*="grid"]');
    grids.forEach((grid, index) => {
      const styles = window.getComputedStyle(grid);
      const gridTemplateColumns = styles.gridTemplateColumns;
      
      if (gridTemplateColumns && gridTemplateColumns.split(' ').length > 1) {
        issues.push({
          type: 'responsive',
          severity: 'medium',
          message: `Grid ${index} has multiple columns on mobile (should be single column)`
        });
      }
    });
  }

  return issues;
};

// Run all validations
const runCrossBrowserValidation = () => {
  console.log('🔍 Running Cross-Browser Validation Tests...\n');

  const browserInfo = getBrowserInfo();
  console.log('📱 Browser Information:');
  console.log(`  Browser: ${browserInfo.browserName} ${browserInfo.browserVersion}`);
  console.log(`  Platform: ${browserInfo.platform}`);
  console.log(`  Mobile: ${browserInfo.isMobile ? 'Yes' : 'No'}`);
  console.log(`  Viewport: ${browserInfo.viewportWidth}x${browserInfo.viewportHeight}`);
  console.log(`  Screen: ${browserInfo.screenWidth}x${browserInfo.screenHeight}\n`);

  const cssFeatures = detectCSSFeatures();
  console.log('🎨 CSS Feature Support:');
  Object.entries(cssFeatures).forEach(([feature, supported]) => {
    console.log(`  ${feature}: ${supported ? '✅' : '❌'}`);
  });
  console.log('');

  const allIssues = [];

  // Run all validation tests
  const validations = [
    { name: 'Layout', fn: validateLayout },
    { name: 'Typography', fn: validateTypography },
    { name: 'Color Contrast', fn: validateColorContrast },
    { name: 'Touch Targets', fn: validateTouchTargets },
    { name: 'Images', fn: validateImages },
    { name: 'Performance', fn: validatePerformance },
    { name: 'Responsive Behavior', fn: validateResponsiveBehavior }
  ];

  validations.forEach(({ name, fn }) => {
    console.log(`🧪 Testing ${name}...`);
    const issues = fn();
    allIssues.push(...issues);
    
    if (issues.length === 0) {
      console.log(`  ✅ ${name}: All checks passed`);
    } else {
      console.log(`  ⚠️ ${name}: ${issues.length} issue(s) found`);
      issues.forEach(issue => {
        const icon = issue.severity === 'high' ? '🔴' : issue.severity === 'medium' ? '🟡' : '🟢';
        console.log(`    ${icon} [${issue.severity.toUpperCase()}] ${issue.message}`);
      });
    }
    console.log('');
  });

  // Summary
  console.log('📊 Validation Summary:');
  console.log(`  Total Issues: ${allIssues.length}`);
  console.log(`  High Severity: ${allIssues.filter(i => i.severity === 'high').length}`);
  console.log(`  Medium Severity: ${allIssues.filter(i => i.severity === 'medium').length}`);
  console.log(`  Low Severity: ${allIssues.filter(i => i.severity === 'low').length}`);
  console.log('');

  if (allIssues.length === 0) {
    console.log('✅ All cross-browser validation tests passed!');
  } else {
    console.log('⚠️ Some issues were found. Please review and fix them.');
  }

  return {
    browserInfo,
    cssFeatures,
    issues: allIssues,
    passed: allIssues.filter(i => i.severity === 'high').length === 0
  };
};

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    runCrossBrowserValidation,
    getBrowserInfo,
    detectCSSFeatures,
    validateLayout,
    validateTypography,
    validateColorContrast,
    validateTouchTargets,
    validateImages,
    validatePerformance,
    validateResponsiveBehavior
  };
}

// Auto-run if loaded in browser console
if (typeof window !== 'undefined') {
  window.runCrossBrowserValidation = runCrossBrowserValidation;
  console.log('💡 Cross-browser validation script loaded!');
  console.log('💡 Run "runCrossBrowserValidation()" in the console to test.');
}
