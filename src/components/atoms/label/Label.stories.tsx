import type { Meta, StoryObj } from '@storybook/react-vite';
import { Label } from './Label';

const meta: Meta<typeof Label> = {
  title: 'Atoms/Label',
  component: Label,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
# Label Component

An enhanced label component with required indicators and error states. Built for form accessibility and clear field identification in the recipe platform.

## Features

- **Accessibility** - Proper semantic labeling for screen readers
- **Required Indicators** - Clear visual cues for required fields
- **Error States** - Visual feedback for validation errors
- **Size Variants** - Small, default, and large sizes for different contexts
- **Recipe Context** - Optimized for cooking forms and ingredient lists

## Usage

Use for form field labels, ingredient lists, cooking step indicators, and accessibility compliance.
        `
      }
    }
  },
  argTypes: {
    children: {
      control: 'text',
      description: 'Label text content'
    },
    required: {
      control: 'boolean',
      description: 'Whether the field is required'
    },
    hasError: {
      control: 'boolean',
      description: 'Whether the field has an error'
    },
    size: {
      control: 'radio',
      options: ['sm', 'default', 'lg'],
      description: 'Size variant'
    }
  }
};

export default meta;
type Story = StoryObj<typeof Label>;

// Basic examples
export const Default: Story = {
  args: {
    children: 'Field Label',
  }
};

export const Required: Story = {
  args: {
    children: 'Required Field',
    required: true,
  }
};

export const WithError: Story = {
  args: {
    children: 'Field with Error',
    hasError: true,
  }
};

export const RequiredWithError: Story = {
  args: {
    children: 'Required Field with Error',
    required: true,
    hasError: true,
  }
};

// Size variants
export const SmallSize: Story = {
  args: {
    children: 'Small Label',
    size: 'sm',
  }
};

export const DefaultSize: Story = {
  args: {
    children: 'Default Label',
    size: 'default',
  }
};

export const LargeSize: Story = {
  args: {
    children: 'Large Label',
    size: 'lg',
  }
};

// Recipe-specific examples
export const RecipeFormLabels = {
  render: () => (
    <div className="space-y-6 w-80">
      <h3 className="text-lg font-semibold">Recipe Form Labels</h3>
      
      <div className="space-y-4">
        <div>
          <Label required>Recipe Name</Label>
          <p className="text-sm text-muted-foreground mt-1">
            Give your recipe a descriptive name
          </p>
        </div>
        
        <div>
          <Label required>Cuisine Type</Label>
          <p className="text-sm text-muted-foreground mt-1">
            Select the culinary tradition
          </p>
        </div>
        
        <div>
          <Label>Difficulty Level</Label>
          <p className="text-sm text-muted-foreground mt-1">
            How challenging is this recipe?
          </p>
        </div>
        
        <div>
          <Label required hasError>Cooking Time</Label>
          <p className="text-sm text-destructive mt-1">
            Please specify the total cooking time
          </p>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Labels used in recipe creation forms with various states.'
      }
    }
  }
};

export const IngredientLabels = {
  render: () => (
    <div className="space-y-6 w-80">
      <h3 className="text-lg font-semibold">Ingredient List</h3>
      
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Label size="sm">Main Ingredients</Label>
          <span className="text-xs text-muted-foreground">Required</span>
        </div>
        
        <div className="flex items-center justify-between">
          <Label size="sm">Seasonings & Spices</Label>
          <span className="text-xs text-muted-foreground">Optional</span>
        </div>
        
        <div className="flex items-center justify-between">
          <Label size="sm">Garnish & Toppings</Label>
          <span className="text-xs text-muted-foreground">Optional</span>
        </div>
        
        <div className="flex items-center justify-between">
          <Label size="sm" hasError>Allergen Information</Label>
          <span className="text-xs text-destructive">Missing</span>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Labels for ingredient categorization and allergen information.'
      }
    }
  }
};

export const CookingStepLabels = {
  render: () => (
    <div className="space-y-6 w-80">
      <h3 className="text-lg font-semibold">Cooking Steps</h3>
      
      <div className="space-y-4">
        <div className="border-l-4 border-primary pl-4">
          <Label size="lg">Step 1: Preparation</Label>
          <p className="text-sm text-muted-foreground mt-1">
            Gather and prepare all ingredients
          </p>
        </div>
        
        <div className="border-l-4 border-primary pl-4">
          <Label size="lg">Step 2: Cooking</Label>
          <p className="text-sm text-muted-foreground mt-1">
            Begin the main cooking process
          </p>
        </div>
        
        <div className="border-l-4 border-muted pl-4">
          <Label size="lg">Step 3: Finishing</Label>
          <p className="text-sm text-muted-foreground mt-1">
            Final touches and plating
          </p>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Labels for cooking instruction steps with visual progression.'
      }
    }
  }
};

export const NutritionalLabels = {
  render: () => (
    <div className="space-y-6 w-80">
      <h3 className="text-lg font-semibold">Nutritional Information</h3>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label size="sm">Calories</Label>
          <p className="text-lg font-semibold">320 kcal</p>
        </div>
        
        <div>
          <Label size="sm">Protein</Label>
          <p className="text-lg font-semibold">25g</p>
        </div>
        
        <div>
          <Label size="sm">Carbohydrates</Label>
          <p className="text-lg font-semibold">30g</p>
        </div>
        
        <div>
          <Label size="sm">Fat</Label>
          <p className="text-lg font-semibold">12g</p>
        </div>
        
        <div>
          <Label size="sm">Fiber</Label>
          <p className="text-lg font-semibold">8g</p>
        </div>
        
        <div>
          <Label size="sm">Sodium</Label>
          <p className="text-lg font-semibold">450mg</p>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Labels for displaying nutritional information in recipe cards.'
      }
    }
  }
};

export const AccessibilityLabels = {
  render: () => (
    <div className="space-y-6 w-80">
      <h3 className="text-lg font-semibold">Accessibility Features</h3>
      
      <div className="space-y-4">
        <div>
          <Label htmlFor="screen-reader">Screen Reader Optimized</Label>
          <p className="text-sm text-muted-foreground mt-1" id="screen-reader">
            Recipe instructions are formatted for screen reading software
          </p>
        </div>
        
        <div>
          <Label htmlFor="high-contrast" hasError>High Contrast Mode</Label>
          <p className="text-sm text-destructive mt-1" id="high-contrast">
            Enable high contrast colors for better visibility
          </p>
        </div>
        
        <div>
          <Label htmlFor="voice-nav" required>Voice Navigation</Label>
          <p className="text-sm text-muted-foreground mt-1" id="voice-nav">
            Hands-free cooking assistance with voice commands
          </p>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Labels demonstrating accessibility features and ARIA compliance.'
      }
    }
  }
};