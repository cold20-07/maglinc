-- Diagnostic Script for Storage Issues
-- Run this to see what's configured and what might be wrong

-- ============================================
-- 1. CHECK BUCKET
-- ============================================
SELECT 
    '=== BUCKET INFO ===' as section,
    id, 
    name, 
    public as is_public,
    created_at
FROM storage.buckets 
WHERE id = 'blog-images';

-- Expected: 1 row with public = true
-- If no rows: Bucket doesn't exist
-- If public = false: Bucket is private (won't work)

-- ============================================
-- 2. CHECK POLICIES
-- ============================================
SELECT 
    '=== POLICIES ===' as section,
    policyname as policy_name,
    cmd as operation,
    CASE 
        WHEN roles = '{public}' THEN 'Public (anyone)'
        WHEN roles = '{authenticated}' THEN 'Authenticated only'
        ELSE roles::text
    END as who_can_access,
    qual as condition
FROM pg_policies 
WHERE schemaname = 'storage' 
AND tablename = 'objects'
AND (policyname LIKE '%blog%' OR qual LIKE '%blog-images%')
ORDER BY cmd;

-- Expected: 4 policies (SELECT, INSERT, UPDATE, DELETE)
-- For development: roles should be {public}
-- For production: roles should be {authenticated}

-- ============================================
-- 3. CHECK WHAT'S MISSING
-- ============================================
SELECT 
    '=== MISSING POLICIES ===' as section,
    operation,
    'MISSING - Need to create this policy' as status
FROM (
    SELECT 'SELECT' as operation
    UNION SELECT 'INSERT'
    UNION SELECT 'UPDATE'
    UNION SELECT 'DELETE'
) required
WHERE operation NOT IN (
    SELECT cmd 
    FROM pg_policies 
    WHERE schemaname = 'storage' 
    AND tablename = 'objects'
    AND qual LIKE '%blog-images%'
);

-- If this returns rows, those policies are missing

-- ============================================
-- 4. TEST BUCKET ACCESS
-- ============================================
SELECT 
    '=== BUCKET ACCESS TEST ===' as section,
    CASE 
        WHEN EXISTS (
            SELECT 1 FROM storage.buckets 
            WHERE id = 'blog-images' AND public = true
        ) THEN '✓ Bucket is public'
        WHEN EXISTS (
            SELECT 1 FROM storage.buckets 
            WHERE id = 'blog-images' AND public = false
        ) THEN '✗ Bucket exists but is PRIVATE (this is the problem!)'
        ELSE '✗ Bucket does not exist'
    END as bucket_status;

-- ============================================
-- 5. RECOMMENDED ACTIONS
-- ============================================
SELECT 
    '=== RECOMMENDATIONS ===' as section,
    CASE 
        -- Bucket doesn't exist
        WHEN NOT EXISTS (SELECT 1 FROM storage.buckets WHERE id = 'blog-images')
        THEN 'Run: INSERT INTO storage.buckets (id, name, public) VALUES (''blog-images'', ''blog-images'', true);'
        
        -- Bucket exists but is private
        WHEN EXISTS (SELECT 1 FROM storage.buckets WHERE id = 'blog-images' AND public = false)
        THEN 'Run: UPDATE storage.buckets SET public = true WHERE id = ''blog-images'';'
        
        -- Missing INSERT policy
        WHEN NOT EXISTS (
            SELECT 1 FROM pg_policies 
            WHERE schemaname = 'storage' 
            AND tablename = 'objects'
            AND cmd = 'INSERT'
            AND qual LIKE '%blog-images%'
        )
        THEN 'Missing INSERT policy - Run the policy creation script'
        
        -- All good
        ELSE '✓ Everything looks good! If upload still fails, check browser console for different error'
    END as action_needed;

-- ============================================
-- SUMMARY
-- ============================================
-- After running this, you'll see:
-- 1. If bucket exists and is public
-- 2. What policies are configured
-- 3. What's missing
-- 4. What to do next
