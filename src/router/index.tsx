import React, { Suspense } from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import { RootLayout } from '@/components/RootLayout';
import { ErrorBoundary } from '@/components/ErrorBoundary';

// Core page imports
import HomePage from '@/pages/public/HomePage';
import NotFoundPage from '@/pages/public/NotFoundPage';
import RecipeDiscoveryPage from '@/pages/recipes/RecipeDiscoveryPage';
import RecipePage from '@/pages/recipes/RecipePage';
import CreateRecipePage from '@/pages/recipes/CreateRecipePage';
import CategoriesOverviewPage from '@/pages/recipes/CategoriesOverviewPage';
import CategoryPage from '@/pages/recipes/CategoryPage';
import LoginPage from '@/pages/auth/LoginPage';
import RegisterPage from '@/pages/auth/RegisterPage';
import UserDashboard from '@/pages/user/UserDashboard';

// Import placeholder pages
import {
  SearchResultsPage,
  EditRecipePage,
  CookModePage,
  ProfilePage,
  SettingsPage,
  CollectionsPage,
  CollectionDetailPage,
  MealPlanPage,
  ShoppingListPage,
  InventoryPage,
  ChefsPage,
  ChefProfilePage,
  CommunityPage,
  ReviewsPage,
  AboutPage,
  ContactPage,
  PrivacyPage,
  TermsPage
} from '@/pages/placeholderPages';

// Loading component
const PageLoader: React.FC = () => (
  <div className="min-h-screen bg-background flex items-center justify-center">
    <div className="text-center">
      <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
      <p className="text-muted-foreground">Loading...</p>
    </div>
  </div>
);

// Higher-order component for protected routes
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // TODO: Implement actual authentication check
  const isAuthenticated = false; // Placeholder
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
};

// Wrapper for lazy-loaded components
const withSuspense = (Component: React.ComponentType) => (
  <Suspense fallback={<PageLoader />}>
    <Component />
  </Suspense>
);

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorBoundary />,
    children: [
      // Public routes
      {
        index: true,
        element: withSuspense(HomePage),
      },
      
      // Recipe Discovery & Browsing
      {
        path: "recipes",
        children: [
          {
            index: true,
            element: withSuspense(RecipeDiscoveryPage),
          },
          {
            path: ":id",
            element: withSuspense(RecipePage),
          },
        ],
      },
      {
        path: "categories",
        children: [
          {
            index: true,
            element: withSuspense(CategoriesOverviewPage),
          },
          {
            path: ":category",
            element: withSuspense(CategoryPage),
          },
        ],
      },
      {
        path: "search",
        element: withSuspense(SearchResultsPage),
      },

      // Authentication
      {
        path: "login",
        element: withSuspense(LoginPage),
      },
      {
        path: "register",
        element: withSuspense(RegisterPage),
      },

      // Protected User Routes
      {
        path: "dashboard",
        element: (
          <ProtectedRoute>
            {withSuspense(UserDashboard)}
          </ProtectedRoute>
        ),
      },
      {
        path: "profile/:userId",
        element: withSuspense(ProfilePage),
      },
      {
        path: "settings",
        element: (
          <ProtectedRoute>
            {withSuspense(SettingsPage)}
          </ProtectedRoute>
        ),
      },

      // Recipe Management (Protected)
      {
        path: "create-recipe",
        element: (
          <ProtectedRoute>
            {withSuspense(CreateRecipePage)}
          </ProtectedRoute>
        ),
      },
      {
        path: "edit-recipe/:id",
        element: (
          <ProtectedRoute>
            {withSuspense(EditRecipePage)}
          </ProtectedRoute>
        ),
      },
      {
        path: "cook-mode/:recipeId",
        element: withSuspense(CookModePage),
      },

      // Collections (Protected)
      {
        path: "collections",
        children: [
          {
            index: true,
            element: (
              <ProtectedRoute>
                {withSuspense(CollectionsPage)}
              </ProtectedRoute>
            ),
          },
          {
            path: ":id",
            element: withSuspense(CollectionDetailPage),
          },
        ],
      },

      // Meal Planning & Shopping (Protected)
      {
        path: "meal-plan",
        element: (
          <ProtectedRoute>
            {withSuspense(MealPlanPage)}
          </ProtectedRoute>
        ),
      },
      {
        path: "shopping-list",
        element: (
          <ProtectedRoute>
            {withSuspense(ShoppingListPage)}
          </ProtectedRoute>
        ),
      },
      {
        path: "inventory",
        element: (
          <ProtectedRoute>
            {withSuspense(InventoryPage)}
          </ProtectedRoute>
        ),
      },

      // Community & Social
      {
        path: "chefs",
        children: [
          {
            index: true,
            element: withSuspense(ChefsPage),
          },
          {
            path: ":id",
            element: withSuspense(ChefProfilePage),
          },
        ],
      },
      {
        path: "community",
        element: withSuspense(CommunityPage),
      },
      {
        path: "reviews",
        element: withSuspense(ReviewsPage),
      },

      // Business & Information
      {
        path: "about",
        element: withSuspense(AboutPage),
      },
      {
        path: "contact",
        element: withSuspense(ContactPage),
      },
      {
        path: "privacy",
        element: withSuspense(PrivacyPage),
      },
      {
        path: "terms",
        element: withSuspense(TermsPage),
      },

      // 404 catch-all
      {
        path: "*",
        element: withSuspense(NotFoundPage),
      },
    ],
  },
]);