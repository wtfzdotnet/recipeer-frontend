import type { Meta, StoryObj } from '@storybook/react-vite';
import { Badge } from './badge';
import { Star, Utensils, Clock, Users, AlertTriangle, CheckCircle, Leaf, Flame } from 'lucide-react';

const meta: Meta<typeof Badge> = {
  title: 'Atoms/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
# Badge Component

A versatile badge component for displaying recipe tags, dietary indicators, difficulty levels, and other categorization elements in the recipe platform.

## Features

- **Recipe-Specific Variants**: dietary, difficulty, cuisine, rating, warning, success
- **Multiple Sizes**: small, default, large
- **Icon Support**: Works seamlessly with Lucide React icons
- **Accessibility**: Proper focus states and semantic structure
- **Dark Mode**: Full dark mode support

## Use Cases

- **Dietary Tags**: "Vegetarian", "Gluten-Free", "Keto", "Vegan"
- **Difficulty Levels**: "Easy", "Medium", "Hard" 
- **Cuisine Types**: "Italian", "Mexican", "Asian", "Mediterranean"
- **Rating Indicators**: "5-Star", "Editor's Choice", "Popular"
- **Status Indicators**: "New", "Featured", "Trending"
- **Warning Labels**: "Contains Nuts", "Spicy", "Hot Surface"
        `
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'secondary', 'destructive', 'outline', 'dietary', 'difficulty', 'cuisine', 'rating', 'warning', 'success'],
      description: 'Visual variant of the badge'
    },
    size: {
      control: 'select',
      options: ['sm', 'default', 'lg'],
      description: 'Size of the badge'
    },
    children: {
      control: 'text',
      description: 'Content to display in the badge'
    }
  }
};

export default meta;
type Story = StoryObj<typeof Badge>;

// Default badge
export const Default: Story = {
  args: {
    children: "Default Badge",
  },
};

// All variants
export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      <Badge variant="default">Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="destructive">Destructive</Badge>
      <Badge variant="outline">Outline</Badge>
      <Badge variant="dietary">Dietary</Badge>
      <Badge variant="difficulty">Difficulty</Badge>
      <Badge variant="cuisine">Cuisine</Badge>
      <Badge variant="rating">Rating</Badge>
      <Badge variant="warning">Warning</Badge>
      <Badge variant="success">Success</Badge>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All available badge variants with their distinct styling.'
      }
    }
  }
};

// Different sizes
export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      <Badge size="sm">Small</Badge>
      <Badge size="default">Default</Badge>
      <Badge size="lg">Large</Badge>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Badge component in different sizes.'
      }
    }
  }
};

// Recipe-specific examples
export const RecipeExamples: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h4 className="text-sm font-medium mb-2">Dietary Restrictions</h4>
        <div className="flex flex-wrap gap-2">
          <Badge variant="dietary">
            <Leaf className="w-3 h-3 mr-1" />
            Vegetarian
          </Badge>
          <Badge variant="dietary">Gluten-Free</Badge>
          <Badge variant="dietary">Keto</Badge>
          <Badge variant="dietary">Dairy-Free</Badge>
        </div>
      </div>
      
      <div>
        <h4 className="text-sm font-medium mb-2">Difficulty Levels</h4>
        <div className="flex flex-wrap gap-2">
          <Badge variant="success">
            <CheckCircle className="w-3 h-3 mr-1" />
            Easy
          </Badge>
          <Badge variant="difficulty">Medium</Badge>
          <Badge variant="warning">
            <Flame className="w-3 h-3 mr-1" />
            Hard
          </Badge>
        </div>
      </div>
      
      <div>
        <h4 className="text-sm font-medium mb-2">Cuisine Types</h4>
        <div className="flex flex-wrap gap-2">
          <Badge variant="cuisine">
            <Utensils className="w-3 h-3 mr-1" />
            Italian
          </Badge>
          <Badge variant="cuisine">Mexican</Badge>
          <Badge variant="cuisine">Asian</Badge>
          <Badge variant="cuisine">Mediterranean</Badge>
        </div>
      </div>
      
      <div>
        <h4 className="text-sm font-medium mb-2">Recipe Metadata</h4>
        <div className="flex flex-wrap gap-2">
          <Badge variant="rating">
            <Star className="w-3 h-3 mr-1 fill-current" />
            5-Star
          </Badge>
          <Badge variant="secondary">
            <Clock className="w-3 h-3 mr-1" />
            Quick & Easy
          </Badge>
          <Badge variant="secondary">
            <Users className="w-3 h-3 mr-1" />
            Serves 4
          </Badge>
        </div>
      </div>
      
      <div>
        <h4 className="text-sm font-medium mb-2">Safety Warnings</h4>
        <div className="flex flex-wrap gap-2">
          <Badge variant="warning">
            <AlertTriangle className="w-3 h-3 mr-1" />
            Contains Nuts
          </Badge>
          <Badge variant="warning">Spicy</Badge>
          <Badge variant="destructive">Hot Surface</Badge>
        </div>
      </div>
    </div>
  ),
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: 'Real-world examples of badges used in recipe contexts with appropriate icons and variants.'
      }
    }
  }
};

// Recipe card integration
export const RecipeCardIntegration: Story = {
  render: () => (
    <div className="max-w-sm border rounded-lg overflow-hidden">
      <div className="h-48 bg-gradient-to-br from-orange-100 to-red-100 flex items-center justify-center">
        <span className="text-6xl">🍝</span>
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-semibold">Pasta Carbonara</h3>
          <Badge variant="rating" size="sm">
            <Star className="w-3 h-3 mr-1 fill-current" />
            4.8
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground mb-3">
          Classic Italian pasta dish with eggs, cheese, and pancetta
        </p>
        <div className="flex items-center justify-between text-sm text-muted-foreground mb-3">
          <span>⏱️ 20min</span>
          <span>👥 4 servings</span>
        </div>
        <div className="flex flex-wrap gap-1.5">
          <Badge variant="cuisine" size="sm">Italian</Badge>
          <Badge variant="difficulty" size="sm">Medium</Badge>
          <Badge variant="secondary" size="sm">Comfort Food</Badge>
          <Badge variant="warning" size="sm">Contains Eggs</Badge>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Example integration of badges within recipe cards showing how they enhance recipe categorization and metadata display.'
      }
    }
  }
};

// Cultural formatting example
export const CulturalFormatting: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h4 className="text-sm font-medium mb-2">Time Formats</h4>
        <div className="flex flex-wrap gap-2">
          <Badge variant="secondary">20 min</Badge>
          <Badge variant="secondary">1h 30m</Badge>
          <Badge variant="secondary">45 minutes</Badge>
        </div>
      </div>
      
      <div>
        <h4 className="text-sm font-medium mb-2">Serving Sizes</h4>
        <div className="flex flex-wrap gap-2">
          <Badge variant="secondary">Serves 4</Badge>
          <Badge variant="secondary">4 portions</Badge>
          <Badge variant="secondary">4 servings</Badge>
        </div>
      </div>
      
      <div>
        <h4 className="text-sm font-medium mb-2">Regional Cuisines</h4>
        <div className="flex flex-wrap gap-2">
          <Badge variant="cuisine">中式 (Chinese)</Badge>
          <Badge variant="cuisine">Français</Badge>
          <Badge variant="cuisine">Español</Badge>
          <Badge variant="cuisine">Italiano</Badge>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Examples showing cultural data formatting for international recipe platform usage.'
      }
    }
  }
};

// Responsive design
export const ResponsiveDesign: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl">
      {Array.from({ length: 6 }, (_, i) => (
        <div key={i} className="border rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-medium">Recipe {i + 1}</h4>
            <Badge variant="rating" size="sm">
              <Star className="w-3 h-3 mr-1 fill-current" />
              {(4.2 + i * 0.2).toFixed(1)}
            </Badge>
          </div>
          <div className="flex flex-wrap gap-1">
            <Badge variant="cuisine" size="sm">Italian</Badge>
            <Badge variant="dietary" size="sm">Vegetarian</Badge>
            <Badge variant="difficulty" size="sm">Easy</Badge>
          </div>
        </div>
      ))}
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: 'Responsive grid layout showing how badges adapt to different screen sizes and content arrangements.'
      }
    }
  }
};