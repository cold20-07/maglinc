# Admin Panel Guide

## Overview

The admin panel allows you to manage your website content including blog posts, services, and contact submissions.

**Access:** Navigate to `/admin` in your browser

---

## Features

### 1. Blog Posts Management

Create, edit, and delete blog posts with rich content and images.

#### Creating a Blog Post

1. Click the **Blog Posts** tab
2. Click **New Post** button
3. Fill in the form:
   - **Title:** Post title (slug auto-generates)
   - **Slug:** URL-friendly version (e.g., `my-blog-post`)
   - **Excerpt:** Short summary for listings
   - **Content:** Full blog post content
   - **Author:** Author name
   - **Author Role:** Author's position/title
   - **Category:** Select from dropdown
   - **Tags:** Comma-separated (e.g., `FDA, Regulatory, Compliance`)
   - **Featured Image:** Upload or enter URL
   - **Published:** Check to publish immediately

4. Click **Create Post**

#### Uploading Images

You can add images to blog posts in two ways:

**Option 1: Upload from Computer**
1. Click **Upload Image** button
2. Select an image file (JPEG, PNG, GIF, WebP)
3. Wait for upload to complete
4. Image URL will auto-populate

**Option 2: Enter Image URL**
1. Paste image URL directly in the field
2. Preview will appear below

**Image Requirements:**
- Max size: 5MB (recommended: under 2MB)
- Formats: JPEG, PNG, GIF, WebP
- Recommended dimensions: 1200x630px for featured images

#### Editing a Blog Post

1. Find the post in the table
2. Click the **Edit** button (pencil icon)
3. Modify the fields
4. Click **Update Post**

#### Deleting a Blog Post

1. Find the post in the table
2. Click the **Delete** button (trash icon)
3. Confirm deletion

---

### 2. Services Management

Add and manage the services displayed on your website.

#### Creating a Service

1. Click the **Services** tab
2. Click **New Service** button
3. Fill in the form:
   - **Title:** Service name
   - **Icon:** Select from dropdown (map-pin, file-text, shield-check, etc.)
   - **Description:** Brief service description
   - **Features:** One feature per line
   - **Case Study Snippet:** Optional success story

4. Click **Create Service**

#### Service Icons Available

- **map-pin:** Location/navigation services
- **file-text:** Documentation services
- **shield-check:** Compliance/security services
- **pen-tool:** Design/writing services
- **alert-triangle:** Risk/warning services
- **folder:** Organization/management services

#### Editing a Service

1. Find the service in the table
2. Click the **Edit** button
3. Modify the fields
4. Click **Update Service**

#### Deleting a Service

1. Find the service in the table
2. Click the **Delete** button
3. Confirm deletion

---

### 3. Contact Submissions

View all contact form submissions from your website.

#### Viewing Contacts

1. Click the **Contacts** tab
2. Browse the table with all submissions
3. Information displayed:
   - Name
   - Email
   - Company
   - Phone
   - Lead Type
   - Submission Date

#### Exporting Contacts

Currently, contacts can be viewed in the admin panel. To export:
1. Use Supabase Dashboard → Table Editor
2. Select `contacts` table
3. Export as CSV

---

## Best Practices

### Blog Posts

1. **SEO-Friendly Slugs**
   - Use lowercase letters
   - Separate words with hyphens
   - Keep it short and descriptive
   - Example: `fda-approval-guide`

2. **Compelling Excerpts**
   - Keep under 160 characters
   - Include main benefit or hook
   - Use action words

3. **Quality Images**
   - Optimize before uploading
   - Use descriptive file names
   - Ensure images are relevant
   - Consider mobile viewing

4. **Tags**
   - Use 3-5 relevant tags
   - Be consistent with tag names
   - Use title case (e.g., `FDA Approval`)

5. **Publishing**
   - Save as draft first
   - Review content
   - Check image displays correctly
   - Then publish

### Services

1. **Clear Titles**
   - Use specific, benefit-focused names
   - Example: "FDA Submission Support" vs "Regulatory Help"

2. **Concise Descriptions**
   - 1-2 sentences max
   - Focus on the main benefit
   - Use active voice

3. **Specific Features**
   - List 3-5 key features
   - Be specific and actionable
   - Use bullet-point style
   - Example: "510(k) submission preparation" vs "Help with submissions"

4. **Case Study Snippets**
   - Include specific results
   - Use numbers when possible
   - Keep it brief (2-3 sentences)

---

## Troubleshooting

### Image Upload Fails

**Problem:** "Failed to upload image" error

**Solutions:**
1. Check file size (must be under 5MB)
2. Verify file format (JPEG, PNG, GIF, WebP only)
3. Ensure storage bucket is set up correctly
4. Check you're logged in as authenticated user

### Can't Save Blog Post

**Problem:** Error when clicking "Create Post" or "Update Post"

**Solutions:**
1. Ensure all required fields are filled (marked with *)
2. Check slug is unique (no duplicate slugs)
3. Verify you're authenticated
4. Check browser console for specific errors

### Services Not Appearing

**Problem:** Created service doesn't show on website

**Solutions:**
1. Refresh the Services page
2. Check service was saved (should appear in table)
3. Clear browser cache
4. Verify Supabase connection

### Image Doesn't Display

**Problem:** Uploaded image doesn't show in preview or on site

**Solutions:**
1. Verify storage bucket is set to "Public"
2. Check image URL is correct
3. Ensure image file uploaded successfully
4. Try uploading a different image

---

## Security Notes

### Authentication Required

The admin panel requires authentication. Make sure to:
1. Set up Supabase authentication
2. Create admin user accounts
3. Never share admin credentials
4. Use strong passwords

### Row Level Security (RLS)

Supabase RLS policies protect your data:
- Public can read published blog posts
- Only authenticated users can create/edit/delete
- Contacts are only visible to authenticated users

### Storage Security

Blog images storage:
- Public read access (anyone can view)
- Only authenticated users can upload/delete
- File size limits prevent abuse

---

## Tips for Efficiency

1. **Batch Operations**
   - Create multiple posts in one session
   - Prepare content in advance
   - Upload images beforehand

2. **Content Calendar**
   - Plan blog posts in advance
   - Save as drafts
   - Publish on schedule

3. **Reusable Content**
   - Save common tags
   - Reuse image URLs
   - Template common structures

4. **Regular Maintenance**
   - Review old posts
   - Update outdated information
   - Remove unused services
   - Archive old contacts

---

## Support

For technical issues:
1. Check browser console for errors
2. Review Supabase logs
3. Verify environment variables
4. Check network connectivity

For content questions:
1. Review this guide
2. Check example posts
3. Follow best practices above

---

## Quick Reference

### Blog Post Status
- **Draft:** Not visible to public (published = false)
- **Published:** Visible on website (published = true)

### Service Icons
- map-pin, file-text, shield-check, pen-tool, alert-triangle, folder

### Image Formats
- JPEG, PNG, GIF, WebP (max 5MB)

### Required Fields
- Blog: Title, Slug, Excerpt, Content, Author
- Service: Title, Icon, Description, Features

---

## Updates & Changelog

### Latest Features
- ✅ Image upload for blog posts
- ✅ Services management
- ✅ Drag-and-drop image upload
- ✅ Image preview
- ✅ Auto-slug generation

### Coming Soon
- 📝 Rich text editor for blog content
- 🖼️ Image gallery/library
- 📊 Analytics dashboard
- 🔍 Search and filter
- 📤 Bulk operations

---

That's everything you need to know about managing your admin panel! 🎉
