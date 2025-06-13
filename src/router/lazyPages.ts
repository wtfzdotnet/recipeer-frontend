import { lazy } from 'react';

// Public pages
export const HomePage = lazy(() => import('@/pages/public/HomePage'));
export const NotFoundPage = lazy(() => import('@/pages/public/NotFoundPage'));

// Recipe pages
export const RecipeDiscoveryPage = lazy(() => import('@/pages/recipes/RecipeDiscoveryPage'));
export const RecipePage = lazy(() => import('@/pages/recipes/RecipePage'));
export const CreateRecipePage = lazy(() => import('@/pages/recipes/CreateRecipePage'));

// Auth pages
export const LoginPage = lazy(() => import('@/pages/auth/LoginPage'));
export const RegisterPage = lazy(() => import('@/pages/auth/RegisterPage'));

// User pages
export const UserDashboard = lazy(() => import('@/pages/user/UserDashboard'));

// Create placeholder pages for the remaining routes
export const CategoriesOverviewPage = lazy(() => import('@/pages/recipes/CategoriesOverviewPage'));
export const CategoryPage = lazy(() => import('@/pages/recipes/CategoryPage'));
export const SearchResultsPage = lazy(() => import('@/pages/recipes/SearchResultsPage'));
export const ProfilePage = lazy(() => import('@/pages/user/ProfilePage'));
export const SettingsPage = lazy(() => import('@/pages/user/SettingsPage'));
export const EditRecipePage = lazy(() => import('@/pages/recipes/EditRecipePage'));
export const CollectionsPage = lazy(() => import('@/pages/user/CollectionsPage'));
export const CollectionDetailPage = lazy(() => import('@/pages/user/CollectionDetailPage'));
export const CookModePage = lazy(() => import('@/pages/recipes/CookModePage'));
export const MealPlanPage = lazy(() => import('@/pages/user/MealPlanPage'));
export const ShoppingListPage = lazy(() => import('@/pages/user/ShoppingListPage'));
export const InventoryPage = lazy(() => import('@/pages/user/InventoryPage'));
export const ChefsPage = lazy(() => import('@/pages/community/ChefsPage'));
export const ChefProfilePage = lazy(() => import('@/pages/community/ChefProfilePage'));
export const CommunityPage = lazy(() => import('@/pages/community/CommunityPage'));
export const ReviewsPage = lazy(() => import('@/pages/community/ReviewsPage'));
export const AboutPage = lazy(() => import('@/pages/business/AboutPage'));
export const ContactPage = lazy(() => import('@/pages/business/ContactPage'));
export const PrivacyPage = lazy(() => import('@/pages/business/PrivacyPage'));
export const TermsPage = lazy(() => import('@/pages/business/TermsPage'));