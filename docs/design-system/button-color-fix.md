# Button Color Fix - CSS Variable Format Issue

## Issue Summary
Buttons in Storybook were not displaying the correct orange color as defined in design tokens.

## Root Cause
The issue was caused by double-wrapping `oklch()` color functions in the Tailwind CSS configuration:

### Before (Broken)
```typescript
// tailwind.config.ts
colors: {
  primary: {
    DEFAULT: "oklch(var(--primary))", // ❌ Double wrapped
  },
}
```

```css
/* src/index.css */
:root {
  --primary: oklch(0.705 0.213 47.604); /* Already in oklch format */
}
```

This resulted in invalid CSS: `oklch(oklch(0.705 0.213 47.604))`

### After (Fixed)
```typescript
// tailwind.config.ts
colors: {
  primary: {
    DEFAULT: "var(--primary)", // ✅ Correct format
  },
}
```

```css
/* src/index.css */
:root {
  --primary: oklch(0.705 0.213 47.604); /* Correctly consumed by Tailwind */
}
```

## Solution
Updated `tailwind.config.ts` to use raw CSS variable references (`var(--primary)`) instead of wrapping them with additional `oklch()` functions.

## Validation
- ✅ Buttons now display correct orange colors in both light and dark modes
- ✅ All existing tests continue to pass
- ✅ Design token compliance maintained
- ✅ Storybook builds without errors

## Prevention
When defining colors in Tailwind that reference CSS variables containing color functions (`oklch()`, `rgb()`, `hsl()`), use the variable directly without additional wrapping.