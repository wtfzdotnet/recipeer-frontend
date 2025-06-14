import type { Meta, StoryObj } from '@storybook/react-vite';
import { Info, ChefHat, Clock, Lightbulb, Scale, Utensils } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from './popover';
import { Button } from '../../atoms/button';
import { Badge } from '../../atoms/badge';

const meta: Meta<typeof Popover> = {
  title: 'Molecules/Popover',
  component: Popover,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
# Popover Component

Contextual information display for ingredients, cooking tips, and recipe details.

## Features

- **Contextual information**: Rich details about ingredients, techniques, and cooking tips
- **Non-blocking**: Provides information without interrupting the cooking flow
- **Recipe-focused**: Optimized for ingredient details, nutritional info, and cooking guidance
- **Mobile-friendly**: Responsive design with appropriate sizing for different devices
- **Accessible**: Keyboard navigation and screen reader support

## Usage

Use popovers for:
- Ingredient substitutions and nutritional information
- Cooking technique explanations
- Equipment descriptions and alternatives
- Cultural context for dishes
- Step-by-step guidance details
        `
      }
    }
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Popover>;

// Ingredient information popover
export const IngredientInfo: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" className="h-auto p-1 text-blue-600 underline">
          2 cups arborio rice
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <ChefHat className="h-4 w-4 text-orange-600" />
            <h4 className="font-semibold">Arborio Rice</h4>
          </div>
          <div className="space-y-2 text-sm">
            <p className="text-muted-foreground">
              Short-grain rice from Italy, essential for creamy risotto. High starch content creates the characteristic texture.
            </p>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="bg-muted p-2 rounded">
                <div className="font-medium">Nutrition (per cup)</div>
                <div>Calories: 242</div>
                <div>Carbs: 53g</div>
                <div>Protein: 4.4g</div>
              </div>
              <div className="bg-muted p-2 rounded">
                <div className="font-medium">Substitutes</div>
                <div>• Carnaroli rice</div>
                <div>• Bomba rice</div>
                <div>• Short-grain brown rice</div>
              </div>
            </div>
            <div className="flex flex-wrap gap-1">
              <Badge variant="secondary">Gluten-free</Badge>
              <Badge variant="secondary">Vegetarian</Badge>
              <Badge variant="secondary">Vegan</Badge>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Detailed ingredient information including nutrition, substitutes, and dietary tags.'
      }
    }
  }
};

// Cooking technique tip
export const CookingTip: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" className="h-auto p-1 text-green-600 gap-1">
          <Lightbulb className="h-3 w-3" />
          sauté until translucent
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-72">
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Lightbulb className="h-4 w-4 text-green-600" />
            <h4 className="font-semibold">Cooking Tip: Sautéing Onions</h4>
          </div>
          <div className="space-y-2 text-sm">
            <p className="text-muted-foreground">
              "Translucent" means the onions lose their opaque white color and become see-through while remaining soft.
            </p>
            <div className="bg-green-50 border border-green-200 p-3 rounded-lg">
              <div className="font-medium text-green-800 mb-1">Pro Tips:</div>
              <ul className="text-green-700 text-xs space-y-1">
                <li>• Medium heat prevents burning</li>
                <li>• Takes about 3-5 minutes</li>
                <li>• Stir occasionally for even cooking</li>
                <li>• Add pinch of salt to speed process</li>
              </ul>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Clock className="h-3 w-3" />
              Estimated time: 3-5 minutes
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Contextual cooking tips and technique explanations for recipe steps.'
      }
    }
  }
};

// Equipment information
export const EquipmentInfo: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" className="h-auto p-1 text-purple-600 gap-1">
          <Utensils className="h-3 w-3" />
          Dutch oven
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Utensils className="h-4 w-4 text-purple-600" />
            <h4 className="font-semibold">Dutch Oven</h4>
          </div>
          <div className="space-y-2 text-sm">
            <p className="text-muted-foreground">
              Heavy-duty pot with tight-fitting lid, perfect for braising, stewing, and baking bread.
            </p>
            <div className="grid grid-cols-1 gap-2">
              <div className="bg-purple-50 border border-purple-200 p-3 rounded-lg">
                <div className="font-medium text-purple-800 mb-1">Key Features:</div>
                <ul className="text-purple-700 text-xs space-y-1">
                  <li>• Cast iron or ceramic construction</li>
                  <li>• Excellent heat retention</li>
                  <li>• Oven-safe to 500°F+</li>
                  <li>• Even heat distribution</li>
                </ul>
              </div>
              <div className="bg-muted p-2 rounded">
                <div className="font-medium text-xs mb-1">Alternatives:</div>
                <div className="text-xs text-muted-foreground">
                  Heavy-bottomed pot with oven-safe lid, slow cooker (adjusted timing), or large saucepan
                </div>
              </div>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Equipment descriptions with features and suitable alternatives.'
      }
    }
  }
};

// Measurement conversion
export const MeasurementConversion: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" className="h-auto p-1 text-blue-600 gap-1">
          <Scale className="h-3 w-3" />
          1/4 cup
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64">
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Scale className="h-4 w-4 text-blue-600" />
            <h4 className="font-semibold">1/4 Cup Conversions</h4>
          </div>
          <div className="space-y-2 text-sm">
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="space-y-1">
                <div className="font-medium">Volume</div>
                <div>4 tablespoons</div>
                <div>12 teaspoons</div>
                <div>60 ml</div>
                <div>2 fl oz</div>
              </div>
              <div className="space-y-1">
                <div className="font-medium">Weight (approx.)</div>
                <div>60g (water)</div>
                <div>50g (flour)</div>
                <div>55g (sugar)</div>
                <div>57g (butter)</div>
              </div>
            </div>
            <div className="bg-blue-50 border border-blue-200 p-2 rounded text-xs">
              <div className="font-medium text-blue-800">Quick Reference:</div>
              <div className="text-blue-700">1/4 cup = 4 Tbsp = 60ml</div>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Measurement conversions between different unit systems.'
      }
    }
  }
};

// Cultural context
export const CulturalContext: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" className="h-auto p-1 text-orange-600 gap-1">
          <Info className="h-3 w-3" />
          Risotto Milanese
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Info className="h-4 w-4 text-orange-600" />
            <h4 className="font-semibold">Risotto alla Milanese</h4>
          </div>
          <div className="space-y-2 text-sm">
            <p className="text-muted-foreground">
              Traditional dish from Milan (Lombardy), Italy. The golden color comes from saffron, 
              making it one of the most luxurious rice dishes in Italian cuisine.
            </p>
            <div className="bg-orange-50 border border-orange-200 p-3 rounded-lg">
              <div className="font-medium text-orange-800 mb-1">Cultural Notes:</div>
              <ul className="text-orange-700 text-xs space-y-1">
                <li>• Often served with osso buco (braised veal shanks)</li>
                <li>• Saffron was introduced by Arab traders</li>
                <li>• Perfect "all'onda" texture means "like waves"</li>
                <li>• Never add cheese until the end</li>
              </ul>
            </div>
            <div className="flex flex-wrap gap-1">
              <Badge variant="outline">Northern Italian</Badge>
              <Badge variant="outline">Traditional</Badge>
              <Badge variant="outline">Vegetarian option</Badge>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Cultural context and historical background for traditional dishes.'
      }
    }
  }
};

// Default example
export const Default: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Open Popover</Button>
      </PopoverTrigger>
      <PopoverContent>
        <div className="space-y-2">
          <h4 className="font-medium">Recipe Information</h4>
          <p className="text-sm text-muted-foreground">
            This is a basic popover for displaying contextual recipe information.
          </p>
        </div>
      </PopoverContent>
    </Popover>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Basic popover structure for recipe-related information.'
      }
    }
  }
};