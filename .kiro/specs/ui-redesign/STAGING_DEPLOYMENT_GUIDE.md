# Staging Deployment Guide

## Complete Guide for Deploying to Staging Environment

---

## Overview

This guide walks you through deploying the redesigned Mevoq Pharmaceutical Consulting website to a staging environment for final testing and stakeholder approval before production deployment.

---

## Prerequisites

### Required
- ✅ Production build completed (`npm run build`)
- ✅ Vercel CLI installed (v48.7.1+)
- ✅ Vercel account (free tier is sufficient)
- ✅ All environment variables documented
- ✅ Supabase backend configured and running

### Optional
- GitHub repository (recommended for automatic deployments)
- Custom domain for staging (e.g., staging.mevoq.com)

---

## Deployment Options

### Option 1: Vercel (Recommended)

**Pros:**
- Automatic HTTPS
- Global CDN
- Preview deployments
- Easy rollback
- Free tier available
- Excellent performance

**Cons:**
- Requires Vercel account
- Limited to Vercel platform

### Option 2: Netlify

**Pros:**
- Similar features to Vercel
- Good free tier
- Easy setup

**Cons:**
- Requires Netlify account
- Slightly different configuration

### Option 3: Custom Server

**Pros:**
- Full control
- Can use existing infrastructure

**Cons:**
- More setup required
- Need to manage SSL, CDN, etc.

---

## Step-by-Step Deployment (Vercel)

### Step 1: Prepare for Deployment

#### 1.1 Verify Build
```bash
cd frontend
npm run build
```

**Expected Output:**
```
Compiled successfully.
File sizes after gzip:
  163.15 kB  build\static\js\main.79474533.js
  15.54 kB   build\static\css\main.6145ed92.css
```

#### 1.2 Test Build Locally
```bash
npx serve -s build -l 3001
```

Visit http://localhost:3001 and verify:
- Homepage loads
- Navigation works
- All pages are accessible
- No console errors

### Step 2: Login to Vercel

#### First Time Setup
```bash
npx vercel login
```

Choose your login method:
- Email
- GitHub
- GitLab
- Bitbucket

Follow the authentication flow in your browser.

#### Verify Login
```bash
npx vercel whoami
```

Should display your Vercel username.

### Step 3: Deploy to Staging

#### 3.1 Run Deployment Command
```bash
# Make sure you're in the project root
cd D:\clients\maglinc consultancy\maglinc

# Deploy to staging
npx vercel
```

#### 3.2 Answer Deployment Prompts

**Prompt 1:** Set up and deploy?
```
? Set up and deploy "D:\clients\maglinc consultancy\maglinc"? [Y/n]
Answer: Y
```

**Prompt 2:** Which scope?
```
? Which scope do you want to deploy to?
Answer: Select your account/organization
```

**Prompt 3:** Link to existing project?
```
? Link to existing project? [y/N]
Answer: N (for first deployment)
```

**Prompt 4:** Project name?
```
? What's your project's name?
Answer: mevoq-staging
```

**Prompt 5:** Code directory?
```
? In which directory is your code located?
Answer: frontend
```

**Prompt 6:** Override settings?
```
? Want to override the settings? [y/N]
Answer: N
```

#### 3.3 Wait for Deployment

Vercel will:
1. Upload your files
2. Build the project
3. Deploy to their CDN
4. Provide a staging URL

**Expected Output:**
```
🔗  Preview: https://mevoq-staging-[hash].vercel.app
✅  Deployment complete!
```

### Step 4: Configure Environment Variables

#### 4.1 Access Vercel Dashboard
1. Go to https://vercel.com/dashboard
2. Find your project: `mevoq-staging`
3. Click on the project

#### 4.2 Add Environment Variables
1. Go to **Settings** → **Environment Variables**
2. Add each variable:

**Variable 1:**
- Name: `REACT_APP_SUPABASE_URL`
- Value: `https://scnomhsoweqblursbeul.supabase.co`
- Environment: All (Production, Preview, Development)

**Variable 2:**
- Name: `REACT_APP_SUPABASE_ANON_KEY`
- Value: `[your-anon-key-from-.env]`
- Environment: All

**Variable 3:**
- Name: `REACT_APP_ENABLE_VISUAL_EDITS`
- Value: `false`
- Environment: All

**Variable 4:**
- Name: `ENABLE_HEALTH_CHECK`
- Value: `false`
- Environment: All

#### 4.3 Redeploy with Environment Variables
```bash
npx vercel --force
```

This will redeploy with the new environment variables.

### Step 5: Verify Staging Deployment

#### 5.1 Access Staging URL
Open the URL provided by Vercel:
```
https://mevoq-staging-[hash].vercel.app
```

#### 5.2 Quick Smoke Test
- [ ] Homepage loads
- [ ] No console errors
- [ ] Images display
- [ ] Navigation works
- [ ] Supabase connection works (check if blog posts load)

---

## Comprehensive Testing

### Functional Testing

#### Homepage
1. Visit staging URL
2. Verify hero section displays
3. Check stats display
4. Verify service cards
5. Test CTA buttons
6. Check navigation
7. Verify footer

#### All Pages
Test each page:
- `/` - Homepage
- `/about` - About page
- `/services` - Services listing
- `/services/[id]` - Service detail
- `/blog` - Blog listing
- `/blog/[slug]` - Blog post
- `/contact` - Contact form
- `/login` - Login page
- `/admin` - Admin panel

#### Forms
1. **Contact Form:**
   - Fill out form
   - Submit
   - Verify submission in Supabase

2. **Login Form:**
   - Enter credentials
   - Verify authentication
   - Check redirect to admin

3. **Admin Forms:**
   - Create blog post
   - Edit blog post
   - Delete blog post
   - Upload image
   - Manage services

### Visual Testing

#### Design System
- [ ] Colors match design (navy, teal, white)
- [ ] Typography uses Inter font
- [ ] Spacing follows 8px grid
- [ ] No gradient backgrounds
- [ ] Shadows are subtle and consistent

#### Components
- [ ] Buttons styled correctly (teal primary)
- [ ] Cards have proper shadows
- [ ] Hover effects work smoothly
- [ ] Icons display correctly
- [ ] Images have proper aspect ratios

#### Layout
- [ ] Navigation bar fixed at top
- [ ] Footer at bottom with dark background
- [ ] Content centered with max-width
- [ ] Sections have proper padding

### Responsive Testing

#### Mobile (375px)
1. Open Chrome DevTools
2. Toggle device toolbar (Ctrl+Shift+M)
3. Select iPhone SE or similar
4. Test all pages
5. Verify:
   - Single column layouts
   - Navigation menu works
   - Text is readable
   - Touch targets are adequate

#### Tablet (768px)
1. Select iPad or similar
2. Test all pages
3. Verify:
   - Two column layouts
   - Navigation displays correctly
   - Spacing is appropriate

#### Desktop (1280px+)
1. Test at full screen
2. Verify:
   - Multi-column layouts
   - Content is centered
   - Max-width is respected

### Performance Testing

#### Lighthouse Audit
1. Open Chrome DevTools
2. Go to Lighthouse tab
3. Select:
   - Performance
   - Accessibility
   - Best Practices
   - SEO
4. Click "Analyze page load"
5. Verify scores > 90

#### Network Performance
1. Open Network tab
2. Reload page
3. Check:
   - Total page size
   - Load time
   - Number of requests
4. Test on "Slow 3G" throttling

### Accessibility Testing

#### Automated Tests
1. Run Lighthouse accessibility audit
2. Use axe DevTools extension
3. Verify WCAG AA compliance

#### Manual Tests
1. **Keyboard Navigation:**
   - Tab through all interactive elements
   - Verify focus indicators
   - Test Enter/Space on buttons

2. **Screen Reader:**
   - Use NVDA (Windows) or VoiceOver (Mac)
   - Navigate through page
   - Verify alt text on images
   - Check ARIA labels

3. **Color Contrast:**
   - Verify text is readable
   - Check contrast ratios
   - Test with color blindness simulator

### Cross-Browser Testing

Test on staging URL:

#### Desktop Browsers
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest) - Mac only
- [ ] Edge (latest)

#### Mobile Browsers
- [ ] Chrome Mobile (Android)
- [ ] Safari Mobile (iOS)
- [ ] Samsung Internet (Android)

#### Testing Checklist per Browser
- [ ] Page loads correctly
- [ ] Styles render properly
- [ ] JavaScript works
- [ ] Forms submit
- [ ] Images display
- [ ] Animations work

---

## Issue Tracking

### Document Issues

For each issue found, document:

**Issue Template:**
```markdown
### Issue #[number]: [Title]

**Severity:** Critical / High / Medium / Low

**Browser/Device:** Chrome 120 / iPhone 14 / etc.

**Description:**
Clear description of the issue

**Steps to Reproduce:**
1. Go to [page]
2. Click on [element]
3. Observe [behavior]

**Expected Behavior:**
What should happen

**Actual Behavior:**
What actually happens

**Screenshots:**
[Attach screenshots if applicable]

**Resolution:**
How it was fixed / To be fixed
```

### Issue Severity Levels

**Critical:**
- Site is completely broken
- Major functionality doesn't work
- Security vulnerability
- Data loss possible

**High:**
- Important feature doesn't work
- Significant visual issues
- Performance problems
- Affects many users

**Medium:**
- Minor functionality issues
- Small visual inconsistencies
- Affects some users

**Low:**
- Cosmetic issues
- Nice-to-have improvements
- Affects few users

---

## Stakeholder Review

### Prepare for Review

#### 1. Create Review Document
Document:
- Staging URL
- Test results summary
- Known issues (if any)
- Screenshots of key pages
- Performance metrics

#### 2. Schedule Review Meeting
Invite:
- Project stakeholders
- Design team
- Development team
- QA team

#### 3. Prepare Demo
Plan to show:
- Homepage and key pages
- Responsive behavior
- Admin panel functionality
- Performance improvements

### Review Checklist

Present to stakeholders:
- [ ] Overall design and branding
- [ ] Color scheme and typography
- [ ] Layout and spacing
- [ ] Responsive behavior
- [ ] Functionality
- [ ] Performance
- [ ] Accessibility

### Gather Feedback

Document:
- What stakeholders like
- What needs changes
- Priority of changes
- Timeline for fixes

---

## Post-Review Actions

### If Approved ✅
1. Mark task 31 as complete
2. Document approval
3. Prepare for production deployment (task 32)
4. Schedule production deployment

### If Changes Needed 🔧
1. Document all requested changes
2. Prioritize changes
3. Make fixes in development
4. Rebuild and redeploy to staging
5. Schedule follow-up review

### If Rejected ❌
1. Document reasons for rejection
2. Create action plan
3. Schedule meeting to discuss
4. Make necessary changes
5. Redeploy and re-review

---

## Rollback Procedure

If critical issues are found:

### Step 1: Identify Issue
- Document the problem
- Determine severity
- Decide if rollback is needed

### Step 2: Rollback Deployment
```bash
# List all deployments
npx vercel ls

# Rollback to previous deployment
npx vercel rollback [previous-deployment-url]
```

### Step 3: Fix Issue Locally
1. Reproduce issue locally
2. Fix the problem
3. Test thoroughly
4. Rebuild

### Step 4: Redeploy
```bash
npm run build
npx vercel --force
```

---

## Monitoring

### After Deployment

#### Check Vercel Analytics
1. Go to Vercel dashboard
2. Select project
3. View Analytics tab
4. Monitor:
   - Page views
   - Load times
   - Error rates

#### Check Supabase Logs
1. Go to Supabase dashboard
2. View Logs section
3. Monitor:
   - API requests
   - Database queries
   - Errors

#### Check Browser Console
Periodically check staging site:
- Open DevTools console
- Look for errors
- Check network tab for failed requests

---

## Success Criteria

Staging deployment is successful when:

### Technical Criteria
- ✅ Build completes without errors
- ✅ Deployment succeeds
- ✅ All pages load correctly
- ✅ No console errors
- ✅ Environment variables work
- ✅ Supabase connection works
- ✅ All functionality works
- ✅ Performance is acceptable
- ✅ Accessibility standards met
- ✅ Cross-browser compatible

### Business Criteria
- ✅ Design matches specifications
- ✅ All requirements met
- ✅ Stakeholder approval received
- ✅ No critical issues
- ✅ Ready for production

---

## Next Steps

Once staging is verified and approved:

1. ✅ Complete task 31
2. 📋 Document lessons learned
3. 🔧 Fix any minor issues
4. 📝 Update documentation
5. ➡️ Proceed to task 32 (Production deployment)

---

## Quick Reference

### Useful Commands

```bash
# Build production
npm run build

# Test locally
npx serve -s build -l 3001

# Deploy to staging
npx vercel

# Deploy to production
npx vercel --prod

# List deployments
npx vercel ls

# View logs
npx vercel logs [deployment-url]

# Rollback
npx vercel rollback [deployment-url]

# Check Vercel CLI version
npx vercel --version

# Login to Vercel
npx vercel login

# Check who's logged in
npx vercel whoami
```

### Important URLs

- **Vercel Dashboard:** https://vercel.com/dashboard
- **Supabase Dashboard:** https://app.supabase.com
- **Local Build:** http://localhost:3001
- **Staging URL:** [Provided after deployment]

### Support Resources

- **Vercel Docs:** https://vercel.com/docs
- **React Docs:** https://react.dev
- **Supabase Docs:** https://supabase.com/docs
- **Tailwind Docs:** https://tailwindcss.com/docs

---

## Conclusion

This guide provides everything needed to successfully deploy the redesigned website to staging, conduct thorough testing, and prepare for production deployment.

**Remember:** Staging is your safety net. Test thoroughly before moving to production!

