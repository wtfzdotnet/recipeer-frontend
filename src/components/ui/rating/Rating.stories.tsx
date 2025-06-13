import type { Meta, StoryObj } from '@storybook/react-vite';
// Simple mock function for stories
const fn = () => () => {};
import { Rating } from './rating';

const meta: Meta<typeof Rating> = {
  title: 'UI/Rating',
  component: Rating,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
A flexible rating component that supports both display and interactive modes.

## Features
- **5-star rating system** with half-star precision support
- **Display mode**: Show average rating with review count  
- **Interactive mode**: Allow users to set ratings with mouse and keyboard
- **Accessibility**: Full keyboard navigation and screen reader support
- **Size variants**: Small, medium, and large sizes
- **Customizable**: Support for different themes and styling

## Usage
Use this component for displaying recipe ratings, allowing user reviews, and any other rating scenarios in the application.
        `
      }
    }
  },
  argTypes: {
    value: {
      control: { type: 'range', min: 0, max: 5, step: 0.1 },
      description: 'Current rating value (0-5)'
    },
    onChange: {
      description: 'Callback fired when rating changes (interactive mode)'
    },
    readonly: {
      control: 'boolean',
      description: 'Whether the rating is read-only'
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size variant of the rating'
    },
    precision: {
      control: 'select', 
      options: [0.5, 1],
      description: 'Rating precision (0.5 for half-stars, 1 for whole stars)'
    },
    reviewCount: {
      control: { type: 'number', min: 0 },
      description: 'Number of reviews for this rating'
    },
    showReviewCount: {
      control: 'boolean',
      description: 'Whether to show the review count'
    }
  },
  args: {
    onChange: fn(),
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic display rating
export const Default: Story = {
  args: {
    value: 4.2,
    readonly: true,
    reviewCount: 127,
  },
};

// Interactive rating
export const Interactive: Story = {
  args: {
    value: 3,
    readonly: false,
    precision: 1,
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive rating that allows users to set values by clicking. Try clicking on the stars!'
      }
    }
  }
};

// Half-star precision
export const HalfStarPrecision: Story = {
  args: {
    value: 3.5,
    readonly: false,
    precision: 0.5,
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive rating with half-star precision. Click on the left or right side of stars to set half-star values.'
      }
    }
  }
};

// Size variants
export const SizeVariants: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="space-y-2">
        <h3 className="text-sm font-medium">Small</h3>
        <Rating value={4.5} size="sm" readonly reviewCount={89} />
      </div>
      <div className="space-y-2">
        <h3 className="text-sm font-medium">Medium (Default)</h3>
        <Rating value={4.5} size="md" readonly reviewCount={89} />
      </div>
      <div className="space-y-2">
        <h3 className="text-sm font-medium">Large</h3>
        <Rating value={4.5} size="lg" readonly reviewCount={89} />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Different size variants of the rating component.'
      }
    }
  }
};

// Recipe examples
export const RecipeExamples: Story = {
  render: () => (
    <div className="space-y-6 max-w-md">
      <div className="space-y-3">
        <h3 className="text-lg font-semibold">Recipe Card Ratings</h3>
        
        <div className="border rounded-lg p-4 space-y-3">
          <h4 className="font-medium">Spaghetti Carbonara</h4>
          <Rating value={4.8} readonly size="sm" reviewCount={234} />
          <p className="text-sm text-gray-600">Authentic Italian pasta dish</p>
        </div>

        <div className="border rounded-lg p-4 space-y-3">
          <h4 className="font-medium">Chocolate Chip Cookies</h4>
          <Rating value={4.3} readonly size="sm" reviewCount={156} />
          <p className="text-sm text-gray-600">Classic homemade cookies</p>
        </div>

        <div className="border rounded-lg p-4 space-y-3">
          <h4 className="font-medium">Caesar Salad</h4>
          <Rating value={3.9} readonly size="sm" reviewCount={87} />
          <p className="text-sm text-gray-600">Fresh romaine with homemade dressing</p>
        </div>
      </div>

      <div className="space-y-3">
        <h3 className="text-lg font-semibold">Rate This Recipe</h3>
        <div className="border rounded-lg p-4">
          <p className="text-sm text-gray-600 mb-3">How would you rate this recipe?</p>
          <Rating value={0} readonly={false} precision={0.5} size="lg" />
          <p className="text-xs text-gray-500 mt-2">Click to rate (supports half stars)</p>
        </div>
      </div>
    </div>
  ),
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: 'Real-world examples showing how the rating component would be used in recipe contexts.'
      }
    }
  }
};

// Different rating values
export const RatingValues: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-sm font-medium mb-2">Perfect Rating</p>
          <Rating value={5.0} readonly reviewCount={45} />
        </div>
        <div>
          <p className="text-sm font-medium mb-2">High Rating</p>
          <Rating value={4.7} readonly reviewCount={203} />
        </div>
        <div>
          <p className="text-sm font-medium mb-2">Good Rating</p>
          <Rating value={4.2} readonly reviewCount={78} />
        </div>
        <div>
          <p className="text-sm font-medium mb-2">Average Rating</p>
          <Rating value={3.1} readonly reviewCount={34} />
        </div>
        <div>
          <p className="text-sm font-medium mb-2">Low Rating</p>
          <Rating value={2.3} readonly reviewCount={12} />
        </div>
        <div>
          <p className="text-sm font-medium mb-2">No Rating</p>
          <Rating value={0} readonly showReviewCount={false} />
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Examples showing different rating values and how they appear.'
      }
    }
  }
};

// Without review count
export const WithoutReviewCount: Story = {
  args: {
    value: 4.1,
    readonly: true,
    showReviewCount: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Rating display without review count, useful in compact layouts.'
      }
    }
  }
};

// Accessibility demo
export const AccessibilityDemo: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="space-y-2">
        <h3 className="text-sm font-medium">Keyboard Navigation Demo</h3>
        <p className="text-xs text-gray-600">Focus the rating below and use arrow keys, number keys (1-5), Home, and End to navigate</p>
        <Rating value={3} readonly={false} precision={0.5} aria-label="Rate this recipe" />
      </div>
      
      <div className="space-y-2">
        <h3 className="text-sm font-medium">Screen Reader Friendly</h3>
        <p className="text-xs text-gray-600">This rating has proper ARIA labels and roles for screen readers</p>
        <Rating 
          value={4.5} 
          readonly 
          reviewCount={89} 
          aria-label="Customer rating: 4.5 out of 5 stars based on 89 reviews"
        />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Demonstration of accessibility features including keyboard navigation and screen reader support.'
      }
    }
  }
};

// Edge cases
export const EdgeCases: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-sm font-medium mb-2">Zero Rating</p>
          <Rating value={0} readonly />
        </div>
        <div>
          <p className="text-sm font-medium mb-2">Maximum Rating</p>
          <Rating value={5} readonly />
        </div>
        <div>
          <p className="text-sm font-medium mb-2">Decimal Precision</p>
          <Rating value={3.7} readonly />
        </div>
        <div>
          <p className="text-sm font-medium mb-2">Large Review Count</p>
          <Rating value={4.2} readonly reviewCount={12543} />
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Edge cases and boundary conditions for the rating component.'
      }
    }
  }
};