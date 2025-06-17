# React Router Implementation Guide

This document outlines the React Router v6 implementation for the Recipeer Frontend application.

## Overview

The application uses React Router v6 with data patterns, featuring:
- Code splitting with lazy loading
- Protected routes with authentication
- Error boundaries and 404 handling
- SEO-friendly URL structure
- TypeScript-first approach

## Router Configuration

The main router is configured in `src/router.tsx` using `createBrowserRouter`:

```typescript
import { createBrowserRouter } from 'react-router-dom';
import { lazy } from 'react';

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorBoundary />,
    children: [
      // Routes defined here
    ],
  },
]);
```

## Route Structure

### Public Routes
- `/` - HomePage (landing page)
- `/recipes` - RecipeDiscoveryPage (browse recipes)
- `/recipes/:id` - RecipeDetailPage (individual recipe)
- `/categories` - Categories overview
- `/categories/:category` - Category-specific recipes
- `/search` - Search results
- `/login` - LoginPage
- `/register` - RegisterPage (placeholder)
- `/about` - About page (placeholder)
- `/contact` - Contact page (placeholder)

### Protected Routes (Require Authentication)
- `/dashboard` - User dashboard
- `/create-recipe` - Create new recipe
- `/edit-recipe/:id` - Edit existing recipe
- `/collections` - User's recipe collections
- `/collections/:id` - Specific collection
- `/meal-plan` - Meal planning
- `/shopping-list` - Shopping list
- `/settings` - User settings

## Key Components

### RootLayout (`src/components/layouts/root-layout.tsx`)
- Provides shared layout structure
- Includes global header with navigation
- Renders `<Outlet />` for nested routes
- Integrates theme toggle and language selector

### ErrorBoundary (`src/components/layouts/error-boundary.tsx`)
- Handles routing errors and 404 pages
- Provides user-friendly error messages
- Includes navigation back to home
- Shows detailed error info in development

### ProtectedRoute (`src/components/layouts/protected-route.tsx`)
- Wrapper for routes requiring authentication
- Redirects to login if user not authenticated
- Preserves intended destination for post-login redirect
- Shows loading state during auth check

### RouteLoader (`src/components/layouts/route-loader.tsx`)
- Provides loading UI for lazy-loaded components
- Shows spinner and loading message
- Wraps lazy components with Suspense

## Authentication System

### AuthProvider (`src/contexts/auth-context.tsx`)
- Manages authentication state
- Provides login/logout functionality
- Persists user session in localStorage
- Mock implementation (replace with real auth service)

### useAuth Hook (`src/contexts/use-auth.ts`)
- Custom hook for accessing auth context
- Provides user state and auth functions
- Ensures provider is available

## Code Splitting

All page components are lazy-loaded for optimal performance:

```typescript
const HomePage = lazy(() => 
  import('@/pages/home').then(module => ({ default: module.HomePage }))
);
```

This creates separate bundles for each page, reducing initial bundle size.

## Usage Examples

### Adding a New Page

1. Create the page component:
```typescript
// src/pages/new-page/new-page.tsx
export const NewPage = () => {
  return <div>New Page Content</div>;
};
```

2. Add to pages index:
```typescript
// src/pages/new-page/index.ts
export { NewPage } from './new-page';
```

3. Add route to router:
```typescript
// src/router.tsx
const NewPage = lazy(() => 
  import('@/pages/new-page').then(module => ({ default: module.NewPage }))
);

// Add to routes array:
{
  path: "new-page",
  element: (
    <RouteLoader>
      <NewPage />
    </RouteLoader>
  ),
}
```

### Adding a Protected Route

Wrap the route element with `ProtectedRoute`:

```typescript
{
  path: "protected-page",
  element: (
    <ProtectedRoute>
      <RouteLoader>
        <ProtectedPage />
      </RouteLoader>
    </ProtectedRoute>
  ),
}
```

### Navigation Between Routes

Use React Router's navigation components:

```typescript
import { Link, useNavigate } from 'react-router-dom';

// Declarative navigation
<Link to="/recipes">Browse Recipes</Link>

// Programmatic navigation
const navigate = useNavigate();
navigate('/dashboard');
```

## SEO Considerations

- All routes use semantic URLs (`/recipes/123` vs `/recipe?id=123`)
- Error boundaries provide proper 404 status codes
- Pages include proper heading hierarchy
- Meta tags can be added per route (future enhancement)

## Performance

- **Code Splitting**: Each page is a separate bundle
- **Lazy Loading**: Components load only when accessed
- **Route-based Splitting**: Reduces initial bundle size
- **Tree Shaking**: Unused code is eliminated

Current build produces multiple chunks:
- Main bundle: ~608 KB (shared code)
- Individual page chunks: 3-5 KB each
- UI component chunks: separate bundles for heavy components

## Testing Routes

The routing system is tested through:
- Unit tests for individual components
- Integration tests for navigation flows
- Build verification for code splitting

All existing tests continue to pass with the routing implementation.

## Future Enhancements

1. **Meta Tag Management**: Dynamic meta tags per route
2. **Breadcrumbs**: Automatic breadcrumb generation
3. **Route Transitions**: Smooth animations between routes
4. **Prefetching**: Intelligent route prefetching
5. **Data Loaders**: Route-specific data loading patterns
6. **Nested Layouts**: More complex layout hierarchies

## Migration Notes

- Replaced direct App component with RouterProvider
- Moved demo content to HomePage
- Added AuthProvider wrapper in main.tsx
- Maintained all existing functionality and styling
- Preserved theme and i18n integration

## Troubleshooting

### Common Issues

1. **404 on Direct URL Access**: Ensure server is configured for SPA routing
2. **Lazy Loading Errors**: Check import paths and component exports
3. **Auth Redirect Loops**: Verify ProtectedRoute implementation
4. **Build Chunk Issues**: Check dynamic import syntax

### Development Setup

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Run tests
npm run test
```

The development server will be available at `http://localhost:5173/` with hot module replacement for all routes.