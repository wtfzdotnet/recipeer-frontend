import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from './table';
import { Badge } from '../badge';

const meta: Meta<typeof Table> = {
  title: 'Design System/Components/Data Display/Table',
  component: Table,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
# Table Component

A comprehensive table component system for displaying structured data in recipe platforms, including nutritional information, ingredient measurements, and cooking analytics.

## Features

- **Responsive Design**: Automatically handles overflow with horizontal scrolling
- **Accessibility**: Proper semantic structure with headers and captions
- **Hover States**: Visual feedback for row interactions
- **Flexible Layout**: Supports headers, footers, and captions
- **Cultural Formatting**: Supports international number formats and units

## Use Cases

- **Nutritional Information**: Per-serving nutritional data with daily values
- **Ingredient Measurements**: Conversion tables for different serving sizes
- **Recipe Analytics**: Cooking times, difficulty ratings, popularity metrics
- **Comparison Tables**: Side-by-side recipe comparisons
- **Cooking Progress**: Step-by-step progress tracking
        `
      }
    }
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Table>;

// Basic table
export const Default: Story = {
  render: () => (
    <Table>
      <TableCaption>A list of recent recipe uploads</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Recipe</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Method</TableHead>
          <TableHead className="text-right">Prep Time</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell className="font-medium">Pasta Carbonara</TableCell>
          <TableCell>Published</TableCell>
          <TableCell>Stovetop</TableCell>
          <TableCell className="text-right">15 min</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">Chocolate Cake</TableCell>
          <TableCell>Draft</TableCell>
          <TableCell>Oven</TableCell>
          <TableCell className="text-right">30 min</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">Caesar Salad</TableCell>
          <TableCell>Published</TableCell>
          <TableCell>No-Cook</TableCell>
          <TableCell className="text-right">10 min</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ),
};

// Nutritional information table
export const NutritionalInformation: Story = {
  render: () => (
    <div className="max-w-md">
      <Table>
        <TableCaption>Nutritional information per serving</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Nutrient</TableHead>
            <TableHead className="text-right">Amount</TableHead>
            <TableHead className="text-right">% Daily Value</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">Calories</TableCell>
            <TableCell className="text-right">425</TableCell>
            <TableCell className="text-right">21%</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Total Fat</TableCell>
            <TableCell className="text-right">18g</TableCell>
            <TableCell className="text-right">23%</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Saturated Fat</TableCell>
            <TableCell className="text-right">8g</TableCell>
            <TableCell className="text-right">40%</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Cholesterol</TableCell>
            <TableCell className="text-right">95mg</TableCell>
            <TableCell className="text-right">32%</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Sodium</TableCell>
            <TableCell className="text-right">650mg</TableCell>
            <TableCell className="text-right">28%</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Total Carbs</TableCell>
            <TableCell className="text-right">42g</TableCell>
            <TableCell className="text-right">15%</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Protein</TableCell>
            <TableCell className="text-right">18g</TableCell>
            <TableCell className="text-right">36%</TableCell>
          </TableRow>
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={2}>Total Daily Values</TableCell>
            <TableCell className="text-right">Based on 2000 calorie diet</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Nutritional facts table showing per-serving data with daily value percentages, ideal for recipe detail pages.'
      }
    }
  }
};

// Ingredient conversion table
export const IngredientConversions: Story = {
  render: () => (
    <div className="max-w-lg">
      <Table>
        <TableCaption>Ingredient measurements for different serving sizes</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Ingredient</TableHead>
            <TableHead className="text-center">2 servings</TableHead>
            <TableHead className="text-center">4 servings</TableHead>
            <TableHead className="text-center">6 servings</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">Pasta</TableCell>
            <TableCell className="text-center">200g</TableCell>
            <TableCell className="text-center">400g</TableCell>
            <TableCell className="text-center">600g</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Eggs</TableCell>
            <TableCell className="text-center">2 large</TableCell>
            <TableCell className="text-center">4 large</TableCell>
            <TableCell className="text-center">6 large</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Pancetta</TableCell>
            <TableCell className="text-center">100g</TableCell>
            <TableCell className="text-center">200g</TableCell>
            <TableCell className="text-center">300g</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Parmesan</TableCell>
            <TableCell className="text-center">50g</TableCell>
            <TableCell className="text-center">100g</TableCell>
            <TableCell className="text-center">150g</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Black Pepper</TableCell>
            <TableCell className="text-center">1/4 tsp</TableCell>
            <TableCell className="text-center">1/2 tsp</TableCell>
            <TableCell className="text-center">3/4 tsp</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Ingredient conversion table showing measurements scaled for different serving sizes.'
      }
    }
  }
};

// Recipe comparison table
export const RecipeComparison: Story = {
  render: () => (
    <div className="max-w-4xl">
      <Table>
        <TableCaption>Comparison of pasta recipes</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Recipe</TableHead>
            <TableHead>Difficulty</TableHead>
            <TableHead>Prep Time</TableHead>
            <TableHead>Cook Time</TableHead>
            <TableHead>Servings</TableHead>
            <TableHead>Rating</TableHead>
            <TableHead>Dietary</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">Pasta Carbonara</TableCell>
            <TableCell>
              <Badge variant="warning" size="sm">Medium</Badge>
            </TableCell>
            <TableCell>10 min</TableCell>
            <TableCell>15 min</TableCell>
            <TableCell>4</TableCell>
            <TableCell>4.8/5</TableCell>
            <TableCell>
              <Badge variant="warning" size="sm">Contains Eggs</Badge>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Aglio e Olio</TableCell>
            <TableCell>
              <Badge variant="success" size="sm">Easy</Badge>
            </TableCell>
            <TableCell>5 min</TableCell>
            <TableCell>12 min</TableCell>
            <TableCell>4</TableCell>
            <TableCell>4.5/5</TableCell>
            <TableCell>
              <Badge variant="dietary" size="sm">Vegetarian</Badge>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Pasta Puttanesca</TableCell>
            <TableCell>
              <Badge variant="success" size="sm">Easy</Badge>
            </TableCell>
            <TableCell>15 min</TableCell>
            <TableCell>20 min</TableCell>
            <TableCell>4</TableCell>
            <TableCell>4.6/5</TableCell>
            <TableCell>
              <Badge variant="dietary" size="sm">Dairy-Free</Badge>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Cacio e Pepe</TableCell>
            <TableCell>
              <Badge variant="destructive" size="sm">Hard</Badge>
            </TableCell>
            <TableCell>5 min</TableCell>
            <TableCell>10 min</TableCell>
            <TableCell>2</TableCell>
            <TableCell>4.9/5</TableCell>
            <TableCell>
              <Badge variant="dietary" size="sm">Vegetarian</Badge>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: 'Recipe comparison table with badges for difficulty levels and dietary restrictions.'
      }
    }
  }
};

// Cultural formatting example
export const CulturalFormatting: Story = {
  render: () => (
    <div className="max-w-md">
      <Table>
        <TableCaption>International measurement conversions</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Ingredient</TableHead>
            <TableHead>Metric</TableHead>
            <TableHead>Imperial</TableHead>
            <TableHead>Japanese</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">Flour</TableCell>
            <TableCell>250g</TableCell>
            <TableCell>2 cups</TableCell>
            <TableCell>250ml</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Sugar</TableCell>
            <TableCell>200g</TableCell>
            <TableCell>1 cup</TableCell>
            <TableCell>200ml</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Butter</TableCell>
            <TableCell>115g</TableCell>
            <TableCell>1/2 cup</TableCell>
            <TableCell>115g</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Milk</TableCell>
            <TableCell>240ml</TableCell>
            <TableCell>1 cup</TableCell>
            <TableCell>1合 (gō)</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Table showing cultural data formatting for international measurement systems.'
      }
    }
  }
};

// Mobile responsive example
export const ResponsiveDesign: Story = {
  render: () => (
    <div className="w-full max-w-sm mx-auto">
      <Table>
        <TableCaption>Recipe quick facts (mobile view)</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Metric</TableHead>
            <TableHead className="text-right">Value</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">Prep Time</TableCell>
            <TableCell className="text-right">15 min</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Cook Time</TableCell>
            <TableCell className="text-right">20 min</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Total Time</TableCell>
            <TableCell className="text-right">35 min</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Servings</TableCell>
            <TableCell className="text-right">4 people</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Difficulty</TableCell>
            <TableCell className="text-right">
              <Badge variant="warning" size="sm">Medium</Badge>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Rating</TableCell>
            <TableCell className="text-right">4.8/5 ⭐</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Mobile-optimized table layout showing key recipe information in a compact format.'
      }
    }
  }
};