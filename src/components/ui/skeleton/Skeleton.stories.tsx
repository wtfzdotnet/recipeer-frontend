import type { Meta, StoryObj } from '@storybook/react-vite';
import { Skeleton } from './skeleton';

const meta: Meta<typeof Skeleton> = {
  title: 'Design System/Components/Data Display/Skeleton',
  component: Skeleton,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
# Skeleton Component

A loading placeholder component that provides visual feedback while recipe data, images, and other content are being fetched.

## Features

- **Pulse Animation**: Smooth loading animation that indicates content is loading
- **Flexible Sizing**: Can be sized to match any content shape
- **Accessible**: Maintains layout structure during loading states
- **Performance**: Lightweight CSS-only animations
- **Responsive**: Adapts to different screen sizes and content areas

## Use Cases

- **Recipe Cards**: Loading placeholders for recipe information
- **Images**: Placeholder for recipe photos and instruction videos
- **Nutritional Data**: Loading states for nutrition facts tables
- **User Content**: Placeholder for user profiles and reviews
- **Lists**: Loading states for recipe collections and search results
        `
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    className: {
      control: 'text',
      description: 'Additional CSS classes for styling'
    }
  }
};

export default meta;
type Story = StoryObj<typeof Skeleton>;

// Basic skeleton
export const Default: Story = {
  render: () => (
    <div className="space-y-2">
      <Skeleton className="h-4 w-[250px]" />
      <Skeleton className="h-4 w-[200px]" />
    </div>
  ),
};

// Recipe card skeleton
export const RecipeCard: Story = {
  render: () => (
    <div className="max-w-sm border rounded-lg overflow-hidden">
      {/* Image skeleton */}
      <Skeleton className="h-48 w-full" />
      
      {/* Content skeleton */}
      <div className="p-4 space-y-3">
        {/* Title */}
        <Skeleton className="h-6 w-3/4" />
        
        {/* Description */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
        </div>
        
        {/* Metadata */}
        <div className="flex items-center justify-between">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-20" />
        </div>
        
        {/* Tags */}
        <div className="flex gap-2">
          <Skeleton className="h-6 w-16 rounded-full" />
          <Skeleton className="h-6 w-20 rounded-full" />
          <Skeleton className="h-6 w-14 rounded-full" />
        </div>
        
        {/* Action buttons */}
        <div className="flex gap-2 pt-2">
          <Skeleton className="h-9 w-full" />
          <Skeleton className="h-9 w-9" />
          <Skeleton className="h-9 w-9" />
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Recipe card loading skeleton showing all typical elements: image, title, description, metadata, tags, and action buttons.'
      }
    }
  }
};

// Recipe grid skeleton
export const RecipeGrid: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl">
      {Array.from({ length: 6 }, (_, i) => (
        <div key={i} className="border rounded-lg overflow-hidden">
          <Skeleton className="h-40 w-full" />
          <div className="p-4 space-y-3">
            <Skeleton className="h-5 w-3/4" />
            <div className="space-y-2">
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-3 w-2/3" />
            </div>
            <div className="flex items-center justify-between">
              <Skeleton className="h-3 w-12" />
              <Skeleton className="h-3 w-16" />
            </div>
            <div className="flex gap-1">
              <Skeleton className="h-5 w-12 rounded-full" />
              <Skeleton className="h-5 w-16 rounded-full" />
            </div>
          </div>
        </div>
      ))}
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: 'Recipe grid loading skeleton showing multiple recipe cards in a responsive layout.'
      }
    }
  }
};

// Nutrition facts skeleton
export const NutritionFacts: Story = {
  render: () => (
    <div className="max-w-md border rounded-lg p-6">
      {/* Title */}
      <Skeleton className="h-6 w-48 mb-4" />
      
      {/* Serving info */}
      <Skeleton className="h-4 w-32 mb-4" />
      
      {/* Main nutrition values */}
      <div className="space-y-3 mb-4">
        <div className="flex justify-between items-center border-b pb-2">
          <Skeleton className="h-5 w-16" />
          <Skeleton className="h-5 w-12" />
        </div>
        
        <div className="flex justify-between items-center">
          <Skeleton className="h-4 w-20" />
          <div className="flex items-center gap-2">
            <Skeleton className="h-4 w-8" />
            <Skeleton className="h-4 w-8" />
          </div>
        </div>
        
        <div className="flex justify-between items-center pl-4">
          <Skeleton className="h-3 w-24" />
          <div className="flex items-center gap-2">
            <Skeleton className="h-3 w-6" />
            <Skeleton className="h-3 w-8" />
          </div>
        </div>
      </div>
      
      {/* Additional nutrients */}
      <div className="space-y-2">
        {Array.from({ length: 6 }, (_, i) => (
          <div key={i} className="flex justify-between items-center">
            <Skeleton className="h-3 w-16" />
            <div className="flex items-center gap-2">
              <Skeleton className="h-3 w-8" />
              <Skeleton className="h-3 w-6" />
            </div>
          </div>
        ))}
      </div>
      
      {/* Daily values note */}
      <Skeleton className="h-3 w-full mt-4" />
      <Skeleton className="h-3 w-3/4 mt-1" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Nutrition facts panel loading skeleton showing the typical layout of nutritional information.'
      }
    }
  }
};

// Recipe instructions skeleton
export const RecipeInstructions: Story = {
  render: () => (
    <div className="max-w-2xl space-y-6">
      {/* Ingredients section */}
      <div>
        <Skeleton className="h-6 w-32 mb-4" />
        <div className="space-y-3">
          {Array.from({ length: 6 }, (_, i) => (
            <div key={i} className="flex items-center gap-3 p-3 border rounded-lg">
              <Skeleton className="h-4 w-4" />
              <div className="flex-1">
                <Skeleton className="h-4 w-3/4" />
              </div>
              <Skeleton className="h-4 w-12" />
            </div>
          ))}
        </div>
      </div>
      
      {/* Instructions section */}
      <div>
        <Skeleton className="h-6 w-28 mb-4" />
        <div className="space-y-4">
          {Array.from({ length: 5 }, (_, i) => (
            <div key={i} className="flex gap-4 p-4 border rounded-lg">
              <Skeleton className="h-10 w-10 rounded-full flex-shrink-0" />
              <div className="flex-1 space-y-2">
                <div className="flex items-center justify-between">
                  <Skeleton className="h-5 w-32" />
                  <Skeleton className="h-4 w-16" />
                </div>
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-4/5" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  ),
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: 'Recipe instructions loading skeleton showing ingredients list and step-by-step instructions.'
      }
    }
  }
};

// User profile skeleton
export const UserProfile: Story = {
  render: () => (
    <div className="max-w-md border rounded-lg p-6">
      {/* Profile header */}
      <div className="flex items-center gap-4 mb-6">
        <Skeleton className="h-16 w-16 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-5 w-32" />
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-3 w-28" />
        </div>
      </div>
      
      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="text-center">
          <Skeleton className="h-6 w-8 mx-auto mb-1" />
          <Skeleton className="h-3 w-12 mx-auto" />
        </div>
        <div className="text-center">
          <Skeleton className="h-6 w-8 mx-auto mb-1" />
          <Skeleton className="h-3 w-16 mx-auto" />
        </div>
        <div className="text-center">
          <Skeleton className="h-6 w-8 mx-auto mb-1" />
          <Skeleton className="h-3 w-14 mx-auto" />
        </div>
      </div>
      
      {/* Bio */}
      <div className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <Skeleton className="h-4 w-3/4" />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'User profile loading skeleton showing avatar, name, stats, and bio information.'
      }
    }
  }
};

// Search results skeleton
export const SearchResults: Story = {
  render: () => (
    <div className="max-w-4xl space-y-4">
      {/* Search header */}
      <div className="flex items-center justify-between mb-6">
        <Skeleton className="h-6 w-48" />
        <Skeleton className="h-4 w-24" />
      </div>
      
      {/* Filter bar */}
      <div className="flex gap-2 mb-6">
        <Skeleton className="h-8 w-20 rounded-full" />
        <Skeleton className="h-8 w-16 rounded-full" />
        <Skeleton className="h-8 w-24 rounded-full" />
        <Skeleton className="h-8 w-18 rounded-full" />
      </div>
      
      {/* Results list */}
      <div className="space-y-4">
        {Array.from({ length: 5 }, (_, i) => (
          <div key={i} className="flex gap-4 p-4 border rounded-lg">
            <Skeleton className="h-20 w-20 rounded-lg flex-shrink-0" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-5 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
              <div className="flex items-center gap-4">
                <Skeleton className="h-3 w-12" />
                <Skeleton className="h-3 w-16" />
                <Skeleton className="h-3 w-14" />
              </div>
              <div className="flex gap-1">
                <Skeleton className="h-5 w-12 rounded-full" />
                <Skeleton className="h-5 w-16 rounded-full" />
              </div>
            </div>
            <div className="flex flex-col items-end gap-2">
              <Skeleton className="h-4 w-12" />
              <Skeleton className="h-6 w-6 rounded-full" />
            </div>
          </div>
        ))}
      </div>
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: 'Search results loading skeleton showing search header, filters, and result items.'
      }
    }
  }
};

// Mobile optimized skeleton
export const MobileOptimized: Story = {
  render: () => (
    <div className="max-w-sm mx-auto">
      {/* Mobile recipe card */}
      <div className="border rounded-lg overflow-hidden mb-4">
        <Skeleton className="h-32 w-full" />
        <div className="p-3 space-y-2">
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-2/3" />
          
          <div className="flex items-center justify-between pt-2">
            <Skeleton className="h-3 w-12" />
            <Skeleton className="h-3 w-16" />
          </div>
          
          <div className="flex gap-1">
            <Skeleton className="h-4 w-10 rounded-full" />
            <Skeleton className="h-4 w-12 rounded-full" />
          </div>
        </div>
      </div>
      
      {/* Mobile list item */}
      <div className="flex gap-3 p-3 border rounded-lg">
        <Skeleton className="h-12 w-12 rounded-lg flex-shrink-0" />
        <div className="flex-1 space-y-1">
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-3 w-1/2" />
          <div className="flex gap-1">
            <Skeleton className="h-3 w-8 rounded-full" />
            <Skeleton className="h-3 w-10 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Mobile-optimized skeleton layouts for recipe cards and list items on small screens.'
      }
    }
  }
};