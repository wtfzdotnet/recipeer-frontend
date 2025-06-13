import type { Meta, StoryObj } from '@storybook/react-vite';
import { Badge } from '../components/ui/badge';
import { Clock, Users, Flame, Leaf, Award } from 'lucide-react';

const meta: Meta<typeof Badge> = {
  title: 'Design System/Components/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A small status descriptor for UI elements. Perfect for tags, categories, difficulty levels, and metadata in recipe applications.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'secondary', 'destructive', 'outline'],
      description: 'The visual style variant of the badge',
    },
    children: {
      control: 'text',
      description: 'The content of the badge',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Badge',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Secondary',
  },
};

export const Destructive: Story = {
  args: {
    variant: 'destructive',
    children: 'Destructive',
  },
};

export const Outline: Story = {
  args: {
    variant: 'outline',
    children: 'Outline',
  },
};

// Recipe-specific badge examples
export const DifficultyLevels: Story = {
  render: () => (
    <div className="flex gap-2">
      <Badge variant="secondary" className="bg-green-100 text-green-800 border-green-200">
        Easy
      </Badge>
      <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 border-yellow-200">
        Medium
      </Badge>
      <Badge variant="secondary" className="bg-red-100 text-red-800 border-red-200">
        Hard
      </Badge>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Difficulty level badges with custom colors.',
      },
    },
  },
};

export const DietaryTags: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge variant="outline" className="text-green-600 border-green-300">
        <Leaf className="mr-1 h-3 w-3" />
        Vegetarian
      </Badge>
      <Badge variant="outline" className="text-blue-600 border-blue-300">
        Gluten-Free
      </Badge>
      <Badge variant="outline" className="text-purple-600 border-purple-300">
        Dairy-Free
      </Badge>
      <Badge variant="outline" className="text-orange-600 border-orange-300">
        Keto
      </Badge>
      <Badge variant="outline" className="text-pink-600 border-pink-300">
        Low-Carb
      </Badge>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Dietary restriction and lifestyle badges.',
      },
    },
  },
};

export const CookingTime: Story = {
  render: () => (
    <div className="flex gap-2">
      <Badge variant="secondary" className="bg-blue-50 text-blue-700 border-blue-200">
        <Clock className="mr-1 h-3 w-3" />
        15 min
      </Badge>
      <Badge variant="secondary" className="bg-orange-50 text-orange-700 border-orange-200">
        <Users className="mr-1 h-3 w-3" />
        4 servings
      </Badge>
      <Badge variant="secondary" className="bg-red-50 text-red-700 border-red-200">
        <Flame className="mr-1 h-3 w-3" />
        Spicy
      </Badge>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Recipe metadata badges with icons.',
      },
    },
  },
};

export const Categories: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge>Breakfast</Badge>
      <Badge>Quick & Easy</Badge>
      <Badge>Comfort Food</Badge>
      <Badge>Dessert</Badge>
      <Badge>Appetizer</Badge>
      <Badge>Main Course</Badge>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Recipe category badges.',
      },
    },
  },
};

export const SpecialBadges: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white border-0">
        <Award className="mr-1 h-3 w-3" />
        Chef's Choice
      </Badge>
      <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0">
        ⭐ Featured
      </Badge>
      <Badge className="bg-gradient-to-r from-green-400 to-blue-500 text-white border-0">
        🔥 Trending
      </Badge>
      <Badge className="bg-gradient-to-r from-red-500 to-pink-500 text-white border-0">
        ❤️ Popular
      </Badge>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Special highlight badges with gradients and emojis.',
      },
    },
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge variant="default">Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="destructive">Destructive</Badge>
      <Badge variant="outline">Outline</Badge>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All badge variants in one view.',
      },
    },
  },
};

// Size variations (using className overrides)
export const Sizes: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Badge className="text-xs px-2 py-0.5">Small</Badge>
      <Badge>Default</Badge>
      <Badge className="text-sm px-3 py-1">Large</Badge>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Different badge sizes using className overrides.',
      },
    },
  },
};