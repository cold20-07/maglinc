/**
 * Performance Testing Script
 * Tests bundle size, build performance, and provides guidance for runtime testing
 */

const fs = require('fs');
const path = require('path');

console.log('='.repeat(80));
console.log('PERFORMANCE TESTING REPORT');
console.log('='.repeat(80));
console.log('');

// 1. Check if build exists
const buildPath = path.join(process.cwd(), 'frontend/build');
const buildExists = fs.existsSync(buildPath);

if (!buildExists) {
  console.log('❌ Build directory not found. Please run "npm run build" first.');
  console.log('');
  process.exit(1);
}

console.log('✅ Build directory found');
console.log('');

// 2. Analyze bundle size
console.log('📦 BUNDLE SIZE ANALYSIS');
console.log('-'.repeat(80));

function getDirectorySize(dirPath) {
  let totalSize = 0;
  const files = fs.readdirSync(dirPath);
  
  files.forEach(file => {
    const filePath = path.join(dirPath, file);
    const stats = fs.statSync(filePath);
    
    if (stats.isDirectory()) {
      totalSize += getDirectorySize(filePath);
    } else {
      totalSize += stats.size;
    }
  });
  
  return totalSize;
}

function formatBytes(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
}

function analyzeDirectory(dirPath, label) {
  if (!fs.existsSync(dirPath)) {
    console.log(`  ${label}: Not found`);
    return 0;
  }
  
  const size = getDirectorySize(dirPath);
  console.log(`  ${label}: ${formatBytes(size)}`);
  return size;
}

const staticDir = path.join(buildPath, 'static');
const jsDir = path.join(staticDir, 'js');
const cssDir = path.join(staticDir, 'css');
const mediaDir = path.join(staticDir, 'media');

const totalSize = analyzeDirectory(buildPath, 'Total Build Size');
analyzeDirectory(jsDir, 'JavaScript Bundle');
analyzeDirectory(cssDir, 'CSS Bundle');
analyzeDirectory(mediaDir, 'Media Assets');

console.log('');

// Check individual JS files
if (fs.existsSync(jsDir)) {
  console.log('📄 JAVASCRIPT FILES');
  console.log('-'.repeat(80));
  
  const jsFiles = fs.readdirSync(jsDir)
    .filter(file => file.endsWith('.js'))
    .map(file => ({
      name: file,
      size: fs.statSync(path.join(jsDir, file)).size
    }))
    .sort((a, b) => b.size - a.size);
  
  jsFiles.forEach(file => {
    const sizeStr = formatBytes(file.size);
    const status = file.size > 500000 ? '⚠️' : '✅';
    console.log(`  ${status} ${file.name}: ${sizeStr}`);
  });
  
  console.log('');
}

// Check individual CSS files
if (fs.existsSync(cssDir)) {
  console.log('🎨 CSS FILES');
  console.log('-'.repeat(80));
  
  const cssFiles = fs.readdirSync(cssDir)
    .filter(file => file.endsWith('.css'))
    .map(file => ({
      name: file,
      size: fs.statSync(path.join(cssDir, file)).size
    }))
    .sort((a, b) => b.size - a.size);
  
  cssFiles.forEach(file => {
    const sizeStr = formatBytes(file.size);
    const status = file.size > 100000 ? '⚠️' : '✅';
    console.log(`  ${status} ${file.name}: ${sizeStr}`);
  });
  
  console.log('');
}

// 3. Performance recommendations
console.log('💡 PERFORMANCE RECOMMENDATIONS');
console.log('-'.repeat(80));

const recommendations = [];

if (totalSize > 5 * 1024 * 1024) {
  recommendations.push('⚠️  Total bundle size exceeds 5MB - consider code splitting');
}

const largeJsFiles = fs.existsSync(jsDir) 
  ? fs.readdirSync(jsDir).filter(file => {
      const filePath = path.join(jsDir, file);
      return file.endsWith('.js') && fs.statSync(filePath).size > 500000;
    })
  : [];

if (largeJsFiles.length > 0) {
  recommendations.push(`⚠️  ${largeJsFiles.length} JavaScript file(s) exceed 500KB`);
}

if (recommendations.length === 0) {
  console.log('  ✅ Bundle size is within acceptable limits');
} else {
  recommendations.forEach(rec => console.log(`  ${rec}`));
}

console.log('');

// 4. Image optimization check
console.log('🖼️  IMAGE OPTIMIZATION');
console.log('-'.repeat(80));

if (fs.existsSync(mediaDir)) {
  const imageFiles = fs.readdirSync(mediaDir)
    .filter(file => /\.(jpg|jpeg|png|gif|svg|webp)$/i.test(file))
    .map(file => ({
      name: file,
      size: fs.statSync(path.join(mediaDir, file)).size
    }))
    .sort((a, b) => b.size - a.size);
  
  if (imageFiles.length > 0) {
    console.log(`  Found ${imageFiles.length} image file(s)`);
    imageFiles.forEach(file => {
      const sizeStr = formatBytes(file.size);
      const status = file.size > 200000 ? '⚠️' : '✅';
      console.log(`  ${status} ${file.name}: ${sizeStr}`);
    });
    
    const largeImages = imageFiles.filter(f => f.size > 200000);
    if (largeImages.length > 0) {
      console.log('');
      console.log(`  ⚠️  ${largeImages.length} image(s) exceed 200KB - consider optimization`);
    }
  } else {
    console.log('  ℹ️  No image files found in build');
  }
} else {
  console.log('  ℹ️  No media directory found');
}

console.log('');

// 5. Runtime testing instructions
console.log('🚀 RUNTIME PERFORMANCE TESTING');
console.log('-'.repeat(80));
console.log('  To complete performance testing, please run the following tests:');
console.log('');
console.log('  1. Lighthouse Audit:');
console.log('     - Open the deployed site in Chrome');
console.log('     - Open DevTools (F12)');
console.log('     - Go to Lighthouse tab');
console.log('     - Run audit for Performance, Accessibility, Best Practices, SEO');
console.log('     - Target: Performance score > 90');
console.log('');
console.log('  2. Page Load Times:');
console.log('     - Open DevTools Network tab');
console.log('     - Disable cache');
console.log('     - Reload each page and measure:');
console.log('       * DOMContentLoaded time');
console.log('       * Load time');
console.log('       * First Contentful Paint (FCP)');
console.log('       * Largest Contentful Paint (LCP)');
console.log('     - Target: LCP < 2.5s, FCP < 1.8s');
console.log('');
console.log('  3. Slow 3G Testing:');
console.log('     - Open DevTools Network tab');
console.log('     - Set throttling to "Slow 3G"');
console.log('     - Test all major pages');
console.log('     - Verify content loads within acceptable time');
console.log('     - Target: Interactive within 10s on Slow 3G');
console.log('');
console.log('  4. Bundle Analysis:');
console.log('     - Install: npm install -g source-map-explorer');
console.log('     - Run: source-map-explorer build/static/js/*.js');
console.log('     - Identify large dependencies');
console.log('');

console.log('='.repeat(80));
console.log('PERFORMANCE TEST SUMMARY');
console.log('='.repeat(80));
console.log(`  Total Build Size: ${formatBytes(totalSize)}`);
console.log(`  Status: ${totalSize < 5 * 1024 * 1024 ? '✅ PASS' : '⚠️  WARNING'}`);
console.log('');
console.log('  Next Steps:');
console.log('  1. Deploy the build to staging/production');
console.log('  2. Run Lighthouse audit on deployed site');
console.log('  3. Test page load times with DevTools');
console.log('  4. Test on Slow 3G connection');
console.log('  5. Document results in performance-test-results.md');
console.log('='.repeat(80));
