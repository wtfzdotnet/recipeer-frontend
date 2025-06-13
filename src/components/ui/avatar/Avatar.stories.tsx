import type { Meta, StoryObj } from '@storybook/react-vite';
import { Avatar, AvatarFallback, AvatarImage } from './avatar';
import { User, ChefHat, Crown, Star } from 'lucide-react';

const meta: Meta<typeof Avatar> = {
  title: 'Design System/Components/Data Display/Avatar',
  component: Avatar,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
# Avatar Component

A user avatar component for displaying profile pictures, chef images, and user representations. Built on Radix UI Avatar primitive with fallback support.

## Features

- **Accessible**: Proper alt text and semantic structure
- **Fallback Support**: Graceful degradation when images fail to load
- **Recipe-Focused**: Perfect for chef profiles and user attribution
- **Flexible Sizing**: Multiple size variants for different contexts
- **Customizable**: Easy to style and extend

## Recipe Platform Context

Perfect for displaying:
- Chef profiles and recipe authors
- User avatars in reviews and comments
- Recipe contributors and community members
- Staff picks and featured chefs
- User account sections

## Use Cases

- Recipe card author attribution
- Review and comment user identification
- Chef profile displays
- User navigation and menus
- Community features and social interactions
        `
      }
    }
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic Avatar
export const Default: Story = {
  render: () => (
    <Avatar>
      <AvatarImage src="https://picsum.photos/seed/chef-maria/150/150" alt="Chef Maria" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Basic avatar with image and fallback for chef or user profile display.'
      }
    }
  }
};

// Fallback Avatar
export const WithFallback: Story = {
  render: () => (
    <Avatar>
      <AvatarImage src="invalid-url" alt="User" />
      <AvatarFallback>JD</AvatarFallback>
    </Avatar>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Avatar with fallback display when image fails to load, showing user initials.'
      }
    }
  }
};

// Chef Profiles
export const ChefProfiles: Story = {
  render: () => (
    <div className="flex items-center space-x-4">
      <div className="text-center">
        <Avatar className="h-16 w-16 border-2 border-orange-200">
          <AvatarImage src="https://picsum.photos/seed/chef-giovanni/200/200" alt="Chef Giovanni" />
          <AvatarFallback className="bg-orange-100 text-orange-700">
            <ChefHat className="h-6 w-6" />
          </AvatarFallback>
        </Avatar>
        <p className="mt-2 text-sm font-medium">Chef Giovanni</p>
        <p className="text-xs text-muted-foreground">Italian Cuisine</p>
      </div>
      
      <div className="text-center">
        <Avatar className="h-16 w-16 border-2 border-green-200">
          <AvatarImage src="https://picsum.photos/seed/chef-maria/200/200" alt="Chef Maria" />
          <AvatarFallback className="bg-green-100 text-green-700">MR</AvatarFallback>
        </Avatar>
        <p className="mt-2 text-sm font-medium">Chef Maria</p>
        <p className="text-xs text-muted-foreground">Mediterranean</p>
      </div>
      
      <div className="text-center">
        <Avatar className="h-16 w-16 border-2 border-red-200">
          <AvatarImage src="https://picsum.photos/seed/chef-hiroshi/200/200" alt="Chef Hiroshi" />
          <AvatarFallback className="bg-red-100 text-red-700">HT</AvatarFallback>
        </Avatar>
        <p className="mt-2 text-sm font-medium">Chef Hiroshi</p>
        <p className="text-xs text-muted-foreground">Japanese</p>
      </div>
    </div>
  ),
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: 'Chef profile avatars with cuisine specialization labels and styled borders.'
      }
    }
  }
};

// Recipe Card Author Attribution
export const RecipeCardAuthor: Story = {
  render: () => (
    <div className="w-80 rounded-lg border p-4 shadow-sm">
      <div className="aspect-video rounded-md bg-gradient-to-br from-orange-100 to-orange-200 mb-4 flex items-center justify-center">
        <span className="text-sm text-orange-700">Recipe Image</span>
      </div>
      
      <h3 className="text-lg font-semibold mb-1">Grandma's Apple Pie</h3>
      <p className="text-sm text-muted-foreground mb-3">
        A classic family recipe passed down through generations
      </p>
      
      <div className="flex items-center space-x-3">
        <Avatar className="h-8 w-8">
          <AvatarImage src="https://picsum.photos/seed/grandma-betty/120/120" alt="Betty Johnson" />
          <AvatarFallback className="text-xs">BJ</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <p className="text-sm font-medium">Betty Johnson</p>
          <p className="text-xs text-muted-foreground">Home Baker • 45 recipes</p>
        </div>
        <div className="flex items-center space-x-1">
          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
          <span className="text-sm">4.9</span>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Recipe card with author attribution using avatar, showing chef information and rating.'
      }
    }
  }
};

// Review Comments with Avatars
export const ReviewComments: Story = {
  render: () => (
    <div className="w-96 space-y-4">
      <h3 className="font-semibold">Recipe Reviews</h3>
      
      <div className="space-y-4">
        <div className="flex space-x-3">
          <Avatar className="h-8 w-8">
            <AvatarImage src="https://picsum.photos/seed/reviewer-sarah/120/120" alt="Sarah M." />
            <AvatarFallback>SM</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-1">
              <p className="text-sm font-medium">Sarah M.</p>
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              Absolutely delicious! This recipe reminded me of my childhood. 
              The instructions were clear and easy to follow.
            </p>
          </div>
        </div>
        
        <div className="flex space-x-3">
          <Avatar className="h-8 w-8">
            <AvatarImage src="invalid-url" alt="Mike R." />
            <AvatarFallback>MR</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-1">
              <p className="text-sm font-medium">Mike R.</p>
              <div className="flex">
                {[1, 2, 3, 4].map((star) => (
                  <Star key={star} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                ))}
                <Star className="h-3 w-3 text-gray-300" />
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              Good recipe, but I had to adjust the cooking time. 
              Maybe my oven runs hot!
            </p>
          </div>
        </div>
        
        <div className="flex space-x-3">
          <Avatar className="h-8 w-8">
            <AvatarImage src="https://picsum.photos/seed/reviewer-lisa/120/120" alt="Lisa K." />
            <AvatarFallback className="bg-purple-100 text-purple-700">LK</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-1">
              <p className="text-sm font-medium">Lisa K.</p>
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              Perfect! Made this for Sunday dinner and everyone loved it. 
              Will definitely make again.
            </p>
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: 'Recipe review comments with user avatars, names, ratings, and feedback text.'
      }
    }
  }
};

// User Account Navigation
export const UserAccountMenu: Story = {
  render: () => (
    <div className="w-64 rounded-lg border p-4 shadow-sm">
      <div className="flex items-center space-x-3 mb-4">
        <Avatar className="h-12 w-12 border-2 border-orange-200">
          <AvatarImage src="https://picsum.photos/seed/user-john/150/150" alt="John Doe" />
          <AvatarFallback className="bg-orange-100 text-orange-700">JD</AvatarFallback>
        </Avatar>
        <div>
          <p className="font-medium">John Doe</p>
          <p className="text-sm text-muted-foreground">Home Cook</p>
        </div>
      </div>
      
      <div className="space-y-1">
        <div className="rounded-md px-3 py-2 text-sm hover:bg-accent cursor-pointer">
          My Recipes
        </div>
        <div className="rounded-md px-3 py-2 text-sm hover:bg-accent cursor-pointer">
          Saved Recipes
        </div>
        <div className="rounded-md px-3 py-2 text-sm hover:bg-accent cursor-pointer">
          Meal Plans
        </div>
        <div className="rounded-md px-3 py-2 text-sm hover:bg-accent cursor-pointer">
          Shopping Lists
        </div>
        <div className="border-t pt-2 mt-2">
          <div className="rounded-md px-3 py-2 text-sm hover:bg-accent cursor-pointer">
            Settings
          </div>
          <div className="rounded-md px-3 py-2 text-sm hover:bg-accent cursor-pointer">
            Sign Out
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'User account navigation menu with avatar and user profile information.'
      }
    }
  }
};

// Avatar Size Variants
export const SizeVariants: Story = {
  render: () => (
    <div className="flex items-end space-x-4">
      <div className="text-center">
        <Avatar className="h-6 w-6">
          <AvatarImage src="https://picsum.photos/seed/user-small/100/100" alt="Small" />
          <AvatarFallback className="text-xs">XS</AvatarFallback>
        </Avatar>
        <p className="mt-2 text-xs text-muted-foreground">Extra Small</p>
      </div>
      
      <div className="text-center">
        <Avatar className="h-8 w-8">
          <AvatarImage src="https://picsum.photos/seed/user-medium/120/120" alt="Medium" />
          <AvatarFallback className="text-xs">SM</AvatarFallback>
        </Avatar>
        <p className="mt-2 text-xs text-muted-foreground">Small</p>
      </div>
      
      <div className="text-center">
        <Avatar>
          <AvatarImage src="https://picsum.photos/seed/user-default/150/150" alt="Default" />
          <AvatarFallback>MD</AvatarFallback>
        </Avatar>
        <p className="mt-2 text-xs text-muted-foreground">Default</p>
      </div>
      
      <div className="text-center">
        <Avatar className="h-12 w-12">
          <AvatarImage src="https://picsum.photos/seed/user-large/180/180" alt="Large" />
          <AvatarFallback>LG</AvatarFallback>
        </Avatar>
        <p className="mt-2 text-xs text-muted-foreground">Large</p>
      </div>
      
      <div className="text-center">
        <Avatar className="h-16 w-16">
          <AvatarImage src="https://picsum.photos/seed/user-xlarge/200/200" alt="Extra Large" />
          <AvatarFallback className="text-lg">XL</AvatarFallback>
        </Avatar>
        <p className="mt-2 text-xs text-muted-foreground">Extra Large</p>
      </div>
    </div>
  ),
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: 'Different avatar sizes for various contexts in recipe applications.'
      }
    }
  }
};

// Special Chef Badges
export const ChefBadges: Story = {
  render: () => (
    <div className="flex items-center space-x-6">
      <div className="text-center">
        <div className="relative">
          <Avatar className="h-16 w-16">
            <AvatarImage src="https://picsum.photos/seed/chef-verified/200/200" alt="Verified Chef" />
            <AvatarFallback>VC</AvatarFallback>
          </Avatar>
          <div className="absolute -bottom-1 -right-1 bg-blue-500 rounded-full p-1">
            <User className="h-3 w-3 text-white" />
          </div>
        </div>
        <p className="mt-2 text-sm font-medium">Verified Chef</p>
        <p className="text-xs text-muted-foreground">Professional</p>
      </div>
      
      <div className="text-center">
        <div className="relative">
          <Avatar className="h-16 w-16">
            <AvatarImage src="https://picsum.photos/seed/chef-featured/200/200" alt="Featured Chef" />
            <AvatarFallback>FC</AvatarFallback>
          </Avatar>
          <div className="absolute -bottom-1 -right-1 bg-yellow-500 rounded-full p-1">
            <Star className="h-3 w-3 text-white" />
          </div>
        </div>
        <p className="mt-2 text-sm font-medium">Featured Chef</p>
        <p className="text-xs text-muted-foreground">Top Rated</p>
      </div>
      
      <div className="text-center">
        <div className="relative">
          <Avatar className="h-16 w-16">
            <AvatarImage src="https://picsum.photos/seed/chef-master/200/200" alt="Master Chef" />
            <AvatarFallback>MC</AvatarFallback>
          </Avatar>
          <div className="absolute -bottom-1 -right-1 bg-purple-500 rounded-full p-1">
            <Crown className="h-3 w-3 text-white" />
          </div>
        </div>
        <p className="mt-2 text-sm font-medium">Master Chef</p>
        <p className="text-xs text-muted-foreground">Expert Level</p>
      </div>
    </div>
  ),
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: 'Chef avatars with special badges indicating verification status, features, and expertise levels.'
      }
    }
  }
};