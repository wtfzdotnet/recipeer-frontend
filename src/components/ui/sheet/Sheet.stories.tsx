import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Menu, Filter, ChefHat, Clock, Users, Star, ShoppingCart, Eye } from 'lucide-react';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './sheet';
import { Button } from '../../atoms/button';
import { Badge } from '../../atoms/badge';
import { Checkbox } from '../../atoms/checkbox';

const meta: Meta<typeof Sheet> = {
  title: 'Design System/Components/Feedback/Sheet',
  component: Sheet,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
# Sheet Component

Mobile-optimized slide-out panels for recipe details, filtering, and content organization.

## Features

- **Mobile-first**: Optimized for touch interactions and small screens
- **Recipe organization**: Full-screen recipe views and detailed information
- **Filtering interfaces**: Advanced search and filter panels
- **Kitchen-friendly**: Large touch targets and clear content hierarchy
- **Accessible**: Keyboard navigation and screen reader support

## Usage

Use sheets for:
- Mobile recipe detail views
- Advanced filtering and search options
- Shopping list management
- Meal planning interfaces
- Mobile settings and preferences
        `
      }
    }
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Sheet>;

// Mobile recipe details view
export const MobileRecipeDetails: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    
    return (
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button className="gap-2">
            <Eye className="h-4 w-4" />
            View Recipe
          </Button>
        </SheetTrigger>
        <SheetContent side="bottom" className="h-[90vh]">
          <SheetHeader>
            <SheetTitle className="flex items-center gap-2">
              <ChefHat className="h-5 w-5 text-orange-600" />
              Mediterranean Pasta Salad
            </SheetTitle>
            <SheetDescription>
              Fresh and flavorful pasta salad perfect for summer gatherings
            </SheetDescription>
          </SheetHeader>
          
          <div className="flex-1 overflow-y-auto py-4 space-y-6">
            {/* Recipe image */}
            <div className="aspect-video rounded-lg overflow-hidden">
              <img
                src="https://picsum.photos/seed/pasta-salad/800/450"
                alt="Mediterranean Pasta Salad"
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Recipe meta info */}
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="space-y-1">
                <Clock className="h-5 w-5 mx-auto text-blue-600" />
                <div className="text-sm font-medium">25 min</div>
                <div className="text-xs text-muted-foreground">Total time</div>
              </div>
              <div className="space-y-1">
                <Users className="h-5 w-5 mx-auto text-green-600" />
                <div className="text-sm font-medium">4 servings</div>
                <div className="text-xs text-muted-foreground">Serves</div>
              </div>
              <div className="space-y-1">
                <Star className="h-5 w-5 mx-auto text-yellow-600" />
                <div className="text-sm font-medium">4.8/5</div>
                <div className="text-xs text-muted-foreground">156 reviews</div>
              </div>
            </div>
            
            {/* Ingredients */}
            <div className="space-y-3">
              <h3 className="font-semibold">Ingredients</h3>
              <div className="space-y-2">
                {[
                  '2 cups cooked pasta',
                  '1 cup cherry tomatoes, halved',
                  '1/2 cup kalamata olives',
                  '1/2 cup feta cheese, crumbled',
                  '1/4 cup red onion, thinly sliced',
                  '3 tbsp olive oil',
                  '2 tbsp lemon juice',
                  'Fresh basil leaves'
                ].map((ingredient, index) => (
                  <div key={index} className="flex items-center gap-3 p-2 border rounded">
                    <Checkbox />
                    <span className="text-sm">{ingredient}</span>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Instructions */}
            <div className="space-y-3">
              <h3 className="font-semibold">Instructions</h3>
              <div className="space-y-3">
                {[
                  'Cook pasta according to package directions. Drain and cool.',
                  'In a large bowl, combine pasta, tomatoes, olives, and red onion.',
                  'Whisk together olive oil and lemon juice in a small bowl.',
                  'Pour dressing over pasta mixture and toss to combine.',
                  'Top with feta cheese and fresh basil before serving.'
                ].map((instruction, index) => (
                  <div key={index} className="flex gap-3 p-3 bg-muted rounded-lg">
                    <div className="flex-shrink-0 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-medium">
                      {index + 1}
                    </div>
                    <p className="text-sm">{instruction}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <SheetFooter>
            <Button className="w-full gap-2">
              <ShoppingCart className="h-4 w-4" />
              Add to Shopping List
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Full-screen mobile recipe view with ingredients checklist and instructions.'
      }
    }
  }
};

// Advanced filtering panel
export const FilteringPanel: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    const [filters] = useState({
      dietary: [],
      cookTime: '',
      difficulty: '',
      cuisine: []
    });
    
    return (
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="outline" className="gap-2">
            <Filter className="h-4 w-4" />
            Filter Recipes
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="w-full sm:max-w-md">
          <SheetHeader>
            <SheetTitle>Filter Recipes</SheetTitle>
            <SheetDescription>
              Find the perfect recipe for your needs
            </SheetDescription>
          </SheetHeader>
          
          <div className="py-6 space-y-6">
            {/* Dietary Restrictions */}
            <div className="space-y-3">
              <h3 className="font-medium">Dietary Restrictions</h3>
              <div className="space-y-2">
                {['Vegetarian', 'Vegan', 'Gluten-Free', 'Dairy-Free', 'Low-Carb', 'Keto'].map((diet) => (
                  <div key={diet} className="flex items-center space-x-2">
                    <Checkbox 
                      id={diet}
                      checked={filters.dietary.includes(diet)}
                    />
                    <label htmlFor={diet} className="text-sm">{diet}</label>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Cooking Time */}
            <div className="space-y-3">
              <h3 className="font-medium">Cooking Time</h3>
              <div className="space-y-2">
                {['Under 15 min', '15-30 min', '30-60 min', 'Over 1 hour'].map((time) => (
                  <div key={time} className="flex items-center space-x-2">
                    <Checkbox 
                      id={time}
                      checked={filters.cookTime === time}
                    />
                    <label htmlFor={time} className="text-sm">{time}</label>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Cuisine Type */}
            <div className="space-y-3">
              <h3 className="font-medium">Cuisine</h3>
              <div className="space-y-2">
                {['Italian', 'Mediterranean', 'Asian', 'Mexican', 'American', 'French'].map((cuisine) => (
                  <div key={cuisine} className="flex items-center space-x-2">
                    <Checkbox 
                      id={cuisine}
                      checked={filters.cuisine.includes(cuisine)}
                    />
                    <label htmlFor={cuisine} className="text-sm">{cuisine}</label>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Difficulty */}
            <div className="space-y-3">
              <h3 className="font-medium">Difficulty</h3>
              <div className="space-y-2">
                {['Easy', 'Medium', 'Hard'].map((level) => (
                  <div key={level} className="flex items-center space-x-2">
                    <Checkbox 
                      id={level}
                      checked={filters.difficulty === level}
                    />
                    <label htmlFor={level} className="text-sm">{level}</label>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <SheetFooter>
            <div className="flex gap-2 w-full">
              <Button variant="outline" className="flex-1">
                Clear All
              </Button>
              <SheetClose asChild>
                <Button className="flex-1">Apply Filters</Button>
              </SheetClose>
            </div>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Advanced filtering panel with multiple filter categories and options.'
      }
    }
  }
};

// Mobile menu navigation
export const MobileMenu: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    
    return (
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon">
            <Menu className="h-4 w-4" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <SheetHeader>
            <SheetTitle className="text-left">Recipeer Menu</SheetTitle>
            <SheetDescription className="text-left">
              Navigate through your cooking journey
            </SheetDescription>
          </SheetHeader>
          
          <div className="py-6 space-y-4">
            <nav className="space-y-2">
              <Button variant="ghost" className="w-full justify-start gap-2">
                <ChefHat className="h-4 w-4" />
                My Recipes
              </Button>
              <Button variant="ghost" className="w-full justify-start gap-2">
                <Star className="h-4 w-4" />
                Favorites
              </Button>
              <Button variant="ghost" className="w-full justify-start gap-2">
                <ShoppingCart className="h-4 w-4" />
                Shopping Lists
              </Button>
              <Button variant="ghost" className="w-full justify-start gap-2">
                <Users className="h-4 w-4" />
                Meal Plans
              </Button>
            </nav>
            
            <div className="border-t pt-4">
              <div className="space-y-2">
                <h4 className="text-sm font-medium text-muted-foreground px-3">Categories</h4>
                <Button variant="ghost" className="w-full justify-start text-sm">
                  Breakfast
                </Button>
                <Button variant="ghost" className="w-full justify-start text-sm">
                  Lunch
                </Button>
                <Button variant="ghost" className="w-full justify-start text-sm">
                  Dinner
                </Button>
                <Button variant="ghost" className="w-full justify-start text-sm">
                  Desserts
                </Button>
                <Button variant="ghost" className="w-full justify-start text-sm">
                  Snacks
                </Button>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Mobile navigation menu with main sections and recipe categories.'
      }
    }
  }
};

// Shopping list manager
export const ShoppingListManager: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    
    return (
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button className="gap-2">
            <ShoppingCart className="h-4 w-4" />
            Shopping List
          </Button>
        </SheetTrigger>
        <SheetContent side="right">
          <SheetHeader>
            <SheetTitle>Shopping List</SheetTitle>
            <SheetDescription>
              24 items from your meal plan
            </SheetDescription>
          </SheetHeader>
          
          <div className="py-6 space-y-4">
            {/* Shopping list categories */}
            <div className="space-y-4">
              <div className="space-y-2">
                <h4 className="font-medium text-sm text-muted-foreground">Produce</h4>
                {[
                  '2 lbs cherry tomatoes',
                  '1 bunch fresh basil',
                  '2 red onions',
                  '3 lemons'
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-3 p-2 border rounded">
                    <Checkbox />
                    <span className="text-sm flex-1">{item}</span>
                  </div>
                ))}
              </div>
              
              <div className="space-y-2">
                <h4 className="font-medium text-sm text-muted-foreground">Pantry</h4>
                {[
                  '2 boxes pasta',
                  '1 bottle olive oil',
                  '1 jar kalamata olives',
                  'Sea salt'
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-3 p-2 border rounded">
                    <Checkbox />
                    <span className="text-sm flex-1">{item}</span>
                  </div>
                ))}
              </div>
              
              <div className="space-y-2">
                <h4 className="font-medium text-sm text-muted-foreground">Dairy</h4>
                {[
                  '8 oz feta cheese',
                  '1 dozen eggs',
                  'Greek yogurt'
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-3 p-2 border rounded">
                    <Checkbox />
                    <span className="text-sm flex-1">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <SheetFooter>
            <Button variant="outline" className="w-full">
              Share List
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Shopping list management with categorized items and checkboxes.'
      }
    }
  }
};

// Default example
export const Default: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Open Sheet</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Recipe Sheet</SheetTitle>
          <SheetDescription>
            This is a basic sheet for recipe-related mobile interfaces.
          </SheetDescription>
        </SheetHeader>
        <div className="py-4">
          <p className="text-sm text-muted-foreground">
            Sheet content goes here. Perfect for mobile recipe details,
            filtering options, and cooking workflows.
          </p>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button>Close</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Basic sheet structure for mobile recipe interfaces.'
      }
    }
  }
};