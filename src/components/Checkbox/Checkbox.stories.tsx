import type { Meta, StoryObj } from '@storybook/react-vite';
import { Checkbox } from './Checkbox';

const meta: Meta<typeof Checkbox> = {
  title: 'Design System/Components/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
# Checkbox Component

An enhanced checkbox component with label, error handling, and accessibility features. Built for dietary filters, ingredient selections, and user preferences.

## Features

- **Accessibility** - Full ARIA support and keyboard navigation
- **Recipe Context** - Optimized for dietary filters and ingredient selections
- **Error Handling** - Clear validation states and helper text
- **Mobile Friendly** - Large touch targets for mobile use
- **Cultural Support** - Flexible labeling for international dietary restrictions

## Usage

Use for multiple dietary filters, ingredient selections, cooking preferences, and feature toggles.
        `
      }
    }
  },
  argTypes: {
    label: {
      control: 'text',
      description: 'Label text for the checkbox'
    },
    error: {
      control: 'text',
      description: 'Error message to display'
    },
    helperText: {
      control: 'text',
      description: 'Helper text to guide users'
    },
    checked: {
      control: 'boolean',
      description: 'Whether the checkbox is checked'
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the checkbox is disabled'
    },
    required: {
      control: 'boolean',
      description: 'Whether the field is required'
    }
  }
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

// Basic examples
export const Default: Story = {
  args: {
    label: 'Default Checkbox',
  }
};

export const Checked: Story = {
  args: {
    label: 'Checked Checkbox',
    checked: true,
  }
};

export const WithHelperText: Story = {
  args: {
    label: 'Vegetarian',
    helperText: 'No meat, poultry, or fish',
  }
};

// Dietary filter examples
export const DietaryFilters = {
  render: () => (
    <div className="space-y-4 w-80">
      <h3 className="text-lg font-semibold mb-4">Dietary Restrictions</h3>
      
      <div className="space-y-3">
        <Checkbox
          label="Vegetarian"
          helperText="No meat, poultry, or fish"
        />
        <Checkbox
          label="Vegan"
          helperText="No animal products"
        />
        <Checkbox
          label="Gluten-Free"
          helperText="No wheat, barley, or rye"
        />
        <Checkbox
          label="Dairy-Free"
          helperText="No milk or dairy products"
        />
        <Checkbox
          label="Nut-Free"
          helperText="No tree nuts or peanuts"
        />
        <Checkbox
          label="Low Sodium"
          helperText="Less than 140mg sodium per serving"
        />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Multiple dietary restriction checkboxes for recipe filtering.'
      }
    }
  }
};

export const IngredientSelection = {
  render: () => (
    <div className="space-y-4 w-80">
      <h3 className="text-lg font-semibold mb-4">Available Ingredients</h3>
      <p className="text-sm text-muted-foreground mb-4">
        Check the ingredients you have on hand to find matching recipes.
      </p>
      
      <div className="grid grid-cols-2 gap-3">
        <Checkbox label="Chicken" />
        <Checkbox label="Beef" />
        <Checkbox label="Fish" />
        <Checkbox label="Eggs" />
        <Checkbox label="Tomatoes" />
        <Checkbox label="Onions" />
        <Checkbox label="Garlic" />
        <Checkbox label="Rice" />
        <Checkbox label="Pasta" />
        <Checkbox label="Cheese" />
        <Checkbox label="Herbs" />
        <Checkbox label="Spices" />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Ingredient selection grid for finding recipes based on available ingredients.'
      }
    }
  }
};

export const CuisinePreferences = {
  render: () => (
    <div className="space-y-4 w-80">
      <h3 className="text-lg font-semibold mb-4">Favorite Cuisines</h3>
      <p className="text-sm text-muted-foreground mb-4">
        Select your favorite cuisines to personalize recipe recommendations.
      </p>
      
      <div className="space-y-3">
        <Checkbox label="Italian" defaultChecked />
        <Checkbox label="Mexican" />
        <Checkbox label="Chinese" defaultChecked />
        <Checkbox label="Indian" />
        <Checkbox label="Thai" />
        <Checkbox label="French" />
        <Checkbox label="Japanese" />
        <Checkbox label="Mediterranean" defaultChecked />
        <Checkbox label="Middle Eastern" />
        <Checkbox label="Korean" />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Cuisine preference selection for personalized recipe recommendations.'
      }
    }
  }
};

// State examples
export const WithError: Story = {
  args: {
    label: 'Accept Terms',
    error: 'You must accept the terms to continue',
    required: true,
  }
};

export const Required: Story = {
  args: {
    label: 'Required Checkbox',
    required: true,
    helperText: 'This field is required',
  }
};

export const Disabled: Story = {
  args: {
    label: 'Disabled Checkbox',
    disabled: true,
    helperText: 'This option is not available',
  }
};

export const DisabledChecked: Story = {
  args: {
    label: 'Disabled Checked',
    disabled: true,
    checked: true,
    helperText: 'This option is pre-selected and cannot be changed',
  }
};

// Mobile-friendly large touch targets
export const MobileFriendly = {
  render: () => (
    <div className="space-y-6 w-80">
      <h3 className="text-lg font-semibold mb-4">Mobile-Optimized Checkboxes</h3>
      <p className="text-sm text-muted-foreground mb-4">
        Large touch targets optimized for mobile cooking apps.
      </p>
      
      <div className="space-y-4">
        <div className="p-4 border rounded-lg hover:bg-accent/50 cursor-pointer">
          <Checkbox
            label="Dairy-Free"
            helperText="No milk, cheese, or dairy products"
            className="pointer-events-none"
          />
        </div>
        <div className="p-4 border rounded-lg hover:bg-accent/50 cursor-pointer">
          <Checkbox
            label="Gluten-Free"
            helperText="Safe for celiac disease"
            className="pointer-events-none"
          />
        </div>
        <div className="p-4 border rounded-lg hover:bg-accent/50 cursor-pointer">
          <Checkbox
            label="Nut-Free"
            helperText="No tree nuts or peanuts"
            className="pointer-events-none"
          />
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Mobile-optimized checkboxes with large touch targets for kitchen use.'
      }
    }
  }
};