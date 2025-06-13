import type { Meta, StoryObj } from '@storybook/react-vite';
import { Slider } from './Slider';

const meta: Meta<typeof Slider> = {
  title: 'Molecules/Slider',
  component: Slider,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
# Slider Component

An enhanced slider component with label, error handling, and value formatting. Built for serving sizes, cooking times, and measurement adjustments in the recipe platform.

## Features

- **Accessibility** - Full ARIA support and keyboard navigation
- **Recipe Context** - Optimized for serving sizes, cooking times, and measurements
- **Value Formatting** - Custom formatters with prefixes and suffixes
- **Range Support** - Single value or range selection
- **Cultural Support** - Flexible number formatting for international users

## Usage

Use for serving size adjustments (1-12 servings), cooking time ranges (15-120 minutes), temperature settings, and quantity scaling.
        `
      }
    }
  },
  argTypes: {
    label: {
      control: 'text',
      description: 'Label text for the slider'
    },
    error: {
      control: 'text',
      description: 'Error message to display'
    },
    helperText: {
      control: 'text',
      description: 'Helper text to guide users'
    },
    min: {
      control: 'number',
      description: 'Minimum value'
    },
    max: {
      control: 'number',
      description: 'Maximum value'
    },
    step: {
      control: 'number',
      description: 'Step increment'
    },
    valuePrefix: {
      control: 'text',
      description: 'Prefix for value display'
    },
    valueSuffix: {
      control: 'text',
      description: 'Suffix for value display'
    },
    showValue: {
      control: 'boolean',
      description: 'Show current value'
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the slider is disabled'
    },
    required: {
      control: 'boolean',
      description: 'Whether the field is required'
    }
  }
};

export default meta;
type Story = StoryObj<typeof Slider>;

// Basic examples
export const Default: Story = {
  args: {
    label: 'Value',
    defaultValue: [50],
  }
};

export const ServingSize: Story = {
  args: {
    label: 'Serving Size',
    helperText: 'Adjust recipe quantities for your needs',
    min: 1,
    max: 12,
    step: 1,
    defaultValue: [4],
    valueSuffix: ' servings',
  }
};

export const CookingTime: Story = {
  args: {
    label: 'Cooking Time',
    helperText: 'Total preparation and cooking time',
    min: 15,
    max: 180,
    step: 5,
    defaultValue: [45],
    valueSuffix: ' minutes',
  }
};

export const Temperature: Story = {
  args: {
    label: 'Oven Temperature',
    helperText: 'Baking temperature in Fahrenheit',
    min: 250,
    max: 500,
    step: 25,
    defaultValue: [375],
    valueSuffix: '°F',
  }
};

export const SpiceLevel: Story = {
  args: {
    label: 'Spice Level',
    helperText: 'How spicy do you want this dish?',
    min: 1,
    max: 10,
    step: 1,
    defaultValue: [5],
    formatValue: (value: number) => {
      const levels = ['', 'Mild', 'Mild+', 'Medium-', 'Medium', 'Medium+', 'Hot-', 'Hot', 'Hot+', 'Extra Hot', 'Extreme'];
      return levels[value] || value.toString();
    }
  }
};

export const PortionScaling: Story = {
  args: {
    label: 'Recipe Scale',
    helperText: 'Scale recipe ingredients up or down',
    min: 0.25,
    max: 3,
    step: 0.25,
    defaultValue: [1],
    valuePrefix: 'x',
    formatValue: (value: number) => {
      if (value === 1) return '1x (Original)';
      if (value < 1) return `${value}x (Smaller)`;
      return `${value}x (Larger)`;
    }
  }
};

export const DifficultyLevel: Story = {
  args: {
    label: 'Recipe Difficulty',
    helperText: 'Filter recipes by cooking skill required',
    min: 1,
    max: 5,
    step: 1,
    defaultValue: [3],
    formatValue: (value: number) => {
      const levels = ['', 'Beginner', 'Easy', 'Intermediate', 'Advanced', 'Expert'];
      return levels[value] || value.toString();
    }
  }
};

// Range examples
export const TimeRange: Story = {
  args: {
    label: 'Cooking Time Range',
    helperText: 'Filter recipes by total cooking time',
    min: 15,
    max: 180,
    step: 15,
    defaultValue: [30, 90],
    valueSuffix: ' min',
    range: true,
  }
};

export const CalorieRange: Story = {
  args: {
    label: 'Calories per Serving',
    helperText: 'Filter recipes by calorie content',
    min: 100,
    max: 800,
    step: 50,
    defaultValue: [250, 500],
    valueSuffix: ' cal',
    range: true,
  }
};

// State examples
export const WithError: Story = {
  args: {
    label: 'Required Setting',
    error: 'Please select a value to continue',
    required: true,
    defaultValue: [0],
  }
};

export const Disabled: Story = {
  args: {
    label: 'Disabled Slider',
    helperText: 'This setting cannot be changed',
    disabled: true,
    defaultValue: [75],
  }
};

// Recipe scaling examples
export const RecipeScaling = {
  render: () => (
    <div className="space-y-8 w-96">
      <h3 className="text-lg font-semibold">Recipe Scaling</h3>
      
      <Slider
        label="Serving Size"
        helperText="Number of people to serve"
        min={1}
        max={12}
        step={1}
        defaultValue={[4]}
        valueSuffix=" servings"
      />
      
      <Slider
        label="Recipe Scale"
        helperText="Scale all ingredients proportionally"
        min={0.5}
        max={3}
        step={0.25}
        defaultValue={[1]}
        valuePrefix="x"
      />
      
      <Slider
        label="Spice Level"
        helperText="Adjust heat level to taste"
        min={1}
        max={5}
        step={1}
        defaultValue={[3]}
        formatValue={(value) => {
          const levels = ['', 'Mild', 'Medium-', 'Medium', 'Hot', 'Extra Hot'];
          return levels[value] || value.toString();
        }}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Recipe scaling controls for customizing serving sizes and intensity.'
      }
    }
  }
};

// Cooking preferences
export const CookingPreferences = {
  render: () => (
    <div className="space-y-8 w-96">
      <h3 className="text-lg font-semibold">Cooking Preferences</h3>
      
      <Slider
        label="Preferred Cooking Time"
        helperText="Maximum time you want to spend cooking"
        min={15}
        max={180}
        step={15}
        defaultValue={[60]}
        valueSuffix=" minutes"
      />
      
      <Slider
        label="Recipe Complexity"
        helperText="Your comfort level with complex recipes"
        min={1}
        max={5}
        step={1}
        defaultValue={[3]}
        formatValue={(value) => {
          const levels = ['', 'Simple', 'Easy', 'Moderate', 'Complex', 'Expert'];
          return levels[value] || value.toString();
        }}
      />
      
      <Slider
        label="Heat Preference"
        helperText="How spicy you like your food"
        min={1}
        max={10}
        step={1}
        defaultValue={[5]}
        formatValue={(value) => {
          if (value <= 2) return `${value} (Mild)`;
          if (value <= 5) return `${value} (Medium)`;
          if (value <= 8) return `${value} (Hot)`;
          return `${value} (Extra Hot)`;
        }}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'User preference settings for personalized recipe recommendations.'
      }
    }
  }
};

// Recipe filtering
export const RecipeFiltering = {
  render: () => (
    <div className="space-y-8 w-96">
      <h3 className="text-lg font-semibold">Recipe Filters</h3>
      
      <Slider
        label="Cooking Time Range"
        helperText="Find recipes within your time budget"
        min={15}
        max={180}
        step={15}
        defaultValue={[30, 90]}
        valueSuffix=" min"
        range={true}
      />
      
      <Slider
        label="Calorie Range"
        helperText="Filter by calories per serving"
        min={100}
        max={800}
        step={50}
        defaultValue={[250, 500]}
        valueSuffix=" cal"
        range={true}
      />
      
      <Slider
        label="Serving Size"
        helperText="Recipes that serve this many people"
        min={1}
        max={12}
        step={1}
        defaultValue={[2, 6]}
        valueSuffix=" servings"
        range={true}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Range sliders for filtering recipes by multiple criteria.'
      }
    }
  }
};