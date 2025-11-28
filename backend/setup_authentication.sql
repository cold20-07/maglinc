-- Setup Authentication and Update Policies
-- Run this after setting up Supabase Auth

-- ============================================
-- 1. UPDATE STORAGE POLICIES (Require Auth)
-- ============================================

-- Drop public policies
DROP POLICY IF EXISTS "Anyone can upload" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can update" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can delete" ON storage.objects;
DROP POLICY IF EXISTS "Public insert blog images" ON storage.objects;
DROP POLICY IF EXISTS "Public update blog images" ON storage.objects;
DROP POLICY IF EXISTS "Public delete blog images" ON storage.objects;

-- Create authenticated-only policies
CREATE POLICY "Authenticated users can upload blog images"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'blog-images' AND auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update blog images"
ON storage.objects FOR UPDATE
USING (bucket_id = 'blog-images' AND auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete blog images"
ON storage.objects FOR DELETE
USING (bucket_id = 'blog-images' AND auth.role() = 'authenticated');

-- Keep public read access (so images display on website)
-- This should already exist, but create if missing
DO $$ 
BEGIN
    CREATE POLICY "Public can view blog images"
    ON storage.objects FOR SELECT
    USING (bucket_id = 'blog-images');
EXCEPTION WHEN duplicate_object THEN
    NULL;
END $$;

-- ============================================
-- 2. UPDATE BLOG POSTS POLICIES
-- ============================================

-- Drop public policies if they exist
DROP POLICY IF EXISTS "Allow public insert" ON blog_posts;
DROP POLICY IF EXISTS "Enable all access for authenticated users" ON blog_posts;

-- Public can read published posts
CREATE POLICY "Public can read published posts"
ON blog_posts FOR SELECT
USING (published = true);

-- Authenticated users can do everything
CREATE POLICY "Authenticated users can manage posts"
ON blog_posts FOR ALL
USING (auth.role() = 'authenticated')
WITH CHECK (auth.role() = 'authenticated');

-- ============================================
-- 3. UPDATE SERVICES POLICIES
-- ============================================

-- Drop public policies if they exist
DROP POLICY IF EXISTS "Allow public insert" ON services;
DROP POLICY IF EXISTS "Enable read access for all users" ON services;

-- Public can read services
CREATE POLICY "Public can read services"
ON services FOR SELECT
USING (true);

-- Authenticated users can manage services
CREATE POLICY "Authenticated users can manage services"
ON services FOR INSERT
WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update services"
ON services FOR UPDATE
USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete services"
ON services FOR DELETE
USING (auth.role() = 'authenticated');

-- ============================================
-- 4. VERIFY POLICIES
-- ============================================

-- Check storage policies
SELECT 
    '=== STORAGE POLICIES ===' as section,
    policyname,
    cmd as operation
FROM pg_policies 
WHERE schemaname = 'storage' 
AND tablename = 'objects'
AND qual LIKE '%blog-images%'
ORDER BY cmd;

-- Check blog_posts policies
SELECT 
    '=== BLOG POSTS POLICIES ===' as section,
    policyname,
    cmd as operation
FROM pg_policies 
WHERE schemaname = 'public' 
AND tablename = 'blog_posts'
ORDER BY cmd;

-- Check services policies
SELECT 
    '=== SERVICES POLICIES ===' as section,
    policyname,
    cmd as operation
FROM pg_policies 
WHERE schemaname = 'public' 
AND tablename = 'services'
ORDER BY cmd;

-- ============================================
-- NOTES
-- ============================================
-- After running this:
-- 1. Only authenticated users can upload/edit/delete
-- 2. Public can still view published content
-- 3. Admin panel requires login
-- 4. Images are protected from unauthorized uploads
