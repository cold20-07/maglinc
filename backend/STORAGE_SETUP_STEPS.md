# Storage Setup - Step by Step

## Quick Fix: Run SQL to Create Bucket

The error you're seeing means the storage bucket isn't set up yet. Follow these steps:

### Option 1: Using SQL Editor (Recommended)

1. **Go to Supabase Dashboard**
   - Open your project at https://supabase.com/dashboard

2. **Open SQL Editor**
   - Click "SQL Editor" in the left sidebar
   - Click "New query"

3. **Run This SQL**
   - Copy and paste the contents of `backend/create_storage_bucket.sql`
   - Click "Run" or press Ctrl+Enter
   - You should see "Success. No rows returned"

4. **Verify**
   - Go to "Storage" in the left sidebar
   - You should see a bucket named "blog-images"
   - It should show as "Public"

### Option 2: Using Storage UI (Alternative)

If the SQL approach doesn't work, create it manually:

1. **Go to Storage**
   - Click "Storage" in left sidebar
   - Click "New bucket"

2. **Create Bucket**
   - Name: `blog-images`
   - Toggle "Public bucket" to **ON**
   - Click "Create bucket"

3. **Set Policies**
   - Click on the `blog-images` bucket
   - Go to "Policies" tab
   - Click "New policy"
   - Select "For full customization"

4. **Add These 4 Policies:**

   **Policy 1: Public Read**
   - Name: `Public Access`
   - Allowed operation: `SELECT`
   - Policy definition: `true`
   - Target roles: `public`
   - Click "Review" → "Save policy"

   **Policy 2: Public Insert**
   - Name: `Anyone can upload`
   - Allowed operation: `INSERT`
   - Policy definition: `true`
   - Target roles: `public`
   - Click "Review" → "Save policy"

   **Policy 3: Public Update**
   - Name: `Anyone can update`
   - Allowed operation: `UPDATE`
   - Policy definition: `true`
   - Target roles: `public`
   - Click "Review" → "Save policy"

   **Policy 4: Public Delete**
   - Name: `Anyone can delete`
   - Allowed operation: `DELETE`
   - Policy definition: `true`
   - Target roles: `public`
   - Click "Review" → "Save policy"

## After Setup

1. **Refresh your admin page**
2. **Try uploading an image again**
3. **It should work now!**

## Security Note

⚠️ **Important:** The policies above allow anyone to upload/delete images. This is fine for development/testing, but for production you should:

1. Add authentication to your admin panel
2. Update policies to require authentication:
   ```sql
   -- Replace the policies with these for production:
   
   CREATE POLICY "Authenticated users can upload"
   ON storage.objects FOR INSERT
   WITH CHECK (bucket_id = 'blog-images' AND auth.role() = 'authenticated');
   
   CREATE POLICY "Authenticated users can update"
   ON storage.objects FOR UPDATE
   USING (bucket_id = 'blog-images' AND auth.role() = 'authenticated');
   
   CREATE POLICY "Authenticated users can delete"
   ON storage.objects FOR DELETE
   USING (bucket_id = 'blog-images' AND auth.role() = 'authenticated');
   ```

## Troubleshooting

### Still getting 400 error?
- Make sure bucket name is exactly `blog-images` (no spaces, lowercase)
- Verify bucket is set to "Public"
- Check that all 4 policies are created
- Try refreshing the Supabase dashboard

### Bucket already exists error?
- That's fine! Just set up the policies
- Or run the SQL with `ON CONFLICT DO NOTHING` (already in the SQL file)

### Can't see the bucket?
- Wait 10-20 seconds and refresh
- Check you're in the correct project
- Try logging out and back into Supabase

## Verification

After setup, verify it works:

1. Go to Storage → blog-images
2. Try uploading a file manually through the UI
3. If that works, try from your admin panel
4. Check that uploaded images appear in the bucket

---

**Need help?** Check the Supabase Storage documentation: https://supabase.com/docs/guides/storage
