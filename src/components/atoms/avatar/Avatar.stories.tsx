import type { Meta, StoryObj } from '@storybook/react-vite';
import { Avatar } from './avatar';

const meta: Meta<typeof Avatar> = {
  title: 'Atoms/Avatar',
  component: Avatar,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
# Avatar Component

The Avatar component displays user profile images with fallback text when images fail to load. 
Perfect for user profiles, chef showcases, and community member displays in recipe applications.

## Features

- **Image Loading**: Automatic fallback to initials when image fails
- **Size Variants**: Small, medium, and large preset sizes  
- **Accessibility**: Proper alt text and ARIA labels
- **Customizable**: Full styling control with className prop

## Usage

Ideal for:
- User profile displays
- Chef profile showcases
- Recipe author attribution
- Community features and social interactions
        `
      }
    }
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic Avatar
export const Default: Story = {
  render: () => (
    <Avatar 
      src="https://picsum.photos/seed/chef-maria/150/150" 
      alt="Chef Maria" 
      fallback="CM"
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Basic avatar with image and fallback for chef or user profile display.'
      }
    }
  }
};

// Fallback Avatar
export const WithFallback: Story = {
  render: () => (
    <Avatar 
      src="invalid-url" 
      alt="User" 
      fallback="JD"
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Avatar with fallback display when image fails to load, showing user initials.'
      }
    }
  }
};

// Size Variants
export const SizeVariants: Story = {
  render: () => (
    <div className="flex items-center space-x-4">
      <Avatar 
        src="https://picsum.photos/seed/chef-small/150/150" 
        alt="Small Avatar" 
        fallback="SM"
        size="sm"
      />
      <Avatar 
        src="https://picsum.photos/seed/chef-medium/150/150" 
        alt="Medium Avatar" 
        fallback="MD"
        size="md"
      />
      <Avatar 
        src="https://picsum.photos/seed/chef-large/150/150" 
        alt="Large Avatar" 
        fallback="LG"
        size="lg"
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Different avatar sizes - small (32px), medium (40px), and large (48px).'
      }
    }
  }
};