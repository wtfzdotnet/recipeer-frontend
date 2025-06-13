import type { Meta, StoryObj } from '@storybook/react-vite';
import { Textarea } from './Textarea';

const meta: Meta<typeof Textarea> = {
  title: 'Atoms/Textarea',
  component: Textarea,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
# Textarea Component

An enhanced textarea component with label, error handling, and character counting. Built for recipe reviews, cooking notes, and ingredient descriptions.

## Features

- **Accessibility** - Full ARIA support and keyboard navigation
- **Recipe Context** - Optimized for reviews, cooking notes, and recipe modifications
- **Character Counting** - Optional character limits and visual feedback
- **Auto-resize** - Optional automatic height adjustment
- **Error Handling** - Clear validation states and helper text

## Usage

Use for recipe reviews, cooking modifications, ingredient notes, and chef tips.
        `
      }
    }
  },
  argTypes: {
    label: {
      control: 'text',
      description: 'Label text for the textarea'
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text'
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
      description: 'Whether the textarea is disabled'
    },
    showCharacterCount: {
      control: 'boolean',
      description: 'Show character count'
    },
    maxLength: {
      control: 'number',
      description: 'Maximum character limit'
    }
  }
};

export default meta;
type Story = StoryObj<typeof Textarea>;

// Basic examples
export const Default: Story = {
  args: {
    label: 'Notes',
    placeholder: 'Enter your notes here...',
  }
};

export const RecipeReview: Story = {
  args: {
    label: 'Recipe Review',
    placeholder: 'Share your experience with this recipe...',
    helperText: 'Help other home cooks by sharing your experience, modifications, and tips',
    showCharacterCount: true,
    maxLength: 500,
  }
};

export const CookingNotes: Story = {
  args: {
    label: 'Cooking Notes',
    placeholder: 'Add your personal notes and modifications...',
    helperText: 'Keep track of ingredient substitutions, timing adjustments, and personal preferences',
    showCharacterCount: true,
    maxLength: 300,
  }
};

export const ChefTips: Story = {
  args: {
    label: 'Chef Tips',
    placeholder: 'Share professional tips and techniques...',
    helperText: 'Professional advice for achieving the best results',
    required: true,
    showCharacterCount: true,
    maxLength: 250,
  }
};

export const IngredientNotes: Story = {
  args: {
    label: 'Ingredient Notes',
    placeholder: 'Special instructions for ingredients...',
    helperText: 'Storage tips, preparation notes, and substitution suggestions',
    minRows: 2,
  }
};

export const RecipeModifications: Story = {
  args: {
    label: 'Recipe Modifications',
    placeholder: 'Describe any changes you made to the original recipe...',
    helperText: 'Document your successful adaptations for dietary restrictions or preferences',
    showCharacterCount: true,
    maxLength: 400,
  }
};

// State examples
export const WithError: Story = {
  args: {
    label: 'Required Review',
    placeholder: 'This field is required...',
    error: 'Please provide a review before submitting',
    required: true,
  }
};

export const CharacterLimitReached: Story = {
  args: {
    label: 'Short Description',
    value: 'This is a very long description that exceeds the character limit and should show a warning or error state to the user.',
    showCharacterCount: true,
    maxLength: 100,
    error: 'Description exceeds maximum character limit',
  }
};

export const Disabled: Story = {
  args: {
    label: 'Disabled Textarea',
    placeholder: 'This field is disabled...',
    disabled: true,
    helperText: 'This field cannot be edited at this time',
    value: 'This content cannot be modified.',
  }
};

// Recipe-specific examples
export const RecipeStory = {
  render: () => (
    <div className="space-y-6 w-96">
      <h3 className="text-lg font-semibold">Recipe Story & Background</h3>
      
      <Textarea
        label="Recipe Story"
        placeholder="Tell the story behind this recipe..."
        helperText="Share the cultural background, family history, or inspiration for this dish"
        showCharacterCount
        maxLength={600}
        minRows={4}
      />
      
      <Textarea
        label="Cultural Context"
        placeholder="Describe the cultural significance..."
        helperText="Explain traditional preparation methods, regional variations, or ceremonial uses"
        showCharacterCount
        maxLength={400}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Recipe storytelling and cultural context documentation.'
      }
    }
  }
};

export const CookingTutorial = {
  render: () => (
    <div className="space-y-6 w-96">
      <h3 className="text-lg font-semibold">Cooking Tutorial</h3>
      
      <Textarea
        label="Preparation Tips"
        placeholder="Key preparation techniques and tips..."
        helperText="Help beginners understand the important preparation steps"
        showCharacterCount
        maxLength={300}
      />
      
      <Textarea
        label="Common Mistakes"
        placeholder="Warn about common pitfalls..."
        helperText="Help others avoid mistakes you've learned from"
        showCharacterCount
        maxLength={250}
      />
      
      <Textarea
        label="Success Indicators"
        placeholder="How to know when it's done right..."
        helperText="Visual, aromatic, and textural cues for perfect results"
        showCharacterCount
        maxLength={200}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Educational content for teaching cooking techniques and avoiding common mistakes.'
      }
    }
  }
};

export const MealPlanningNotes = {
  render: () => (
    <div className="space-y-6 w-96">
      <h3 className="text-lg font-semibold">Meal Planning</h3>
      
      <Textarea
        label="Weekly Menu Notes"
        placeholder="Plan your week's meals..."
        helperText="Coordinate recipes, prep schedules, and shopping lists"
        minRows={5}
      />
      
      <Textarea
        label="Prep Schedule"
        placeholder="Plan your cooking timeline..."
        helperText="When to shop, prep, and cook for optimal freshness"
        showCharacterCount
        maxLength={300}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Meal planning and preparation scheduling tools.'
      }
    }
  }
};