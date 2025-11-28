# Authentication Setup Guide

## Overview

Your admin panel is now protected with Supabase Authentication. Users must log in to access `/admin`.

## What Was Added

### New Files
1. **frontend/src/pages/Login.js** - Login page with email/password
2. **frontend/src/components/ProtectedRoute.js** - Route protection wrapper
3. **backend/setup_authentication.sql** - SQL to secure database policies

### Modified Files
1. **frontend/src/App.js** - Added login route and protected admin route
2. **frontend/src/pages/Admin.js** - Added logout button

## Setup Steps

### Step 1: Enable Email Authentication in Supabase

1. **Go to Supabase Dashboard**
   - Navigate to Authentication → Providers

2. **Enable Email Provider**
   - Email should be enabled by default
   - If not, toggle it ON

3. **Configure Email Settings** (Optional)
   - Authentication → Email Templates
   - Customize confirmation and password reset emails

### Step 2: Create Admin User

**Option A: Using Supabase Dashboard (Recommended)**

1. Go to Authentication → Users
2. Click "Add user" → "Create new user"
3. Enter:
   - Email: `admin@yourdomain.com`
   - Password: Create a strong password
   - Auto Confirm User: **ON** (important!)
4. Click "Create user"

**Option B: Using SQL**

```sql
-- Run in SQL Editor
-- Replace with your email and password
INSERT INTO auth.users (
  instance_id,
  id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  created_at,
  updated_at,
  confirmation_token,
  email_change,
  email_change_token_new,
  recovery_token
) VALUES (
  '00000000-0000-0000-0000-000000000000',
  gen_random_uuid(),
  'authenticated',
  'authenticated',
  'admin@yourdomain.com',
  crypt('your-secure-password', gen_salt('bf')),
  NOW(),
  NOW(),
  NOW(),
  '',
  '',
  '',
  ''
);
```

### Step 3: Secure Database Policies

Run `backend/setup_authentication.sql` in SQL Editor to:
- Require authentication for uploads
- Require authentication for creating/editing content
- Keep public read access for published content

**Or run manually:**

```sql
-- Update storage policies
DROP POLICY IF EXISTS "Anyone can upload" ON storage.objects;

CREATE POLICY "Authenticated users can upload blog images"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'blog-images' AND auth.role() = 'authenticated');

-- Update blog posts policies
CREATE POLICY "Authenticated users can manage posts"
ON blog_posts FOR ALL
USING (auth.role() = 'authenticated')
WITH CHECK (auth.role() = 'authenticated');

-- Update services policies
CREATE POLICY "Authenticated users can manage services"
ON services FOR INSERT
WITH CHECK (auth.role() = 'authenticated');
```

### Step 4: Test Authentication

1. **Try accessing admin without login:**
   - Go to `/admin`
   - Should redirect to `/login`

2. **Login:**
   - Go to `/login`
   - Enter admin email and password
   - Should redirect to `/admin`

3. **Test admin functions:**
   - Create a blog post
   - Upload an image
   - Create a service
   - All should work

4. **Logout:**
   - Click "Logout" button in admin panel
   - Should redirect to `/login`
   - Try accessing `/admin` again
   - Should redirect to `/login`

## How It Works

### Login Flow
```
User visits /admin
    ↓
Not authenticated?
    ↓
Redirect to /login
    ↓
User enters credentials
    ↓
Supabase validates
    ↓
Session created
    ↓
Redirect to /admin
    ↓
Access granted
```

### Protected Route
- `ProtectedRoute` component checks authentication
- Uses `supabase.auth.getSession()` to verify
- Listens for auth state changes
- Redirects to `/login` if not authenticated

### Session Management
- Sessions stored in browser localStorage
- Automatically refreshed by Supabase
- Persists across page refreshes
- Cleared on logout

## Security Features

### What's Protected
✅ Admin panel (`/admin`)
✅ Image uploads
✅ Creating/editing blog posts
✅ Creating/editing services
✅ Deleting content

### What's Public
✅ Homepage and all public pages
✅ Viewing published blog posts
✅ Viewing services
✅ Contact form submissions
✅ Viewing uploaded images

## Managing Users

### Add More Admin Users

1. **Supabase Dashboard:**
   - Authentication → Users
   - Add user → Create new user
   - Auto confirm user: ON

2. **Share credentials securely:**
   - Use a password manager
   - Don't send passwords via email
   - Require strong passwords

### Remove Admin Access

1. **Supabase Dashboard:**
   - Authentication → Users
   - Find user
   - Click "..." → Delete user

### Reset Password

**For yourself:**
1. Go to `/login`
2. Click "Forgot password?" (if you add this feature)
3. Check email for reset link

**For others:**
1. Supabase Dashboard → Authentication → Users
2. Find user → "..." → Send password reset email

## Customization

### Change Login Page Design

Edit `frontend/src/pages/Login.js`:
- Update colors
- Change logo
- Modify text
- Add "Remember me" checkbox
- Add "Forgot password" link

### Add More Auth Features

**Forgot Password:**
```javascript
const handleForgotPassword = async (email) => {
  const { error } = await supabase.auth.resetPasswordForEmail(email);
  if (error) toast.error(error.message);
  else toast.success('Check your email for reset link');
};
```

**Remember Me:**
```javascript
const { data, error } = await supabase.auth.signInWithPassword({
  email,
  password,
  options: {
    persistSession: true // or false for "don't remember"
  }
});
```

### Add Role-Based Access

If you want different admin levels:

```sql
-- Add role column to users
ALTER TABLE auth.users ADD COLUMN IF NOT EXISTS role TEXT DEFAULT 'admin';

-- Update policies to check role
CREATE POLICY "Super admins can delete"
ON blog_posts FOR DELETE
USING (
  auth.role() = 'authenticated' 
  AND (SELECT role FROM auth.users WHERE id = auth.uid()) = 'super_admin'
);
```

## Troubleshooting

### Can't Login

**Check:**
1. Email is correct (case-sensitive)
2. Password is correct
3. User exists in Authentication → Users
4. User is confirmed (email_confirmed_at is set)
5. Browser console for errors

**Fix:**
- Reset password via Supabase Dashboard
- Or delete and recreate user

### Redirects to Login Immediately After Login

**Possible causes:**
1. Session not being saved
2. Browser blocking cookies/localStorage
3. CORS issue

**Fix:**
- Check browser console for errors
- Try incognito mode
- Check Supabase URL in `.env`

### Image Upload Fails After Adding Auth

**Cause:** Storage policies now require authentication

**Fix:**
- Make sure you're logged in
- Run `backend/setup_authentication.sql`
- Verify policies in Supabase Dashboard

### "Invalid JWT" Error

**Cause:** Session expired or corrupted

**Fix:**
- Logout and login again
- Clear browser localStorage
- Check Supabase project is active

## Production Checklist

Before deploying:

- [ ] Create admin user(s)
- [ ] Use strong passwords
- [ ] Run `backend/setup_authentication.sql`
- [ ] Test login/logout flow
- [ ] Test all admin functions while logged in
- [ ] Verify public pages still work
- [ ] Test on different browsers
- [ ] Set up password reset emails
- [ ] Configure email templates in Supabase
- [ ] Add rate limiting (Supabase does this automatically)
- [ ] Monitor failed login attempts

## Security Best Practices

1. **Strong Passwords**
   - Minimum 12 characters
   - Mix of letters, numbers, symbols
   - Use password manager

2. **Limit Admin Users**
   - Only create accounts for people who need them
   - Remove users when they leave

3. **Monitor Access**
   - Check Supabase logs regularly
   - Look for suspicious activity
   - Set up alerts for failed logins

4. **Keep Credentials Secret**
   - Never commit passwords to git
   - Don't share passwords via email/chat
   - Use secure password sharing tools

5. **Regular Updates**
   - Keep dependencies updated
   - Monitor Supabase security advisories
   - Update passwords periodically

## Support

- **Supabase Auth Docs:** https://supabase.com/docs/guides/auth
- **Troubleshooting:** See `TROUBLESHOOTING.md`
- **Security:** See Supabase Dashboard → Authentication

---

**Your admin panel is now secure!** 🔒
