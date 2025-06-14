# Navigation Menu Dropdown Z-Index Fix

## Issue
Navigation menu dropdowns were being cut off when hovering over menu items like "Meal Types", "Cuisines", and "Diet". The dropdown content was not fully visible due to z-index and positioning issues.

## Root Cause
The navigation menu components had insufficient z-index values that caused the dropdown content to be rendered below other UI elements or clipped by parent containers:

- `NavigationMenu` root: `z-10` (too low)
- `NavigationMenuViewport`: no z-index specified
- `NavigationMenuContent`: no z-index specified  
- `NavigationMenuIndicator`: `z-[1]` (too low)

## Solution
Updated z-index values across all navigation menu components to ensure proper stacking:

### Components Fixed:
1. **NavigationMenu (Root)**: `z-10` → `z-50`
2. **NavigationMenuViewport**: Added `z-50` to container and viewport
3. **NavigationMenuContent**: Added `z-50`
4. **NavigationMenuIndicator**: `z-[1]` → `z-50`

### Files Updated:
- `/src/components/ui/navigation-menu/navigation-menu.tsx`
- `/src/components/organisms/navigation-menu/navigation-menu.tsx`
- `/src/components/ui/navigation-menu/NavigationMenu.stories.tsx`
- `/src/components/organisms/navigation-menu/NavigationMenu.stories.tsx`

### Changes Made:
```tsx
// Before
"relative z-10 flex max-w-max flex-1 items-center justify-center"

// After  
"relative z-50 flex max-w-max flex-1 items-center justify-center"
```

```tsx
// Before
"absolute left-0 top-full flex justify-center"

// After
"absolute left-0 top-full flex justify-center z-50"
```

## Testing
- ✅ All existing tests pass
- ✅ Storybook builds successfully
- ✅ Production build works
- ✅ Dropdown menus now display fully without being cut off
- ✅ Hot reloading works properly

## Storybook Layout Fix
Also updated story layout from `centered` to `padded` to provide more space for dropdown testing:

```tsx
// Before
layout: 'centered'

// After
layout: 'padded'
```

## Result
Navigation menu dropdowns now render properly above all other UI elements with full visibility, providing better user experience for recipe category navigation.
