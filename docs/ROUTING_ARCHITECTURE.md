# Routing Architecture Documentation

## Overview

This document outlines the React Router v6 routing architecture implemented for the Recipeer Recipe Authority Platform.

## Router Configuration

The router is configured using React Router v6's `createBrowserRouter` with data patterns, supporting:

- **Nested Routes**: Hierarchical route structures
- **Code Splitting**: Lazy loading for optimal performance
- **Route Protection**: Authentication-based access control
- **Error Boundaries**: Comprehensive error handling

## Route Structure

### Core Discovery & Browsing Routes
```
/                           # HomePage - Landing page
/recipes                    # RecipeDiscoveryPage - Browse all recipes
/recipes/:id                # RecipePage - Individual recipe details
/categories                 # CategoriesOverviewPage - Recipe categories
/categories/:category       # CategoryPage - Category-specific recipes
/search                     # SearchResultsPage - Search functionality
```

### Authentication & Profile Routes
```
/login                      # LoginPage - User login (public)
/register                   # RegisterPage - User registration (public)
/profile/:userId           # ProfilePage - Public user profiles
/dashboard                 # UserDashboard - User dashboard (protected)
/settings                  # SettingsPage - Account settings (protected)
```

### Recipe Management Routes (Protected)
```
/create-recipe             # CreateRecipePage - Recipe creation
/edit-recipe/:id           # EditRecipePage - Recipe editing
/collections               # CollectionsPage - Recipe collections
/collections/:id           # CollectionDetailPage - Collection details
/cook-mode/:recipeId       # CookModePage - Step-by-step cooking
```

### Meal Planning & Shopping Routes (Protected)
```
/meal-plan                 # MealPlanPage - Weekly meal planning
/shopping-list             # ShoppingListPage - Smart shopping lists
/inventory                 # InventoryPage - Kitchen inventory tracking
```

### Community & Social Routes
```
/chefs                     # ChefsPage - Featured chefs
/chefs/:id                 # ChefProfilePage - Individual chef profiles
/community                 # CommunityPage - Community hub
/reviews                   # ReviewsPage - Recipe reviews
```

### Business & Information Routes
```
/about                     # AboutPage - About Recipeer
/contact                   # ContactPage - Contact information
/privacy                   # PrivacyPage - Privacy policy
/terms                     # TermsPage - Terms of service
```

## Route Protection

### Protected Routes
Routes requiring authentication:
- `/dashboard`
- `/settings`
- `/create-recipe`
- `/edit-recipe/:id`
- `/collections` (index)
- `/meal-plan`
- `/shopping-list`
- `/inventory`

### Public Routes
Routes accessible without authentication:
- All core discovery routes (`/`, `/recipes`, `/categories`, etc.)
- Authentication routes (`/login`, `/register`)
- Community routes (`/chefs`, `/community`)
- Business routes (`/about`, `/contact`, etc.)

### Authentication Flow
- **Unauthenticated users** accessing protected routes → Redirected to `/login`
- **Authenticated users** accessing auth routes → Redirected to `/dashboard`
- **State persistence** via localStorage for seamless experience

## Code Splitting Strategy

### Eager Loading (Initial Bundle)
- `HomePage` - Landing page for immediate access
- `LoginPage` - Authentication entry point
- `RegisterPage` - User registration

### Lazy Loading (Route-based Chunks)
All other pages are lazy-loaded using `React.lazy()` and wrapped with `Suspense` for optimal performance:

```typescript
const RecipePage = lazy(() => import('@/pages/recipes').then(m => ({ default: m.RecipePage })));
```

### Loading States
- **Route transitions**: Spinner loading component
- **Authentication checks**: Loading indicator during auth state determination

## Error Handling

### Error Boundary
Comprehensive error boundary that handles:
- **404 errors**: Page not found
- **403 errors**: Access denied
- **500 errors**: Server errors
- **Generic errors**: Unexpected errors

### User Experience
- User-friendly error messages
- Recovery actions (Go Home, Go Back, Reload)
- Development mode: Technical error details

## Navigation Components

### RootLayout Navigation
- **Primary navigation**: Main site sections
- **User navigation**: Authentication-aware menu
- **Footer navigation**: Business and legal pages
- **Active state indicators**: Visual feedback for current page

### Authentication Integration
- **Login/Register buttons** for unauthenticated users
- **Dashboard/Logout** for authenticated users
- **User context display** showing current user name

## File Structure

```
src/
├── router/
│   ├── index.tsx          # Main router configuration
│   └── components.tsx     # Router-specific components
├── components/templates/
│   ├── root-layout/       # Main application layout
│   ├── error-boundary/    # Error handling component
│   └── protected-route/   # Route protection component
├── pages/                 # Page components organized by feature
│   ├── home/
│   ├── auth/
│   ├── recipes/
│   ├── categories/
│   ├── dashboard/
│   └── utils/             # Page utilities
└── providers/
    └── AuthProvider/      # Authentication context
```

## Performance Considerations

### Bundle Optimization
- **Code splitting**: Reduces initial bundle size
- **Lazy loading**: On-demand loading of route components
- **Chunk analysis**: Build shows optimal chunk distribution

### SEO Considerations
- **Meta tag management**: Placeholder for future SEO optimization
- **Canonical URLs**: Proper URL structure
- **Semantic routes**: User-friendly URL patterns

## Usage Examples

### Adding New Routes
1. Create page component in appropriate directory
2. Add route configuration in `src/router/index.tsx`
3. Determine if route requires protection
4. Add navigation links if needed

### Route Protection
```typescript
// Protected route
{
  path: "new-protected-page",
  element: <ProtectedRoute><NewPage /></ProtectedRoute>
}

// Public route
{
  path: "new-public-page",
  element: <NewPage />
}
```

### Navigation Integration
```typescript
// In RootLayout or navigation components
<Link 
  to="/new-page" 
  className={cn(
    "text-sm font-medium transition-colors hover:text-primary",
    isActive('/new-page') ? "text-primary" : "text-muted-foreground"
  )}
>
  New Page
</Link>
```

## Future Enhancements

### Planned Features
- **Data loading**: Route-based data fetching
- **Prefetching**: Intelligent route prefetching
- **SEO optimization**: Dynamic meta tags
- **Advanced caching**: Route data caching strategies

### Migration Path
The current implementation provides a solid foundation for:
- Page epic development
- Advanced routing features
- Performance optimizations
- SEO enhancements

## Development Guidelines

1. **Maintain route hierarchy**: Follow established patterns
2. **Consider authentication**: Determine route protection needs
3. **Optimize performance**: Use lazy loading for new routes
4. **Test thoroughly**: Verify navigation and protection work
5. **Update documentation**: Keep this file current with changes