import type { Meta, StoryObj } from '@storybook/react-vite';
import { Select } from './Select';

const meta: Meta<typeof Select> = {
  title: 'Design System/Components/Select',
  component: Select,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
# Select Component

An enhanced select component with label, error handling, and grouped options support. Built for recipe filtering and user preferences with cultural considerations.

## Features

- **Accessibility** - Full ARIA support and keyboard navigation
- **Recipe Context** - Optimized for cuisine types, dietary restrictions, and cooking preferences
- **Cultural Support** - Flexible labeling and grouping for international cuisines
- **Error Handling** - Clear validation states and helper text
- **Grouped Options** - Organized by category (e.g., dietary restrictions, cuisine regions)

## Usage

Use for recipe filtering, dietary preferences, cuisine selection, and cooking time ranges.
        `
      }
    }
  },
  argTypes: {
    label: {
      control: 'text',
      description: 'Label text for the select field'
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text when no option is selected'
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
      description: 'Whether the select is disabled'
    }
  }
};

export default meta;
type Story = StoryObj<typeof Select>;

// Basic examples
export const Default: Story = {
  args: {
    label: 'Select Option',
    placeholder: 'Choose an option...',
    options: [
      { value: 'option1', label: 'Option 1' },
      { value: 'option2', label: 'Option 2' },
      { value: 'option3', label: 'Option 3' },
    ]
  }
};

export const CuisineTypes: Story = {
  args: {
    label: 'Cuisine Type',
    placeholder: 'Select a cuisine...',
    helperText: 'Filter recipes by their culinary tradition',
    options: [
      { value: 'italian', label: 'Italian' },
      { value: 'mexican', label: 'Mexican' },
      { value: 'chinese', label: 'Chinese' },
      { value: 'indian', label: 'Indian' },
      { value: 'french', label: 'French' },
      { value: 'thai', label: 'Thai' },
      { value: 'japanese', label: 'Japanese' },
      { value: 'mediterranean', label: 'Mediterranean' },
    ]
  }
};

export const DietaryRestrictions: Story = {
  args: {
    label: 'Dietary Restrictions',
    placeholder: 'Select dietary preference...',
    helperText: 'Find recipes that match your dietary needs',
    groups: [
      {
        label: 'Plant-Based',
        options: [
          { value: 'vegetarian', label: 'Vegetarian' },
          { value: 'vegan', label: 'Vegan' },
          { value: 'raw', label: 'Raw Food' },
        ]
      },
      {
        label: 'Allergen-Free',
        options: [
          { value: 'gluten-free', label: 'Gluten-Free' },
          { value: 'dairy-free', label: 'Dairy-Free' },
          { value: 'nut-free', label: 'Nut-Free' },
          { value: 'soy-free', label: 'Soy-Free' },
        ]
      },
      {
        label: 'Health Goals',
        options: [
          { value: 'keto', label: 'Ketogenic' },
          { value: 'paleo', label: 'Paleo' },
          { value: 'low-carb', label: 'Low Carb' },
          { value: 'low-sodium', label: 'Low Sodium' },
        ]
      }
    ]
  }
};

export const CookingTime: Story = {
  args: {
    label: 'Cooking Time',
    placeholder: 'How much time do you have?',
    helperText: 'Total preparation and cooking time',
    options: [
      { value: 'quick', label: 'Quick (15 minutes or less)' },
      { value: 'moderate', label: 'Moderate (15-30 minutes)' },
      { value: 'lengthy', label: 'Lengthy (30-60 minutes)' },
      { value: 'slow', label: 'Slow cooking (1+ hours)' },
      { value: 'overnight', label: 'Overnight preparation' },
    ]
  }
};

export const ServingSize: Story = {
  args: {
    label: 'Serving Size',
    placeholder: 'Number of servings...',
    defaultValue: '4',
    options: [
      { value: '1', label: '1 serving (Individual)' },
      { value: '2', label: '2 servings (Couple)' },
      { value: '4', label: '4 servings (Small family)' },
      { value: '6', label: '6 servings (Family)' },
      { value: '8', label: '8 servings (Large family)' },
      { value: '12', label: '12+ servings (Party/Event)' },
    ]
  }
};

// State examples
export const WithError: Story = {
  args: {
    label: 'Cuisine Type',
    placeholder: 'Select a cuisine...',
    error: 'Please select a cuisine type to continue',
    options: [
      { value: 'italian', label: 'Italian' },
      { value: 'mexican', label: 'Mexican' },
      { value: 'chinese', label: 'Chinese' },
    ]
  }
};

export const Required: Story = {
  args: {
    label: 'Required Selection',
    placeholder: 'This field is required...',
    required: true,
    helperText: 'You must select an option to proceed',
    options: [
      { value: 'option1', label: 'Option 1' },
      { value: 'option2', label: 'Option 2' },
    ]
  }
};

export const Disabled: Story = {
  args: {
    label: 'Disabled Select',
    placeholder: 'This field is disabled...',
    disabled: true,
    helperText: 'Selection not available at this time',
    options: [
      { value: 'option1', label: 'Option 1' },
      { value: 'option2', label: 'Option 2' },
    ]
  }
};

// Form integration example
export const RecipeFilterForm = {
  render: () => (
    <div className="space-y-6 w-80">
      <h3 className="text-lg font-semibold">Recipe Filter Form</h3>
      
      <Select 
        label="Cuisine Type"
        placeholder="Any cuisine..."
        helperText="Filter by culinary tradition"
        options={[
          { value: 'italian', label: 'Italian' },
          { value: 'mexican', label: 'Mexican' },
          { value: 'asian', label: 'Asian' },
          { value: 'mediterranean', label: 'Mediterranean' },
        ]}
      />
      
      <Select 
        label="Dietary Restrictions"
        placeholder="Any dietary needs..."
        groups={[
          {
            label: 'Common Restrictions',
            options: [
              { value: 'vegetarian', label: 'Vegetarian' },
              { value: 'vegan', label: 'Vegan' },
              { value: 'gluten-free', label: 'Gluten-Free' },
            ]
          }
        ]}
      />
      
      <Select 
        label="Cooking Time"
        placeholder="Any duration..."
        defaultValue="moderate"
        options={[
          { value: 'quick', label: 'Quick (< 30 min)' },
          { value: 'moderate', label: 'Moderate (30-60 min)' },
          { value: 'slow', label: 'Slow (60+ min)' },
        ]}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Complete recipe filtering form showing how selects work together for recipe discovery.'
      }
    }
  }
};