# Which Script Should I Run?

## You Have Bucket + Policies Already

Since your bucket and policies already exist, here's what to do:

### Step 1: Diagnose (Safe - Read Only)

**Run:** `backend/diagnose_storage_issue.sql`

This will show you:
- ✅ If bucket is public or private
- ✅ What policies exist
- ✅ What's missing
- ✅ What to do next

**This is completely safe** - it only reads data, doesn't change anything.

### Step 2: Based on Results

After running the diagnostic, you'll see one of these:

#### Result A: "Bucket is PRIVATE"
**Problem:** Bucket exists but isn't public

**Fix:** Run this single line:
```sql
UPDATE storage.buckets SET public = true WHERE id = 'blog-images';
```

#### Result B: "Missing INSERT policy"
**Problem:** You can read but not upload

**Fix:** Run `backend/check_and_fix_storage.sql`
- This will add missing policies
- Won't drop existing ones
- Safe to run

#### Result C: "Policies require authentication"
**Problem:** Policies check for `auth.role() = 'authenticated'` but you're not logged in

**Fix:** Either:
1. Add authentication to your app, OR
2. Change policies to allow public access (for development):
```sql
-- Drop the restrictive policy
DROP POLICY IF EXISTS "Authenticated users can upload" ON storage.objects;

-- Create public policy
CREATE POLICY "Anyone can upload" 
ON storage.objects FOR INSERT 
WITH CHECK (bucket_id = 'blog-images');
```

#### Result D: "Everything looks good"
**Problem:** Something else

**Fix:** Check:
- Browser console for different error
- Network tab to see actual request/response
- Supabase logs for server-side errors

## Scripts Comparison

| Script | Safe? | What It Does |
|--------|-------|--------------|
| `diagnose_storage_issue.sql` | ✅ YES | Read-only, shows what's wrong |
| `check_and_fix_storage.sql` | ✅ YES | Adds missing policies, keeps existing |
| `create_storage_bucket.sql` | ⚠️ MAYBE | Drops and recreates policies |

## Recommendation

1. **First:** Run `diagnose_storage_issue.sql`
2. **Read the output** to see what's wrong
3. **Then:** Run the specific fix based on what you see

## Quick Check Without SQL

You can also check in the Supabase UI:

1. **Go to Storage → blog-images**
   - Look for "Public" badge
   - If missing, bucket is private

2. **Click on bucket → Policies tab**
   - Should see 4 policies
   - Check what they allow

3. **Try manual upload**
   - Click "Upload file" in Supabase UI
   - If this works but admin panel doesn't, it's a frontend issue
   - If this fails too, it's a policy issue

## Still Unsure?

Just run the diagnostic script - it's completely safe and will tell you exactly what to do next!

```sql
-- Copy and paste this in SQL Editor
-- It's read-only, won't change anything
-- See: backend/diagnose_storage_issue.sql
```
