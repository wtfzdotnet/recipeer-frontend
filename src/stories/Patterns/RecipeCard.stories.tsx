import type { Meta, StoryObj } from '@storybook/react-vite';
import { Clock, Users, ChefHat, Star, Heart, Share2, Bookmark, Tag } from 'lucide-react';
import { RecipeCard } from '@/components/RecipeCard';
import type { RecipeCardProps } from '@/components/RecipeCard';

// Sample recipe data
const sampleRecipeData: Omit<RecipeCardProps, 'variant'> = {
  title: "Classic Homemade Lasagna",
  description: "Rich layers of pasta, meat sauce, and three cheeses baked to bubbly perfection. A family favorite that brings everyone to the table.",
  image: "https://picsum.photos/seed/lasagna-classic/800/600",
  imageAlt: "Golden brown lasagna with melted cheese on top",
  cookTime: 60,
  prepTime: 45,
  servings: 8,
  difficulty: 'Medium',
  rating: 4.8,
  reviewCount: 247,
  author: {
    name: "Maria Rossi",
    avatar: "https://picsum.photos/seed/chef-maria-rossi/150/150"
  },
  tags: ["Italian", "Comfort Food", "Family Dinner"],
  cuisine: "Italian",
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
    title: "Mediterranean Chicken Bowl",
    description: "Grilled chicken with quinoa, fresh vegetables, and tzatziki sauce",
    image: "https://picsum.photos/seed/mediterranean-chicken-bowl/800/600",
    cookTime: 25,
    prepTime: 15,
    difficulty: 'Easy',
    rating: 4.6,
    reviewCount: 89
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
    title: "Authentic Beef Bourguignon",
    description: "Traditional French slow-cooked beef stew with wine, vegetables, and herbs. A restaurant-quality dish perfect for special occasions.",
    image: "https://picsum.photos/seed/beef-bourguignon/800/600",
    tags: ["French", "Slow Cooking", "Wine Pairing", "Special Occasion"],
    cookTime: 180,
    prepTime: 30,
    difficulty: 'Hard',
    author: {
      name: "Chef Antoine Dubois",
      avatar: "https://picsum.photos/seed/chef-antoine/150/150"
    }
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
    title: "Artisan Sourdough Bread",
    description: "Traditional sourdough bread with a crispy crust and tangy, chewy interior. Master the art of wild fermentation and create bakery-quality bread at home.",
    image: "https://picsum.photos/seed/sourdough-bread/800/600",
    tags: ["Bread", "Artisan", "Fermentation", "Advanced"],
    cuisine: "European",
    cookTime: 45,
    prepTime: 720, // 12 hours including fermentation
    difficulty: 'Hard',
    rating: 4.9,
    reviewCount: 156,
    author: {
      name: "Baker Sarah Chen",
      avatar: "https://picsum.photos/seed/baker-sarah/150/150"
    }
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
    title: "Thai Green Curry with Jasmine Rice",
    description: "Aromatic Thai green curry with coconut milk, fresh vegetables, and fragrant jasmine rice. A perfect balance of spice, sweetness, and herbs.",
    image: "https://picsum.photos/seed/thai-green-curry/800/600",
    dietaryRestrictions: ["Vegan", "Gluten-Free"],
    tags: ["Thai", "Curry", "Coconut", "Spicy"],
    cuisine: "Thai",
    cookTime: 30,
    prepTime: 20,
    difficulty: 'Medium',
    rating: 4.7,
    reviewCount: 203
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
        <RecipeCard 
          {...sampleRecipeData} 
          variant="default" 
          size="small"
          title="Quick Pancakes"
          description="Fluffy pancakes ready in 15 minutes"
          image="https://picsum.photos/seed/pancakes-quick/800/600"
          cookTime={10}
          prepTime={5}
          difficulty="Easy"
        />
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-3">Medium</h3>
        <RecipeCard {...sampleRecipeData} variant="default" size="medium" />
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-3">Large</h3>
        <RecipeCard 
          {...sampleRecipeData} 
          variant="default" 
          size="large"
          title="Gourmet Mushroom Risotto"
          description="Creamy Arborio rice with wild mushrooms, white wine, and Parmigiano-Reggiano cheese"
          image="https://picsum.photos/seed/mushroom-risotto/800/600"
          cookTime={45}
          prepTime={15}
          difficulty="Hard"
        />
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
        title="Avocado Toast"
        description="Perfectly ripe avocado on toasted sourdough with a sprinkle of everything seasoning"
        image="https://picsum.photos/seed/avocado-toast/800/600"
        cookTime={5}
        prepTime={5}
        servings={2}
        rating={4.3}
        reviewCount={67}
      />
      <RecipeCard 
        {...sampleRecipeData} 
        variant="default" 
        difficulty="Medium"
        title="Honey Garlic Salmon"
        description="Pan-seared salmon with a sweet and savory glaze, served with steamed vegetables"
        image="https://picsum.photos/seed/honey-garlic-salmon/800/600"
        cookTime={20}
        prepTime={15}
        servings={4}
        rating={4.7}
        reviewCount={134}
      />
      <RecipeCard 
        {...sampleRecipeData} 
        variant="default" 
        difficulty="Hard"
        title="Wellington Beef Tenderloin"
        description="Premium beef tenderloin wrapped in puff pastry with mushroom duxelles and prosciutto"
        image="https://picsum.photos/seed/beef-wellington/800/600"
        cookTime={120}
        prepTime={180}
        servings={6}
        rating={4.9}
        reviewCount={89}
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
        title="Korean Kimchi Fried Rice"
        description="Spicy and savory fried rice with fermented kimchi, topped with a fried egg"
        image="https://picsum.photos/seed/kimchi-fried-rice/800/600"
        cookTime={15}
        prepTime={10}
        difficulty="Easy"
        rating={4.6}
        reviewCount={178}
        tags={["Korean", "Spicy", "Quick"]}
        cuisine="Korean"
      />
      <RecipeCard
        {...sampleRecipeData}
        variant="default"
        title="Moroccan Tagine"
        description="Aromatic slow-cooked stew with tender lamb, apricots, and warm spices"
        image="https://picsum.photos/seed/moroccan-tagine/800/600"
        cookTime={120}
        prepTime={30}
        difficulty="Medium"
        rating={4.8}
        reviewCount={94}
        dietaryRestrictions={["Gluten-Free"]}
        tags={["Moroccan", "Slow Cooking", "Spices"]}
        cuisine="Moroccan"
      />
      <RecipeCard
        {...sampleRecipeData}
        variant="default"
        title="Homemade Neapolitan Pizza"
        description="Authentic wood-fired style pizza with San Marzano tomatoes and fresh mozzarella"
        image="https://picsum.photos/seed/neapolitan-pizza/800/600"
        cookTime={90}
        prepTime={180}
        difficulty="Hard"
        rating={4.9}
        reviewCount={267}
        tags={["Italian", "Pizza", "Wood-Fired"]}
        cuisine="Italian"
      />
      <RecipeCard
        {...sampleRecipeData}
        variant="default"
        title="Buddha Bowl"
        description="Nourishing bowl with quinoa, roasted vegetables, and tahini dressing"
        image="https://picsum.photos/seed/buddha-bowl/800/600"
        cookTime={30}
        prepTime={15}
        difficulty="Easy"
        rating={4.4}
        reviewCount={145}
        dietaryRestrictions={["Vegan", "Gluten-Free"]}
        tags={["Healthy", "Plant-Based", "Colorful"]}
      />
      <RecipeCard
        {...sampleRecipeData}
        variant="default"
        title="Cedar Plank Salmon"
        description="Grilled salmon infused with smoky cedar flavors and citrus herbs"
        image="https://picsum.photos/seed/cedar-plank-salmon/800/600"
        cookTime={25}
        prepTime={20}
        difficulty="Medium"
        rating={4.7}
        reviewCount={112}
        tags={["Grilling", "Seafood", "Summer"]}
      />
      <RecipeCard
        {...sampleRecipeData}
        variant="default"
        title="French Macarons"
        description="Delicate almond cookies with smooth tops and ruffled feet, filled with ganache"
        image="https://picsum.photos/seed/french-macarons/800/600"
        cookTime={45}
        prepTime={120}
        difficulty="Hard"
        rating={4.5}
        reviewCount={203}
        tags={["French", "Pastry", "Elegant"]}
        cuisine="French"
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