import type { Meta, StoryObj } from '@storybook/react-vite';
import { RadioGroup } from './RadioGroup';

const meta: Meta<typeof RadioGroup> = {
  title: 'Molecules/RadioGroup',
  component: RadioGroup,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
# RadioGroup Component

An enhanced radio group component with label, error handling, and flexible layouts. Built for single-choice selections like meal types, difficulty levels, and cooking preferences.

## Features

- **Accessibility** - Full ARIA support and keyboard navigation
- **Recipe Context** - Optimized for meal types, difficulty levels, and serving options
- **Flexible Layout** - Vertical or horizontal orientation
- **Error Handling** - Clear validation states and helper text
- **Individual Helper Text** - Each option can have its own description

## Usage

Use for single-choice selections like meal types (breakfast, lunch, dinner), difficulty levels (easy, medium, hard), and cooking methods.
        `
      }
    }
  },
  argTypes: {
    label: {
      control: 'text',
      description: 'Label text for the radio group'
    },
    error: {
      control: 'text',
      description: 'Error message to display'
    },
    helperText: {
      control: 'text',
      description: 'Helper text to guide users'
    },
    required: {
      control: 'boolean',
      description: 'Whether the field is required'
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the radio group is disabled'
    },
    orientation: {
      control: 'radio',
      options: ['vertical', 'horizontal'],
      description: 'Layout orientation'
    }
  }
};

export default meta;
type Story = StoryObj<typeof RadioGroup>;

// Basic examples
export const Default: Story = {
  args: {
    label: 'Choose Option',
    options: [
      { value: 'option1', label: 'Option 1' },
      { value: 'option2', label: 'Option 2' },
      { value: 'option3', label: 'Option 3' },
    ]
  }
};

export const MealTypes: Story = {
  args: {
    label: 'Meal Type',
    helperText: 'Select the meal category for this recipe',
    defaultValue: 'dinner',
    options: [
      { 
        value: 'breakfast', 
        label: 'Breakfast',
        helperText: 'Morning meals and brunch items'
      },
      { 
        value: 'lunch', 
        label: 'Lunch',
        helperText: 'Midday meals and light dishes'
      },
      { 
        value: 'dinner', 
        label: 'Dinner',
        helperText: 'Evening meals and main courses'
      },
      { 
        value: 'snack', 
        label: 'Snack',
        helperText: 'Small bites and appetizers'
      },
      { 
        value: 'dessert', 
        label: 'Dessert',
        helperText: 'Sweet treats and after-meal dishes'
      },
    ]
  }
};

export const DifficultyLevel: Story = {
  args: {
    label: 'Cooking Difficulty',
    helperText: 'How challenging is this recipe to prepare?',
    options: [
      { 
        value: 'beginner', 
        label: 'Beginner',
        helperText: 'Simple ingredients, basic techniques (15-30 min)'
      },
      { 
        value: 'intermediate', 
        label: 'Intermediate',
        helperText: 'Some advanced techniques, multiple steps (30-60 min)'
      },
      { 
        value: 'advanced', 
        label: 'Advanced',
        helperText: 'Complex techniques, special equipment (60+ min)'
      },
      { 
        value: 'expert', 
        label: 'Expert',
        helperText: 'Professional-level skills required (2+ hours)'
      },
    ]
  }
};

export const CookingMethod: Story = {
  args: {
    label: 'Primary Cooking Method',
    helperText: 'What\'s the main cooking technique used?',
    orientation: 'horizontal',
    options: [
      { value: 'baking', label: 'Baking' },
      { value: 'grilling', label: 'Grilling' },
      { value: 'frying', label: 'Frying' },
      { value: 'boiling', label: 'Boiling' },
      { value: 'steaming', label: 'Steaming' },
      { value: 'roasting', label: 'Roasting' },
    ]
  }
};

export const ServingStyle: Story = {
  args: {
    label: 'Serving Style',
    helperText: 'How is this dish typically served?',
    options: [
      { 
        value: 'individual', 
        label: 'Individual Portions',
        helperText: 'Pre-portioned servings for each person'
      },
      { 
        value: 'family', 
        label: 'Family Style',
        helperText: 'Large servings shared at the table'
      },
      { 
        value: 'buffet', 
        label: 'Buffet Style',
        helperText: 'Self-serve from a common dish'
      },
      { 
        value: 'plated', 
        label: 'Restaurant Plated',
        helperText: 'Carefully arranged individual plates'
      },
    ]
  }
};

export const DietaryApproach: Story = {
  args: {
    label: 'Dietary Approach',
    helperText: 'What dietary philosophy does this recipe follow?',
    options: [
      { 
        value: 'traditional', 
        label: 'Traditional',
        helperText: 'Classic preparation with authentic ingredients'
      },
      { 
        value: 'healthy', 
        label: 'Health-Focused',
        helperText: 'Reduced calories, added nutrients'
      },
      { 
        value: 'comfort', 
        label: 'Comfort Food',
        helperText: 'Rich, hearty, and satisfying'
      },
      { 
        value: 'gourmet', 
        label: 'Gourmet',
        helperText: 'Premium ingredients and advanced techniques'
      },
    ]
  }
};

// Layout examples
export const HorizontalLayout: Story = {
  args: {
    label: 'Spice Level',
    orientation: 'horizontal',
    options: [
      { value: 'mild', label: 'Mild' },
      { value: 'medium', label: 'Medium' },
      { value: 'hot', label: 'Hot' },
      { value: 'extra-hot', label: 'Extra Hot' },
    ]
  }
};

// State examples
export const WithError: Story = {
  args: {
    label: 'Meal Type',
    error: 'Please select a meal type to continue',
    required: true,
    options: [
      { value: 'breakfast', label: 'Breakfast' },
      { value: 'lunch', label: 'Lunch' },
      { value: 'dinner', label: 'Dinner' },
    ]
  }
};

export const Required: Story = {
  args: {
    label: 'Required Selection',
    required: true,
    helperText: 'You must select one option',
    options: [
      { value: 'option1', label: 'Option 1' },
      { value: 'option2', label: 'Option 2' },
    ]
  }
};

export const Disabled: Story = {
  args: {
    label: 'Disabled Radio Group',
    disabled: true,
    helperText: 'Selection not available at this time',
    defaultValue: 'option1',
    options: [
      { value: 'option1', label: 'Option 1' },
      { value: 'option2', label: 'Option 2' },
    ]
  }
};

export const PartiallyDisabled: Story = {
  args: {
    label: 'Cooking Equipment',
    helperText: 'Select your available cooking equipment',
    options: [
      { value: 'stovetop', label: 'Stovetop' },
      { value: 'oven', label: 'Oven' },
      { value: 'grill', label: 'Grill', disabled: true, helperText: 'Not available in winter' },
      { value: 'microwave', label: 'Microwave' },
    ]
  }
};

// Form example
export const RecipeDetailsForm = {
  render: () => (
    <div className="space-y-8 w-96">
      <h3 className="text-lg font-semibold">Recipe Details</h3>
      
      <RadioGroup
        label="Meal Type"
        defaultValue="dinner"
        options={[
          { value: 'breakfast', label: 'Breakfast' },
          { value: 'lunch', label: 'Lunch' },
          { value: 'dinner', label: 'Dinner' },
          { value: 'snack', label: 'Snack' },
        ]}
      />
      
      <RadioGroup
        label="Difficulty Level"
        options={[
          { value: 'beginner', label: 'Beginner', helperText: 'Simple and quick' },
          { value: 'intermediate', label: 'Intermediate', helperText: 'Some experience needed' },
          { value: 'advanced', label: 'Advanced', helperText: 'Skilled cooking required' },
        ]}
      />
      
      <RadioGroup
        label="Spice Level"
        orientation="horizontal"
        defaultValue="medium"
        options={[
          { value: 'mild', label: 'Mild' },
          { value: 'medium', label: 'Medium' },
          { value: 'hot', label: 'Hot' },
        ]}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Multiple radio groups working together for complete recipe categorization.'
      }
    }
  }
};