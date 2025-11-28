# Troubleshooting Guide

## Image Upload Issues

### Error: "new row violates row-level security policy"

**Problem:** Storage bucket doesn't exist or policies aren't set up correctly.

**Solution:**

1. **Quick Fix - Run SQL:**
   ```sql
   -- Go to Supabase Dashboard → SQL Editor → New Query
   -- Copy and paste this:
   
   INSERT INTO storage.buckets (id, name, public)
   VALUES ('blog-images', 'blog-images', true)
   ON CONFLICT (id) DO NOTHING;
   
   CREATE POLICY "Public Access" ON storage.objects 
   FOR SELECT USING (bucket_id = 'blog-images');
   
   CREATE POLICY "Anyone can upload" ON storage.objects 
   FOR INSERT WITH CHECK (bucket_id = 'blog-images');
   
   CREATE POLICY "Anyone can update" ON storage.objects 
   FOR UPDATE USING (bucket_id = 'blog-images');
   
   CREATE POLICY "Anyone can delete" ON storage.objects 
   FOR DELETE USING (bucket_id = 'blog-images');
   ```

2. **Verify:**
   - Go to Storage in Supabase Dashboard
   - Check `blog-images` bucket exists
   - Verify it's marked as "Public"

3. **Test:**
   - Refresh your admin page
   - Try uploading again

**See also:** `backend/STORAGE_SETUP_STEPS.md` for detailed instructions

---

### Error: "Failed to upload image"

**Possible Causes:**

1. **File too large**
   - Max size: 5MB
   - Solution: Compress image before uploading

2. **Wrong file format**
   - Supported: JPEG, PNG, GIF, WebP
   - Solution: Convert to supported format

3. **Network issue**
   - Solution: Check internet connection, try again

4. **Supabase connection**
   - Solution: Verify `REACT_APP_SUPABASE_URL` and `REACT_APP_SUPABASE_ANON_KEY` in `.env`

---

### Upload Button Does Nothing

**Problem:** Button click not triggering file picker.

**Solution:** This should be fixed now. If still not working:
- Clear browser cache
- Hard refresh (Ctrl+Shift+R or Cmd+Shift+R)
- Check browser console for errors

---

### Image Uploads But Doesn't Display

**Problem:** Image uploaded but preview doesn't show.

**Possible Causes:**

1. **Bucket not public**
   - Go to Storage → blog-images
   - Verify "Public" badge is shown
   - If not, edit bucket and enable public access

2. **Wrong URL**
   - Check the URL in the input field
   - Should start with `https://[project].supabase.co/storage/v1/object/public/blog-images/`

3. **CORS issue**
   - Usually not an issue with Supabase
   - Check browser console for CORS errors

---

## Service Management Issues

### Services Not Saving

**Problem:** Error when creating/updating service.

**Solutions:**

1. **Check required fields:**
   - Title (required)
   - Description (required)
   - Icon (required)
   - Features (required, at least one)

2. **Check database connection:**
   - Verify Supabase credentials in `.env`
   - Check browser console for errors

3. **Check services table exists:**
   ```sql
   -- Run in SQL Editor
   SELECT * FROM services LIMIT 1;
   ```

---

### Services Not Appearing on Website

**Problem:** Created service doesn't show on `/services` page.

**Solutions:**

1. **Refresh the page**
   - Hard refresh (Ctrl+Shift+R)

2. **Check service was saved:**
   - Go to admin panel
   - Check Services tab
   - Verify service appears in table

3. **Check Supabase:**
   - Go to Table Editor → services
   - Verify service exists in database

4. **Check RLS policies:**
   ```sql
   -- Run in SQL Editor
   SELECT * FROM services;
   ```
   - If this returns data, RLS is fine
   - If not, check policies in `backend/supabase_schema.sql`

---

## Blog Post Issues

### Can't Save Blog Post

**Problem:** Error when creating/updating blog post.

**Solutions:**

1. **Check required fields:**
   - Title (required)
   - Slug (required, must be unique)
   - Excerpt (required)
   - Content (required)
   - Author (required)

2. **Duplicate slug:**
   - Each slug must be unique
   - Try changing the slug
   - Or edit the existing post instead

3. **Database connection:**
   - Check `.env` file
   - Verify Supabase credentials

---

### Blog Post Not Appearing

**Problem:** Created post doesn't show on blog page.

**Solutions:**

1. **Check published status:**
   - Post must have "Published" checked
   - Or manually set `published = true` in database

2. **Check published_at date:**
   - Should be set when published
   - If null, post won't show

3. **Refresh blog page:**
   - Hard refresh (Ctrl+Shift+R)

---

## Database Issues

### Table Doesn't Exist

**Problem:** Error about missing table.

**Solution:**

1. **Run schema files in order:**
   ```sql
   -- 1. Run backend/supabase_schema.sql
   -- 2. Run backend/blog_migration.sql
   -- 3. Run backend/update_rls_policies.sql
   ```

2. **Verify tables exist:**
   - Go to Table Editor in Supabase
   - Check for: blog_posts, services, contacts

---

### RLS Policy Errors

**Problem:** "new row violates row-level security policy"

**Solution:**

1. **For development, disable RLS temporarily:**
   ```sql
   -- Run in SQL Editor (NOT recommended for production)
   ALTER TABLE blog_posts DISABLE ROW LEVEL SECURITY;
   ALTER TABLE services DISABLE ROW LEVEL SECURITY;
   ```

2. **Or update policies to allow public access:**
   ```sql
   -- For blog_posts
   CREATE POLICY "Allow public insert" ON blog_posts 
   FOR INSERT WITH CHECK (true);
   
   -- For services
   CREATE POLICY "Allow public insert" ON services 
   FOR INSERT WITH CHECK (true);
   ```

3. **For production, add authentication:**
   - Set up Supabase Auth
   - Protect admin routes
   - Use authenticated policies

---

## Environment Variable Issues

### Supabase Connection Fails

**Problem:** Can't connect to Supabase.

**Solutions:**

1. **Check `.env` file exists:**
   - Location: `frontend/.env`
   - Must start with `REACT_APP_`

2. **Verify credentials:**
   ```env
   REACT_APP_SUPABASE_URL=https://[project].supabase.co
   REACT_APP_SUPABASE_ANON_KEY=eyJhbGc...
   ```

3. **Get correct values:**
   - Supabase Dashboard → Settings → API
   - Copy "Project URL" and "anon public" key

4. **Restart dev server:**
   ```bash
   # Stop server (Ctrl+C)
   npm start
   ```

---

## Build/Deploy Issues

### Build Fails

**Problem:** `npm run build` fails.

**Solutions:**

1. **Check for syntax errors:**
   - Look at error message
   - Fix any import/export issues

2. **Clear cache and reinstall:**
   ```bash
   rm -rf node_modules package-lock.json
   npm install --legacy-peer-deps
   npm run build
   ```

3. **Check Node version:**
   ```bash
   node --version
   # Should be 16+ or 18+
   ```

---

### Environment Variables Not Working in Production

**Problem:** Works locally but not after deploy.

**Solutions:**

1. **Add variables to hosting platform:**
   - Vercel: Project Settings → Environment Variables
   - Netlify: Site Settings → Environment Variables

2. **Redeploy after adding variables:**
   - Variables only apply to new builds
   - Trigger a new deployment

3. **Check variable names:**
   - Must start with `REACT_APP_`
   - Case sensitive
   - No spaces

---

## Browser Issues

### Admin Panel Not Loading

**Problem:** Blank page or errors.

**Solutions:**

1. **Check browser console:**
   - Press F12
   - Look for red errors
   - Share error message for help

2. **Clear cache:**
   - Hard refresh (Ctrl+Shift+R)
   - Or clear browser cache completely

3. **Try different browser:**
   - Test in Chrome, Firefox, or Edge
   - Disable browser extensions

---

### Images Not Loading

**Problem:** Broken image icons.

**Solutions:**

1. **Check image URL:**
   - Right-click image → Copy image address
   - Paste in new tab
   - Should load the image

2. **Check CORS:**
   - Open browser console
   - Look for CORS errors
   - Supabase storage should handle CORS automatically

3. **Check bucket is public:**
   - Storage → blog-images
   - Should show "Public" badge

---

## Getting More Help

### Check Documentation

- `ADMIN_PANEL_GUIDE.md` - Complete admin guide
- `ADMIN_QUICK_START.md` - Quick reference
- `backend/STORAGE_SETUP_STEPS.md` - Storage setup
- `SETUP_CHECKLIST.md` - Setup checklist

### Check Browser Console

1. Press F12 to open DevTools
2. Go to Console tab
3. Look for red error messages
4. Share error details when asking for help

### Check Supabase Logs

1. Go to Supabase Dashboard
2. Click "Logs" in sidebar
3. Check for errors
4. Filter by time period

### Common Error Messages

| Error | Meaning | Solution |
|-------|---------|----------|
| "row-level security policy" | RLS blocking action | Set up policies or disable RLS |
| "Failed to upload image" | Storage issue | Set up storage bucket |
| "Network error" | Connection issue | Check internet/Supabase status |
| "Duplicate key value" | Unique constraint | Change slug or ID |
| "relation does not exist" | Table missing | Run schema SQL files |

---

**Still stuck?** Check the error message in browser console and search for it in this guide.
