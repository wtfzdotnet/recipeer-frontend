import type { Meta, StoryObj } from '@storybook/react-vite';
import { Progress } from './progress';

const meta = {
  title: 'Atoms/Progress',
  component: Progress,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Progress component for showing completion status. Used to indicate loading, completion, or any measurable progress.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: { type: 'range', min: 0, max: 100, step: 1 },
      description: 'Progress value (0-100)',
    },
    max: {
      control: { type: 'number', min: 1, max: 200, step: 1 },
      description: 'Maximum value',
    },
    className: {
      control: 'text',
      description: 'Custom CSS class',
    },
  },
} satisfies Meta<typeof Progress>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: 50,
  },
};

export const Empty: Story = {
  args: {
    value: 0,
  },
};

export const Full: Story = {
  args: {
    value: 100,
  },
};

export const Partial: Story = {
  args: {
    value: 75,
  },
};

export const Low: Story = {
  args: {
    value: 25,
  },
};

export const CustomMax: Story = {
  args: {
    value: 150,
    max: 200,
  },
};

export const RecipeProgress: Story = {
  args: {
    value: 60,
    'aria-label': 'Recipe completion progress',
  },
  parameters: {
    docs: {
      description: {
        story: 'Progress bar showing recipe completion status - realistic usage example for cooking apps.',
      },
    },
  },
};

export const CookingSteps: Story = {
  args: {
    value: 3,
    max: 5,
    'aria-label': 'Cooking steps completed',
  },
  parameters: {
    docs: {
      description: {
        story: 'Progress bar for tracking cooking steps (3 out of 5 steps completed).',
      },
    },
  },
};

export const IngredientPrep: Story = {
  args: {
    value: 80,
    'aria-label': 'Ingredient preparation progress',
  },
  parameters: {
    docs: {
      description: {
        story: 'Progress bar showing ingredient preparation completion.',
      },
    },
  },
};