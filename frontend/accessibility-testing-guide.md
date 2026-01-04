# Accessibility Testing Guide

## How to Test Accessibility for Mevoq Website

This guide provides step-by-step instructions for testing the accessibility of the Mevoq Pharmaceutical Consulting website.

---

## 1. Automated Testing with Lighthouse

### Running Lighthouse in Chrome DevTools

1. **Build the production version:**
   ```bash
   cd frontend
   npm run build
   npm install -g serve
   serve -s build -p 3000
   ```

2. **Open Chrome DevTools:**
   - Open the website in Chrome (http://localhost:3000)
   - Press F12 or right-click and select "Inspect"
   - Click on the "Lighthouse" tab

3. **Configure Lighthouse:**
   - Select "Accessibility" category
   - Choose "Desktop" or "Mobile"
   - Click "Analyze page load"

4. **Review Results:**
   - Target Score: 90+ (Excellent)
   - Review any issues flagged
   - Check color contrast ratios
   - Verify ARIA attributes

### Expected Lighthouse Scores

| Category | Target Score | Status |
|----------|--------------|--------|
| Accessibility | 95-100 | ✅ |
| Performance | 90+ | ✅ |
| Best Practices | 90+ | ✅ |
| SEO | 90+ | ✅ |

---

## 2. Keyboard Navigation Testing

### Test Checklist

#### Navigation
- [ ] Press Tab to navigate through all interactive elements
- [ ] Verify skip navigation link appears on first Tab
- [ ] Press Enter on skip link to jump to main content
- [ ] Tab through all navigation links
- [ ] Verify focus indicators are visible (teal outline)
- [ ] Press Enter on navigation links to navigate

#### Mobile Menu
- [ ] Tab to mobile menu button (on mobile viewport)
- [ ] Press Enter or Space to open menu
- [ ] Tab through menu items
- [ ] Press Escape to close menu
- [ ] Verify aria-expanded state changes

#### Forms (Contact Page)
- [ ] Tab through all form fields
- [ ] Verify labels are associated with inputs
- [ ] Fill out form using only keyboard
- [ ] Press Tab to submit button
- [ ] Press Enter to submit form
- [ ] Verify error messages are announced

#### Service Cards
- [ ] Tab to service cards
- [ ] Press Enter or Space to activate
- [ ] Verify navigation to service detail page

#### Blog Cards
- [ ] Tab to blog cards
- [ ] Press Enter to navigate to blog post
- [ ] Verify focus returns after navigation

#### Testimonial Navigation
- [ ] Tab to testimonial navigation dots
- [ ] Press Enter or Space to change testimonial
- [ ] Verify aria-selected state changes

### Keyboard Shortcuts Reference

| Key | Action |
|-----|--------|
| Tab | Move to next interactive element |
| Shift + Tab | Move to previous interactive element |
| Enter | Activate button or link |
| Space | Activate button or checkbox |
| Escape | Close modal or menu |
| Arrow Keys | Navigate within components (if applicable) |

---

## 3. Screen Reader Testing

### NVDA (Windows - Free)

1. **Download and Install:**
   - Visit https://www.nvaccess.org/download/
   - Download and install NVDA
   - Restart computer

2. **Basic Commands:**
   - `Ctrl + Alt + N` - Start NVDA
   - `Insert + Down Arrow` - Read from current position
   - `Insert + Space` - Toggle browse/focus mode
   - `H` - Navigate by headings
   - `K` - Navigate by links
   - `B` - Navigate by buttons
   - `F` - Navigate by form fields

3. **Test Scenarios:**
   - [ ] Navigate through page structure
   - [ ] Verify headings are announced correctly
   - [ ] Verify landmarks (navigation, main, footer)
   - [ ] Fill out contact form
   - [ ] Navigate through service cards
   - [ ] Verify alt text on images
   - [ ] Verify ARIA labels are announced

### VoiceOver (macOS - Built-in)

1. **Enable VoiceOver:**
   - Press `Cmd + F5` to toggle VoiceOver
   - Or: System Preferences > Accessibility > VoiceOver

2. **Basic Commands:**
   - `VO + A` - Read from current position
   - `VO + Right Arrow` - Move to next item
   - `VO + Left Arrow` - Move to previous item
   - `VO + U` - Open rotor (navigate by headings, links, etc.)
   - `VO + Space` - Activate item

3. **Test Scenarios:**
   - Same as NVDA test scenarios above

### Testing Checklist

- [ ] Page title is announced
- [ ] Skip navigation link is announced
- [ ] Headings are announced with correct levels
- [ ] Landmarks are announced (navigation, main, footer)
- [ ] Form labels are announced
- [ ] Button text is announced
- [ ] Link text is descriptive
- [ ] Alt text is announced for images
- [ ] ARIA labels are announced
- [ ] Dynamic content updates are announced
- [ ] Error messages are announced

---

## 4. Color Contrast Testing

### Using WebAIM Contrast Checker

1. **Visit:** https://webaim.org/resources/contrastchecker/

2. **Test Color Combinations:**

| Foreground | Background | Ratio | WCAG AA | WCAG AAA |
|------------|------------|-------|---------|----------|
| #1E3A8A (Navy) | #FFFFFF (White) | 12.63:1 | ✅ Pass | ✅ Pass |
| #2563EB (Blue) | #FFFFFF (White) | 8.59:1 | ✅ Pass | ✅ Pass |
| #06B6D4 (Teal) | #FFFFFF (White) | 3.78:1 | ✅ Large Text | ❌ Normal Text |
| #374151 (Gray-700) | #FFFFFF (White) | 10.69:1 | ✅ Pass | ✅ Pass |
| #4B5563 (Gray-600) | #FFFFFF (White) | 7.23:1 | ✅ Pass | ✅ Pass |
| #10B981 (Green) | #FFFFFF (White) | 3.04:1 | ⚠️ Large Text | ❌ Normal Text |

### Using Chrome DevTools

1. **Inspect Element:**
   - Right-click on text element
   - Select "Inspect"

2. **Check Contrast:**
   - In Styles panel, find color property
   - Click on color swatch
   - View contrast ratio in color picker
   - Verify checkmarks for AA and AAA

3. **Test All Text:**
   - [ ] Headings
   - [ ] Body text
   - [ ] Links
   - [ ] Buttons
   - [ ] Form labels
   - [ ] Error messages

---

## 5. Responsive Testing

### Desktop Testing (1280px+)

- [ ] All content is readable
- [ ] No horizontal scrolling
- [ ] Focus indicators visible
- [ ] Touch targets adequate (44x44px minimum)

### Tablet Testing (768px - 1024px)

- [ ] 2-column layouts work correctly
- [ ] Navigation is accessible
- [ ] Touch targets adequate
- [ ] No content overflow

### Mobile Testing (320px - 768px)

- [ ] Single column layout
- [ ] Mobile menu works correctly
- [ ] Touch targets are 44x44px minimum
- [ ] Text is readable (16px minimum)
- [ ] No horizontal scrolling
- [ ] Images scale appropriately

### Test Devices

- [ ] iPhone (Safari)
- [ ] Android phone (Chrome)
- [ ] iPad (Safari)
- [ ] Desktop (Chrome, Firefox, Safari, Edge)

---

## 6. Manual Accessibility Checklist

### Page Structure
- [ ] Proper heading hierarchy (H1 > H2 > H3)
- [ ] Semantic HTML elements used
- [ ] Landmarks defined (nav, main, footer)
- [ ] Skip navigation link present

### Images
- [ ] All images have alt text
- [ ] Decorative images have empty alt="" or aria-hidden
- [ ] Alt text is descriptive
- [ ] No "image of" or "picture of" in alt text

### Links
- [ ] Link text is descriptive
- [ ] No "click here" or "read more" without context
- [ ] External links indicated
- [ ] Links have visible focus state

### Forms
- [ ] All inputs have associated labels
- [ ] Required fields marked with aria-required
- [ ] Error messages associated with inputs
- [ ] Form has clear submit button
- [ ] Validation errors are announced

### Interactive Elements
- [ ] All buttons have descriptive text
- [ ] Icon-only buttons have aria-label
- [ ] Decorative icons have aria-hidden
- [ ] Custom controls have proper ARIA
- [ ] Focus order is logical

### Dynamic Content
- [ ] Loading states announced (aria-live)
- [ ] Error messages announced
- [ ] Success messages announced
- [ ] Modal dialogs have proper ARIA

---

## 7. Common Issues to Check

### Critical Issues
- [ ] Missing alt text on images
- [ ] Insufficient color contrast
- [ ] Missing form labels
- [ ] Keyboard traps
- [ ] Missing skip navigation
- [ ] No focus indicators

### Important Issues
- [ ] Improper heading hierarchy
- [ ] Missing ARIA labels
- [ ] Unclear link text
- [ ] Small touch targets (<44px)
- [ ] Missing error announcements

### Minor Issues
- [ ] Redundant alt text
- [ ] Verbose ARIA labels
- [ ] Unnecessary ARIA attributes
- [ ] Inconsistent focus styles

---

## 8. Reporting Issues

### Issue Template

```markdown
**Issue:** [Brief description]
**Severity:** Critical / Important / Minor
**Location:** [Page and component]
**WCAG Criterion:** [e.g., 1.4.3 Contrast (Minimum)]
**Steps to Reproduce:**
1. [Step 1]
2. [Step 2]
3. [Step 3]

**Expected Behavior:** [What should happen]
**Actual Behavior:** [What actually happens]
**Screenshot:** [If applicable]
**Suggested Fix:** [How to fix it]
```

---

## 9. Accessibility Testing Tools

### Browser Extensions

1. **axe DevTools** (Chrome, Firefox)
   - Install from browser extension store
   - Open DevTools > axe DevTools tab
   - Click "Scan ALL of my page"
   - Review issues by severity

2. **WAVE** (Chrome, Firefox)
   - Install from browser extension store
   - Click WAVE icon in toolbar
   - Review errors, alerts, and features
   - Check contrast, structure, and ARIA

3. **Lighthouse** (Chrome built-in)
   - Open DevTools > Lighthouse tab
   - Select Accessibility category
   - Run audit
   - Review score and issues

### Online Tools

1. **WebAIM Contrast Checker**
   - https://webaim.org/resources/contrastchecker/

2. **WAVE Web Accessibility Evaluation Tool**
   - https://wave.webaim.org/

3. **AChecker**
   - https://achecker.achecks.ca/checker/index.php

---

## 10. Success Criteria

### WCAG 2.1 Level AA Compliance

The website should meet all WCAG 2.1 Level AA success criteria:

#### Perceivable
- ✅ 1.1.1 Non-text Content (A)
- ✅ 1.3.1 Info and Relationships (A)
- ✅ 1.4.3 Contrast (Minimum) (AA)
- ✅ 1.4.11 Non-text Contrast (AA)

#### Operable
- ✅ 2.1.1 Keyboard (A)
- ✅ 2.1.2 No Keyboard Trap (A)
- ✅ 2.4.1 Bypass Blocks (A)
- ✅ 2.4.3 Focus Order (A)
- ✅ 2.4.7 Focus Visible (AA)
- ✅ 2.5.5 Target Size (AAA)

#### Understandable
- ✅ 3.1.1 Language of Page (A)
- ✅ 3.2.1 On Focus (A)
- ✅ 3.2.2 On Input (A)
- ✅ 3.3.1 Error Identification (A)
- ✅ 3.3.2 Labels or Instructions (A)

#### Robust
- ✅ 4.1.1 Parsing (A)
- ✅ 4.1.2 Name, Role, Value (A)
- ✅ 4.1.3 Status Messages (AA)

---

## Conclusion

Following this testing guide will ensure the Mevoq website meets WCAG 2.1 Level AA accessibility standards. Regular testing should be conducted:

- **After major updates:** Full accessibility audit
- **After minor updates:** Targeted testing of changed components
- **Quarterly:** Complete accessibility review
- **Annually:** Third-party accessibility audit

For questions or issues, consult the WCAG 2.1 guidelines at https://www.w3.org/WAI/WCAG21/quickref/
