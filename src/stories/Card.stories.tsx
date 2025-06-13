import type { Meta, StoryObj } from '@storybook/react-vite';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Clock, Users, ChefHat, Star, Heart } from 'lucide-react';

const meta: Meta<typeof Card> = {
  title: 'Design System/Components/Card',
  component: Card,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A flexible card component that serves as a container for content. Perfect for displaying recipes, ingredients, and other structured content.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Card className="w-80">
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card description goes here</CardDescription>
      </CardHeader>
      <CardContent>
        <p>This is the main content area of the card.</p>
      </CardContent>
      <CardFooter>
        <Button>Action</Button>
      </CardFooter>
    </Card>
  ),
};

export const SimpleCard: Story = {
  render: () => (
    <Card className="w-80 p-6">
      <h3 className="text-lg font-semibold">Simple Card</h3>
      <p className="text-sm text-muted-foreground mt-2">
        A simple card with just content, no header or footer.
      </p>
    </Card>
  ),
  parameters: {
    docs: {
      description: {
        story: 'A minimal card with just content.',
      },
    },
  },
};

// Recipe-specific card examples
export const RecipeCard: Story = {
  render: () => (
    <Card className="w-80 overflow-hidden">
      <div className="aspect-video bg-gradient-to-br from-orange-100 to-amber-100 flex items-center justify-center">
        <ChefHat className="h-12 w-12 text-orange-600" />
      </div>
      <CardHeader>
        <CardTitle className="text-xl">Grandma's Apple Pie</CardTitle>
        <CardDescription>A classic comfort dessert perfect for any occasion</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>1h 30m</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            <span>8 servings</span>
          </div>
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-current text-yellow-500" />
            <span>4.8</span>
          </div>
        </div>
        <p className="text-sm">
          Traditional apple pie with a flaky, buttery crust and perfectly spiced apple filling.
        </p>
      </CardContent>
      <CardFooter className="gap-2">
        <Button className="flex-1">View Recipe</Button>
        <Button variant="outline" size="icon">
          <Heart className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  ),
  parameters: {
    docs: {
      description: {
        story: 'A recipe card with image placeholder, metadata, and actions.',
      },
    },
  },
};

export const IngredientCard: Story = {
  render: () => (
    <Card className="w-64">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Ingredients</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {[
          { name: 'All-purpose flour', amount: '2 cups' },
          { name: 'Butter', amount: '1/2 cup' },
          { name: 'Brown sugar', amount: '3/4 cup' },
          { name: 'Apples', amount: '6 medium' },
          { name: 'Cinnamon', amount: '1 tsp' },
        ].map((ingredient, index) => (
          <div key={index} className="flex justify-between text-sm">
            <span>{ingredient.name}</span>
            <span className="text-muted-foreground">{ingredient.amount}</span>
          </div>
        ))}
      </CardContent>
    </Card>
  ),
  parameters: {
    docs: {
      description: {
        story: 'A card specifically designed for displaying ingredient lists.',
      },
    },
  },
};

export const StepCard: Story = {
  render: () => (
    <Card className="w-96">
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
            3
          </div>
          Step 3
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm leading-relaxed">
          In a large bowl, combine the flour, baking powder, and salt. 
          In another bowl, cream together butter and sugar until light and fluffy. 
          Gradually add the wet ingredients to the dry ingredients.
        </p>
      </CardContent>
    </Card>
  ),
  parameters: {
    docs: {
      description: {
        story: 'A numbered step card for cooking instructions.',
      },
    },
  },
};

export const TipCard: Story = {
  render: () => (
    <Card className="w-80 border-amber-200 bg-amber-50">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg text-amber-800 flex items-center gap-2">
          💡 Chef's Tip
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-amber-700 leading-relaxed">
          For the flakiest crust, make sure your butter is very cold and work it into the flour 
          until you have pea-sized pieces. Don't overwork the dough!
        </p>
      </CardContent>
    </Card>
  ),
  parameters: {
    docs: {
      description: {
        story: 'A highlighted tip card with custom styling.',
      },
    },
  },
};

export const NutritionCard: Story = {
  render: () => (
    <Card className="w-72">
      <CardHeader>
        <CardTitle className="text-lg">Nutrition Facts</CardTitle>
        <CardDescription>Per serving</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <div className="font-medium">Calories</div>
            <div className="text-2xl font-bold">320</div>
          </div>
          <div>
            <div className="font-medium">Prep Time</div>
            <div className="text-2xl font-bold">15m</div>
          </div>
        </div>
        <div className="space-y-2 text-sm border-t pt-3">
          {[
            { label: 'Total Fat', value: '14g' },
            { label: 'Carbohydrates', value: '48g' },
            { label: 'Protein', value: '4g' },
            { label: 'Sodium', value: '220mg' },
          ].map((item, index) => (
            <div key={index} className="flex justify-between">
              <span>{item.label}</span>
              <span className="font-medium">{item.value}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  ),
  parameters: {
    docs: {
      description: {
        story: 'A nutrition facts card with structured data display.',
      },
    },
  },
};

// Card Layout Examples
export const CardGrid: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      <Card>
        <CardHeader>
          <CardTitle>Recipe Collection</CardTitle>
          <CardDescription>Breakfast favorites</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm">Start your day right with these delicious breakfast recipes.</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Quick Meals</CardTitle>
          <CardDescription>30 minutes or less</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm">Fast and easy recipes for busy weeknights.</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Desserts</CardTitle>
          <CardDescription>Sweet treats</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm">Indulgent desserts for special occasions.</p>
        </CardContent>
      </Card>
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: 'Cards arranged in a responsive grid layout.',
      },
    },
  },
};