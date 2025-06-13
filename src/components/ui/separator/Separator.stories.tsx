import type { Meta, StoryObj } from '@storybook/react-vite';
import { Separator } from './separator';
import { Clock, Users, ChefHat, Star, Heart, Share2 } from 'lucide-react';
import { Button } from '@/components/atoms';

const meta: Meta<typeof Separator> = {
  title: 'Design System/Components/Layout/Separator',
  component: Separator,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
# Separator Component

A visual separator component for organizing content sections. Built on Radix UI Separator primitive with accessibility support.

## Features

- **Accessible**: Proper semantic meaning and ARIA support
- **Flexible**: Horizontal and vertical orientations
- **Recipe-Focused**: Perfect for organizing recipe content sections
- **Responsive**: Adapts to different screen sizes
- **Consistent**: Uses design system border colors

## Recipe Platform Context

Perfect for separating:
- Recipe sections (ingredients, instructions, notes)
- Metadata sections (prep time, cook time, servings)
- User actions (save, share, print)
- Content blocks (reviews, related recipes, chef info)
- Navigation sections (categories, filters)

## Use Cases

- Recipe card content organization
- Form section separation
- Menu item separation
- Content block dividers
- Sidebar section breaks
        `
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: 'The orientation of the separator',
    },
    decorative: {
      control: 'boolean',
      description: 'Whether the separator is decorative or semantic',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic Horizontal Separator
export const Horizontal: Story = {
  render: () => (
    <div className="w-64">
      <div className="space-y-1">
        <h4 className="text-sm font-medium leading-none">Recipe Collections</h4>
        <p className="text-sm text-muted-foreground">
          Organize your favorite recipes
        </p>
      </div>
      <Separator className="my-4" />
      <div className="flex h-5 items-center space-x-4 text-sm">
        <div>Italian</div>
        <Separator orientation="vertical" />
        <div>Mexican</div>
        <Separator orientation="vertical" />
        <div>Asian</div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Basic horizontal separator with vertical separators for inline content.'
      }
    }
  }
};

// Vertical Separator
export const Vertical: Story = {
  render: () => (
    <div className="flex h-20 items-center space-x-4">
      <div className="text-sm">Quick Meals</div>
      <Separator orientation="vertical" />
      <div className="text-sm">Under 30 min</div>
      <Separator orientation="vertical" />
      <div className="text-sm">Easy Prep</div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Vertical separators for organizing inline recipe categories or filters.'
      }
    }
  }
};

// Recipe Card Content Sections
export const RecipeCardSections: Story = {
  render: () => (
    <div className="w-80 rounded-lg border p-6 shadow-sm">
      {/* Recipe Header */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Classic Spaghetti Carbonara</h3>
        <p className="text-sm text-muted-foreground">
          Authentic Italian pasta with eggs, cheese, and pancetta
        </p>
      </div>
      
      <Separator className="my-4" />
      
      {/* Recipe Meta */}
      <div className="flex items-center space-x-4 text-sm">
        <div className="flex items-center space-x-1">
          <Clock className="h-4 w-4 text-muted-foreground" />
          <span>25 min</span>
        </div>
        <Separator orientation="vertical" className="h-4" />
        <div className="flex items-center space-x-1">
          <Users className="h-4 w-4 text-muted-foreground" />
          <span>4 servings</span>
        </div>
        <Separator orientation="vertical" className="h-4" />
        <div className="flex items-center space-x-1">
          <ChefHat className="h-4 w-4 text-muted-foreground" />
          <span>Medium</span>
        </div>
      </div>
      
      <Separator className="my-4" />
      
      {/* Rating */}
      <div className="flex items-center space-x-2">
        <div className="flex items-center space-x-1">
          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
          <span className="text-sm font-medium">4.8</span>
        </div>
        <span className="text-sm text-muted-foreground">(127 reviews)</span>
      </div>
      
      <Separator className="my-4" />
      
      {/* Actions */}
      <div className="flex space-x-2">
        <Button size="sm" className="flex-1">
          View Recipe
        </Button>
        <Button variant="outline" size="sm">
          <Heart className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="sm">
          <Share2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  ),
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: 'Recipe card with separators organizing different content sections like header, metadata, rating, and actions.'
      }
    }
  }
};

// Recipe Form Sections
export const RecipeFormSections: Story = {
  render: () => (
    <div className="w-96 space-y-6 rounded-lg border p-6">
      <div>
        <h3 className="text-lg font-medium">Add New Recipe</h3>
        <p className="text-sm text-muted-foreground">
          Share your favorite recipe with the community
        </p>
      </div>
      
      <Separator />
      
      <div className="space-y-4">
        <h4 className="font-medium">Basic Information</h4>
        <div className="space-y-2">
          <label className="text-sm font-medium">Recipe Name</label>
          <input 
            type="text" 
            placeholder="Enter recipe name..."
            className="w-full rounded-md border px-3 py-2 text-sm"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Description</label>
          <textarea 
            placeholder="Describe your recipe..."
            className="w-full rounded-md border px-3 py-2 text-sm"
            rows={3}
          />
        </div>
      </div>
      
      <Separator />
      
      <div className="space-y-4">
        <h4 className="font-medium">Recipe Details</h4>
        <div className="grid grid-cols-3 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Prep Time</label>
            <input 
              type="text" 
              placeholder="15 min"
              className="w-full rounded-md border px-3 py-2 text-sm"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Cook Time</label>
            <input 
              type="text" 
              placeholder="30 min"
              className="w-full rounded-md border px-3 py-2 text-sm"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Servings</label>
            <input 
              type="text" 
              placeholder="4"
              className="w-full rounded-md border px-3 py-2 text-sm"
            />
          </div>
        </div>
      </div>
      
      <Separator />
      
      <div className="flex justify-end space-x-2">
        <Button variant="outline">Cancel</Button>
        <Button>Save Recipe</Button>
      </div>
    </div>
  ),
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: 'Recipe form with separators organizing different input sections for better visual hierarchy.'
      }
    }
  }
};

// Navigation Menu Sections
export const NavigationSections: Story = {
  render: () => (
    <div className="w-64 rounded-lg border p-4">
      <div className="space-y-1">
        <h4 className="px-2 py-1.5 text-sm font-semibold">Recipe Categories</h4>
        <div className="space-y-1">
          <div className="rounded-md px-2 py-1.5 text-sm hover:bg-accent">Italian</div>
          <div className="rounded-md px-2 py-1.5 text-sm hover:bg-accent">Mexican</div>
          <div className="rounded-md px-2 py-1.5 text-sm hover:bg-accent">Asian</div>
        </div>
      </div>
      
      <Separator className="my-3" />
      
      <div className="space-y-1">
        <h4 className="px-2 py-1.5 text-sm font-semibold">Meal Types</h4>
        <div className="space-y-1">
          <div className="rounded-md px-2 py-1.5 text-sm hover:bg-accent">Breakfast</div>
          <div className="rounded-md px-2 py-1.5 text-sm hover:bg-accent">Lunch</div>
          <div className="rounded-md px-2 py-1.5 text-sm hover:bg-accent">Dinner</div>
        </div>
      </div>
      
      <Separator className="my-3" />
      
      <div className="space-y-1">
        <h4 className="px-2 py-1.5 text-sm font-semibold">Dietary</h4>
        <div className="space-y-1">
          <div className="rounded-md px-2 py-1.5 text-sm hover:bg-accent">Vegetarian</div>
          <div className="rounded-md px-2 py-1.5 text-sm hover:bg-accent">Vegan</div>
          <div className="rounded-md px-2 py-1.5 text-sm hover:bg-accent">Gluten-Free</div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Navigation menu with separators organizing different category groups for recipe browsing.'
      }
    }
  }
};

// Separator Variants Collection
export const SeparatorVariants: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="mb-4 text-sm font-medium">Horizontal Separators</h3>
        <div className="space-y-4">
          <div>
            <span className="text-sm text-muted-foreground">Default</span>
            <Separator className="mt-2" />
          </div>
          <div>
            <span className="text-sm text-muted-foreground">Custom thickness</span>
            <Separator className="mt-2 h-[2px]" />
          </div>
          <div>
            <span className="text-sm text-muted-foreground">Custom color</span>
            <Separator className="mt-2 bg-orange-200" />
          </div>
        </div>
      </div>
      
      <div>
        <h3 className="mb-4 text-sm font-medium">Vertical Separators</h3>
        <div className="flex h-16 items-center space-x-4">
          <span className="text-sm">Section 1</span>
          <Separator orientation="vertical" />
          <span className="text-sm">Section 2</span>
          <Separator orientation="vertical" className="bg-orange-200" />
          <span className="text-sm">Section 3</span>
          <Separator orientation="vertical" className="w-[2px]" />
          <span className="text-sm">Section 4</span>
        </div>
      </div>
    </div>
  ),
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: 'Different separator variants showing customization options for thickness and color.'
      }
    }
  }
};