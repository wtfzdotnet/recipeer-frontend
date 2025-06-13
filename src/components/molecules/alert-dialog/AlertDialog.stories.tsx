import type { Meta, StoryObj } from '@storybook/react-vite';
import { AlertTriangle, Trash2, Heart, ShoppingCart, AlertCircle } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from './alert-dialog';
import { Button } from '../button/button';

const meta: Meta<typeof AlertDialog> = {
  title: 'Molecules/AlertDialog',
  component: AlertDialog,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
# Alert Dialog Component

Alert dialogs for critical confirmations, warnings, and safety information in recipe contexts.

## Features

- **Accessible**: Built with proper ARIA attributes and keyboard navigation
- **Critical actions**: For irreversible actions like deleting recipes or clearing data
- **Safety warnings**: Dietary restrictions, allergen alerts, and food safety notices
- **Mobile-optimized**: Large touch targets and clear messaging for kitchen environments
- **Keyboard navigation**: Full keyboard support with focus trapping

## Usage

Use alert dialogs for:
- Deleting recipes from meal plans or collections
- Allergen and dietary restriction warnings
- Clearing shopping lists or meal plans
- Food safety confirmations
- Account or data deletion warnings
        `
      }
    }
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof AlertDialog>;

// Delete recipe confirmation
export const DeleteRecipe: Story = {
  render: () => (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" className="gap-2">
          <Trash2 className="h-4 w-4" />
          Delete Recipe
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-2 text-red-600">
            <Trash2 className="h-5 w-5" />
            Delete "Mediterranean Pasta Salad"?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the recipe 
            from your collection and remove it from any meal plans that include it.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction className="bg-red-600 hover:bg-red-700">
            Delete Recipe
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Confirmation dialog for deleting recipes with clear warning about permanent action.'
      }
    }
  }
};

// Allergen warning
export const AllergenWarning: Story = {
  render: () => (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline" className="gap-2">
          <Heart className="h-4 w-4" />
          Save to Favorites
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-2 text-amber-600">
            <AlertTriangle className="h-5 w-5" />
            Allergen Warning
          </AlertDialogTitle>
          <AlertDialogDescription>
            This recipe contains ingredients that match your allergy profile:
            <ul className="mt-2 space-y-1 text-red-600 font-medium">
              <li>• Contains nuts (almonds)</li>
              <li>• Contains dairy (parmesan cheese)</li>
              <li>• May contain gluten (pasta)</li>
            </ul>
            <p className="mt-3 text-muted-foreground">
              Please review the full ingredient list and consider substitutions before saving.
            </p>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Review Ingredients</AlertDialogCancel>
          <AlertDialogAction className="bg-amber-600 hover:bg-amber-700">
            Save Anyway
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Warning dialog for recipes containing allergens from user profile.'
      }
    }
  }
};

// Clear meal plan confirmation
export const ClearMealPlan: Story = {
  render: () => (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline" className="gap-2">
          <Trash2 className="h-4 w-4" />
          Clear Meal Plan
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-orange-600" />
            Clear This Week's Meal Plan?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This will remove all 7 planned meals and their associated shopping list items. 
            You can always create a new meal plan, but this week's progress will be lost.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Keep Meal Plan</AlertDialogCancel>
          <AlertDialogAction>Clear Meal Plan</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Confirmation dialog for clearing meal plans with impact explanation.'
      }
    }
  }
};

// Clear shopping list confirmation
export const ClearShoppingList: Story = {
  render: () => (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline" className="gap-2">
          <ShoppingCart className="h-4 w-4" />
          Clear Shopping List
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5 text-blue-600" />
            Clear Shopping List?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This will remove all 24 items from your shopping list, including:
            <ul className="mt-2 space-y-1 text-sm">
              <li>• 12 ingredients from this week's meal plan</li>
              <li>• 8 pantry staples you added manually</li>
              <li>• 4 items from saved recipes</li>
            </ul>
            <p className="mt-3 text-muted-foreground">
              This action cannot be undone, but items will be regenerated from your meal plan.
            </p>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Keep List</AlertDialogCancel>
          <AlertDialogAction>Clear List</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Confirmation dialog for clearing shopping lists with detailed item breakdown.'
      }
    }
  }
};

// Dietary restriction warning
export const DietaryRestrictionWarning: Story = {
  render: () => (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline" className="gap-2">
          Add to Meal Plan
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-2 text-purple-600">
            <AlertTriangle className="h-5 w-5" />
            Dietary Restriction Notice
          </AlertDialogTitle>
          <AlertDialogDescription>
            This recipe may not align with your dietary preferences:
            <div className="mt-3 space-y-2">
              <div className="p-3 bg-purple-50 border border-purple-200 rounded-lg">
                <p className="text-sm font-medium text-purple-800">Your Profile: Vegetarian</p>
                <p className="text-sm text-purple-700">This recipe contains: Chicken, Beef stock</p>
              </div>
              <p className="text-sm text-muted-foreground">
                Would you like to explore vegetarian alternatives or proceed anyway?
              </p>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Find Alternatives</AlertDialogCancel>
          <AlertDialogAction>Add Anyway</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Warning dialog for recipes that conflict with dietary restrictions.'
      }
    }
  }
};

// Default example
export const Default: Story = {
  render: () => (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive">Delete</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Basic alert dialog structure for critical confirmations.'
      }
    }
  }
};