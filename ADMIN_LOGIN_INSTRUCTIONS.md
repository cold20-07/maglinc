# Admin Login Instructions

## 🚀 First Time Setup

### Step 1: Create Your Admin Account (One Time Only)

1. Open Supabase Dashboard: https://supabase.com/dashboard
2. Select your project
3. Click **Authentication** in sidebar
4. Click **Users** tab
5. Click **Add user** button
6. Select **Create new user**
7. Fill in:
   - **Email:** Your email address
   - **Password:** Create a strong password (save it!)
   - **Auto Confirm User:** Toggle to **ON** ⚠️ IMPORTANT!
8. Click **Create user**

✅ Done! Your admin account is ready.

---

## 🔐 How to Login

### Every Time You Want to Access Admin Panel:

1. Go to: `http://localhost:3000/login` (or your domain + `/login`)
2. Enter your email
3. Enter your password
4. Click **Sign In**
5. You'll be redirected to `/admin`

---

## 📝 Managing Content

Once logged in, you can:

- ✅ Create/edit/delete blog posts
- ✅ Upload images
- ✅ Create/edit/delete services
- ✅ View contact submissions

---

## 🚪 How to Logout

1. Click the **Logout** button in the top-right corner of admin panel
2. You'll be redirected to login page
3. Your session is cleared

---

## 🔒 Security

### What's Protected:
- `/admin` - Requires login
- All admin functions - Requires login
- Image uploads - Requires login (after running security SQL)

### What's Public:
- Homepage and all public pages
- Viewing blog posts
- Viewing services
- Contact form

---

## 👥 Adding More Admins

To give someone else admin access:

1. Supabase Dashboard → Authentication → Users
2. Add user → Create new user
3. Give them their email and password
4. They can login at `/login`

---

## 🔑 Forgot Password?

### For Yourself:
1. Supabase Dashboard → Authentication → Users
2. Find your user
3. Click "..." menu → Send password reset email
4. Check your email
5. Click reset link
6. Set new password

### For Others:
Same steps, but for their user account.

---

## ⚠️ Troubleshooting

### Can't Login?

**Check:**
- ✅ Email is correct (case-sensitive)
- ✅ Password is correct
- ✅ "Auto Confirm User" was ON when creating user
- ✅ User exists in Supabase Dashboard

**Try:**
- Reset password via Supabase Dashboard
- Clear browser cache
- Try incognito mode

### Redirects to Login After Login?

**Try:**
- Clear browser localStorage
- Check browser console for errors
- Verify `.env` file has correct Supabase URL

### Image Upload Fails?

**Solution:**
- Make sure you're logged in
- Run `backend/setup_authentication.sql` in Supabase

---

## 📚 More Help

- **Quick Setup:** `AUTH_QUICK_START.md`
- **Full Guide:** `AUTH_SETUP_GUIDE.md`
- **Troubleshooting:** `TROUBLESHOOTING.md`

---

## Quick Reference

| Action | URL | Requires Login |
|--------|-----|----------------|
| Login | `/login` | No |
| Admin Panel | `/admin` | Yes |
| Logout | Click button | Yes |
| Homepage | `/` | No |
| Blog | `/blog` | No |
| Services | `/services` | No |

---

**Remember:** Save your password securely! Use a password manager if possible.
