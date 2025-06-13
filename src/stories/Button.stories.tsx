import type { Meta, StoryObj } from '@storybook/react-vite';
// Simple mock function for stories
const fn = () => () => {};
import { ChevronRight, Download, Heart } from 'lucide-react';

import { Button } from '../components/Button';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link'],
      description: 'The visual style variant of the button',
    },
    size: {
      control: 'select',
      options: ['default', 'sm', 'lg', 'icon'],
      description: 'The size of the button',
    },
    loading: { 
      control: 'boolean',
      description: 'Shows loading spinner and disables the button',
    },
    disabled: { 
      control: 'boolean',
      description: 'Disables the button',
    },
    children: {
      control: 'text',
      description: 'The content of the button',
    },
  },
  args: { onClick: fn() },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default variants
export const Default = {
  args: {
    children: 'Button',
    variant: 'default',
  },
};

export const Destructive = {
  args: {
    children: 'Delete',
    variant: 'destructive',
  },
};

export const Outline = {
  args: {
    children: 'Button',
    variant: 'outline',
  },
};

export const Secondary = {
  args: {
    children: 'Button',
    variant: 'secondary',
  },
};

export const Ghost = {
  args: {
    children: 'Button',
    variant: 'ghost',
  },
};

export const Link = {
  args: {
    children: 'Link Button',
    variant: 'link',
  },
};

// Sizes
export const Large = {
  args: {
    children: 'Large Button',
    size: 'lg',
  },
};

export const Small = {
  args: {
    children: 'Small Button',
    size: 'sm',
  },
};

// States
export const Loading = {
  args: {
    children: 'Loading...',
    loading: true,
  },
};

export const Disabled = {
  args: {
    children: 'Disabled',
    disabled: true,
  },
};

// With Icons
export const WithLeftIcon = {
  args: {
    children: 'Download',
    leftIcon: <Download />,
    variant: 'outline',
  },
};

export const WithRightIcon = {
  args: {
    children: 'Continue',
    rightIcon: <ChevronRight />,
  },
};

export const IconOnly = {
  args: {
    children: <Heart />,
    size: 'icon',
    variant: 'ghost',
  },
};

// Combinations
export const LoadingWithIcon = {
  args: {
    children: 'Processing...',
    loading: true,
    leftIcon: <Download />,
  },
};

// All variants showcase
export const AllVariants = {
  render: () => (
    <div className="flex flex-wrap gap-4 items-center">
      <Button variant="default">Default</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="link">Link</Button>
    </div>
  ),
};

export const AllSizes = {
  render: () => (
    <div className="flex flex-wrap gap-4 items-center">
      <Button size="sm">Small</Button>
      <Button size="default">Default</Button>
      <Button size="lg">Large</Button>
      <Button size="icon"><Heart /></Button>
    </div>
  ),
};