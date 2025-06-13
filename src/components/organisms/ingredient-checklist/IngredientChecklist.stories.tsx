import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { IngredientChecklist, type Ingredient } from './IngredientChecklist';

const meta: Meta<typeof IngredientChecklist> = {
  title: 'Design System/Components/Recipe/IngredientChecklist',
  component: IngredientChecklist,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
# Ingredient Checklist Component

An interactive ingredient checklist component for tracking cooking progress and managing ingredients across different cooking phases.

## Features

- **Interactive Checkboxes**: Check off ingredients as you add them
- **Progress Tracking**: Visual progress indicator showing completion
- **State Persistence**: Maintains checked state and notes in localStorage
- **Multiple Modes**: Optimized for prep, shopping, and cook phases
- **Quantity Adjustment**: Automatically adjust quantities based on servings
- **Notes Support**: Add substitutions or modifications
- **Accessibility**: Full keyboard navigation and screen reader support
- **Responsive Design**: Mobile-optimized touch targets

## Usage

Use this component in recipe views to help users track their cooking progress and manage ingredients effectively.
        `
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    mode: {
      control: 'select',
      options: ['prep', 'shopping', 'cook'],
      description: 'Mode affects styling and behavior'
    },
    showProgress: {
      control: 'boolean',
      description: 'Whether to show progress indicator'
    },
    allowNotes: {
      control: 'boolean',
      description: 'Whether to allow notes on ingredients'
    },
    servings: {
      control: { type: 'number', min: 1, max: 12 },
      description: 'Number of servings (affects quantity display)'
    }
  },
};

export default meta;
type Story = StoryObj<typeof IngredientChecklist>;

// Sample ingredient data
const sampleIngredients: Ingredient[] = [
  {
    id: '1',
    name: 'all-purpose flour',
    quantity: '2',
    measurement: 'cups',
    category: 'Dry Ingredients'
  },
  {
    id: '2', 
    name: 'baking soda',
    quantity: '1',
    measurement: 'tsp',
    category: 'Dry Ingredients'
  },
  {
    id: '3',
    name: 'ground cinnamon',
    quantity: '1',
    measurement: 'tsp',
    category: 'Dry Ingredients'
  },
  {
    id: '4',
    name: 'salt',
    quantity: '½',
    measurement: 'tsp',
    category: 'Dry Ingredients'
  },
  {
    id: '5',
    name: 'ripe apples, peeled and diced',
    quantity: '3',
    measurement: 'large',
    category: 'Wet Ingredients'
  },
  {
    id: '6',
    name: 'melted butter',
    quantity: '⅓',
    measurement: 'cup',
    category: 'Wet Ingredients'
  },
  {
    id: '7',
    name: 'brown sugar',
    quantity: '¾',
    measurement: 'cup',
    category: 'Wet Ingredients'
  },
  {
    id: '8',
    name: 'large egg',
    quantity: '1',
    measurement: '',
    category: 'Wet Ingredients'
  },
  {
    id: '9',
    name: 'vanilla extract',
    quantity: '1',
    measurement: 'tsp',
    category: 'Wet Ingredients'
  }
];

// Interactive wrapper component for stories
const InteractiveWrapper = (props: Omit<Parameters<typeof IngredientChecklist>[0], 'checkedItems' | 'onItemCheck'>) => {
  const [checkedItems, setCheckedItems] = useState<string[]>([]);

  const handleItemCheck = (ingredientId: string, checked: boolean) => {
    setCheckedItems(prev => 
      checked 
        ? [...prev, ingredientId]
        : prev.filter(id => id !== ingredientId)
    );
  };

  return (
    <IngredientChecklist
      {...props}
      checkedItems={checkedItems}
      onItemCheck={handleItemCheck}
    />
  );
};

export const Default: Story = {
  render: (args) => <InteractiveWrapper {...args} />,
  args: {
    ingredients: sampleIngredients,
    title: 'Apple Cinnamon Bread Ingredients',
    showProgress: true,
    allowNotes: false,
    servings: 1,
    mode: 'prep'
  },
};

export const PrepMode: Story = {
  render: (args) => <InteractiveWrapper {...args} />,
  args: {
    ingredients: sampleIngredients,
    title: 'Prep Phase - Mise en Place',
    showProgress: true,
    allowNotes: true,
    servings: 1,
    mode: 'prep'
  },
  parameters: {
    docs: {
      description: {
        story: 'Prep mode is optimized for organizing ingredients before cooking. Features warm orange colors and note-taking capability for substitutions.'
      }
    }
  }
};

export const ShoppingMode: Story = {
  render: (args) => <InteractiveWrapper {...args} />,
  args: {
    ingredients: sampleIngredients,
    title: 'Shopping List',
    showProgress: true,
    allowNotes: false,
    servings: 1,
    mode: 'shopping'
  },
  parameters: {
    docs: {
      description: {
        story: 'Shopping mode uses blue colors to indicate items to purchase. Great for grocery shopping preparation.'
      }
    }
  }
};

export const CookMode: Story = {
  render: (args) => <InteractiveWrapper {...args} />,
  args: {
    ingredients: sampleIngredients,
    title: 'Cooking Checklist',
    showProgress: true,
    allowNotes: false,
    servings: 1,
    mode: 'cook'
  },
  parameters: {
    docs: {
      description: {
        story: 'Cook mode features green colors and is optimized for tracking ingredient additions during active cooking.'
      }
    }
  }
};

export const MultipleServings: Story = {
  render: (args) => <InteractiveWrapper {...args} />,
  args: {
    ingredients: sampleIngredients,
    title: 'Recipe for 4 People',
    showProgress: true,
    allowNotes: false,
    servings: 4,
    mode: 'prep'
  },
  parameters: {
    docs: {
      description: {
        story: 'When servings is greater than 1, quantities are automatically adjusted. Notice how "2 cups" becomes "8 cups" for 4 servings.'
      }
    }
  }
};

export const WithNotes: Story = {
  render: (args) => <InteractiveWrapper {...args} />,
  args: {
    ingredients: sampleIngredients.slice(0, 4), // Fewer ingredients for clarity
    title: 'Recipe with Substitutions',
    showProgress: true,
    allowNotes: true,
    servings: 1,
    mode: 'prep'
  },
  parameters: {
    docs: {
      description: {
        story: 'When allowNotes is enabled, users can add substitutions or modifications for each ingredient. Notes are persisted in localStorage.'
      }
    }
  }
};

export const EmptyState: Story = {
  render: (args) => <InteractiveWrapper {...args} />,
  args: {
    ingredients: [],
    title: 'No Ingredients',
    showProgress: true,
    allowNotes: false,
    servings: 1,
    mode: 'prep'
  },
  parameters: {
    docs: {
      description: {
        story: 'Empty state when no ingredients are provided.'
      }
    }
  }
};

export const PartiallyCompleted: Story = {
  render: () => {
    const [checkedItems, setCheckedItems] = useState<string[]>(['1', '3', '5']); // Pre-check some items

    const handleItemCheck = (ingredientId: string, checked: boolean) => {
      setCheckedItems(prev => 
        checked 
          ? [...prev, ingredientId]
          : prev.filter(id => id !== ingredientId)
      );
    };

    return (
      <IngredientChecklist
        ingredients={sampleIngredients}
        checkedItems={checkedItems}
        onItemCheck={handleItemCheck}
        title="Partially Completed Recipe"
        showProgress={true}
        allowNotes={false}
        servings={1}
        mode="prep"
      />
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Example showing a partially completed ingredient checklist with some items already checked off.'
      }
    }
  }
};