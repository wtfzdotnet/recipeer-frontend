import type { Meta, StoryObj } from '@storybook/react-vite';
import { Alert } from './alert';

const meta = {
  title: 'Molecules/Alert',
  component: Alert,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Alert component for important messages and notifications. Combines icon atoms with text content to create meaningful user feedback.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'destructive', 'success', 'warning', 'info'],
      description: 'Alert variant determining color and icon',
    },
    title: {
      control: 'text',
      description: 'Alert title text',
    },
    description: {
      control: 'text',
      description: 'Alert description text',
    },
    showIcon: {
      control: 'boolean',
      description: 'Whether to show the variant icon',
    },
    className: {
      control: 'text',
      description: 'Custom CSS class',
    },
  },
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Information',
    description: 'This is a default alert message.',
  },
};

export const Success: Story = {
  args: {
    variant: 'success',
    title: 'Recipe Saved!',
    description: 'Your recipe has been successfully saved to your collection.',
  },
};

export const Error: Story = {
  args: {
    variant: 'destructive',
    title: 'Upload Failed',
    description: 'Failed to upload recipe image. Please try again.',
  },
};

export const Warning: Story = {
  args: {
    variant: 'warning',
    title: 'Missing Ingredients',
    description: 'Some ingredients in this recipe are not in your pantry.',
  },
};

export const Info: Story = {
  args: {
    variant: 'info',
    title: 'Cooking Tip',
    description: 'For best results, let the dough rest for 30 minutes before baking.',
  },
};

export const WithoutIcon: Story = {
  args: {
    variant: 'success',
    title: 'Recipe Saved!',
    description: 'Your recipe has been successfully saved to your collection.',
    showIcon: false,
  },
};

export const TitleOnly: Story = {
  args: {
    variant: 'warning',
    title: 'Timer Started',
    showIcon: true,
  },
};

export const DescriptionOnly: Story = {
  args: {
    variant: 'info',
    description: 'Recipe preparation time: 15 minutes',
    showIcon: true,
  },
};

export const RecipeUploadSuccess: Story = {
  args: {
    variant: 'success',
    title: 'Recipe Published!',
    description: 'Your delicious recipe is now available for other home cooks to discover and try.',
  },
  parameters: {
    docs: {
      description: {
        story: 'Success alert for when a user successfully publishes a recipe.',
      },
    },
  },
};

export const CookingTimer: Story = {
  args: {
    variant: 'warning',
    title: 'Timer Running',
    description: '5 minutes remaining for your pasta to cook. Stay nearby!',
  },
  parameters: {
    docs: {
      description: {
        story: 'Warning alert for active cooking timers.',
      },
    },
  },
};

export const IngredientSubstitution: Story = {
  args: {
    variant: 'info',
    title: 'Ingredient Substitution',
    description: 'You can substitute heavy cream with coconut milk for a dairy-free version.',
  },
  parameters: {
    docs: {
      description: {
        story: 'Info alert providing helpful cooking substitutions.',
      },
    },
  },
};

export const NetworkError: Story = {
  args: {
    variant: 'destructive',
    title: 'Connection Lost',
    description: 'Unable to sync your recipes. Please check your internet connection and try again.',
  },
  parameters: {
    docs: {
      description: {
        story: 'Error alert for network connectivity issues.',
      },
    },
  },
};