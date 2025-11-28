# Quick Fix: Image Upload Error

## The Error You're Seeing

```
POST https://[project].supabase.co/storage/v1/object/blog-images/[file].jpg 400 (Bad Request)
Error uploading image: StorageApiError: new row violates row-level security policy
```

## What This Means

The storage bucket for images doesn't exist yet or doesn't have the right permissions.

## Fix It in 2 Minutes

### Step 1: Open Supabase SQL Editor

1. Go to https://supabase.com/dashboard
2. Select your project
3. Click **"SQL Editor"** in the left sidebar
4. Click **"New query"** button

### Step 2: Copy and Paste This SQL

```sql
-- Create the storage bucket
INSERT INTO storage.buckets (id, name, public)
VALUES ('blog-images', 'blog-images', true)
ON CONFLICT (id) DO NOTHING;

-- Allow public to view images
CREATE POLICY "Public Access" 
ON storage.objects FOR SELECT 
USING (bucket_id = 'blog-images');

-- Allow anyone to upload (for now)
CREATE POLICY "Anyone can upload" 
ON storage.objects FOR INSERT 
WITH CHECK (bucket_id = 'blog-images');

-- Allow anyone to update
CREATE POLICY "Anyone can update" 
ON storage.objects FOR UPDATE 
USING (bucket_id = 'blog-images');

-- Allow anyone to delete
CREATE POLICY "Anyone can delete" 
ON storage.objects FOR DELETE 
USING (bucket_id = 'blog-images');
```

### Step 3: Run It

1. Click the **"Run"** button (or press Ctrl+Enter / Cmd+Enter)
2. You should see: **"Success. No rows returned"**

### Step 4: Verify

1. Click **"Storage"** in the left sidebar
2. You should see a bucket named **"blog-images"**
3. It should have a **"Public"** badge

### Step 5: Test Upload

1. Go back to your admin panel (`/admin`)
2. Refresh the page (F5)
3. Click **"New Post"** or edit an existing post
4. Click **"Upload Image"** button
5. Select an image
6. **It should work now!** ✅

## Visual Guide

```
Supabase Dashboard
├── SQL Editor (click here)
│   └── New query (click here)
│       └── Paste SQL above
│       └── Click "Run"
│       └── See "Success"
│
└── Storage (verify here)
    └── blog-images (should appear)
        └── Public badge (should show)
```

## Still Not Working?

### Check 1: Bucket Exists
- Go to Storage in Supabase
- Look for "blog-images" bucket
- If missing, run the SQL again

### Check 2: Bucket is Public
- Click on blog-images bucket
- Look for "Public" badge
- If not public, click settings and enable it

### Check 3: Policies Exist
- Click on blog-images bucket
- Go to "Policies" tab
- Should see 4 policies listed
- If missing, run the SQL again

### Check 4: Environment Variables
- Check `frontend/.env` file exists
- Verify `REACT_APP_SUPABASE_URL` is correct
- Verify `REACT_APP_SUPABASE_ANON_KEY` is correct
- Restart dev server: `npm start`

## Alternative: Manual Setup

If SQL doesn't work, create manually:

1. **Storage → New bucket**
   - Name: `blog-images`
   - Public: ON
   - Create

2. **Click bucket → Policies → New policy**
   - Create 4 policies (see SQL above for details)

## Security Note

⚠️ The policies above allow **anyone** to upload/delete images. This is fine for:
- Development
- Testing
- Internal use

For production with public access, you should:
1. Add authentication to admin panel
2. Update policies to require authentication
3. See `ADMIN_PANEL_GUIDE.md` for security setup

## What Happens After Fix

✅ Upload button will open file picker
✅ Selected image will upload to Supabase
✅ Image preview will appear
✅ Image URL will be saved with blog post
✅ Image will display on blog page

## Need More Help?

- **Detailed guide:** `backend/STORAGE_SETUP_STEPS.md`
- **Troubleshooting:** `TROUBLESHOOTING.md`
- **Full setup:** `SETUP_CHECKLIST.md`

---

**TL;DR:** Run the SQL above in Supabase SQL Editor, then try uploading again. Should work! 🎉
