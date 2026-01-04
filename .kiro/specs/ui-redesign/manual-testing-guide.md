# Manual Testing Guide

## Prerequisites

Before starting manual testing, ensure:

1. **Development Server Running**
   ```bash
   cd frontend
   npm start
   # or
   yarn start
   ```

2. **Supabase Configuration**
   - Supabase project URL configured in `.env`
   - Supabase anon key configured
   - Database tables created (blog_posts, services, contacts, testimonials, team)
   - Storage bucket 'blog-images' created with public access
   - RLS policies configured

3. **Test Credentials**
   - Admin email and password available
   - Test data in database (optional but recommended)

## Testing Procedure

### Step 1: Navigation Testing (15 minutes)

1. **Open the application** in browser: `http://localhost:3000`

2. **Test Desktop Navigation:**
   - Click "Home" → Should navigate to `/`
   - Click "About" → Should navigate to `/about`
   - Click "Services" → Should navigate to `/services`
   - Click "Blog" → Should navigate to `/blog`
   - Click "Contact" → Should navigate to `/contact`
   - Click logo → Should return to home
   - Verify active link highlighting (blue underline)

3. **Test Mobile Navigation:**
   - Resize browser to mobile width (< 768px)
   - Click hamburger menu → Menu should open
   - Click each link → Should navigate and close menu
   - Click "Get Started" button → Should navigate to contact

4. **Test Footer Navigation:**
   - Scroll to footer
   - Click service links → Should navigate to services page
   - Click company links → Should navigate correctly
   - Click email link → Should open email client
   - Click phone link → Should open phone dialer
   - Click social media icons → Should open in new tab

5. **Test Service Detail Navigation:**
   - Go to Services page
   - Click "Learn More" on any service card
   - Verify URL includes service ID: `/services/:id`
   - Verify service details display

6. **Test Blog Post Navigation:**
   - Go to Blog page
   - Click "Read More" on any blog card
   - Verify URL includes post slug: `/blog/:slug`
   - Verify blog post content displays

**✅ Mark as complete when all navigation works without errors**

---

### Step 2: Contact Form Testing (10 minutes)

1. **Navigate to Contact page** (`/contact`)

2. **Test Valid Submission:**
   - Fill in all fields:
     - Name: "Test User"
     - Email: "test@example.com"
     - Company: "Test Company"
     - Phone: "+1 555-123-4567"
     - Message: "This is a test message"
   - Click "Request Strategy Call"
   - **Expected:** Success toast appears, form clears

3. **Test Form Validation:**
   - Leave Name field empty
   - Try to submit
   - **Expected:** Browser validation prevents submission
   - Leave Email field empty
   - Try to submit
   - **Expected:** Browser validation prevents submission

4. **Verify Data Saved:**
   - Log into admin panel
   - Go to Contacts tab
   - **Expected:** Test submission appears in list

5. **Test Form Styling:**
   - Focus on each input field
   - **Expected:** Border color changes to teal
   - Blur from field
   - **Expected:** Border returns to gray

**✅ Mark as complete when form submits and validates correctly**

---

### Step 3: Authentication Testing (15 minutes)

1. **Test Login Page Access:**
   - Navigate to `/login`
   - **Expected:** Login page displays with email/password fields

2. **Test Invalid Login:**
   - Enter invalid email: "wrong@example.com"
   - Enter invalid password: "wrongpassword"
   - Click "Sign In"
   - **Expected:** Error toast appears, stays on login page

3. **Test Valid Login:**
   - Enter valid admin credentials
   - Click "Sign In"
   - **Expected:** 
     - Success toast appears
     - Redirects to `/admin`
     - Admin panel displays

4. **Test Protected Route (Unauthenticated):**
   - Log out (if logged in)
   - Try to navigate directly to `/admin`
   - **Expected:** 
     - Shows "Checking authentication..." briefly
     - Redirects to `/login`

5. **Test Protected Route (Authenticated):**
   - Log in
   - Navigate to `/admin`
   - **Expected:** Admin panel loads without redirect

6. **Test Session Persistence:**
   - Log in
   - Refresh the page
   - **Expected:** Remains logged in, admin panel displays

7. **Test Logout:**
   - Click "Logout" button in admin panel
   - **Expected:**
     - Success toast appears
     - Redirects to `/login`
     - Cannot access `/admin` without re-login

**✅ Mark as complete when authentication flow works correctly**

---

### Step 4: Admin Panel Testing (20 minutes)

1. **Test Admin Panel Load:**
   - Log in and access `/admin`
   - **Expected:**
     - Admin panel displays
     - Three tabs visible: Blog Posts, Services, Contacts
     - Logout button in header

2. **Test Tab Switching:**
   - Click "Blog Posts" tab
   - **Expected:** Blog posts table displays
   - Click "Services" tab
   - **Expected:** Services table displays
   - Click "Contacts" tab
   - **Expected:** Contacts table displays
   - Verify active tab is highlighted

3. **Test Blog Posts Tab:**
   - View blog posts list
   - **Expected:**
     - Table shows: Title, Author, Category, Status, Actions
     - Published posts show green "Published" with eye icon
     - Draft posts show gray "Draft" with eye-off icon
     - Edit and Delete buttons visible for each post

4. **Test Services Tab:**
   - View services list
   - **Expected:**
     - Table shows: Title, Icon, Features, Actions
     - Icon names display in teal badge
     - Feature count displays
     - Edit and Delete buttons visible

5. **Test Contacts Tab:**
   - View contact submissions
   - **Expected:**
     - Table shows: Name, Email, Company, Phone, Type, Date
     - All contact data displays correctly
     - Dates formatted as MM/DD/YYYY
     - Lead type shows in teal badge

**✅ Mark as complete when all tabs display data correctly**

---

### Step 5: Data Display Testing (15 minutes)

1. **Test Home Page Data:**
   - Navigate to home page
   - **Expected:**
     - Stats display: 50 submissions, 500 weeks saved, 25 years, 15 countries
     - 3-4 service cards display in grid
     - 3 testimonial cards display
     - All images load (or placeholders show)

2. **Test Services Page Data:**
   - Navigate to services page
   - **Expected:**
     - All services display in responsive grid
     - Each card shows: icon, title, description, features list
     - "Learn More" links present
     - Hover effects work (shadow increases, slight lift)

3. **Test Blog Page Data:**
   - Navigate to blog page
   - **Expected:**
     - Published blog posts display
     - Each card shows: featured image, title, excerpt, category, read time
     - "Read More" links present
     - Unpublished posts don't appear
     - Hover effects work (shadow, image scale)

4. **Test About Page Data:**
   - Navigate to about page
   - **Expected:**
     - Consultant/team information displays
     - Credentials show in badge format
     - Approach/values cards display with icons
     - Professional image displays

5. **Test Service Detail Page:**
   - Click on a service from services page
   - **Expected:**
     - Service title and description display
     - Features list shows with checkmarks
     - Related services section (if applicable)
     - CTA section displays

6. **Test Blog Post Detail Page:**
   - Click on a blog post from blog page
   - **Expected:**
     - Post title and featured image display
     - Post content renders correctly
     - Author name and role display
     - Category and tags show
     - Related posts section (if applicable)

**✅ Mark as complete when all data displays correctly**

---

### Step 6: Blog Post Management Testing (20 minutes)

1. **Test Create New Blog Post:**
   - Go to Admin → Blog Posts tab
   - Click "New Post" button
   - **Expected:** Form displays
   - Fill in all fields:
     - Title: "Test Blog Post"
     - Slug: (auto-generated)
     - Excerpt: "This is a test excerpt for the blog post"
     - Content: "This is the full content of the test blog post. It can be much longer."
     - Author: "Test Author"
     - Author Role: "Test Role"
     - Category: Select "regulatory"
     - Tags: "FDA, Testing, Regulatory"
     - Check "Publish immediately"
   - Click "Create Post"
   - **Expected:**
     - Success toast appears
     - Form closes
     - New post appears in list
     - Post shows as "Published"

2. **Test Slug Auto-Generation:**
   - Click "New Post"
   - Type title: "My New Blog Post!"
   - **Expected:** Slug auto-fills as "my-new-blog-post"
   - Type title: "FDA Approval Process 2025"
   - **Expected:** Slug auto-fills as "fda-approval-process-2025"

3. **Test Edit Blog Post:**
   - Click Edit button on the test post
   - **Expected:** Form pre-fills with existing data
   - Modify title to: "Updated Test Blog Post"
   - Modify excerpt
   - Click "Update Post"
   - **Expected:**
     - Success toast appears
     - Form closes
     - Updated data shows in list

4. **Test Delete Blog Post:**
   - Click Delete button on test post
   - **Expected:** Confirmation dialog appears
   - Click "OK" to confirm
   - **Expected:**
     - Success toast appears
     - Post removed from list

5. **Test Publish/Unpublish:**
   - Create a new post with "Publish immediately" unchecked
   - **Expected:** Post shows as "Draft" in list
   - Edit the post and check "Publish immediately"
   - **Expected:** Post shows as "Published"
   - Go to public blog page
   - **Expected:** Published post appears, draft doesn't

6. **Test Form Validation:**
   - Click "New Post"
   - Leave Title empty
   - Try to submit
   - **Expected:** Browser validation prevents submission
   - Leave Excerpt empty
   - Try to submit
   - **Expected:** Browser validation prevents submission

**✅ Mark as complete when blog post CRUD operations work**

---

### Step 7: Service Management Testing (15 minutes)

1. **Test Create New Service:**
   - Go to Admin → Services tab
   - Click "New Service" button
   - **Expected:** Form displays
   - Fill in all fields:
     - Title: "Test Service"
     - Icon: Select "map-pin"
     - Description: "This is a test service description"
     - Features: (one per line)
       ```
       Test feature 1
       Test feature 2
       Test feature 3
       ```
     - Case Study: "Test case study snippet"
   - Click "Create Service"
   - **Expected:**
     - Success toast appears
     - Form closes
     - New service appears in list

2. **Test Edit Service:**
   - Click Edit button on test service
   - **Expected:** 
     - Form pre-fills with existing data
     - Features display one per line
   - Modify title to: "Updated Test Service"
   - Add another feature
   - Click "Update Service"
   - **Expected:**
     - Success toast appears
     - Form closes
     - Updated data shows in list

3. **Test Delete Service:**
   - Click Delete button on test service
   - **Expected:** Confirmation dialog appears
   - Click "OK" to confirm
   - **Expected:**
     - Success toast appears
     - Service removed from list

4. **Test Icon Selection:**
   - Create new service
   - Try different icon options
   - **Expected:** All icon options available in dropdown

5. **Test Features List:**
   - Create service with features
   - Go to public services page
   - **Expected:** Features display as bullet list with checkmarks

**✅ Mark as complete when service CRUD operations work**

---

### Step 8: Image Upload Testing (15 minutes)

1. **Test Upload Button:**
   - Go to Admin → Blog Posts → New Post
   - Scroll to "Featured Image" section
   - Click "Upload Image" button
   - **Expected:** File selection dialog opens

2. **Test File Selection:**
   - Select an image file (JPG, PNG, etc.)
   - **Expected:**
     - "Uploading..." text appears
     - Upload progress indicator (if implemented)

3. **Test Successful Upload:**
   - Wait for upload to complete
   - **Expected:**
     - Image URL populates in input field
     - Image preview displays below
     - Preview shows correct image
     - URL is a Supabase storage URL

4. **Test Image Preview:**
   - After upload completes
   - **Expected:**
     - Preview image displays
     - Preview has reasonable size (height ~128px)
     - X button appears on preview

5. **Test Remove Image:**
   - Click X button on image preview
   - **Expected:**
     - Preview disappears
     - URL field clears
     - Can upload new image

6. **Test Manual URL Input:**
   - Paste an image URL directly: `https://example.com/image.jpg`
   - **Expected:**
     - URL accepts
     - Preview displays (if URL is valid)
     - Image saves correctly

7. **Test Error Handling:**
   - Try to upload a very large file (>10MB)
   - **Expected:** Error toast appears (if size limit enforced)
   - Try to upload non-image file
   - **Expected:** File picker filters to images only

8. **Test Image in Published Post:**
   - Create post with uploaded image
   - Publish post
   - Go to public blog page
   - Click on the post
   - **Expected:** Featured image displays correctly

**✅ Mark as complete when image upload works end-to-end**

---

## Cross-Browser Testing

Test the application in multiple browsers:

### Chrome
- [ ] All navigation works
- [ ] Forms submit correctly
- [ ] Authentication works
- [ ] Admin panel functions
- [ ] Images display correctly

### Firefox
- [ ] All navigation works
- [ ] Forms submit correctly
- [ ] Authentication works
- [ ] Admin panel functions
- [ ] Images display correctly

### Safari
- [ ] All navigation works
- [ ] Forms submit correctly
- [ ] Authentication works
- [ ] Admin panel functions
- [ ] Images display correctly

### Edge
- [ ] All navigation works
- [ ] Forms submit correctly
- [ ] Authentication works
- [ ] Admin panel functions
- [ ] Images display correctly

---

## Responsive Testing

Test on different screen sizes:

### Desktop (1920x1080)
- [ ] Layout looks correct
- [ ] Navigation displays horizontally
- [ ] Cards display in grid (3-4 columns)
- [ ] All content readable

### Tablet (768x1024)
- [ ] Layout adapts correctly
- [ ] Navigation may show hamburger menu
- [ ] Cards display in 2 columns
- [ ] Touch targets adequate (44x44px)

### Mobile (375x667)
- [ ] Layout stacks vertically
- [ ] Hamburger menu displays
- [ ] Cards display in single column
- [ ] Text size readable (min 16px)
- [ ] Touch targets adequate

---

## Performance Testing

### Page Load Times
- [ ] Home page loads < 3 seconds
- [ ] Services page loads < 3 seconds
- [ ] Blog page loads < 3 seconds
- [ ] Admin panel loads < 3 seconds

### Lighthouse Audit
Run Lighthouse audit in Chrome DevTools:
- [ ] Performance score > 80
- [ ] Accessibility score > 90
- [ ] Best Practices score > 80
- [ ] SEO score > 80

---

## Final Checklist

- [ ] All navigation links work
- [ ] Contact form submits correctly
- [ ] Authentication flow works
- [ ] Admin panel loads and functions
- [ ] Data fetches and displays correctly
- [ ] Blog post CRUD operations work
- [ ] Service CRUD operations work
- [ ] Image upload works
- [ ] Cross-browser compatibility verified
- [ ] Responsive design verified
- [ ] Performance acceptable

**When all items are checked, functional testing is complete! ✅**

