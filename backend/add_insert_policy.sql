-- Add Missing INSERT Policy for blog-images
-- This is the fix for your specific issue
-- Safe to run - won't affect existing policies

-- Add INSERT policy to allow uploads
CREATE POLICY "Public insert blog images"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'blog-images');

-- Verify it was created
SELECT 
    policyname as policy_name,
    cmd as operation,
    'Successfully created!' as status
FROM pg_policies 
WHERE schemaname = 'storage' 
AND tablename = 'objects'
AND cmd = 'INSERT'
AND qual LIKE '%blog-images%';

-- You should see 1 row showing the INSERT policy
