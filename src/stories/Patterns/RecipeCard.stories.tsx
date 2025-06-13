import type { Meta, StoryObj } from '@storybook/react-vite';
import { Clock, Users, ChefHat, Star, Heart, Share2, Bookmark, Tag } from 'lucide-react';
import { RecipeCard } from '@/components/RecipeCard';
import type { RecipeCardProps } from '@/components/RecipeCard';

// Sample recipe data
const sampleRecipeData: Omit<RecipeCardProps, 'variant'> = {
  title: "Grandma's Apple Pie",
  description: "A classic homemade apple pie with flaky crust and perfectly spiced apple filling",
  image: "https://picsum.photos/seed/apple-pie/800/600",
  imageAlt: "Golden brown apple pie with lattice crust",
  cookTime: 45,
  prepTime: 30,
  servings: 8,
  difficulty: 'Medium',
  rating: 4.8,
  reviewCount: 124,
  author: {
    name: "Chef Maria",
    avatar: "https://picsum.photos/seed/chef-maria/150/150"
  },
  tags: ["Dessert", "Traditional", "Holiday"],
  cuisine: "American",
  dietaryRestrictions: ["Vegetarian"],
  onSave: () => console.log('Recipe saved!'),
  onShare: () => console.log('Recipe shared!'),
  onClick: () => console.log('Recipe clicked!')
};

const meta: Meta<typeof RecipeCard> = {
  title: 'Design System/Patterns/Recipe Card',
  component: RecipeCard,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
# Recipe Card Component System

A comprehensive, flexible Recipe Card component system with multiple display variants, states, and interaction patterns suitable for modern recipe websites and applications.

## Features

- **6 Display Variants**: default, compact, hero, minimal, detailed, list
- **Interactive States**: loading, saved, error, hover effects
- **Responsive Design**: Adapts to different screen sizes
- **Accessibility**: Full ARIA support and keyboard navigation
- **TypeScript**: Complete type safety with comprehensive interface
- **Customizable**: Flexible props for different use cases

## Variants

- **Default**: Standard grid layouts, recipe collections
- **Compact**: Sidebar recommendations, mobile lists
- **Hero**: Featured recipes, homepage highlights  
- **Minimal**: Clean layouts, premium experiences
- **Detailed**: Recipe browsing, comparison views
- **List**: Search results, category listings

## Use Cases

- Recipe browsing pages
- Search result listings
- Featured recipe displays
- Personal recipe collections
- Recipe recommendation widgets
        `
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'compact', 'hero', 'minimal', 'detailed', 'list'],
      description: 'Display variant of the recipe card'
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'Size of the recipe card'
    },
    aspectRatio: {
      control: 'select',
      options: ['4:3', '16:9', '1:1', 'auto'],
      description: 'Aspect ratio for the recipe image'
    },
    orientation: {
      control: 'select',
      options: ['vertical', 'horizontal'],
      description: 'Layout orientation'
    },
    difficulty: {
      control: 'select',
      options: ['Easy', 'Medium', 'Hard'],
      description: 'Recipe difficulty level'
    },
    isLoading: {
      control: 'boolean',
      description: 'Loading state of the component'
    },
    isSaved: {
      control: 'boolean',
      description: 'Whether the recipe is saved by the user'
    }
  }
};

export default meta;
type Story = StoryObj<typeof RecipeCard>;

// Default variant story
export const Default: Story = {
  args: {
    ...sampleRecipeData,
    variant: 'default'
  },
  parameters: {
    docs: {
      description: {
        story: 'Standard recipe card for grid layouts and general use. Shows essential information with a clean, accessible design.'
      }
    }
  }
};

// Compact variant story
export const Compact: Story = {
  args: {
    ...sampleRecipeData,
    variant: 'compact',
    title: "Quick Omelette"
  },
  parameters: {
    docs: {
      description: {
        story: 'Compact recipe card optimized for sidebars and mobile lists. Shows only essential information in a space-efficient layout.'
      }
    }
  }
};

// Hero variant story
export const Hero: Story = {
  args: {
    ...sampleRecipeData,
    variant: 'hero',
    title: "Authentic Spaghetti Carbonara",
    description: "Traditional Roman pasta dish with eggs, cheese, and pancetta. Learn the authentic technique for silky, creamy results.",
    image: "https://picsum.photos/seed/carbonara/800/600",
    tags: ["Italian", "Pasta", "Traditional", "Quick"]
  },
  parameters: {
    docs: {
      description: {
        story: 'Hero recipe card for featured content and homepage highlights. Includes overlay text, author information, and prominent call-to-action.'
      }
    }
  }
};

// Minimal variant story  
export const Minimal: Story = {
  args: {
    ...sampleRecipeData,
    variant: 'minimal'
  },
  parameters: {
    docs: {
      description: {
        story: 'Minimal recipe card with clean typography-focused design. Perfect for premium experiences and elegant layouts.'
      }
    }
  }
};

// Detailed variant story
export const Detailed: Story = {
  args: {
    ...sampleRecipeData,
    variant: 'detailed',
    title: "Chocolate Chip Cookies",
    description: "Classic homemade chocolate chip cookies with the perfect chewy texture and crispy edges.",
    image: "https://picsum.photos/seed/cookies/800/600",
    tags: ["Dessert", "Baking", "Classic", "Easy", "Kid-Friendly"],
    cuisine: "American"
  },
  parameters: {
    docs: {
      description: {
        story: 'Detailed recipe card showing comprehensive information including dietary restrictions, author, cuisine, and tags.'
      }
    }
  }
};

// List variant story
export const List: Story = {
  args: {
    ...sampleRecipeData,
    variant: 'list',
    title: "Mediterranean Quinoa Salad",
    description: "Fresh and healthy quinoa salad with vegetables, feta cheese, and a zesty lemon dressing.",
    dietaryRestrictions: ["Vegetarian", "Gluten-Free"]
  },
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: 'Horizontal list variant optimized for search results and category listings. Efficient space usage with comprehensive information.'
      }
    }
  }
};

// Loading state story
export const Loading: Story = {
  args: {
    ...sampleRecipeData,
    variant: 'default',
    isLoading: true
  },
  parameters: {
    docs: {
      description: {
        story: 'Loading state with skeleton UI and shimmer effect. Shows placeholder content while data is being fetched.'
      }
    }
  }
};

// Saved state story
export const Saved: Story = {
  args: {
    ...sampleRecipeData,
    variant: 'default',
    isSaved: true
  },
  parameters: {
    docs: {
      description: {
        story: 'Recipe card in saved state with visual indicator and updated button text.'
      }
    }
  }
};

// Different sizes story
export const Sizes: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-3">Small</h3>
        <RecipeCard {...sampleRecipeData} variant="default" size="small" />
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-3">Medium</h3>
        <RecipeCard {...sampleRecipeData} variant="default" size="medium" />
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-3">Large</h3>
        <RecipeCard {...sampleRecipeData} variant="default" size="large" />
      </div>
    </div>
  ),
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: 'Recipe cards in different sizes: small, medium, and large.'
      }
    }
  }
};

// Difficulty levels story
export const DifficultyLevels: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <RecipeCard 
        {...sampleRecipeData} 
        variant="default" 
        difficulty="Easy"
        title="Simple Pasta Salad"
        cookTime={15}
        prepTime={10}
      />
      <RecipeCard 
        {...sampleRecipeData} 
        variant="default" 
        difficulty="Medium"
        title="Beef Stir Fry"
        cookTime={20}
        prepTime={15}
      />
      <RecipeCard 
        {...sampleRecipeData} 
        variant="default" 
        difficulty="Hard"
        title="Sourdough Bread"
        cookTime={180}
        prepTime={240}
      />
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: 'Recipe cards showing different difficulty levels with appropriate color coding.'
      }
    }
  }
};

// Responsive grid story
export const ResponsiveGrid: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6 max-w-6xl">
      <RecipeCard
        {...sampleRecipeData}
        variant="default"
        title="Chocolate Chip Cookies"
        description="Classic homemade cookies with the perfect texture"
        cookTime={12}
        prepTime={15}
        difficulty="Easy"
        rating={4.9}
        reviewCount={89}
      />
      <RecipeCard
        {...sampleRecipeData}
        variant="default"
        title="Beef Stir Fry"
        description="Quick and healthy dinner option with fresh vegetables"
        cookTime={15}
        prepTime={20}
        difficulty="Medium"
        rating={4.6}
        reviewCount={34}
        dietaryRestrictions={["Gluten-Free"]}
      />
      <RecipeCard
        {...sampleRecipeData}
        variant="default"
        title="Homemade Pizza"
        description="From scratch pizza dough and sauce for the perfect pie"
        cookTime={180}
        prepTime={90}
        difficulty="Hard"
        rating={4.8}
        reviewCount={67}
        tags={["Italian", "Comfort Food"]}
      />
      <RecipeCard
        {...sampleRecipeData}
        variant="default"
        title="Fresh Garden Salad"
        description="Crisp vegetables with homemade vinaigrette dressing"
        cookTime={0}
        prepTime={15}
        difficulty="Easy"
        rating={4.3}
        reviewCount={23}
        dietaryRestrictions={["Vegan", "Gluten-Free"]}
      />
      <RecipeCard
        {...sampleRecipeData}
        variant="default"
        title="Grilled Salmon"
        description="Perfectly seasoned salmon with lemon and herbs"
        cookTime={12}
        prepTime={10}
        difficulty="Medium"
        rating={4.7}
        reviewCount={56}
        tags={["Healthy", "Seafood"]}
      />
      <RecipeCard
        {...sampleRecipeData}
        variant="default"
        title="Banana Bread"
        description="Moist and delicious banana bread with walnuts"
        cookTime={60}
        prepTime={15}
        difficulty="Easy"
        rating={4.5}
        reviewCount={78}
        tags={["Baking", "Breakfast"]}
      />
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: 'Responsive grid layout showcasing recipe cards with various content and metadata.'
      }
    }
  }
};

// Interactive playground story
export const Playground: Story = {
  args: {
    ...sampleRecipeData,
    variant: 'default'
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive playground to test different props and configurations of the Recipe Card component.'
      }
    }
  }
};