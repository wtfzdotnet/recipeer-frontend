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

// Cultural Heritage Stories
export const CulturalCuisinePreference: Story = {
  args: {
    label: 'Cultural Cuisine Background',
    helperText: 'Select your primary cultural cooking tradition for personalized recommendations',
    required: true,
    options: [
      { 
        value: 'mediterranean', 
        label: 'Mediterranean',
        helperText: 'Greek, Italian, Spanish, and Middle Eastern traditions'
      },
      { 
        value: 'south-asian', 
        label: 'South Asian',
        helperText: 'Indian, Pakistani, Bangladeshi, and Sri Lankan cuisines'
      },
      { 
        value: 'east-asian', 
        label: 'East Asian',
        helperText: 'Chinese, Japanese, Korean, and Vietnamese traditions'
      },
      { 
        value: 'latin-american', 
        label: 'Latin American',
        helperText: 'Mexican, Brazilian, Argentinian, and Caribbean foods'
      },
      { 
        value: 'african', 
        label: 'African',
        helperText: 'West, East, and North African traditional cuisines'
      },
      { 
        value: 'nordic', 
        label: 'Nordic',
        helperText: 'Scandinavian and Northern European traditions'
      },
    ]
  },
  parameters: {
    docs: {
      description: {
        story: 'Cultural cuisine preference selection for personalized recipe recommendations and cultural context.'
      }
    }
  }
};

export const DietaryRestrictions: Story = {
  args: {
    label: 'Dietary Restrictions',
    helperText: 'Select your primary dietary preference to filter recipe suggestions',
    options: [
      { 
        value: 'none', 
        label: 'No Restrictions',
        helperText: 'Open to all food types and ingredients'
      },
      { 
        value: 'vegetarian', 
        label: 'Vegetarian',
        helperText: 'No meat, poultry, or fish'
      },
      { 
        value: 'vegan', 
        label: 'Vegan',
        helperText: 'No animal products including dairy and eggs'
      },
      { 
        value: 'halal', 
        label: 'Halal',
        helperText: 'Following Islamic dietary guidelines'
      },
      { 
        value: 'kosher', 
        label: 'Kosher',
        helperText: 'Following Jewish dietary laws'
      },
      { 
        value: 'gluten-free', 
        label: 'Gluten-Free',
        helperText: 'No wheat, barley, rye, or other gluten sources'
      },
    ]
  },
  parameters: {
    docs: {
      description: {
        story: 'Dietary restriction selection with cultural and religious considerations.'
      }
    }
  }
};

export const CulturalAuthenticity: Story = {
  args: {
    label: 'Recipe Authenticity Preference',
    helperText: 'How important is cultural authenticity in your recipe selection?',
    orientation: 'vertical',
    options: [
      { 
        value: 'traditional', 
        label: 'Traditional Only',
        helperText: 'Show only recipes verified by cultural experts'
      },
      { 
        value: 'mostly-traditional', 
        label: 'Mostly Traditional',
        helperText: 'Prefer authentic recipes with minor adaptations'
      },
      { 
        value: 'fusion-friendly', 
        label: 'Fusion Friendly',
        helperText: 'Open to creative interpretations and fusion dishes'
      },
      { 
        value: 'modern-adaptations', 
        label: 'Modern Adaptations',
        helperText: 'Contemporary takes on traditional recipes welcome'
      },
    ]
  },
  parameters: {
    docs: {
      description: {
        story: 'Cultural authenticity preference for filtering recipe recommendations and respecting traditional cooking.'
      }
    }
  }
};

export const RecipeContributorRole: Story = {
  args: {
    label: 'Recipe Contributor Role',
    helperText: 'Select your role when contributing recipes to the community',
    options: [
      { 
        value: 'home-cook', 
        label: 'Home Cook',
        helperText: 'Sharing family and personal recipes'
      },
      { 
        value: 'cultural-expert', 
        label: 'Cultural Expert',
        helperText: 'Verified expert in traditional cuisine'
      },
      { 
        value: 'professional-chef', 
        label: 'Professional Chef',
        helperText: 'Licensed culinary professional'
      },
      { 
        value: 'food-historian', 
        label: 'Food Historian',
        helperText: 'Academic or cultural researcher'
      },
      { 
        value: 'community-moderator', 
        label: 'Community Moderator',
        helperText: 'Helps maintain cultural sensitivity and accuracy'
      },
    ]
  },
  parameters: {
    docs: {
      description: {
        story: 'Role-based contributor system for maintaining recipe quality and cultural sensitivity.'
      }
    }
  }
};

export const CulturalSensitivityLevel: Story = {
  args: {
    label: 'Cultural Sensitivity Alerts',
    helperText: 'Choose how you want to be notified about cultural appropriation concerns',
    orientation: 'vertical',
    options: [
      { 
        value: 'strict', 
        label: 'Strict Alerts',
        helperText: 'Alert for any potential cultural sensitivity issues'
      },
      { 
        value: 'moderate', 
        label: 'Moderate Alerts',
        helperText: 'Alert for significant cultural appropriation concerns'
      },
      { 
        value: 'minimal', 
        label: 'Minimal Alerts',
        helperText: 'Only alert for flagrant misrepresentation of traditions'
      },
      { 
        value: 'disabled', 
        label: 'No Alerts',
        helperText: 'Disable cultural sensitivity notifications'
      },
    ]
  },
  parameters: {
    docs: {
      description: {
        story: 'Cultural sensitivity notification preferences for respectful recipe sharing.'
      }
    }
  }
};

// Accessibility and Cultural Example
export const AccessibilityAndCulturalFeatures: Story = {
  render: () => (
    <div className="space-y-8 w-full max-w-2xl">
      <h3 className="text-lg font-semibold">Cultural & Accessibility Settings</h3>
      
      <div className="grid gap-8 md:grid-cols-2">
        <RadioGroup
          label="Cuisine Heritage"
          helperText="Your cultural cooking background"
          defaultValue="mediterranean"
          options={[
            { value: 'mediterranean', label: 'Mediterranean' },
            { value: 'asian', label: 'Asian' },
            { value: 'african', label: 'African' },
            { value: 'latin', label: 'Latin American' },
          ]}
        />
        
        <RadioGroup
          label="Recipe Language"
          helperText="Preferred language for instructions"
          orientation="vertical"
          options={[
            { value: 'en', label: 'English' },
            { value: 'es', label: 'Español' },
            { value: 'fr', label: 'Français' },
            { value: 'ar', label: 'العربية' },
          ]}
        />
        
        <RadioGroup
          label="Measurement System"
          helperText="Preferred units for ingredients"
          orientation="horizontal"
          options={[
            { value: 'metric', label: 'Metric' },
            { value: 'imperial', label: 'Imperial' },
            { value: 'both', label: 'Both' },
          ]}
        />
        
        <RadioGroup
          label="Content Complexity"
          helperText="Accessibility preference for recipe instructions"
          options={[
            { value: 'simple', label: 'Simple Language', helperText: 'Clear, easy-to-understand instructions' },
            { value: 'detailed', label: 'Detailed Instructions', helperText: 'Comprehensive step-by-step guidance' },
            { value: 'professional', label: 'Professional Terms', helperText: 'Technical culinary terminology' },
          ]}
        />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Comprehensive cultural and accessibility settings demonstrating radio groups in real-world multicultural scenarios.'
      }
    }
  }
};