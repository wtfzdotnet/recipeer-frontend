import React, { Suspense, lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { RootLayout, ErrorBoundary, ProtectedRoute } from '@/components/templates';
import { RouteLoader } from './components';

// Import non-lazy components
import { HomePage } from '@/pages/home';
import { LoginPage, RegisterPage } from '@/pages/auth';

/**
 * Wrapper for lazy-loaded components with Suspense
 */
const withSuspense = (Component: React.ComponentType) => {
  return (
    <Suspense fallback={<RouteLoader />}>
      <Component />
    </Suspense>
  );
};

// Lazy load pages for code splitting
const DashboardPage = lazy(() => import('@/pages/dashboard').then(m => ({ default: m.DashboardPage })));
const RecipeDiscoveryPage = lazy(() => import('@/pages/recipes').then(m => ({ default: m.RecipeDiscoveryPage })));
const RecipePage = lazy(() => import('@/pages/recipes').then(m => ({ default: m.RecipePage })));
const CategoriesOverviewPage = lazy(() => import('@/pages/categories').then(m => ({ default: m.CategoriesOverviewPage })));
const CategoryPage = lazy(() => import('@/pages/categories').then(m => ({ default: m.CategoryPage })));
const SearchResultsPage = lazy(() => import('@/pages/search').then(m => ({ default: m.SearchResultsPage })));
const ProfilePage = lazy(() => import('@/pages/profile').then(m => ({ default: m.ProfilePage })));
const SettingsPage = lazy(() => import('@/pages/profile').then(m => ({ default: m.SettingsPage })));
const CreateRecipePage = lazy(() => import('@/pages/create-recipe').then(m => ({ default: m.CreateRecipePage })));
const EditRecipePage = lazy(() => import('@/pages/create-recipe').then(m => ({ default: m.EditRecipePage })));

// Create placeholder pages for remaining routes
const CollectionsPage = lazy(() => import('@/pages/utils/createPlaceholderPage').then(m => ({ 
  default: m.createPlaceholderPage({
    name: 'CollectionsPage',
    title: 'Recipe Collections',
    description: 'Organize your favorite recipes into collections'
  })
})));

const CollectionDetailPage = lazy(() => import('@/pages/utils/createPlaceholderPage').then(m => ({ 
  default: m.createPlaceholderPage({
    name: 'CollectionDetailPage',
    title: 'Collection Details',
    description: 'View recipes in this collection'
  })
})));

const CookModePage = lazy(() => import('@/pages/utils/createPlaceholderPage').then(m => ({ 
  default: m.createPlaceholderPage({
    name: 'CookModePage',
    title: 'Cook Mode',
    description: 'Step-by-step cooking guidance'
  })
})));

const MealPlanPage = lazy(() => import('@/pages/utils/createPlaceholderPage').then(m => ({ 
  default: m.createPlaceholderPage({
    name: 'MealPlanPage',
    title: 'Meal Planning',
    description: 'Plan your meals for the week'
  })
})));

const ShoppingListPage = lazy(() => import('@/pages/utils/createPlaceholderPage').then(m => ({ 
  default: m.createPlaceholderPage({
    name: 'ShoppingListPage',
    title: 'Shopping List',
    description: 'Your smart shopping companion'
  })
})));

const InventoryPage = lazy(() => import('@/pages/utils/createPlaceholderPage').then(m => ({ 
  default: m.createPlaceholderPage({
    name: 'InventoryPage',
    title: 'Kitchen Inventory',
    description: 'Track your pantry and ingredients'
  })
})));

const ChefsPage = lazy(() => import('@/pages/utils/createPlaceholderPage').then(m => ({ 
  default: m.createPlaceholderPage({
    name: 'ChefsPage',
    title: 'Featured Chefs',
    description: 'Discover talented chefs and their recipes'
  })
})));

const ChefProfilePage = lazy(() => import('@/pages/utils/createPlaceholderPage').then(m => ({ 
  default: m.createPlaceholderPage({
    name: 'ChefProfilePage',
    title: 'Chef Profile',
    description: 'Learn about this chef and their culinary journey'
  })
})));

const CommunityPage = lazy(() => import('@/pages/utils/createPlaceholderPage').then(m => ({ 
  default: m.createPlaceholderPage({
    name: 'CommunityPage',
    title: 'Community',
    description: 'Connect with fellow food enthusiasts'
  })
})));

const ReviewsPage = lazy(() => import('@/pages/utils/createPlaceholderPage').then(m => ({ 
  default: m.createPlaceholderPage({
    name: 'ReviewsPage',
    title: 'Recipe Reviews',
    description: 'Read and write recipe reviews'
  })
})));

const AboutPage = lazy(() => import('@/pages/utils/createPlaceholderPage').then(m => ({ 
  default: m.createPlaceholderPage({
    name: 'AboutPage',
    title: 'About Recipeer',
    description: 'Learn about our mission and values'
  })
})));

const ContactPage = lazy(() => import('@/pages/utils/createPlaceholderPage').then(m => ({ 
  default: m.createPlaceholderPage({
    name: 'ContactPage',
    title: 'Contact Us',
    description: 'Get in touch with our team'
  })
})));

const PrivacyPage = lazy(() => import('@/pages/utils/createPlaceholderPage').then(m => ({ 
  default: m.createPlaceholderPage({
    name: 'PrivacyPage',
    title: 'Privacy Policy',
    description: 'How we protect and handle your data'
  })
})));

const TermsPage = lazy(() => import('@/pages/utils/createPlaceholderPage').then(m => ({ 
  default: m.createPlaceholderPage({
    name: 'TermsPage',
    title: 'Terms of Service',
    description: 'Terms and conditions for using our platform'
  })
})));

/**
 * React Router v6 configuration with data patterns
 * Implements comprehensive routing for Recipe Authority Platform
 */
export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorBoundary />,
    children: [
      // Core Discovery & Browsing
      { 
        index: true, 
        element: <HomePage /> 
      },
      {
        path: "recipes",
        children: [
          { 
            index: true, 
            element: withSuspense(RecipeDiscoveryPage)
          },
          { 
            path: ":id", 
            element: withSuspense(RecipePage)
          },
        ],
      },
      {
        path: "categories",
        children: [
          { 
            index: true, 
            element: withSuspense(CategoriesOverviewPage)
          },
          { 
            path: ":category", 
            element: withSuspense(CategoryPage)
          },
        ],
      },
      { 
        path: "search", 
        element: withSuspense(SearchResultsPage)
      },

      // User Authentication & Profile (public access)
      { 
        path: "login", 
        element: <ProtectedRoute requireAuth={false}><LoginPage /></ProtectedRoute>
      },
      { 
        path: "register", 
        element: <ProtectedRoute requireAuth={false}><RegisterPage /></ProtectedRoute>
      },
      { 
        path: "profile/:userId", 
        element: withSuspense(ProfilePage)
      },

      // Protected Routes (require authentication)
      { 
        path: "dashboard", 
        element: <ProtectedRoute>{withSuspense(DashboardPage)}</ProtectedRoute>
      },
      { 
        path: "settings", 
        element: <ProtectedRoute>{withSuspense(SettingsPage)}</ProtectedRoute>
      },

      // Recipe Management & Creation (protected)
      { 
        path: "create-recipe", 
        element: <ProtectedRoute>{withSuspense(CreateRecipePage)}</ProtectedRoute>
      },
      { 
        path: "edit-recipe/:id", 
        element: <ProtectedRoute>{withSuspense(EditRecipePage)}</ProtectedRoute>
      },
      {
        path: "collections",
        children: [
          { 
            index: true, 
            element: <ProtectedRoute>{withSuspense(CollectionsPage)}</ProtectedRoute>
          },
          { 
            path: ":id", 
            element: withSuspense(CollectionDetailPage)
          },
        ],
      },
      { 
        path: "cook-mode/:recipeId", 
        element: withSuspense(CookModePage)
      },

      // Meal Planning & Shopping (protected)
      { 
        path: "meal-plan", 
        element: <ProtectedRoute>{withSuspense(MealPlanPage)}</ProtectedRoute>
      },
      { 
        path: "shopping-list", 
        element: <ProtectedRoute>{withSuspense(ShoppingListPage)}</ProtectedRoute>
      },
      { 
        path: "inventory", 
        element: <ProtectedRoute>{withSuspense(InventoryPage)}</ProtectedRoute>
      },

      // Community & Social
      { 
        path: "chefs", 
        element: withSuspense(ChefsPage)
      },
      { 
        path: "chefs/:id", 
        element: withSuspense(ChefProfilePage)
      },
      { 
        path: "community", 
        element: withSuspense(CommunityPage)
      },
      { 
        path: "reviews", 
        element: withSuspense(ReviewsPage)
      },

      // Business & Information
      { 
        path: "about", 
        element: withSuspense(AboutPage)
      },
      { 
        path: "contact", 
        element: withSuspense(ContactPage)
      },
      { 
        path: "privacy", 
        element: withSuspense(PrivacyPage)
      },
      { 
        path: "terms", 
        element: withSuspense(TermsPage)
      },
    ],
  },
]);