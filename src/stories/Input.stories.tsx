import type { Meta, StoryObj } from '@storybook/react-vite';
import { Input } from '../components/ui/input';
import { Search, Mail, User, Lock } from 'lucide-react';

const meta: Meta<typeof Input> = {
  title: 'Design System/Components/Input',
  component: Input,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A customizable input component built for form interactions. Supports all standard input types with focus states and accessibility features.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['text', 'password', 'email', 'search', 'number', 'tel', 'url'],
      description: 'The type of input',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the input',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: 'Enter text...',
  },
};

export const Email: Story = {
  args: {
    type: 'email',
    placeholder: 'Enter your email',
  },
};

export const Password: Story = {
  args: {
    type: 'password',
    placeholder: 'Enter password',
  },
};

export const SearchInput: Story = {
  args: {
    type: 'search',
    placeholder: 'Search recipes...',
  },
};

export const Disabled: Story = {
  args: {
    placeholder: 'Disabled input',
    disabled: true,
  },
};

// Input with Label
export const WithLabel: Story = {
  render: () => (
    <div className="space-y-2">
      <label htmlFor="email" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
        Email address
      </label>
      <Input
        id="email"
        type="email"
        placeholder="m@example.com"
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Input with an associated label for better accessibility.',
      },
    },
  },
};

// Recipe-specific examples
export const RecipeTitle: Story = {
  render: () => (
    <div className="space-y-2 w-80">
      <label htmlFor="recipe-title" className="text-sm font-medium">
        Recipe Title
      </label>
      <Input
        id="recipe-title"
        placeholder="Grandma's Apple Pie"
        className="text-lg"
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Input styled for recipe titles with larger text.',
      },
    },
  },
};

export const CookingTime: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-4 w-80">
      <div className="space-y-2">
        <label htmlFor="prep-time" className="text-sm font-medium">
          Prep Time
        </label>
        <Input
          id="prep-time"
          type="number"
          placeholder="15"
          className="text-center"
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="cook-time" className="text-sm font-medium">
          Cook Time
        </label>
        <Input
          id="cook-time"
          type="number"
          placeholder="45"
          className="text-center"
        />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Number inputs for cooking times, centered for better UX.',
      },
    },
  },
};

export const SearchRecipes: Story = {
  render: () => (
    <div className="relative w-80">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
      <Input
        type="search"
        placeholder="Search for recipes..."
        className="pl-10"
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Search input with icon for recipe discovery.',
      },
    },
  },
};

// All Input Types Showcase
export const AllTypes: Story = {
  render: () => (
    <div className="space-y-6 w-80">
      <div className="space-y-2">
        <label className="text-sm font-medium">Text Input</label>
        <Input placeholder="Recipe name" />
      </div>
      
      <div className="space-y-2">
        <label className="text-sm font-medium">Email Input</label>
        <Input type="email" placeholder="chef@example.com" />
      </div>
      
      <div className="space-y-2">
        <label className="text-sm font-medium">Password Input</label>
        <Input type="password" placeholder="••••••••" />
      </div>
      
      <div className="space-y-2">
        <label className="text-sm font-medium">Search Input</label>
        <Input type="search" placeholder="Search ingredients..." />
      </div>
      
      <div className="space-y-2">
        <label className="text-sm font-medium">Number Input</label>
        <Input type="number" placeholder="4" />
      </div>
      
      <div className="space-y-2">
        <label className="text-sm font-medium">Disabled Input</label>
        <Input placeholder="Not editable" disabled />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Showcase of all supported input types and states.',
      },
    },
  },
};