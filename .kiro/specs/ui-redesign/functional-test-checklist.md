# Functional Testing Checklist

## Pre-Testing Setup
- [x] Contact.js syntax error fixed
- [ ] Development server running
- [ ] Supabase connection configured
- [ ] Test user credentials available

## 1. Navigation Links Testing ✓

### Desktop Navigation
- **Test:** Click each navigation link in the header
- **Expected:** Each link navigates to the correct page without errors
- **Links to test:**
  - Home (/)
  - About (/about)
  - Services (/services)
  - Blog (/blog)
  - Contact (/contact)
  - Logo click returns to home

### Mobile Navigation
- **Test:** Open mobile menu and click each link
- **Expected:** Mobile menu opens/closes correctly, links work
- **Links to test:**
  - Hamburger menu opens
  - All navigation links work
  - Menu closes after selection
  - Get Started button works

### Footer Navigation
- **Test:** Click footer links
- **Expected:** Links navigate correctly
- **Links to test:**
  - Services links
  - Company links (About, Blog, Contact)
  - Social media links (external)
  - Email and phone links

### Service Detail Navigation
- **Test:** Click "Learn More" on service cards
- **Expected:** Navigates to service detail page with correct ID

### Blog Post Navigation
- **Test:** Click "Read More" on blog cards
- **Expected:** Navigates to blog post detail page with correct slug

**Status:** ⏳ Pending Manual Testing

---

## 2. Form Submission Testing ✓

### Contact Form - Valid Submission
- **Test:** Fill out contact form with valid data and submit
- **Fields:**
  - Name: "John Doe"
  - Email: "john@example.com"
  - Company: "Test Corp"
  - Phone: "+1 555-123-4567"
  - Message: "Test message"
- **Expected:** 
  - Form submits successfully
  - Success toast appears
  - Form fields clear
  - Data saved to Supabase contacts table

### Contact Form - Validation
- **Test:** Submit form with missing required fields
- **Expected:** 
  - Browser validation prevents submission
  - Required field indicators show

### Contact Form - Error Handling
- **Test:** Simulate network error or database error
- **Expected:** 
  - Error toast appears
  - Form remains filled
  - User can retry

**Status:** ⏳ Pending Manual Testing

---

## 3. Authentication Flow Testing ✓

### Login Page Access
- **Test:** Navigate to /login
- **Expected:** Login page displays correctly with email/password fields

### Login - Valid Credentials
- **Test:** Enter valid admin credentials and submit
- **Expected:**
  - Login successful
  - Success toast appears
  - Redirects to /admin
  - Session persists on refresh

### Login - Invalid Credentials
- **Test:** Enter invalid credentials
- **Expected:**
  - Error toast appears
  - Remains on login page
  - No redirect occurs

### Protected Route - Unauthenticated
- **Test:** Navigate to /admin without logging in
- **Expected:**
  - Redirects to /login
  - Shows "Checking authentication..." loading state briefly

### Protected Route - Authenticated
- **Test:** Navigate to /admin while logged in
- **Expected:**
  - Admin panel loads
  - No redirect occurs

### Logout
- **Test:** Click logout button in admin panel
- **Expected:**
  - Success toast appears
  - Redirects to /login
  - Session cleared
  - Cannot access /admin without re-login

**Status:** ⏳ Pending Manual Testing

---

## 4. Admin Panel Testing ✓

### Admin Panel Load
- **Test:** Access admin panel after login
- **Expected:**
  - Admin panel displays
  - Three tabs visible: Blog Posts, Services, Contacts
  - Logout button visible

### Tab Switching
- **Test:** Click each tab
- **Expected:**
  - Tab content switches correctly
  - Active tab highlighted
  - Data loads for each tab

### Blog Posts Tab
- **Test:** View blog posts list
- **Expected:**
  - Table displays with columns: Title, Author, Category, Status, Actions
  - Published/Draft status shows correctly
  - Edit and Delete buttons visible

### Services Tab
- **Test:** View services list
- **Expected:**
  - Table displays with columns: Title, Icon, Features, Actions
  - Service data displays correctly
  - Edit and Delete buttons visible

### Contacts Tab
- **Test:** View contact submissions
- **Expected:**
  - Table displays with columns: Name, Email, Company, Phone, Type, Date
  - Contact data displays correctly
  - Dates formatted properly

**Status:** ⏳ Pending Manual Testing

---

## 5. Data Fetching and Display Testing ✓

### Home Page Data
- **Test:** Load home page
- **Expected:**
  - Stats display correctly (50 submissions, 500 weeks saved, etc.)
  - Services preview shows (3-4 service cards)
  - Testimonials display (3 testimonial cards)
  - All data loads without errors

### Services Page Data
- **Test:** Load services page
- **Expected:**
  - All services display in grid
  - Service cards show icon, title, description, features
  - "Learn More" links work

### Blog Page Data
- **Test:** Load blog page
- **Expected:**
  - Published blog posts display
  - Blog cards show image, title, excerpt, meta info
  - "Read More" links work
  - Unpublished posts don't show

### About Page Data
- **Test:** Load about page
- **Expected:**
  - Team members display (if any)
  - Credentials and approach cards show
  - Content loads correctly

### Service Detail Page
- **Test:** Navigate to a service detail page
- **Expected:**
  - Service details display
  - Features list shows
  - Related services display (if applicable)

### Blog Post Detail Page
- **Test:** Navigate to a blog post detail page
- **Expected:**
  - Post content displays
  - Featured image shows
  - Author info displays
  - Related posts show (if applicable)

**Status:** ⏳ Pending Manual Testing

---

## 6. Blog Post Management Testing ✓

### Create New Blog Post
- **Test:** Click "New Post" button, fill form, submit
- **Fields:**
  - Title: "Test Blog Post"
  - Slug: Auto-generated from title
  - Excerpt: "This is a test excerpt"
  - Content: "This is test content"
  - Author: "Test Author"
  - Author Role: "Test Role"
  - Category: "regulatory"
  - Tags: "FDA, Testing"
  - Published: checked
- **Expected:**
  - Form displays
  - Slug auto-generates
  - Post creates successfully
  - Success toast appears
  - Post appears in list
  - Form closes

### Edit Existing Blog Post
- **Test:** Click edit button on a post, modify, submit
- **Expected:**
  - Form pre-fills with existing data
  - Changes save successfully
  - Success toast appears
  - Updated data shows in list

### Delete Blog Post
- **Test:** Click delete button, confirm
- **Expected:**
  - Confirmation dialog appears
  - Post deletes successfully
  - Success toast appears
  - Post removed from list

### Publish/Unpublish Toggle
- **Test:** Edit post and toggle published checkbox
- **Expected:**
  - Status updates correctly
  - Published posts show on public blog page
  - Unpublished posts don't show on public blog page

### Slug Generation
- **Test:** Type title and observe slug field
- **Expected:**
  - Slug auto-generates from title
  - Special characters removed
  - Spaces converted to hyphens
  - Lowercase conversion

### Form Validation
- **Test:** Try to submit with missing required fields
- **Expected:**
  - Form validation prevents submission
  - Required fields indicated

**Status:** ⏳ Pending Manual Testing

---

## 7. Service Management Testing ✓

### Create New Service
- **Test:** Click "New Service" button, fill form, submit
- **Fields:**
  - Title: "Test Service"
  - Icon: "map-pin"
  - Description: "Test description"
  - Features: "Feature 1\nFeature 2\nFeature 3"
  - Case Study: "Test case study"
- **Expected:**
  - Form displays
  - Service creates successfully
  - Success toast appears
  - Service appears in list
  - Form closes

### Edit Existing Service
- **Test:** Click edit button on a service, modify, submit
- **Expected:**
  - Form pre-fills with existing data
  - Features display one per line
  - Changes save successfully
  - Success toast appears
  - Updated data shows in list

### Delete Service
- **Test:** Click delete button, confirm
- **Expected:**
  - Confirmation dialog appears
  - Service deletes successfully
  - Success toast appears
  - Service removed from list

### Icon Selection
- **Test:** Select different icons from dropdown
- **Expected:**
  - Dropdown shows available icons
  - Selected icon saves correctly

### Features List Input
- **Test:** Enter features one per line
- **Expected:**
  - Features save as array
  - Display correctly in service cards
  - Line breaks preserved

**Status:** ⏳ Pending Manual Testing

---

## 8. Image Upload Testing ✓

### Image Upload Button
- **Test:** Click "Upload Image" button
- **Expected:**
  - File selection dialog opens
  - Only image files selectable

### File Selection and Upload
- **Test:** Select an image file
- **Expected:**
  - Upload progress indicator shows
  - Image uploads to Supabase storage bucket
  - Upload completes without errors

### Public URL Generation
- **Test:** After upload completes
- **Expected:**
  - Public URL generated
  - URL populates in featured_image field
  - URL is accessible

### Image Preview
- **Test:** After URL is set
- **Expected:**
  - Image preview displays below input
  - Preview shows correct image
  - Preview has reasonable size

### Remove Image
- **Test:** Click X button on image preview
- **Expected:**
  - Image preview removes
  - URL field clears
  - Can upload new image

### Manual URL Input
- **Test:** Paste image URL directly into field
- **Expected:**
  - URL accepts
  - Preview displays
  - Image saves correctly

### Error Handling
- **Test:** Simulate upload failure (network error, permissions)
- **Expected:**
  - Error toast appears
  - Form remains usable
  - Can retry upload

**Status:** ⏳ Pending Manual Testing

---

## Testing Notes

### Environment Requirements
- Supabase project configured
- Storage bucket 'blog-images' created
- RLS policies configured
- Admin user created
- Test data available

### Known Issues
- None identified yet

### Browser Compatibility
- [ ] Chrome
- [ ] Firefox
- [ ] Safari
- [ ] Edge

### Device Testing
- [ ] Desktop (1920x1080)
- [ ] Tablet (768x1024)
- [ ] Mobile (375x667)

---

## Summary

**Total Test Cases:** 8 major areas, ~50+ individual tests  
**Passed:** 0  
**Failed:** 0  
**Pending:** All  
**Blocked:** 0  

**Overall Status:** ⏳ Testing in Progress

