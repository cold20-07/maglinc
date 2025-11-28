# Supabase Storage Setup for Blog Images

## Quick Setup (Recommended)

**Run this SQL in Supabase SQL Editor:**

```sql
-- Create bucket and policies
INSERT INTO storage.buckets (id, name, public)
VALUES ('blog-images', 'blog-images', true)
ON CONFLICT (id) DO NOTHING;

-- Allow public read
CREATE POLICY "Public Access" ON storage.objects 
FOR SELECT USING (bucket_id = 'blog-images');

-- Allow public upload (change to authenticated for production)
CREATE POLICY "Anyone can upload" ON storage.objects 
FOR INSERT WITH CHECK (bucket_id = 'blog-images');

CREATE POLICY "Anyone can update" ON storage.objects 
FOR UPDATE USING (bucket_id = 'blog-images');

CREATE POLICY "Anyone can delete" ON storage.objects 
FOR DELETE USING (bucket_id = 'blog-images');
```

**Or use the full SQL file:** Run `backend/create_storage_bucket.sql` in SQL Editor

---

## Manual Setup (Alternative)

### Step 1: Create Storage Bucket

1. Go to your Supabase Dashboard
2. Navigate to **Storage** in the left sidebar
3. Click **New bucket**
4. Enter bucket name: `blog-images`
5. Set **Public bucket** to **ON** (this allows public read access)
6. Click **Create bucket**

## Step 2: Set Storage Policies

After creating the bucket, you need to set up policies for access control:

1. Click on the `blog-images` bucket
2. Go to **Policies** tab
3. Click **New policy**

### Policy 1: Public Read Access
- Policy name: `Public Access`
- Allowed operation: `SELECT`
- Policy definition:
```sql
bucket_id = 'blog-images'
```

### Policy 2: Authenticated Upload
- Policy name: `Authenticated users can upload`
- Allowed operation: `INSERT`
- Policy definition:
```sql
bucket_id = 'blog-images' AND auth.role() = 'authenticated'
```

### Policy 3: Authenticated Update
- Policy name: `Authenticated users can update`
- Allowed operation: `UPDATE`
- Policy definition:
```sql
bucket_id = 'blog-images' AND auth.role() = 'authenticated'
```

### Policy 4: Authenticated Delete
- Policy name: `Authenticated users can delete`
- Allowed operation: `DELETE`
- Policy definition:
```sql
bucket_id = 'blog-images' AND auth.role() = 'authenticated'
```

## Step 3: Configure File Size Limits (Optional)

In your Supabase project settings:
1. Go to **Settings** > **Storage**
2. Set maximum file size (recommended: 5MB for blog images)
3. Set allowed MIME types: `image/jpeg, image/png, image/gif, image/webp`

## Testing

After setup, test the upload functionality:
1. Log in to your admin panel
2. Create or edit a blog post
3. Click "Upload Image" button
4. Select an image file
5. Verify the image appears in the preview
6. Save the blog post
7. Check that the image displays correctly on the blog

## Troubleshooting

### Upload fails with "Permission denied"
- Verify the storage policies are correctly set
- Ensure you're logged in as an authenticated user
- Check that the bucket name is exactly `blog-images`

### Image doesn't display
- Verify the bucket is set to **Public**
- Check the image URL in the database
- Ensure the file was successfully uploaded to storage

### Large files fail to upload
- Check file size limits in Supabase settings
- Optimize images before uploading (recommended max: 2MB)
- Consider using image compression tools
