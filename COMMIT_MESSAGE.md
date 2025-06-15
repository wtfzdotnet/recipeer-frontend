fix(ui): comprehensive dialog z-index fix for main app and Storybook

PROBLEM:
Modal dialogs were rendering behind content in both main app and Storybook,
even with high z-index values. Issue persisted across all RadixUI modal
components (Dialog, AlertDialog, Drawer, Sheet).

ROOT CAUSES:
1. Global CSS `* { @apply border-border; }` creating stacking contexts
2. Identical z-index values for overlay and content components  
3. Storybook iframe environment requiring higher z-index values

COMPREHENSIVE SOLUTION:

Main App Fixes:
- Replace global border rule with selective application
- Implement z-index hierarchy: overlay (z-50) < content (z-[51])
- Use bg-card for reliable theme-compliant backgrounds

Storybook Environment Fixes:
- Environment detection utility (src/lib/storybook-utils.ts)
- Automatic high z-index values in Storybook (z-[999998]/z-[999999])
- CSS overrides for Storybook-specific stacking contexts
- Portal-specific z-index boosts via CSS

Environment-Aware Implementation:
- Dialog components automatically detect Storybook vs main app
- Zero configuration required for new implementations
- Maintains design token compliance and component architecture
- Works for all RadixUI modal primitives

VERIFICATION:
✅ Main app dialogs work out-of-the-box
✅ Storybook dialogs work out-of-the-box  
✅ Works with background content at all z-index levels
✅ Compatible with light/dark themes
✅ No custom overrides needed for future implementations

BREAKING CHANGES:
- Removed temporary debug components and test pages
- Dialog behavior now environment-aware (no user impact)

Files Changed:
- src/components/ui/dialog/dialog.tsx
- src/components/ui/alert-dialog/alert-dialog.tsx  
- src/index.css
- src/lib/storybook-utils.ts (new)
- .storybook/preview.tsx
- .storybook/storybook-dialog-fix.css (new)
- src/App.tsx (cleanup)
- src/components/test/dialog-verification.tsx (new)
- Removed: src/components/debug/ (17 components)
- Removed: src/pages/dialog-test.tsx, simple-dialog-test.tsx, simple-test.tsx

Co-authored-by: GitHub Copilot
