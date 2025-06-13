import type { Meta, StoryObj } from '@storybook/react-vite';
import { Mail, Search, Eye, EyeOff } from 'lucide-react';
import { Input } from './Input';

const meta: Meta<typeof Input> = {
  title: 'Atoms/Input',
  component: Input,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
# Input Component

A flexible input component with support for labels, validation, helper text, and icons.

## Features

- **Accessibility**: Built with proper ARIA attributes and keyboard navigation
- **Validation**: Support for error states and helper text
- **Icons**: Start and end icon support
- **Responsive**: Works across all device sizes
- **Consistent**: Follows the design system color and spacing tokens

## Usage

Use the Input component for form fields where users need to enter text data.
        `
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: 'Label text displayed above the input',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text shown when input is empty',
    },
    error: {
      control: 'text',
      description: 'Error message to display below the input',
    },
    helperText: {
      control: 'text',
      description: 'Helper text to display below the input',
    },
    required: {
      control: 'boolean',
      description: 'Whether the field is required (shows asterisk)',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the input is disabled',
    },
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'search', 'tel', 'url'],
      description: 'The input type',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic variants
export const Default: Story = {
  args: {
    placeholder: 'Enter text...',
  },
};

export const WithLabel: Story = {
  args: {
    label: 'Recipe Name',
    placeholder: 'Enter recipe name...',
  },
};

export const Required: Story = {
  args: {
    label: 'Email Address',
    placeholder: 'Enter your email...',
    type: 'email',
    required: true,
  },
};

export const WithError: Story = {
  args: {
    label: 'Password',
    placeholder: 'Enter password...',
    type: 'password',
    error: 'Password must be at least 8 characters long',
    value: '123',
  },
};

export const WithHelperText: Story = {
  args: {
    label: 'Username',
    placeholder: 'Enter username...',
    helperText: 'Username must be 3-20 characters and contain only letters, numbers, and underscores',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled Field',
    placeholder: 'This field is disabled',
    disabled: true,
  },
};

// With icons
export const WithStartIcon: Story = {
  args: {
    label: 'Email',
    placeholder: 'Enter your email...',
    type: 'email',
    startIcon: <Mail className="h-4 w-4" />,
  },
};

export const WithEndIcon: Story = {
  args: {
    label: 'Search',
    placeholder: 'Search recipes...',
    type: 'search',
    endIcon: <Search className="h-4 w-4" />,
  },
};

export const WithBothIcons: Story = {
  args: {
    label: 'Search with Email',
    placeholder: 'Search by email...',
    startIcon: <Mail className="h-4 w-4" />,
    endIcon: <Search className="h-4 w-4" />,
  },
};

// Different types
export const Email: Story = {
  args: {
    label: 'Email Address',
    type: 'email',
    placeholder: 'user@example.com',
    startIcon: <Mail className="h-4 w-4" />,
  },
};

export const Password: Story = {
  args: {
    label: 'Password',
    type: 'password',
    placeholder: 'Enter password...',
    endIcon: <Eye className="h-4 w-4" />,
  },
};

export const SearchInput: Story = {
  args: {
    label: 'Search Recipes',
    type: 'search',
    placeholder: 'Search for recipes...',
    startIcon: <Search className="h-4 w-4" />,
  },
};

// Interactive examples
export const AllStates = {
  render: () => (
    <div className="space-y-6 w-80">
      <Input 
        label="Default State" 
        placeholder="Normal input..." 
      />
      <Input 
        label="Focused State" 
        placeholder="Click to focus..." 
        autoFocus
      />
      <Input 
        label="Filled State" 
        value="Filled with content"
        readOnly
      />
      <Input 
        label="Error State" 
        placeholder="Has error..." 
        error="This field has an error"
      />
      <Input 
        label="Disabled State" 
        placeholder="Disabled input..." 
        disabled
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Demonstration of all possible input states for design reference.'
      }
    }
  }
};

export const FormExample = {
  render: () => (
    <div className="space-y-4 w-80">
      <h3 className="text-lg font-semibold">Recipe Form Example</h3>
      <Input 
        label="Recipe Name" 
        placeholder="Grandma's Apple Pie"
        required
      />
      <Input 
        label="Prep Time" 
        placeholder="15 minutes"
        helperText="Time needed to prepare ingredients"
      />
      <Input 
        label="Cooking Time" 
        placeholder="45 minutes"
        helperText="Active cooking/baking time"
      />
      <Input 
        label="Chef Email" 
        type="email"
        placeholder="chef@example.com"
        startIcon={<Mail className="h-4 w-4" />}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Example of how inputs work together in a typical recipe form.'
      }
    }
  }
};