import type { Meta, StoryObj } from '@storybook/react-vite';
import { Heart, Share, Printer, Calendar } from 'lucide-react';
// Simple mock function for stories
const fn = () => () => {};

import { RecipeCard } from './RecipeCard';
import type { Recipe } from '@/types';

// Mock recipe data for stories
const mockRecipe: Recipe = {
  id: 'recipe-1',
  title: 'Grandma\'s Famous Apple Pie',
  description: 'A delicious traditional apple pie with a flaky, buttery crust and perfectly spiced apple filling. This family recipe has been passed down for generations and never fails to impress.',
  image: 'https://images.unsplash.com/photo-1568471173955-a4a8e5d3a396?w=800&h=600&fit=crop',
  author: {
    id: 'author-1',
    name: 'Sarah Johnson',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b5cd5b9d?w=100&h=100&fit=crop&crop=face',
    isVerified: true
  },
  ratings: {
    average: 4.8,
    count: 127
  },
  timing: {
    prepTime: 30,
    cookTime: 45,
    totalTime: 75
  },
  difficulty: 'intermediate' as const,
  servings: 8,
  tags: ['dessert', 'traditional', 'holiday', 'fruit'],
  nutrition: {
    calories: 320,
    protein: 3,
    carbs: 52,
    fat: 12,
    fiber: 3
  },
  isBookmarked: false,
  savedCollections: []
};

const mockBeginnerRecipe: Recipe = {
  ...mockRecipe,
  id: 'recipe-2',
  title: 'Simple Chocolate Chip Cookies',
  description: 'Easy-to-make chocolate chip cookies perfect for beginners. Soft, chewy, and loaded with chocolate chips.',
  image: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=800&h=600&fit=crop',
  author: {
    id: 'author-2',
    name: 'Mike Chen',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
    isVerified: false
  },
  ratings: {
    average: 4.6,
    count: 89
  },
  timing: {
    prepTime: 15,
    cookTime: 12,
    totalTime: 27
  },
  difficulty: 'beginner' as const,
  servings: 24,
  tags: ['dessert', 'cookies', 'easy', 'quick'],
  savedCollections: ['favorites']
};

const mockAdvancedRecipe: Recipe = {
  ...mockRecipe,
  id: 'recipe-3',
  title: 'French Coq au Vin with Herb Dumplings',
  description: 'An elegant French classic featuring chicken braised in red wine with pearl onions, mushrooms, and aromatic herbs. Served with fluffy herb dumplings.',
  image: 'https://images.unsplash.com/photo-1574484284002-952d92456975?w=800&h=600&fit=crop',
  author: {
    id: 'author-3',
    name: 'Chef Marie Dubois',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop&crop=face',
    isVerified: true
  },
  ratings: {
    average: 4.9,
    count: 45
  },
  timing: {
    prepTime: 45,
    cookTime: 120,
    totalTime: 165
  },
  difficulty: 'advanced' as const,
  servings: 4,
  tags: ['french', 'main course', 'wine', 'elegant'],
  savedCollections: ['favorites', 'dinner-party']
};

const mockCollections = [
  { id: 'favorites', name: 'My Favorites' },
  { id: 'dinner-party', name: 'Dinner Party' },
  { id: 'weeknight', name: 'Weeknight Dinners' },
  { id: 'desserts', name: 'Sweet Treats' }
];

const meta: Meta<typeof RecipeCard> = {
  title: 'Organisms/RecipeCard',
  component: RecipeCard,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Primary recipe display component with support for multiple variants, interactive elements, and cultural sensitivity. Integrates all recipe-specific components for browsing and discovery.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['compact', 'standard', 'featured'],
      description: 'Visual variant of the recipe card'
    },
    showSaveButton: {
      control: 'boolean',
      description: 'Whether to show the save to collection button'
    },
    recipe: {
      control: 'object',
      description: 'Recipe data object'
    },
    collections: {
      control: 'object',
      description: 'Available collections for saving'
    }
  },
  args: {
    recipe: mockRecipe,
    collections: mockCollections,
    showSaveButton: true,
    onSave: fn(),
    onShare: fn(),
    onPrint: fn(),
    onAddToMealPlan: fn(),
    onClick: fn()
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

// Standard variant (default)
export const Standard: Story = {
  args: {
    variant: 'standard'
  }
};

// Compact variant for grid layouts
export const Compact: Story = {
  args: {
    variant: 'compact'
  },
  parameters: {
    docs: {
      description: {
        story: 'Compact variant ideal for grid views and search results. Shows essential information with overlay design.'
      }
    }
  }
};

// Featured variant for hero placements
export const Featured: Story = {
  args: {
    variant: 'featured'
  },
  parameters: {
    docs: {
      description: {
        story: 'Featured variant for hero placements with enhanced content display and larger format.'
      }
    }
  }
};

// Different difficulty levels
export const BeginnerRecipe: Story = {
  args: {
    recipe: mockBeginnerRecipe,
    variant: 'standard'
  },
  parameters: {
    docs: {
      description: {
        story: 'Recipe card displaying a beginner-level recipe with appropriate difficulty indicators.'
      }
    }
  }
};

export const AdvancedRecipe: Story = {
  args: {
    recipe: mockAdvancedRecipe,
    variant: 'standard'
  },
  parameters: {
    docs: {
      description: {
        story: 'Recipe card for advanced recipes showing complex timing and sophisticated presentation.'
      }
    }
  }
};

// Without save functionality
export const WithoutSaveButton: Story = {
  args: {
    showSaveButton: false,
    variant: 'standard'
  },
  parameters: {
    docs: {
      description: {
        story: 'Recipe card without save functionality, useful for read-only contexts or guest users.'
      }
    }
  }
};

// Grid layout demonstration
export const GridLayout: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl">
      <RecipeCard
        recipe={mockRecipe}
        variant="compact"
        collections={mockCollections}
        onSave={fn()}
        onShare={fn()}
        onClick={fn()}
      />
      <RecipeCard
        recipe={mockBeginnerRecipe}
        variant="compact"
        collections={mockCollections}
        onSave={fn()}
        onShare={fn()}
        onClick={fn()}
      />
      <RecipeCard
        recipe={mockAdvancedRecipe}
        variant="compact"
        collections={mockCollections}
        onSave={fn()}
        onShare={fn()}
        onClick={fn()}
      />
      <RecipeCard
        recipe={{...mockRecipe, id: 'recipe-4', title: 'Mediterranean Quinoa Salad'}}
        variant="compact"
        collections={mockCollections}
        onSave={fn()}
        onShare={fn()}
        onClick={fn()}
      />
      <RecipeCard
        recipe={{...mockBeginnerRecipe, id: 'recipe-5', title: 'Classic Pancakes'}}
        variant="compact"
        collections={mockCollections}
        onSave={fn()}
        onShare={fn()}
        onClick={fn()}
      />
      <RecipeCard
        recipe={{...mockAdvancedRecipe, id: 'recipe-6', title: 'Beef Wellington'}}
        variant="compact"
        collections={mockCollections}
        onSave={fn()}
        onShare={fn()}
        onClick={fn()}
      />
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: 'Grid layout showcasing multiple recipe cards in compact variant, perfect for search results and browsing.'
      }
    }
  }
};

// Different variants comparison
export const VariantComparison: Story = {
  render: () => (
    <div className="space-y-8">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Compact Variant</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl">
          <RecipeCard
            recipe={mockRecipe}
            variant="compact"
            collections={mockCollections}
            onSave={fn()}
            onClick={fn()}
          />
          <RecipeCard
            recipe={mockBeginnerRecipe}
            variant="compact"
            collections={mockCollections}
            onSave={fn()}
            onClick={fn()}
          />
          <RecipeCard
            recipe={mockAdvancedRecipe}
            variant="compact"
            collections={mockCollections}
            onSave={fn()}
            onClick={fn()}
          />
        </div>
      </div>
      
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Standard Variant</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
          <RecipeCard
            recipe={mockRecipe}
            variant="standard"
            collections={mockCollections}
            onSave={fn()}
            onShare={fn()}
            onPrint={fn()}
            onAddToMealPlan={fn()}
            onClick={fn()}
          />
          <RecipeCard
            recipe={mockBeginnerRecipe}
            variant="standard"
            collections={mockCollections}
            onSave={fn()}
            onShare={fn()}
            onPrint={fn()}
            onAddToMealPlan={fn()}
            onClick={fn()}
          />
        </div>
      </div>
      
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Featured Variant</h3>
        <RecipeCard
          recipe={mockAdvancedRecipe}
          variant="featured"
          collections={mockCollections}
          onSave={fn()}
          onShare={fn()}
          onPrint={fn()}
          onAddToMealPlan={fn()}
          onClick={fn()}
          className="max-w-2xl"
        />
      </div>
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: 'Comprehensive comparison of all three variants showing their different use cases and layouts.'
      }
    }
  }
};

// Interactive states
export const InteractiveStates: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
      <RecipeCard
        recipe={{...mockRecipe, savedCollections: ['favorites']}}
        variant="standard"
        collections={mockCollections}
        onSave={fn()}
        onShare={fn()}
        onPrint={fn()}
        onAddToMealPlan={fn()}
        onClick={fn()}
      />
      <RecipeCard
        recipe={{...mockBeginnerRecipe, savedCollections: []}}
        variant="standard"
        collections={mockCollections}
        onSave={fn()}
        onShare={fn()}
        onPrint={fn()}
        onAddToMealPlan={fn()}
        onClick={fn()}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Recipe cards showing different save states - one saved to favorites, one unsaved.'
      }
    }
  }
};

// Mobile responsive demonstration
export const MobileView: Story = {
  args: {
    variant: 'standard'
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1'
    },
    docs: {
      description: {
        story: 'Recipe card optimized for mobile devices with responsive design and touch-friendly interactions.'
      }
    }
  }
};

// RTL (Right-to-Left) language support
export const RTLSupport: Story = {
  render: () => (
    <div dir="rtl" className="rtl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
        <RecipeCard
          recipe={{
            ...mockRecipe,
            title: 'فطيرة التفاح التقليدية',
            description: 'فطيرة تفاح لذيذة تقليدية مع عجينة مقرمشة وحشوة تفاح متبلة بشكل مثالي',
            author: {
              ...mockRecipe.author,
              name: 'سارة أحمد'
            }
          }}
          variant="standard"
          collections={mockCollections}
          onSave={fn()}
          onShare={fn()}
          onPrint={fn()}
          onAddToMealPlan={fn()}
          onClick={fn()}
        />
        <RecipeCard
          recipe={{
            ...mockBeginnerRecipe,
            title: 'עוגיות שוקולד צ\'יפס פשוטות',
            description: 'עוגיות שוקולד צ\'יפס קלות להכנה, מושלמות למתחילים',
            author: {
              ...mockBeginnerRecipe.author,
              name: 'מיכאל כהן'
            }
          }}
          variant="compact"
          collections={mockCollections}
          onSave={fn()}
          onClick={fn()}
        />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Recipe cards with RTL (right-to-left) language support, demonstrating proper layout and spacing for Arabic and Hebrew text.'
      }
    }
  }
};