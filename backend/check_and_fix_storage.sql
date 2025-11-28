-- Safe Storage Check and Fix Script
-- This will NOT drop existing policies
-- Run this in Supabase SQL Editor

-- Step 1: Check if bucket exists
SELECT 
    id, 
    name, 
    public,
    created_at
FROM storage.buckets 
WHERE id = 'blog-images';

-- If the above returns a row, your bucket exists ✓

-- Step 2: Check existing policies
SELECT 
    policyname,
    cmd,
    qual
FROM pg_policies 
WHERE schemaname = 'storage' 
AND tablename = 'objects'
AND policyname LIKE '%blog%';

-- This shows what policies you already have

-- Step 3: Only create missing policies (safe - won't error if they exist)
-- Note: These will fail with "already exists" error if policies exist - that's OK!

-- Public read policy
DO $$ 
BEGIN
    CREATE POLICY "Public Access blog images"
    ON storage.objects FOR SELECT
    USING (bucket_id = 'blog-images');
EXCEPTION WHEN duplicate_object THEN
    RAISE NOTICE 'Policy "Public Access blog images" already exists, skipping';
END $$;

-- Public insert policy  
DO $$ 
BEGIN
    CREATE POLICY "Public insert blog images"
    ON storage.objects FOR INSERT
    WITH CHECK (bucket_id = 'blog-images');
EXCEPTION WHEN duplicate_object THEN
    RAISE NOTICE 'Policy "Public insert blog images" already exists, skipping';
END $$;

-- Public update policy
DO $$ 
BEGIN
    CREATE POLICY "Public update blog images"
    ON storage.objects FOR UPDATE
    USING (bucket_id = 'blog-images');
EXCEPTION WHEN duplicate_object THEN
    RAISE NOTICE 'Policy "Public update blog images" already exists, skipping';
END $$;

-- Public delete policy
DO $$ 
BEGIN
    CREATE POLICY "Public delete blog images"
    ON storage.objects FOR DELETE
    USING (bucket_id = 'blog-images');
EXCEPTION WHEN duplicate_object THEN
    RAISE NOTICE 'Policy "Public delete blog images" already exists, skipping';
END $$;

-- Step 4: Verify all policies are in place
SELECT 
    policyname,
    cmd as operation,
    CASE 
        WHEN cmd = 'SELECT' THEN 'Read/Download'
        WHEN cmd = 'INSERT' THEN 'Upload'
        WHEN cmd = 'UPDATE' THEN 'Update'
        WHEN cmd = 'DELETE' THEN 'Delete'
    END as description
FROM pg_policies 
WHERE schemaname = 'storage' 
AND tablename = 'objects'
AND qual LIKE '%blog-images%'
ORDER BY cmd;

-- You should see 4 policies (SELECT, INSERT, UPDATE, DELETE)
