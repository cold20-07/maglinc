/**
 * Functional Validation Script
 * 
 * This script validates key functionality of the application
 * Run with: node src/tests/functional-validation.js
 */

const fs = require('fs');
const path = require('path');

console.log('🧪 Starting Functional Validation...\n');

let passed = 0;
let failed = 0;

function test(name, fn) {
  try {
    fn();
    console.log(`✅ ${name}`);
    passed++;
  } catch (error) {
    console.log(`❌ ${name}`);
    console.log(`   Error: ${error.message}`);
    failed++;
  }
}

// Test 1: Check all required pages exist
test('All page components exist', () => {
  const pages = ['Home.js', 'About.js', 'Services.js', 'ServiceDetail.js', 'Blog.js', 'BlogPost.js', 'Contact.js', 'Login.js', 'Admin.js'];
  pages.forEach(page => {
    const pagePath = path.join(__dirname, '..', 'pages', page);
    if (!fs.existsSync(pagePath)) {
      throw new Error(`Missing page: ${page}`);
    }
  });
});

// Test 2: Check all required components exist
test('All shared components exist', () => {
  const components = ['Layout.js', 'ProtectedRoute.js', 'HeroSection.js', 'ServiceCard.js', 'BlogCard.js', 'StatsDisplay.js', 'TestimonialCard.js', 'CTASection.js'];
  components.forEach(component => {
    const componentPath = path.join(__dirname, '..', 'components', component);
    if (!fs.existsSync(componentPath)) {
      throw new Error(`Missing component: ${component}`);
    }
  });
});

// Test 3: Check API functions exist
test('API functions are defined', () => {
  const apiPath = path.join(__dirname, '..', 'lib', 'api.js');
  const apiContent = fs.readFileSync(apiPath, 'utf8');
  
  const requiredFunctions = [
    'getStats',
    'getTestimonials',
    'getServices',
    'getTeam',
    'getBlogPosts',
    'getBlogPost',
    'submitContact'
  ];
  
  requiredFunctions.forEach(fn => {
    if (!apiContent.includes(`export const ${fn}`)) {
      throw new Error(`Missing API function: ${fn}`);
    }
  });
});

// Test 4: Check routes are defined in App.js
test('All routes are defined', () => {
  const appPath = path.join(__dirname, '..', 'App.js');
  const appContent = fs.readFileSync(appPath, 'utf8');
  
  const requiredRoutes = [
    'path="/"',
    'path="/about"',
    'path="/services"',
    'path="/services/:id"',
    'path="/blog"',
    'path="/blog/:slug"',
    'path="/contact"',
    'path="/login"',
    'path="/admin"'
  ];
  
  requiredRoutes.forEach(route => {
    if (!appContent.includes(route)) {
      throw new Error(`Missing route: ${route}`);
    }
  });
});

// Test 5: Check Layout component has navigation
test('Layout has navigation structure', () => {
  const layoutPath = path.join(__dirname, '..', 'components', 'Layout.js');
  const layoutContent = fs.readFileSync(layoutPath, 'utf8');
  
  const requiredElements = [
    '<nav',
    '<footer',
    'to="/"',
    'to="/about"',
    'to="/services"',
    'to="/blog"',
    'to="/contact"'
  ];
  
  requiredElements.forEach(element => {
    if (!layoutContent.includes(element)) {
      throw new Error(`Missing navigation element: ${element}`);
    }
  });
});

// Test 6: Check Contact form has all required fields
test('Contact form has required fields', () => {
  const contactPath = path.join(__dirname, '..', 'pages', 'Contact.js');
  const contactContent = fs.readFileSync(contactPath, 'utf8');
  
  const requiredFields = [
    'name',
    'email',
    'company',
    'phone',
    'message',
    'handleContactSubmit',
    'submitContact'
  ];
  
  requiredFields.forEach(field => {
    if (!contactContent.includes(field)) {
      throw new Error(`Missing contact form field: ${field}`);
    }
  });
});

// Test 7: Check Admin panel has all tabs
test('Admin panel has all required tabs', () => {
  const adminPath = path.join(__dirname, '..', 'pages', 'Admin.js');
  const adminContent = fs.readFileSync(adminPath, 'utf8');
  
  const requiredTabs = [
    'value="blog"',
    'value="services"',
    'value="contacts"',
    'handleSubmit',
    'handleEdit',
    'handleDelete',
    'handleServiceSubmit',
    'handleEditService',
    'handleDeleteService'
  ];
  
  requiredTabs.forEach(tab => {
    if (!adminContent.includes(tab)) {
      throw new Error(`Missing admin feature: ${tab}`);
    }
  });
});

// Test 8: Check ProtectedRoute exists and has auth logic
test('ProtectedRoute has authentication logic', () => {
  const protectedPath = path.join(__dirname, '..', 'components', 'ProtectedRoute.js');
  const protectedContent = fs.readFileSync(protectedPath, 'utf8');
  
  const requiredElements = [
    'supabase.auth',
    'getSession',
    'Navigate',
    'to="/login"'
  ];
  
  requiredElements.forEach(element => {
    if (!protectedContent.includes(element)) {
      throw new Error(`Missing auth element: ${element}`);
    }
  });
});

// Test 9: Check Login page has form
test('Login page has authentication form', () => {
  const loginPath = path.join(__dirname, '..', 'pages', 'Login.js');
  const loginContent = fs.readFileSync(loginPath, 'utf8');
  
  const requiredElements = [
    'email',
    'password',
    'handleLogin',
    'signInWithPassword',
    'navigate'
  ];
  
  requiredElements.forEach(element => {
    if (!loginContent.includes(element)) {
      throw new Error(`Missing login element: ${element}`);
    }
  });
});

// Test 10: Check image upload functionality exists
test('Image upload functionality exists', () => {
  const adminPath = path.join(__dirname, '..', 'pages', 'Admin.js');
  const adminContent = fs.readFileSync(adminPath, 'utf8');
  
  const requiredElements = [
    'handleImageUpload',
    'supabase.storage',
    'blog-images',
    'getPublicUrl',
    'uploadingImage'
  ];
  
  requiredElements.forEach(element => {
    if (!adminContent.includes(element)) {
      throw new Error(`Missing image upload element: ${element}`);
    }
  });
});

// Summary
console.log('\n' + '='.repeat(50));
console.log(`✅ Passed: ${passed}`);
console.log(`❌ Failed: ${failed}`);
console.log(`📊 Total: ${passed + failed}`);
console.log('='.repeat(50));

if (failed === 0) {
  console.log('\n🎉 All validation tests passed!');
  process.exit(0);
} else {
  console.log('\n⚠️  Some validation tests failed. Please review the errors above.');
  process.exit(1);
}
