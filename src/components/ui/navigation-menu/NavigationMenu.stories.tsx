import type { Meta, StoryObj } from '@storybook/react-vite';
import { 
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport
} from './navigation-menu';
import { ChefHat, Search, User, Heart, Clock, Utensils } from 'lucide-react';
import { Button } from '@/components/Button';

const meta: Meta<typeof NavigationMenu> = {
  title: 'Design System/Components/Navigation/Navigation Menu',
  component: NavigationMenu,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
# Navigation Menu Component

A comprehensive navigation menu component built on Radix UI Navigation Menu primitive. Perfect for recipe websites with complex category hierarchies and multiple navigation sections.

## Features

- **Accessible**: Built on Radix UI with full keyboard navigation
- **Responsive**: Works seamlessly across devices
- **Recipe-Focused**: Designed for food and cooking categories
- **Flexible**: Support for multi-level navigation with content panels
- **Customizable**: Easy to style and extend

## Recipe Platform Context

Perfect for organizing:
- Recipe categories (Italian, Asian, Mexican, etc.)
- Meal types (Breakfast, Lunch, Dinner, Snacks)
- Dietary restrictions (Vegetarian, Vegan, Gluten-free, etc.)
- Cooking methods (Baking, Grilling, Slow Cooking, etc.)
- User sections (Profile, Favorites, Meal Plans)

## Use Cases

- Main site navigation
- Category browsing
- Recipe discovery
- User account navigation
        `
      }
    }
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic Navigation Menu
export const Default: Story = {
  render: () => (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuLink className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50">
            Home
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50">
            Recipes
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50">
            About
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Basic navigation menu with simple links for recipe website navigation.'
      }
    }
  }
};

// Recipe Categories Navigation with Dropdowns
export const RecipeCategories: Story = {
  render: () => (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="flex items-center gap-2">
            <ChefHat className="h-4 w-4" />
            Cuisines
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <div className="row-span-3">
                <NavigationMenuLink asChild>
                  <div className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-orange-50 to-orange-100 p-6 no-underline outline-none focus:shadow-md">
                    <ChefHat className="h-6 w-6 text-orange-600" />
                    <div className="mb-2 mt-4 text-lg font-medium text-orange-900">
                      World Cuisines
                    </div>
                    <p className="text-sm leading-tight text-orange-700">
                      Explore authentic recipes from around the globe
                    </p>
                  </div>
                </NavigationMenuLink>
              </div>
              <NavigationMenuLink className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                <div className="text-sm font-medium leading-none">Italian</div>
                <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                  Pasta, pizza, risotto, and traditional Italian favorites
                </p>
              </NavigationMenuLink>
              <NavigationMenuLink className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                <div className="text-sm font-medium leading-none">Asian</div>
                <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                  Stir-fries, curries, sushi, and pan-Asian dishes
                </p>
              </NavigationMenuLink>
              <NavigationMenuLink className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                <div className="text-sm font-medium leading-none">Mexican</div>
                <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                  Tacos, enchiladas, salsas, and authentic Mexican cuisine
                </p>
              </NavigationMenuLink>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            Meal Types
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="grid w-[400px] gap-3 p-4 md:grid-cols-2">
              <NavigationMenuLink className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                <div className="text-sm font-medium leading-none">Breakfast</div>
                <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                  Start your day with delicious morning meals
                </p>
              </NavigationMenuLink>
              <NavigationMenuLink className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                <div className="text-sm font-medium leading-none">Lunch</div>
                <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                  Satisfying midday meals and quick bites
                </p>
              </NavigationMenuLink>
              <NavigationMenuLink className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                <div className="text-sm font-medium leading-none">Dinner</div>
                <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                  Hearty evening meals for the whole family
                </p>
              </NavigationMenuLink>
              <NavigationMenuLink className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                <div className="text-sm font-medium leading-none">Snacks</div>
                <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                  Quick bites and appetizers for any time
                </p>
              </NavigationMenuLink>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger className="flex items-center gap-2">
            <Utensils className="h-4 w-4" />
            Diet
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="w-[300px] gap-3 p-4">
              <div className="grid gap-2">
                <NavigationMenuLink className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                  <div className="text-sm font-medium leading-none">Vegetarian</div>
                  <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                    Plant-based recipes without meat
                  </p>
                </NavigationMenuLink>
                <NavigationMenuLink className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                  <div className="text-sm font-medium leading-none">Vegan</div>
                  <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                    Completely plant-based recipes
                  </p>
                </NavigationMenuLink>
                <NavigationMenuLink className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                  <div className="text-sm font-medium leading-none">Gluten-Free</div>
                  <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                    Recipes safe for gluten sensitivities
                  </p>
                </NavigationMenuLink>
                <NavigationMenuLink className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                  <div className="text-sm font-medium leading-none">Keto</div>
                  <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                    Low-carb, high-fat ketogenic recipes
                  </p>
                </NavigationMenuLink>
              </div>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuLink className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50 flex items-center gap-2">
            <Search className="h-4 w-4" />
            Search
          </NavigationMenuLink>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuLink className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50 flex items-center gap-2">
            <Heart className="h-4 w-4" />
            Favorites
          </NavigationMenuLink>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuLink className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50 flex items-center gap-2">
            <User className="h-4 w-4" />
            Profile
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  ),
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: 'Comprehensive recipe website navigation with categorized dropdowns for cuisines, meal types, and dietary preferences.'
      }
    }
  }
};