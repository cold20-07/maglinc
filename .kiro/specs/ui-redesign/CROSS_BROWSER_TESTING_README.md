# Cross-Browser Testing - How to Use

This guide explains how to perform cross-browser testing for the Mevoq Pharmaceutical Consulting website redesign.

## Quick Start

### Option 1: Automated Testing (Recommended)

1. **Open the website in your browser**
   ```
   cd frontend
   npm start
   ```

2. **Open browser console** (F12 or Cmd+Option+I)

3. **Load the validation script**
   - Copy the contents of `frontend/src/tests/cross-browser-validation.js`
   - Paste into the browser console
   - Press Enter

4. **Run the validation**
   ```javascript
   runCrossBrowserValidation()
   ```

5. **Review the results** in the console

### Option 2: Manual Testing

1. **Open the checklist**
   - Open `.kiro/specs/ui-redesign/cross-browser-testing-checklist.md`
   - Print or keep it open in a separate window

2. **Test each browser**
   - Follow the checklist for each browser
   - Check off items as you test
   - Document any issues found

3. **Record results**
   - Use the issue documentation template
   - Take screenshots of any problems
   - Note browser version and OS

## Testing Files Overview

### 1. cross-browser-testing-guide.md
**Purpose**: Comprehensive testing guide  
**Use When**: Planning your testing strategy  
**Contains**:
- Complete testing methodology
- Browser-specific considerations
- Known issues and solutions
- Testing tools recommendations

### 2. cross-browser-validation.js
**Purpose**: Automated validation script  
**Use When**: Running automated checks  
**Features**:
- Browser detection
- CSS feature detection
- Layout validation
- Typography checks
- Color contrast validation
- Touch target validation
- Image validation
- Performance checks

### 3. cross-browser-test-results.md
**Purpose**: Test results documentation  
**Use When**: Reviewing test outcomes  
**Contains**:
- Results for all 6 browsers
- Performance metrics
- Known differences
- Issue summary
- Sign-off status

### 4. cross-browser-testing-checklist.md
**Purpose**: Quick reference checklist  
**Use When**: Performing manual testing  
**Contains**:
- Browser-specific checklists
- Visual checks
- Functional checks
- Responsive checks
- Issue template

## Detailed Testing Instructions

### Testing in Chrome

1. **Open Chrome** (latest version)
2. **Navigate to** http://localhost:3000
3. **Open DevTools** (F12)
4. **Run automated script**:
   ```javascript
   // Paste cross-browser-validation.js into console
   runCrossBrowserValidation()
   ```
5. **Test responsive views**:
   - Click device toolbar icon (Ctrl+Shift+M)
   - Test: Mobile (375px), Tablet (768px), Desktop (1280px)
6. **Run Lighthouse audit**:
   - Open Lighthouse tab in DevTools
   - Click "Generate report"
   - Review scores
7. **Manual testing**:
   - Follow Chrome checklist
   - Test all pages
   - Test all interactions

### Testing in Firefox

1. **Open Firefox** (latest version)
2. **Navigate to** http://localhost:3000
3. **Open DevTools** (F12)
4. **Run automated script** (same as Chrome)
5. **Test responsive views**:
   - Click responsive design mode (Ctrl+Shift+M)
   - Test different breakpoints
6. **Manual testing**:
   - Follow Firefox checklist
   - Note any differences from Chrome
   - Test scrollbar behavior (will be default)

### Testing in Safari

1. **Open Safari** (macOS only)
2. **Enable Developer menu**:
   - Safari > Preferences > Advanced
   - Check "Show Develop menu"
3. **Navigate to** http://localhost:3000
4. **Open Web Inspector** (Cmd+Option+I)
5. **Run automated script** (same as Chrome)
6. **Test responsive views**:
   - Develop > Enter Responsive Design Mode
   - Test different devices
7. **Manual testing**:
   - Follow Safari checklist
   - Note date input styling (native)
   - Test font smoothing

### Testing in Edge

1. **Open Edge** (latest version)
2. **Navigate to** http://localhost:3000
3. **Open DevTools** (F12)
4. **Run automated script** (same as Chrome)
5. **Test responsive views** (same as Chrome)
6. **Manual testing**:
   - Follow Edge checklist
   - Should be very similar to Chrome

### Testing on iOS Safari

#### Using Real Device (Recommended)

1. **Connect iPhone/iPad** to Mac
2. **Open Safari** on iOS device
3. **Navigate to** your local IP (e.g., http://192.168.1.100:3000)
4. **On Mac**:
   - Safari > Develop > [Your Device] > [Page]
   - This opens Web Inspector for the iOS page
5. **Run automated script** via Mac's Web Inspector
6. **Manual testing**:
   - Follow iOS Safari checklist
   - Test touch interactions
   - Test orientation changes
   - Test VoiceOver (Settings > Accessibility > VoiceOver)

#### Using Simulator

1. **Open Xcode Simulator**
2. **Launch Safari** in simulator
3. **Navigate to** http://localhost:3000
4. **Test different devices**:
   - iPhone SE (small screen)
   - iPhone 14 (standard)
   - iPad Air (tablet)
5. **Manual testing**:
   - Follow iOS Safari checklist
   - Test touch interactions
   - Test orientation changes

### Testing on Chrome Mobile (Android)

#### Using Real Device (Recommended)

1. **Enable USB debugging** on Android device
2. **Connect device** to computer
3. **Open Chrome** on Android
4. **Navigate to** your local IP (e.g., http://192.168.1.100:3000)
5. **On computer**:
   - Chrome > More Tools > Remote Devices
   - Select your device
   - Inspect the page
6. **Run automated script** via remote DevTools
7. **Manual testing**:
   - Follow Chrome Mobile checklist
   - Test touch interactions
   - Test orientation changes
   - Test TalkBack (Settings > Accessibility > TalkBack)

#### Using Emulator

1. **Open Chrome DevTools**
2. **Enable device toolbar** (Ctrl+Shift+M)
3. **Select Android device** from dropdown
4. **Test different devices**:
   - Pixel 5 (standard)
   - Galaxy S20 (large)
5. **Manual testing**:
   - Follow Chrome Mobile checklist
   - Note: Emulator doesn't perfectly replicate real device

## Running the Automated Validation Script

### Method 1: Browser Console (Easiest)

```javascript
// 1. Copy the entire contents of frontend/src/tests/cross-browser-validation.js

// 2. Paste into browser console

// 3. Run the validation
runCrossBrowserValidation()

// 4. Review results in console
```

### Method 2: Include in HTML (For Repeated Testing)

Add to your HTML temporarily:

```html
<script src="/src/tests/cross-browser-validation.js"></script>
<script>
  // Auto-run on page load
  window.addEventListener('load', () => {
    setTimeout(() => {
      const results = runCrossBrowserValidation();
      console.log('Test Results:', results);
    }, 1000);
  });
</script>
```

### Understanding the Results

The script will output:

1. **Browser Information**
   - Browser name and version
   - Platform and device type
   - Screen and viewport dimensions

2. **CSS Feature Support**
   - List of CSS features and their support status
   - ✅ = Supported, ❌ = Not supported

3. **Validation Results**
   - Each test category (Layout, Typography, etc.)
   - Issues found with severity levels:
     - 🔴 High: Critical issues that must be fixed
     - 🟡 Medium: Important issues that should be fixed
     - 🟢 Low: Minor issues that can be accepted

4. **Summary**
   - Total issues found
   - Breakdown by severity
   - Overall pass/fail status

## Interpreting Test Results

### ✅ All Tests Pass
- No issues found
- Browser is fully compatible
- Ready for production

### ⚠️ Minor Issues Found
- Low severity issues only
- Usually cosmetic differences
- Acceptable for production
- Document in test results

### ❌ Issues Found
- High or medium severity issues
- Requires investigation and fixes
- Re-test after fixes
- May need browser-specific workarounds

## Common Issues and Solutions

### Issue: Horizontal Scroll on Mobile
**Cause**: Element wider than viewport  
**Solution**: Check for fixed widths, use max-width: 100%

### Issue: Text Too Small on Mobile
**Cause**: Font size below 16px  
**Solution**: Increase font size for mobile breakpoint

### Issue: Touch Targets Too Small
**Cause**: Buttons/links smaller than 44x44px  
**Solution**: Increase padding or minimum dimensions

### Issue: Images Not Loading
**Cause**: Incorrect paths or CORS issues  
**Solution**: Check image paths, verify server configuration

### Issue: Colors Look Different
**Cause**: Color profile differences  
**Solution**: Use sRGB color space, test on multiple displays

### Issue: Fonts Not Loading
**Cause**: Font file not found or CORS  
**Solution**: Check font file paths, verify font-face declarations

## Best Practices

### Do's
✅ Test on real devices when possible  
✅ Test with different network speeds  
✅ Test with browser extensions disabled  
✅ Clear cache before testing  
✅ Document all issues with screenshots  
✅ Test keyboard navigation  
✅ Test with screen readers  
✅ Test in both orientations (mobile)

### Don'ts
❌ Don't test with browser extensions enabled  
❌ Don't assume emulators are 100% accurate  
❌ Don't skip accessibility testing  
❌ Don't ignore minor issues without documenting  
❌ Don't test only on your preferred browser  
❌ Don't skip performance testing

## Reporting Issues

When you find an issue, document it using this template:

```markdown
### Issue #[number]

**Browser**: Chrome 120 on Windows 11
**Page**: Home page
**Component**: Hero section
**Severity**: High

**Description**:
Hero image is not displaying on mobile view.

**Expected Behavior**:
Hero image should display below the text content on mobile.

**Actual Behavior**:
Hero image is completely hidden on mobile.

**Steps to Reproduce**:
1. Open home page in Chrome
2. Resize to 375px width
3. Observe hero section

**Screenshot**:
[Attach screenshot]

**Proposed Solution**:
Check media query for hero image display property.
```

## Next Steps After Testing

1. **Review all test results**
   - Compile results from all browsers
   - Identify patterns in issues
   - Prioritize fixes

2. **Fix critical issues**
   - Address high severity issues first
   - Test fixes in affected browsers
   - Verify no regressions

3. **Document acceptable differences**
   - Note browser-specific behaviors
   - Explain why they're acceptable
   - Update test results document

4. **Get stakeholder approval**
   - Present test results
   - Demonstrate on different browsers
   - Get sign-off for production

5. **Proceed to deployment**
   - Deploy to staging first
   - Final verification in staging
   - Deploy to production

## Support and Resources

### Browser Documentation
- [Chrome DevTools](https://developer.chrome.com/docs/devtools/)
- [Firefox Developer Tools](https://firefox-source-docs.mozilla.org/devtools-user/)
- [Safari Web Inspector](https://developer.apple.com/safari/tools/)
- [Edge DevTools](https://docs.microsoft.com/en-us/microsoft-edge/devtools-guide-chromium/)

### Testing Tools
- [BrowserStack](https://www.browserstack.com/) - Real device testing
- [LambdaTest](https://www.lambdatest.com/) - Cross-browser testing
- [Can I Use](https://caniuse.com/) - Browser feature support

### Accessibility Resources
- [WCAG Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [WebAIM](https://webaim.org/) - Accessibility resources
- [axe DevTools](https://www.deque.com/axe/devtools/) - Accessibility testing

## Questions?

If you encounter any issues or have questions about cross-browser testing:

1. Check the comprehensive guide: `cross-browser-testing-guide.md`
2. Review test results: `cross-browser-test-results.md`
3. Consult browser-specific documentation
4. Search for known issues in browser bug trackers

---

**Last Updated**: December 14, 2025  
**Requirements**: 12.4, 14.1  
**Status**: Ready for use
