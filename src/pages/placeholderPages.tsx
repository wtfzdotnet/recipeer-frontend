import React from 'react';

// Template for creating placeholder pages
const createPlaceholderPage = (title: string, description: string, icon: string) => {
  const PlaceholderPage: React.FC = () => {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-foreground mb-6">
            {title}
          </h1>
          <p className="text-muted-foreground mb-8">
            {description}
          </p>
          
          <div className="text-center py-16">
            <div className="w-16 h-16 bg-secondary rounded-lg flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">{icon}</span>
            </div>
            <p className="text-muted-foreground">
              Coming soon...
            </p>
          </div>
        </div>
      </div>
    );
  };
  return PlaceholderPage;
};

// Recipe-related pages
export const SearchResultsPage = createPlaceholderPage(
  'Search Results', 
  'Find recipes that match your search criteria', 
  '🔍'
);

export const EditRecipePage = createPlaceholderPage(
  'Edit Recipe', 
  'Update your recipe details and instructions', 
  '✏️'
);

export const CookModePage = createPlaceholderPage(
  'Cook Mode', 
  'Step-by-step cooking instructions', 
  '👨‍🍳'
);

// User-related pages
export const ProfilePage = createPlaceholderPage(
  'Profile', 
  'View and edit your profile information', 
  '👤'
);

export const SettingsPage = createPlaceholderPage(
  'Settings', 
  'Manage your account preferences', 
  '⚙️'
);

export const CollectionsPage = createPlaceholderPage(
  'Collections', 
  'Organize your favorite recipes', 
  '📚'
);

export const CollectionDetailPage = createPlaceholderPage(
  'Collection Details', 
  'View recipes in this collection', 
  '📖'
);

export const MealPlanPage = createPlaceholderPage(
  'Meal Plan', 
  'Plan your weekly meals', 
  '📅'
);

export const ShoppingListPage = createPlaceholderPage(
  'Shopping List', 
  'Your grocery shopping list', 
  '🛒'
);

export const InventoryPage = createPlaceholderPage(
  'Inventory', 
  'Track your pantry items', 
  '📦'
);

// Community pages
export const ChefsPage = createPlaceholderPage(
  'Featured Chefs', 
  'Discover talented chefs and their recipes', 
  '👨‍🍳'
);

export const ChefProfilePage = createPlaceholderPage(
  'Chef Profile', 
  'Learn about this chef and their cooking style', 
  '🎭'
);

export const CommunityPage = createPlaceholderPage(
  'Community', 
  'Connect with other cooking enthusiasts', 
  '👥'
);

export const ReviewsPage = createPlaceholderPage(
  'Reviews', 
  'Read and write recipe reviews', 
  '⭐'
);

// Business pages
export const AboutPage = createPlaceholderPage(
  'About Recipeer', 
  'Learn about our mission and team', 
  'ℹ️'
);

export const ContactPage = createPlaceholderPage(
  'Contact Us', 
  'Get in touch with our team', 
  '📧'
);

export const PrivacyPage = createPlaceholderPage(
  'Privacy Policy', 
  'How we protect your privacy', 
  '🔒'
);

export const TermsPage = createPlaceholderPage(
  'Terms of Service', 
  'Terms and conditions for using Recipeer', 
  '📜'
);