# Authentication Quick Start

## 🔒 Your Admin Panel is Now Protected!

Anyone trying to access `/admin` will be redirected to `/login`.

## Quick Setup (5 minutes)

### Step 1: Create Admin User

1. **Go to Supabase Dashboard**
   - https://supabase.com/dashboard
   - Select your project

2. **Create User**
   - Click **Authentication** → **Users**
   - Click **Add user** → **Create new user**
   - Enter email: `admin@yourdomain.com`
   - Enter a strong password
   - Toggle **Auto Confirm User** to **ON** ⚠️ Important!
   - Click **Create user**

### Step 2: Test Login

1. **Go to your app**
   - Navigate to `/login`

2. **Login**
   - Enter the email and password you just created
   - Click **Sign In**
   - Should redirect to `/admin`

3. **Test Admin Functions**
   - Create a blog post
   - Upload an image
   - Everything should work

4. **Test Logout**
   - Click **Logout** button
   - Should redirect to `/login`

### Step 3: Secure Database (Optional but Recommended)

Run `backend/setup_authentication.sql` in Supabase SQL Editor to:
- Require authentication for uploads
- Require authentication for editing content
- Keep public read access

**Or skip this for now** - it will work without it, but anyone with the Supabase URL could potentially upload images directly.

## That's It!

Your admin panel is now protected. Only users you create in Supabase can access it.

## What Changed

### New Routes
- `/login` - Login page
- `/admin` - Now requires authentication

### New Features
- ✅ Login with email/password
- ✅ Logout button in admin panel
- ✅ Automatic redirect if not logged in
- ✅ Session persists across page refreshes

## Quick Reference

### Access Admin Panel
1. Go to `/login`
2. Enter credentials
3. Click "Sign In"

### Logout
- Click "Logout" button in admin panel

### Add More Users
- Supabase Dashboard → Authentication → Users → Add user

### Reset Password
- Supabase Dashboard → Authentication → Users → Find user → Send password reset

## Troubleshooting

### Can't Login?
- Check email is correct
- Check password is correct
- Make sure "Auto Confirm User" was ON when creating user
- Check browser console for errors

### Redirects to Login After Login?
- Clear browser cache
- Try incognito mode
- Check `.env` file has correct Supabase URL

### Image Upload Fails?
- Make sure you're logged in
- Run `backend/setup_authentication.sql`

## Need More Help?

See `AUTH_SETUP_GUIDE.md` for detailed documentation.

---

**Your admin panel is secure!** 🎉
