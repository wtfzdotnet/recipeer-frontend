import { createBrowserRouter } from 'react-router-dom';
import { lazy } from 'react';
import { RootLayout, ErrorBoundary, ProtectedRoute, RouteLoader } from '@/components/layouts';

// Lazy load page components for code splitting
const HomePage = lazy(() => 
  import('@/pages/home').then(module => ({ default: module.HomePage }))
);

const RecipeDiscoveryPage = lazy(() => 
  import('@/pages/recipe-discovery').then(module => ({ default: module.RecipeDiscoveryPage }))
);

const RecipeDetailPage = lazy(() => 
  import('@/pages/recipe-detail').then(module => ({ default: module.RecipeDetailPage }))
);

const LoginPage = lazy(() => 
  import('@/pages/login').then(module => ({ default: module.LoginPage }))
);

const DashboardPage = lazy(() => 
  import('@/pages/dashboard').then(module => ({ default: module.DashboardPage }))
);

/**
 * Router configuration with React Router v6 data patterns
 * Includes nested routes, lazy loading, and protected routes
 */
export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorBoundary />,
    children: [
      // Public routes
      {
        index: true,
        element: (
          <RouteLoader>
            <HomePage />
          </RouteLoader>
        ),
      },
      {
        path: "recipes",
        children: [
          {
            index: true,
            element: (
              <RouteLoader>
                <RecipeDiscoveryPage />
              </RouteLoader>
            ),
          },
          {
            path: ":id",
            element: (
              <RouteLoader>
                <RecipeDetailPage />
              </RouteLoader>
            ),
          },
        ],
      },
      
      // Authentication routes
      {
        path: "login",
        element: (
          <RouteLoader>
            <LoginPage />
          </RouteLoader>
        ),
      },
      {
        path: "register",
        element: (
          <RouteLoader>
            <div className="min-h-screen bg-background flex items-center justify-center">
              <div className="text-center space-y-4">
                <h1 className="text-2xl font-bold">Register Page</h1>
                <p className="text-muted-foreground">Coming soon...</p>
              </div>
            </div>
          </RouteLoader>
        ),
      },

      // Protected routes
      {
        path: "dashboard",
        element: (
          <ProtectedRoute>
            <RouteLoader>
              <DashboardPage />
            </RouteLoader>
          </ProtectedRoute>
        ),
      },
      {
        path: "create-recipe",
        element: (
          <ProtectedRoute>
            <RouteLoader>
              <div className="container py-8">
                <h1 className="text-2xl font-bold">Create Recipe</h1>
                <p className="text-muted-foreground">Coming soon...</p>
              </div>
            </RouteLoader>
          </ProtectedRoute>
        ),
      },
      {
        path: "collections",
        element: (
          <ProtectedRoute>
            <RouteLoader>
              <div className="container py-8">
                <h1 className="text-2xl font-bold">My Collections</h1>
                <p className="text-muted-foreground">Coming soon...</p>
              </div>
            </RouteLoader>
          </ProtectedRoute>
        ),
      },
      {
        path: "meal-plan",
        element: (
          <ProtectedRoute>
            <RouteLoader>
              <div className="container py-8">
                <h1 className="text-2xl font-bold">Meal Plan</h1>
                <p className="text-muted-foreground">Coming soon...</p>
              </div>
            </RouteLoader>
          </ProtectedRoute>
        ),
      },
      {
        path: "settings",
        element: (
          <ProtectedRoute>
            <RouteLoader>
              <div className="container py-8">
                <h1 className="text-2xl font-bold">Settings</h1>
                <p className="text-muted-foreground">Coming soon...</p>
              </div>
            </RouteLoader>
          </ProtectedRoute>
        ),
      },

      // Placeholder routes for other pages mentioned in the issue
      {
        path: "categories",
        element: (
          <RouteLoader>
            <div className="container py-8">
              <h1 className="text-2xl font-bold">Categories Overview</h1>
              <p className="text-muted-foreground">Coming soon...</p>
            </div>
          </RouteLoader>
        ),
      },
      {
        path: "categories/:category",
        element: (
          <RouteLoader>
            <div className="container py-8">
              <h1 className="text-2xl font-bold">Category Page</h1>
              <p className="text-muted-foreground">Coming soon...</p>
            </div>
          </RouteLoader>
        ),
      },
      {
        path: "search",
        element: (
          <RouteLoader>
            <div className="container py-8">
              <h1 className="text-2xl font-bold">Search Results</h1>
              <p className="text-muted-foreground">Coming soon...</p>
            </div>
          </RouteLoader>
        ),
      },
      {
        path: "about",
        element: (
          <RouteLoader>
            <div className="container py-8">
              <h1 className="text-2xl font-bold">About Recipeer</h1>
              <p className="text-muted-foreground">Coming soon...</p>
            </div>
          </RouteLoader>
        ),
      },
      {
        path: "contact",
        element: (
          <RouteLoader>
            <div className="container py-8">
              <h1 className="text-2xl font-bold">Contact Us</h1>
              <p className="text-muted-foreground">Coming soon...</p>
            </div>
          </RouteLoader>
        ),
      },
    ],
  },
]);