import type { Meta, StoryObj } from '@storybook/react-vite';
import { Clock, Users, ChefHat, Star, Heart, Share2, Bookmark, Tag } from 'lucide-react';
import { Button } from '../../components/Button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../../components/ui/card';
import { Alert, AlertDescription } from '../../components/ui/alert';

const meta: Meta = {
  title: 'Design System/Patterns/Recipe Card',
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
# Recipe Card Pattern

A comprehensive recipe card pattern that showcases how multiple design system components work together to create engaging recipe displays.

## Components Used

- **Card** - Main container structure
- **Button** - Action buttons with icons
- **Alert** - Special dietary information
- **Typography** - Structured content hierarchy
- **Icons** - Visual indicators for metadata

## Features

- **Recipe Metadata** - Cook time, servings, difficulty level
- **Rating System** - Star ratings and review counts
- **Action Buttons** - Save, share, and view actions
- **Dietary Alerts** - Allergen and dietary restriction warnings
- **Responsive Layout** - Adapts to different screen sizes
- **Visual Hierarchy** - Clear content organization

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
};

export default meta;

const RecipeMetadata = ({ time, servings, difficulty }: { time: string; servings: string; difficulty: string }) => (
  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
    <div className="flex items-center space-x-1">
      <Clock className="h-4 w-4" />
      <span>{time}</span>
    </div>
    <div className="flex items-center space-x-1">
      <Users className="h-4 w-4" />
      <span>{servings}</span>
    </div>
    <div className="flex items-center space-x-1">
      <ChefHat className="h-4 w-4" />
      <span>{difficulty}</span>
    </div>
  </div>
);

const StarRating = ({ rating, reviewCount }: { rating: number; reviewCount: number }) => (
  <div className="flex items-center space-x-1">
    <div className="flex">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star 
          key={star} 
          className={`h-4 w-4 ${star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
        />
      ))}
    </div>
    <span className="text-sm text-muted-foreground">({reviewCount})</span>
  </div>
);

export const BasicRecipeCard = {
  render: () => (
    <Card className="w-80">
      <CardHeader>
        <CardTitle>Grandma's Apple Pie</CardTitle>
        <CardDescription>A classic homemade apple pie with flaky crust</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <RecipeMetadata time="2h 15min" servings="8 slices" difficulty="Medium" />
        <p className="text-sm">
          This traditional apple pie recipe has been passed down through generations. 
          Features a buttery, flaky crust and perfectly spiced apple filling.
        </p>
        <StarRating rating={5} reviewCount={42} />
      </CardContent>
      <CardFooter className="space-x-2">
        <Button variant="outline" size="sm" className="flex-1">
          <Heart className="h-4 w-4 mr-2" />
          Save
        </Button>
        <Button size="sm" className="flex-1">
          View Recipe
        </Button>
      </CardFooter>
    </Card>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Basic recipe card with essential information and actions.'
      }
    }
  }
};

export const RecipeCardWithAlert = {
  render: () => (
    <Card className="w-80">
      <CardHeader>
        <CardTitle>Chocolate Peanut Brownies</CardTitle>
        <CardDescription>Rich, fudgy brownies with peanut butter swirl</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Alert variant="warning">
          <Tag className="h-4 w-4" />
          <AlertDescription>
            Contains nuts and gluten. Check allergen information.
          </AlertDescription>
        </Alert>
        <RecipeMetadata time="45min" servings="16 pieces" difficulty="Easy" />
        <p className="text-sm">
          Decadent brownies with a perfect balance of chocolate and peanut butter. 
          These are always a hit at parties and family gatherings.
        </p>
        <StarRating rating={4} reviewCount={28} />
      </CardContent>
      <CardFooter className="space-x-2">
        <Button variant="outline" size="sm">
          <Heart className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="sm">
          <Share2 className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="sm">
          <Bookmark className="h-4 w-4" />
        </Button>
        <Button size="sm" className="flex-1">
          Cook Now
        </Button>
      </CardFooter>
    </Card>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Recipe card with allergen alert and multiple action buttons.'
      }
    }
  }
};

export const FeaturedRecipeCard = {
  render: () => (
    <Card className="w-80">
      <div className="relative">
        <div className="h-48 bg-gradient-to-br from-orange-200 to-red-200 rounded-t-lg flex items-center justify-center">
          <span className="text-6xl">🍝</span>
        </div>
        <div className="absolute top-3 right-3">
          <div className="bg-green-500 text-white text-xs px-2 py-1 rounded-full font-medium">
            FEATURED
          </div>
        </div>
      </div>
      <CardHeader>
        <CardTitle>Authentic Spaghetti Carbonara</CardTitle>
        <CardDescription>Traditional Roman pasta dish with eggs, cheese, and pancetta</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <RecipeMetadata time="20min" servings="4 people" difficulty="Medium" />
        <p className="text-sm">
          Learn to make authentic carbonara the traditional way - no cream needed! 
          This recipe uses the classic technique for silky, creamy results.
        </p>
        <StarRating rating={5} reviewCount={156} />
        <div className="flex flex-wrap gap-1">
          <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">Italian</span>
          <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">Pasta</span>
          <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">Quick</span>
        </div>
      </CardContent>
      <CardFooter className="space-x-2">
        <Button variant="outline" size="sm" className="flex-1">
          <Heart className="h-4 w-4 mr-2" />
          Save
        </Button>
        <Button size="sm" className="flex-1">
          Start Cooking
        </Button>
      </CardFooter>
    </Card>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Featured recipe card with image placeholder, tags, and enhanced styling.'
      }
    }
  }
};

export const CompactRecipeCard = {
  render: () => (
    <Card className="w-64">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Quick Omelette</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <RecipeMetadata time="5min" servings="1" difficulty="Easy" />
        <StarRating rating={4} reviewCount={12} />
      </CardContent>
      <CardFooter>
        <Button size="sm" className="w-full">View Recipe</Button>
      </CardFooter>
    </Card>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Compact recipe card for sidebar or grid layouts.'
      }
    }
  }
};

export const RecipeCardGrid = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6 max-w-6xl">
      <Card>
        <CardHeader>
          <CardTitle>Chocolate Chip Cookies</CardTitle>
          <CardDescription>Classic homemade cookies</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <RecipeMetadata time="30min" servings="24 cookies" difficulty="Easy" />
          <StarRating rating={5} reviewCount={89} />
        </CardContent>
        <CardFooter>
          <Button size="sm" className="w-full">View Recipe</Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Beef Stir Fry</CardTitle>
          <CardDescription>Quick and healthy dinner option</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert variant="info">
            <AlertDescription>High protein, low carb</AlertDescription>
          </Alert>
          <RecipeMetadata time="15min" servings="4 people" difficulty="Easy" />
          <StarRating rating={4} reviewCount={34} />
        </CardContent>
        <CardFooter>
          <Button size="sm" className="w-full">View Recipe</Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Homemade Pizza</CardTitle>
          <CardDescription>From scratch pizza dough and sauce</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <RecipeMetadata time="3h" servings="2 pizzas" difficulty="Hard" />
          <StarRating rating={5} reviewCount={67} />
        </CardContent>
        <CardFooter>
          <Button size="sm" className="w-full">View Recipe</Button>
        </CardFooter>
      </Card>
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: 'Recipe cards arranged in a responsive grid layout.'
      }
    }
  }
};