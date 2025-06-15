import type { Meta, StoryObj } from '@storybook/react-vite';
import DifficultyIndicator from './DifficultyIndicator';

const meta: Meta<typeof DifficultyIndicator> = {
  title: 'Molecules/DifficultyIndicator',
  component: DifficultyIndicator,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
# Recipe Difficulty Indicator

A comprehensive component for displaying recipe difficulty levels with visual indicators, detailed skill factor breakdowns, and multiple display variants.

## Features

- **Multi-level difficulty system** (Beginner, Intermediate, Advanced)
- **Icon and color indicators** with accessibility compliance
- **Detailed skill factor breakdown** (prep, technique, time)
- **Cultural cooking technique awareness**
- **Multiple display variants** (compact, detailed, icon-only)
- **Accessibility-compliant colors** with semantic meaning
- **Mobile-friendly sizing** and responsive design
- **Internationalization support** ready

## Usage

- **Recipe Cards**: Quick difficulty assessment with compact variant
- **Recipe Filters**: Filter by skill level using icon-only variant
- **Search Results**: Sort by difficulty with detailed breakdowns
- **User Onboarding**: Match recipes to user skill with factor details

## Accessibility

All color combinations meet WCAG 2.1 AA contrast requirements. Screen readers are provided with proper labels and descriptions.
        `
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    level: {
      control: 'select',
      options: ['beginner', 'intermediate', 'advanced'],
      description: 'Difficulty level of the recipe'
    },
    variant: {
      control: 'select',
      options: ['compact', 'detailed', 'icon-only'],
      description: 'Display variant of the difficulty indicator'
    },
    showDetails: {
      control: 'boolean',
      description: 'Show detailed breakdown of skill factors'
    },
    factors: {
      control: 'object',
      description: 'Optional detailed factors breakdown (1-5 scale for each)'
    }
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

// Sample factors data
const sampleFactors = {
  prep: 3,
  technique: 2,
  time: 4
};

// Default story
export const Default: Story = {
  args: {
    level: 'intermediate',
    variant: 'compact'
  },
  parameters: {
    docs: {
      description: {
        story: 'Default compact difficulty indicator showing intermediate level with color-coded visual cues.'
      }
    }
  }
};

// Compact variant story
export const Compact: Story = {
  args: {
    level: 'beginner',
    variant: 'compact',
    showDetails: true,
    factors: sampleFactors
  },
  parameters: {
    docs: {
      description: {
        story: 'Compact variant with detailed factor breakdown. Perfect for recipe cards and lists.'
      }
    }
  }
};

// Detailed variant story
export const Detailed: Story = {
  args: {
    level: 'advanced',
    variant: 'detailed',
    showDetails: true,
    factors: {
      prep: 5,
      technique: 5,
      time: 4
    }
  },
  parameters: {
    docs: {
      description: {
        story: 'Detailed variant with full skill breakdown. Ideal for recipe detail pages and user guidance.'
      }
    }
  }
};

// Icon-only variant story
export const IconOnly: Story = {
  args: {
    level: 'intermediate',
    variant: 'icon-only'
  },
  parameters: {
    docs: {
      description: {
        story: 'Icon-only variant for minimal space usage. Perfect for filters and compact displays.'
      }
    }
  }
};

// All difficulty levels showcase
export const AllLevels: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-3">Difficulty Levels - Compact</h3>
        <div className="space-y-3">
          <DifficultyIndicator level="beginner" variant="compact" />
          <DifficultyIndicator level="intermediate" variant="compact" />
          <DifficultyIndicator level="advanced" variant="compact" />
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-3">Difficulty Levels - Icon Only</h3>
        <div className="flex items-center space-x-4">
          <DifficultyIndicator level="beginner" variant="icon-only" />
          <DifficultyIndicator level="intermediate" variant="icon-only" />
          <DifficultyIndicator level="advanced" variant="icon-only" />
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Showcase of all difficulty levels in different variants showing the progression from beginner to advanced.'
      }
    }
  }
};

// Detailed breakdown showcase
export const DetailedBreakdown: Story = {
  render: () => (
    <div className="space-y-6 max-w-md">
      <DifficultyIndicator 
        level="beginner" 
        variant="detailed" 
        showDetails={true}
        factors={{
          prep: 1,
          technique: 1,
          time: 2
        }}
      />
      <DifficultyIndicator 
        level="intermediate" 
        variant="detailed" 
        showDetails={true}
        factors={{
          prep: 3,
          technique: 3,
          time: 3
        }}
      />
      <DifficultyIndicator 
        level="advanced" 
        variant="detailed" 
        showDetails={true}
        factors={{
          prep: 5,
          technique: 4,
          time: 5
        }}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Detailed breakdown showing how skill factors (prep, technique, time) vary across difficulty levels.'
      }
    }
  }
};

// Responsive grid showcase
export const ResponsiveGrid: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <DifficultyIndicator 
        level="beginner" 
        variant="detailed" 
        showDetails={true}
        factors={{
          prep: 1,
          technique: 2,
          time: 1
        }}
      />
      <DifficultyIndicator 
        level="intermediate" 
        variant="detailed" 
        showDetails={true}
        factors={{
          prep: 3,
          technique: 3,
          time: 4
        }}
      />
      <DifficultyIndicator 
        level="advanced" 
        variant="detailed" 
        showDetails={true}
        factors={{
          prep: 4,
          technique: 5,
          time: 3
        }}
      />
      <DifficultyIndicator 
        level="beginner" 
        variant="detailed" 
        showDetails={true}
        factors={{
          prep: 2,
          technique: 1,
          time: 2
        }}
      />
      <DifficultyIndicator 
        level="intermediate" 
        variant="detailed" 
        showDetails={true}
        factors={{
          prep: 2,
          technique: 4,
          time: 3
        }}
      />
      <DifficultyIndicator 
        level="advanced" 
        variant="detailed" 
        showDetails={true}
        factors={{
          prep: 5,
          technique: 5,
          time: 5
        }}
      />
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: 'Responsive grid layout showing how difficulty indicators adapt to different screen sizes and content arrangements.'
      }
    }
  }
};

// Card integration example
export const CardIntegration: Story = {
  render: () => (
    <div className="space-y-4 max-w-sm">
      <div className="border rounded-lg p-4">
        <div className="h-32 bg-muted rounded mb-3 flex items-center justify-center text-muted-foreground">
          Recipe Image
        </div>
        <h3 className="font-semibold mb-2">Classic Chocolate Chip Cookies</h3>
        <p className="text-sm text-muted-foreground mb-3">Easy, delicious cookies perfect for beginners</p>
        
        <div className="flex items-center justify-between text-sm text-muted-foreground mb-3">
          <span>⏱️ 25min</span>
          <span>👥 24 cookies</span>
        </div>
        
        <DifficultyIndicator 
          level="beginner" 
          variant="compact"
          showDetails={false}
        />
      </div>
      
      <div className="border rounded-lg p-4">
        <div className="h-32 bg-gray-100 rounded mb-3 flex items-center justify-center text-gray-500">
          Recipe Image
        </div>
        <h3 className="font-semibold mb-2">Beef Wellington</h3>
        <p className="text-sm text-gray-600 mb-3">Classic French dish requiring advanced techniques</p>
        
        <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
          <span>⏱️ 3h 30min</span>
          <span>👥 6 servings</span>
        </div>
        
        <DifficultyIndicator 
          level="advanced" 
          variant="compact"
          showDetails={true}
          factors={{
            prep: 5,
            technique: 5,
            time: 4
          }}
        />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Example integration of difficulty indicators within cards, showing how they enhance recipe selection.'
      }
    }
  }
};

// Legacy integration example
export const LegacyIntegration: Story = {
  render: () => {
    // Example showing how to integrate with existing recipe data
    const legacyRecipes = [
      { name: 'Simple Salad', difficulty: 'Easy' as const, time: '10min' },
      { name: 'Chicken Stir Fry', difficulty: 'Medium' as const, time: '25min' },
      { name: 'Sourdough Bread', difficulty: 'Hard' as const, time: '8 hours' }
    ];

    return (
      <div className="space-y-4">
        <h3 className="text-lg font-semibold mb-3">Legacy Recipe Integration</h3>
        <p className="text-sm text-gray-600 mb-4">
          Example showing how to map existing difficulty levels ('Easy', 'Medium', 'Hard') 
          to the new component ('beginner', 'intermediate', 'advanced').
        </p>
        {legacyRecipes.map((recipe, index) => {
          // Map legacy difficulty to new format
          const level = recipe.difficulty === 'Easy' ? 'beginner' : 
                       recipe.difficulty === 'Medium' ? 'intermediate' : 'advanced';
          
          return (
            <div key={index} className="flex items-center justify-between p-3 border rounded">
              <div>
                <h4 className="font-medium">{recipe.name}</h4>
                <span className="text-sm text-gray-500">{recipe.time}</span>
              </div>
              <DifficultyIndicator level={level} variant="compact" />
            </div>
          );
        })}
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Example integration showing how to map legacy difficulty levels to the new component format.'
      }
    }
  }
};

// Accessibility showcase
export const Accessibility: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-3">Color Contrast Compliance</h3>
        <p className="text-sm text-gray-600 mb-4">
          All color combinations meet WCAG 2.1 AA contrast requirements for accessibility.
        </p>
        <div className="space-y-3">
          <div className="flex items-center space-x-4">
            <DifficultyIndicator level="beginner" variant="compact" />
            <span className="text-sm">Green: Safe for all vision types</span>
          </div>
          <div className="flex items-center space-x-4">
            <DifficultyIndicator level="intermediate" variant="compact" />
            <span className="text-sm">Amber: High contrast maintained</span>
          </div>
          <div className="flex items-center space-x-4">
            <DifficultyIndicator level="advanced" variant="compact" />
            <span className="text-sm">Red: Accessible red shade</span>
          </div>
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-3">Screen Reader Support</h3>
        <p className="text-sm text-gray-600 mb-4">
          Each indicator includes proper aria-labels and semantic HTML for screen readers.
        </p>
        <DifficultyIndicator 
          level="intermediate" 
          variant="detailed" 
          showDetails={true}
          factors={{ prep: 3, technique: 2, time: 4 }}
        />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Accessibility features including color contrast compliance and screen reader support.'
      }
    }
  }
};