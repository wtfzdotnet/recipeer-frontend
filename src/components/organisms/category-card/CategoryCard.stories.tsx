import type { Meta, StoryObj } from '@storybook/react-vite';
import { CategoryCard } from './category-card';
import { LocaleProvider } from '@/providers/LocaleProvider';
import type { Category } from '@/types';

// Simple mock function for stories
const fn = () => () => {};

// Mock category data
const mockItalianCategory: Category = {
  id: 'italian-cuisine',
  name: 'Italian Cuisine',
  image: '/api/placeholder/400/300',
  description: 'Authentic Italian recipes from various regions',
  recipeCount: 145,
  trending: true,
  type: 'cuisine',
  cultural: {
    region: 'Southern Europe',
    authenticity: 'traditional',
    historicalContext: 'Centuries of culinary tradition from the Italian peninsula',
    traditionNotes: 'Emphasizes fresh, high-quality ingredients and regional specialties'
  },
  popularRecipes: [
    {
      id: '1',
      name: 'Pasta Carbonara',
      cookingTime: 20,
      rating: 4.8,
      image: '/api/placeholder/300/200'
    },
    {
      id: '2', 
      name: 'Margherita Pizza',
      cookingTime: 35,
      rating: 4.9,
      image: '/api/placeholder/300/200'
    },
    {
      id: '3',
      name: 'Tiramisu',
      cookingTime: 30,
      rating: 4.7,
      image: '/api/placeholder/300/200'
    }
  ]
};

const mockVeganCategory: Category = {
  id: 'vegan-recipes',
  name: 'Vegan Recipes',
  image: '/api/placeholder/400/300',
  description: 'Plant-based recipes for healthy living',
  recipeCount: 89,
  trending: false,
  type: 'dietary',
  popularRecipes: [
    {
      id: '4',
      name: 'Buddha Bowl',
      cookingTime: 25,
      rating: 4.6,
      image: '/api/placeholder/300/200'
    },
    {
      id: '5',
      name: 'Vegan Lasagna',
      cookingTime: 45,
      rating: 4.5,
      image: '/api/placeholder/300/200'
    }
  ]
};

const mockBreakfastCategory: Category = {
  id: 'breakfast',
  name: 'Breakfast',
  image: '/api/placeholder/400/300',
  description: 'Start your day with delicious breakfast recipes',
  recipeCount: 67,
  trending: false,
  type: 'meal'
};

const mockSeasonalCategory: Category = {
  id: 'summer-recipes',
  name: 'Summer Specials',
  image: '/api/placeholder/400/300',
  description: 'Fresh and light recipes perfect for summer',
  recipeCount: 34,
  trending: true,
  type: 'seasonal'
};

const meta = {
  title: 'Organisms/CategoryCard',
  component: CategoryCard,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'CategoryCard displays cuisine and topic categories with cultural sensitivity, featuring visual navigation, trending indicators, and recipe previews. Supports multiple layout variants and RTL languages.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['grid', 'hero', 'compact'],
      description: 'Card layout variant'
    },
    showRecipeCount: {
      control: 'boolean',
      description: 'Whether to show recipe count'
    },
    isBookmarked: {
      control: 'boolean',
      description: 'Whether category is bookmarked'
    },
    onCategoryClick: { action: 'category-clicked' },
    onBookmarkToggle: { action: 'bookmark-toggled' }
  },
  decorators: [
    (Story) => (
      <LocaleProvider defaultLocale="en-US">
        <div className="max-w-4xl mx-auto p-4">
          <Story />
        </div>
      </LocaleProvider>
    ),
  ],
} satisfies Meta<typeof CategoryCard>;

export default meta;
type Story = StoryObj<typeof meta>;

// Basic Grid Variant
export const GridDefault: Story = {
  args: {
    category: mockItalianCategory,
    variant: 'grid',
    showRecipeCount: true,
    isBookmarked: false,
    onCategoryClick: fn(),
    onBookmarkToggle: fn()
  },
  parameters: {
    docs: {
      description: {
        story: 'Default grid layout showing an Italian cuisine category with trending badge and cultural context.'
      }
    }
  }
};

// Hero Variant
export const HeroVariant: Story = {
  args: {
    category: mockItalianCategory,
    variant: 'hero',
    showRecipeCount: true,
    isBookmarked: true,
    onCategoryClick: fn(),
    onBookmarkToggle: fn()
  },
  parameters: {
    docs: {
      description: {
        story: 'Hero layout for featured categories with larger imagery and enhanced typography.'
      }
    }
  }
};

// Compact Variant
export const CompactVariant: Story = {
  args: {
    category: mockVeganCategory,
    variant: 'compact',
    showRecipeCount: false,
    isBookmarked: false,
    onCategoryClick: fn(),
    onBookmarkToggle: fn()
  },
  parameters: {
    docs: {
      description: {
        story: 'Compact layout for list views with horizontal layout and reduced content.'
      }
    }
  }
};

// Without Cultural Context
export const WithoutCultural: Story = {
  args: {
    category: mockBreakfastCategory,
    variant: 'grid',
    showRecipeCount: true,
    isBookmarked: false,
    onCategoryClick: fn(),
    onBookmarkToggle: fn()
  },
  parameters: {
    docs: {
      description: {
        story: 'Category card without cultural context information, showing meal type category.'
      }
    }
  }
};

// Trending Category
export const TrendingCategory: Story = {
  args: {
    category: mockSeasonalCategory,
    variant: 'grid',
    showRecipeCount: true,
    isBookmarked: false,
    onCategoryClick: fn(),
    onBookmarkToggle: fn()
  },
  parameters: {
    docs: {
      description: {
        story: 'Seasonal category with trending indicator badge showing current popularity.'
      }
    }
  }
};

// Grid Layout Demo
export const GridLayout: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <CategoryCard
        category={mockItalianCategory}
        variant="grid"
        onCategoryClick={fn()}
        onBookmarkToggle={fn()}
      />
      <CategoryCard
        category={mockVeganCategory}
        variant="grid"
        isBookmarked={true}
        onCategoryClick={fn()}
        onBookmarkToggle={fn()}
      />
      <CategoryCard
        category={mockBreakfastCategory}
        variant="grid"
        onCategoryClick={fn()}
        onBookmarkToggle={fn()}
      />
      <CategoryCard
        category={mockSeasonalCategory}
        variant="grid"
        onCategoryClick={fn()}
        onBookmarkToggle={fn()}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Multiple category cards in a responsive grid layout showing different category types.'
      }
    }
  }
};

// Compact List Layout
export const CompactList: Story = {
  render: () => (
    <div className="space-y-4 max-w-2xl">
      <CategoryCard
        category={mockItalianCategory}
        variant="compact"
        onCategoryClick={fn()}
        onBookmarkToggle={fn()}
      />
      <CategoryCard
        category={mockVeganCategory}
        variant="compact"
        isBookmarked={true}
        onCategoryClick={fn()}
        onBookmarkToggle={fn()}
      />
      <CategoryCard
        category={mockBreakfastCategory}
        variant="compact"
        onCategoryClick={fn()}
        onBookmarkToggle={fn()}
      />
      <CategoryCard
        category={mockSeasonalCategory}
        variant="compact"
        onCategoryClick={fn()}
        onBookmarkToggle={fn()}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Multiple category cards in compact list layout for dense information display.'
      }
    }
  }
};

// RTL Support Test
export const RTLTest: Story = {
  args: {
    category: mockItalianCategory,
    variant: 'grid',
    showRecipeCount: true,
    isBookmarked: true,
    onCategoryClick: fn(),
    onBookmarkToggle: fn()
  },
  decorators: [
    (Story) => (
      <div dir="rtl" className="rtl">
        <LocaleProvider defaultLocale="ar-SA">
          <div className="max-w-4xl mx-auto p-4">
            <Story />
          </div>
        </LocaleProvider>
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: 'CategoryCard in RTL (Right-to-Left) layout for Arabic and Hebrew language support.'
      }
    }
  }
};

// Interactive States
export const InteractiveStates: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Normal State</h3>
        <CategoryCard
          category={mockItalianCategory}
          variant="grid"
          onCategoryClick={fn()}
          onBookmarkToggle={fn()}
        />
      </div>
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Bookmarked State</h3>
        <CategoryCard
          category={mockItalianCategory}
          variant="grid"
          isBookmarked={true}
          onCategoryClick={fn()}
          onBookmarkToggle={fn()}
        />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Different interactive states showing normal and bookmarked categories.'
      }
    }
  }
};