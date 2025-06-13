import type { Meta, StoryObj } from '@storybook/react-vite';
import { QuantityAdjuster, scaleQuantity } from './QuantityAdjuster';
import { useState } from 'react';

const meta = {
  title: 'Components/QuantityAdjuster',
  component: QuantityAdjuster,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
# QuantityAdjuster Component

The QuantityAdjuster component allows users to adjust recipe serving sizes with automatic quantity scaling for ingredients. Perfect for meal planning and recipe adaptation.

## Features

- **Serving Size Controls**: Easy +/- buttons with validation
- **Smart Scaling**: Automatic calculation with practical rounding
- **Visual Feedback**: Shows scaling factor when adjusted
- **Accessibility**: Full ARIA support and keyboard navigation
- **Customizable**: Flexible min/max bounds and step increments

## Use Cases

- Recipe detail pages for portion adjustment
- Meal planning interfaces
- Shopping list generation
- Cooking workflow optimization
        `
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    originalServings: {
      control: 'number',
      description: 'Original serving size from the recipe'
    },
    currentServings: {
      control: 'number',
      description: 'Current serving size'
    },
    minServings: {
      control: 'number',
      description: 'Minimum allowed servings'
    },
    maxServings: {
      control: 'number',
      description: 'Maximum allowed servings'
    },
    step: {
      control: 'number',
      description: 'Step increment for adjustments'
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the component is disabled'
    }
  }
} satisfies Meta<typeof QuantityAdjuster>;

export default meta;
type Story = StoryObj<typeof meta>;

// Interactive story with state management
export const Interactive: Story = {
  render: (args) => {
    const [servings, setServings] = useState(args.currentServings);
    
    return (
      <div className="space-y-6">
        <QuantityAdjuster
          {...args}
          currentServings={servings}
          onServingsChange={setServings}
        />
        
        <div className="text-center text-sm text-muted-foreground">
          <p>Scaling factor: ×{(servings / args.originalServings).toFixed(2)}</p>
        </div>
      </div>
    );
  },
  args: {
    originalServings: 4,
    currentServings: 4,
    minServings: 1,
    maxServings: 12,
    step: 1,
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive quantity adjuster showing real-time serving size changes and scaling calculations.'
      }
    }
  }
};

// Default story
export const Default: Story = {
  render: (args) => {
    const [servings, setServings] = useState(args.currentServings);
    return (
      <QuantityAdjuster
        {...args}
        currentServings={servings}
        onServingsChange={setServings}
      />
    );
  },
  args: {
    originalServings: 4,
    currentServings: 4,
    minServings: 1,
    maxServings: 8,
    step: 1,
  }
};

// Recipe context story
export const RecipeExample: Story = {
  render: () => {
    const [servings, setServings] = useState(4);
    const originalServings = 4;
    
    // Sample ingredient list
    const ingredients = [
      { name: 'All-purpose flour', quantity: 2, unit: 'cups' },
      { name: 'Large eggs', quantity: 3, unit: '' },
      { name: 'Milk', quantity: 1.5, unit: 'cups' },
      { name: 'Butter', quantity: 0.25, unit: 'cup' },
      { name: 'Salt', quantity: 0.5, unit: 'tsp' },
      { name: 'Sugar', quantity: 2, unit: 'tbsp' },
    ];
    
    const formatQuantity = (qty: number): string => {
      if (qty < 1) {
        // Convert to fraction representation for display
        const eighths = Math.round(qty * 8);
        const fractions = ['', '⅛', '¼', '⅜', '½', '⅝', '¾', '⅞'];
        if (eighths <= 7) return fractions[eighths];
      }
      
      const whole = Math.floor(qty);
      const fraction = qty - whole;
      const eighths = Math.round(fraction * 8);
      const fractions = ['', '⅛', '¼', '⅜', '½', '⅝', '¾', '⅞'];
      
      if (eighths === 0) return whole.toString();
      if (whole === 0) return fractions[eighths];
      return `${whole} ${fractions[eighths]}`;
    };
    
    return (
      <div className="max-w-md space-y-6 p-6 bg-background border rounded-lg">
        <header className="text-center">
          <h3 className="text-xl font-semibold mb-2">Classic Pancakes</h3>
          <p className="text-muted-foreground">Fluffy breakfast pancakes</p>
        </header>
        
        <div className="flex justify-center">
          <QuantityAdjuster
            originalServings={originalServings}
            currentServings={servings}
            onServingsChange={setServings}
            minServings={1}
            maxServings={12}
          />
        </div>
        
        <div>
          <h4 className="font-medium mb-3">Ingredients</h4>
          <ul className="space-y-2">
            {ingredients.map((ingredient, index) => {
              const scaledQty = scaleQuantity(ingredient.quantity, originalServings, servings);
              return (
                <li key={index} className="flex justify-between text-sm">
                  <span>{ingredient.name}</span>
                  <span className="font-medium">
                    {formatQuantity(scaledQty)} {ingredient.unit}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
        
        {servings !== originalServings && (
          <div className="text-center text-xs text-orange-600 bg-orange-50 p-2 rounded">
            Recipe scaled {servings > originalServings ? 'up' : 'down'} by {((servings / originalServings) * 100).toFixed(0)}%
          </div>
        )}
      </div>
    );
  },
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: 'Complete recipe example showing ingredient scaling in action with fraction formatting and visual feedback.'
      }
    }
  }
};

// Different step sizes
export const CustomSteps: Story = {
  render: () => {
    const [servings1, setServings1] = useState(2);
    const [servings2, setServings2] = useState(4);
    const [servings3, setServings3] = useState(6);
    
    return (
      <div className="space-y-8">
        <div className="text-center">
          <h4 className="font-medium mb-2">Step by 0.5 (Half servings)</h4>
          <QuantityAdjuster
            originalServings={2}
            currentServings={servings1}
            onServingsChange={setServings1}
            minServings={0.5}
            maxServings={6}
            step={0.5}
          />
        </div>
        
        <div className="text-center">
          <h4 className="font-medium mb-2">Step by 1 (Standard)</h4>
          <QuantityAdjuster
            originalServings={4}
            currentServings={servings2}
            onServingsChange={setServings2}
            minServings={1}
            maxServings={10}
            step={1}
          />
        </div>
        
        <div className="text-center">
          <h4 className="font-medium mb-2">Step by 2 (Even numbers)</h4>
          <QuantityAdjuster
            originalServings={6}
            currentServings={servings3}
            onServingsChange={setServings3}
            minServings={2}
            maxServings={16}
            step={2}
          />
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Different step configurations for various use cases, from half-servings to bulk cooking.'
      }
    }
  }
};

// Disabled state
export const Disabled: Story = {
  args: {
    originalServings: 4,
    currentServings: 6,
    disabled: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Disabled state for when quantity adjustment is not available.'
      }
    }
  }
};

// Edge cases
export const EdgeCases: Story = {
  render: () => {
    const [servings1, setServings1] = useState(1);
    const [servings2, setServings2] = useState(20);
    
    return (
      <div className="space-y-8">
        <div className="text-center">
          <h4 className="font-medium mb-2">Minimum Bound (1 serving)</h4>
          <QuantityAdjuster
            originalServings={4}
            currentServings={servings1}
            onServingsChange={setServings1}
            minServings={1}
            maxServings={8}
          />
          <p className="text-xs text-muted-foreground mt-2">
            Decrease button disabled at minimum
          </p>
        </div>
        
        <div className="text-center">
          <h4 className="font-medium mb-2">Maximum Bound (20 servings)</h4>
          <QuantityAdjuster
            originalServings={4}
            currentServings={servings2}
            onServingsChange={setServings2}
            minServings={1}
            maxServings={20}
          />
          <p className="text-xs text-muted-foreground mt-2">
            Increase button disabled at maximum
          </p>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Edge cases showing behavior at minimum and maximum serving limits.'
      }
    }
  }
};