import type { Meta, StoryObj } from '@storybook/react-vite';
import { Clock, Users, ChefHat, Star } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/Button';

const meta: Meta<typeof Card> = {
  title: 'Design System/Components/Layout/Card',
  component: Card,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
# Card Component

A versatile card component for displaying content in a structured format. Perfect for recipe cards, feature highlights, and content sections.

## Features

- **Compound Components**: Header, Content, Footer sections for flexible layouts
- **Consistent Styling**: Uses design system tokens for spacing and colors
- **Accessible**: Proper semantic structure and ARIA support
- **Responsive**: Adapts to different screen sizes

## Anatomy

- **Card**: The root container
- **CardHeader**: Top section for titles and descriptions
- **CardTitle**: Main heading within the header
- **CardDescription**: Subtitle or description text
- **CardContent**: Main content area
- **CardFooter**: Bottom section for actions or metadata
        `
      }
    }
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic variants
export const Default: Story = {
  render: () => (
    <Card className="w-80">
      <CardContent className="p-6">
        <p>This is a basic card with minimal content.</p>
      </CardContent>
    </Card>
  ),
};

export const WithHeader: Story = {
  render: () => (
    <Card className="w-80">
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card description goes here</CardDescription>
      </CardHeader>
      <CardContent>
        <p>This card includes a header with title and description.</p>
      </CardContent>
    </Card>
  ),
};

export const WithFooter: Story = {
  render: () => (
    <Card className="w-80">
      <CardHeader>
        <CardTitle>Complete Card</CardTitle>
        <CardDescription>This card has all sections</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Content section with meaningful information.</p>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full">Action</Button>
      </CardFooter>
    </Card>
  ),
};

// Recipe-specific examples
export const RecipeCard: Story = {
  render: () => (
    <Card className="w-80">
      <CardHeader>
        <CardTitle>Grandma's Apple Pie</CardTitle>
        <CardDescription>A classic homemade apple pie recipe</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
          <div className="flex items-center space-x-1">
            <Clock className="h-4 w-4" />
            <span>45 min</span>
          </div>
          <div className="flex items-center space-x-1">
            <Users className="h-4 w-4" />
            <span>8 servings</span>
          </div>
          <div className="flex items-center space-x-1">
            <ChefHat className="h-4 w-4" />
            <span>Medium</span>
          </div>
        </div>
        <p className="text-sm">
          A delicious traditional apple pie with a flaky crust and spiced apple filling. 
          Perfect for family gatherings and special occasions.
        </p>
        <div className="flex items-center space-x-1">
          <div className="flex">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star key={star} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            ))}
          </div>
          <span className="text-sm text-muted-foreground">(24 reviews)</span>
        </div>
      </CardContent>
      <CardFooter className="space-x-2">
        <Button variant="outline" className="flex-1">Save</Button>
        <Button className="flex-1">View Recipe</Button>
      </CardFooter>
    </Card>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Example recipe card showing how to structure recipe information with metadata and actions.'
      }
    }
  }
};

export const FeatureCard: Story = {
  render: () => (
    <Card className="w-80">
      <CardHeader className="text-center">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
          <ChefHat className="h-6 w-6 text-primary" />
        </div>
        <CardTitle>Smart Recipe Suggestions</CardTitle>
        <CardDescription>Get personalized recommendations based on your preferences</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2 text-sm">
          <li>• AI-powered ingredient matching</li>
          <li>• Dietary restriction filtering</li>
          <li>• Seasonal ingredient focus</li>
          <li>• Community ratings integration</li>
        </ul>
      </CardContent>
      <CardFooter>
        <Button className="w-full">Learn More</Button>
      </CardFooter>
    </Card>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Feature card example showing how to highlight product features or services.'
      }
    }
  }
};

export const StatsCard: Story = {
  render: () => (
    <Card className="w-80">
      <CardHeader className="pb-2">
        <CardDescription>Total Recipes</CardDescription>
        <CardTitle className="text-3xl">1,247</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-xs text-muted-foreground">
          +12% from last month
        </div>
      </CardContent>
    </Card>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Statistics card for dashboards and analytics display.'
      }
    }
  }
};

// Layout examples
export const CardGrid = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      <Card>
        <CardHeader>
          <CardTitle>Quick Breakfast</CardTitle>
          <CardDescription>5-minute recipes</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm">Perfect for busy mornings</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Healthy Lunch</CardTitle>
          <CardDescription>Nutritious options</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm">Balanced and delicious</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Family Dinner</CardTitle>
          <CardDescription>Crowd pleasers</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm">Recipes everyone will love</p>
        </CardContent>
      </Card>
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: 'Example of cards arranged in a responsive grid layout.'
      }
    }
  }
};