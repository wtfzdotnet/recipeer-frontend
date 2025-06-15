import type { Meta, StoryObj } from '@storybook/react-vite';
import { RecipeForm } from './RecipeForm';
import { useState } from 'react';

// Simple mock function for stories
const fn = () => () => {};

const meta = {
  title: 'Organisms/FormExamples/RecipeForm',
  component: RecipeForm,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
# RecipeForm - React Hook Form Integration

This comprehensive form demonstrates best practices for integrating React Hook Form with the atomic design component ecosystem. It showcases real-world form patterns for recipe creation and management.

## Features

- **React Hook Form Integration**: Complete validation and state management
- **Atomic Design Components**: Uses atoms and molecules throughout
- **Dynamic Fields**: Add/remove ingredients and instructions
- **Real-time Validation**: Form validation with user-friendly error messages
- **Accessibility**: Full ARIA support and keyboard navigation
- **Performance Optimized**: Efficient re-rendering with controlled components

## Integration Patterns

- Input components with validation
- Select dropdowns with controlled state
- Checkbox and Switch components
- Custom molecules (QuantityAdjuster, DifficultyIndicator)
- Dynamic field arrays
- Conditional rendering based on form state

## Use Cases

- Recipe creation and editing
- User-generated content forms
- Multi-step form workflows
- Complex validation scenarios
        `
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    loading: {
      control: 'boolean',
      description: 'Whether the form is in loading state'
    }
  }
} satisfies Meta<typeof RecipeForm>;

export default meta;
type Story = StoryObj<typeof meta>;

// Interactive form story
export const Interactive: Story = {
  render: () => {
    const [submissionData, setSubmissionData] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (data) => {
      setLoading(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setSubmissionData(data);
      setLoading(false);
      
      console.log('Form submitted:', data);
    };

    return (
      <div className="space-y-8">
        <RecipeForm 
          onSubmit={handleSubmit}
          loading={loading}
        />
        
        {submissionData && (
          <div className="mt-8 p-4 bg-success/10 border border-success rounded-lg">
            <h3 className="font-semibold text-success mb-2">Form Submitted Successfully!</h3>
            <details className="text-sm">
              <summary className="cursor-pointer">View submitted data</summary>
              <pre className="mt-2 p-2 bg-background rounded text-xs overflow-auto">
                {JSON.stringify(submissionData, null, 2)}
              </pre>
            </details>
          </div>
        )}
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive recipe form with full React Hook Form integration and submission handling.'
      }
    }
  }
};

// Default story
export const Default: Story = {
  args: {
    onSubmit: fn(),
    loading: false,
  },
};

// Pre-filled form
export const PreFilled: Story = {
  render: () => {
    const initialData = {
      title: 'Classic Margherita Pizza',
      description: 'A traditional Italian pizza with fresh basil, mozzarella, and tomato sauce',
      prepTime: 20,
      cookTime: 12,
      servings: 4,
      difficulty: 'medium' as const,
      category: 'dinner',
      ingredients: [
        { name: 'Pizza dough', quantity: 1, unit: 'piece' },
        { name: 'Marinara sauce', quantity: 0.5, unit: 'cup' },
        { name: 'Fresh mozzarella', quantity: 8, unit: 'oz' },
        { name: 'Fresh basil leaves', quantity: 10, unit: 'piece' },
        { name: 'Olive oil', quantity: 2, unit: 'tbsp' },
      ],
      instructions: [
        'Preheat oven to 500°F (260°C).',
        'Roll out pizza dough on a floured surface to desired thickness.',
        'Transfer dough to a pizza stone or baking sheet.',
        'Spread marinara sauce evenly over the dough, leaving a 1-inch border.',
        'Tear mozzarella into pieces and distribute over the sauce.',
        'Bake for 10-12 minutes until crust is golden and cheese is bubbly.',
        'Remove from oven and immediately top with fresh basil leaves.',
        'Drizzle with olive oil and serve hot.',
      ],
      isPublic: true,
      allowComments: true,
    };

    return (
      <RecipeForm 
        initialData={initialData}
        onSubmit={fn()}
      />
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Recipe form pre-filled with sample data showing how to handle initial values.'
      }
    }
  }
};

// Loading state
export const Loading: Story = {
  args: {
    onSubmit: fn(),
    loading: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Form in loading state during submission with disabled submit button.'
      }
    }
  }
};

// Validation examples
export const ValidationExamples: Story = {
  render: () => {
    const [showValidation, setShowValidation] = useState(false);

    const handleSubmit = (data) => {
      setShowValidation(true);
      console.log('Validation passed:', data);
    };

    return (
      <div className="space-y-4">
        <div className="p-4 bg-warning/10 border border-warning rounded-lg">
          <h3 className="font-medium text-warning-foreground mb-2">Validation Demo</h3>
          <p className="text-sm text-warning-foreground">
            Try submitting the form without filling required fields to see validation in action.
            Required fields: Title, Prep Time, Cook Time, Category, and at least one ingredient.
          </p>
        </div>
        
        <RecipeForm onSubmit={handleSubmit} />
        
        {showValidation && (
          <div className="p-4 bg-success/10 border border-success rounded-lg">
            <p className="text-sm text-success-foreground">
              ✅ All validation passed! Check the console for submitted data.
            </p>
          </div>
        )}
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates form validation patterns and error handling with React Hook Form.'
      }
    }
  }
};

// Form patterns showcase
export const FormPatterns: Story = {
  render: () => (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="font-semibold">Integration Patterns Used</h3>
          <ul className="text-sm space-y-2 text-muted-foreground">
            <li>• <strong>register()</strong> - Basic input registration</li>
            <li>• <strong>Controller</strong> - Custom component integration</li>
            <li>• <strong>watch()</strong> - Real-time value monitoring</li>
            <li>• <strong>setValue()</strong> - Programmatic value updates</li>
            <li>• <strong>formState.errors</strong> - Validation error handling</li>
            <li>• <strong>Dynamic arrays</strong> - Add/remove field patterns</li>
          </ul>
        </div>
        
        <div className="space-y-4">
          <h3 className="font-semibold">Component Integration</h3>
          <ul className="text-sm space-y-2 text-muted-foreground">
            <li>• <strong>Input/Textarea</strong> - Direct registration</li>
            <li>• <strong>Select</strong> - Controller wrapper pattern</li>
            <li>• <strong>Checkbox/Switch</strong> - Boolean state handling</li>
            <li>• <strong>QuantityAdjuster</strong> - Custom molecule integration</li>
            <li>• <strong>DifficultyIndicator</strong> - Read-only molecule display</li>
            <li>• <strong>Separator</strong> - Visual section organization</li>
          </ul>
        </div>
      </div>
      
      <RecipeForm onSubmit={fn()} />
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: 'Comprehensive showcase of React Hook Form integration patterns with atomic design components.'
      }
    }
  }
};