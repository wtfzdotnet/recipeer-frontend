import type { Meta, StoryObj } from '@storybook/react-vite';
import { Switch } from './Switch';

const meta: Meta<typeof Switch> = {
  title: 'Design System/Components/Switch',
  component: Switch,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
# Switch Component

An enhanced switch component with label, description, and error handling. Built for toggles, preferences, and feature controls in the recipe platform.

## Features

- **Accessibility** - Full ARIA support and keyboard navigation
- **Recipe Context** - Optimized for measurement units, preferences, and feature toggles
- **Flexible Sizing** - Small, default, and large sizes
- **Clear Labeling** - Support for labels and descriptive text
- **Error Handling** - Validation states for required toggles

## Usage

Use for measurement unit toggles (metric/imperial), feature preferences (hide allergens), notification settings, and accessibility options.
        `
      }
    }
  },
  argTypes: {
    label: {
      control: 'text',
      description: 'Label text for the switch'
    },
    description: {
      control: 'text',
      description: 'Description text to explain the toggle'
    },
    error: {
      control: 'text',
      description: 'Error message to display'
    },
    checked: {
      control: 'boolean',
      description: 'Whether the switch is checked'
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the switch is disabled'
    },
    required: {
      control: 'boolean',
      description: 'Whether the field is required'
    },
    size: {
      control: 'radio',
      options: ['sm', 'default', 'lg'],
      description: 'Size variant'
    }
  }
};

export default meta;
type Story = StoryObj<typeof Switch>;

// Basic examples
export const Default: Story = {
  args: {
    label: 'Enable Feature',
  }
};

export const WithDescription: Story = {
  args: {
    label: 'Email Notifications',
    description: 'Receive updates about new recipes and cooking tips',
  }
};

export const MeasurementUnits: Story = {
  args: {
    label: 'Use Metric Units',
    description: 'Display measurements in metric (grams, celsius) instead of imperial (ounces, fahrenheit)',
    defaultChecked: false,
  }
};

export const DarkMode: Story = {
  args: {
    label: 'Dark Mode',
    description: 'Use dark theme for reduced eye strain while cooking',
    defaultChecked: true,
  }
};

export const HideAllergens: Story = {
  args: {
    label: 'Hide Allergen Recipes',
    description: 'Automatically filter out recipes containing your specified allergens',
    defaultChecked: true,
  }
};

export const VoiceCommands: Story = {
  args: {
    label: 'Voice Commands',
    description: 'Enable hands-free navigation while cooking',
    defaultChecked: false,
  }
};

export const AutoScale: Story = {
  args: {
    label: 'Auto-Scale Recipes',
    description: 'Automatically adjust ingredient quantities based on your preferred serving size',
    defaultChecked: true,
  }
};

export const SmartTiming: Story = {
  args: {
    label: 'Smart Cooking Timers',
    description: 'Send notifications and adjust timing based on your cooking pace',
    defaultChecked: false,
  }
};

// Size variants
export const SmallSize: Story = {
  args: {
    label: 'Small Switch',
    description: 'Compact size for dense layouts',
    size: 'sm',
  }
};

export const DefaultSize: Story = {
  args: {
    label: 'Default Switch',
    description: 'Standard size for most use cases',
    size: 'default',
  }
};

export const LargeSize: Story = {
  args: {
    label: 'Large Switch',
    description: 'Large size for mobile or accessibility',
    size: 'lg',
  }
};

// State examples
export const Checked: Story = {
  args: {
    label: 'Active Feature',
    description: 'This feature is currently enabled',
    checked: true,
  }
};

export const Disabled: Story = {
  args: {
    label: 'Disabled Feature',
    description: 'This feature is not available',
    disabled: true,
  }
};

export const DisabledChecked: Story = {
  args: {
    label: 'Locked Setting',
    description: 'This setting is permanently enabled',
    disabled: true,
    checked: true,
  }
};

export const WithError: Story = {
  args: {
    label: 'Required Agreement',
    description: 'You must agree to the terms to continue',
    error: 'Please accept the terms and conditions',
    required: true,
  }
};

// Recipe preferences example
export const RecipePreferences = {
  render: () => (
    <div className="space-y-6 w-96">
      <h3 className="text-lg font-semibold">Recipe Preferences</h3>
      
      <div className="space-y-4">
        <Switch
          label="Metric Measurements"
          description="Show weights in grams and temperatures in Celsius"
          defaultChecked={false}
        />
        
        <Switch
          label="Auto-Scale Servings"
          description="Automatically adjust recipes to your preferred serving size"
          defaultChecked={true}
        />
        
        <Switch
          label="Hide Allergen Recipes"
          description="Filter out recipes containing your specified allergens"
          defaultChecked={true}
        />
        
        <Switch
          label="Show Prep Time Only"
          description="Hide active cooking time, show only total preparation time"
          defaultChecked={false}
        />
        
        <Switch
          label="Simplified Instructions"
          description="Show condensed cooking steps for experienced cooks"
          defaultChecked={false}
        />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Complete recipe preference settings panel.'
      }
    }
  }
};

// Kitchen settings example
export const KitchenSettings = {
  render: () => (
    <div className="space-y-6 w-96">
      <h3 className="text-lg font-semibold">Kitchen Settings</h3>
      
      <div className="space-y-4">
        <Switch
          label="Voice Commands"
          description="Enable hands-free navigation while cooking"
          size="lg"
        />
        
        <Switch
          label="Smart Timers"
          description="Automatic timer adjustments based on cooking progress"
          size="lg"
          defaultChecked={true}
        />
        
        <Switch
          label="Ingredient Substitutions"
          description="Suggest alternatives for missing ingredients"
          size="lg"
          defaultChecked={true}
        />
        
        <Switch
          label="Shopping List Sync"
          description="Automatically add missing ingredients to shopping list"
          size="lg"
        />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Kitchen-specific feature toggles with large touch targets for mobile use.'
      }
    }
  }
};

// Accessibility settings
export const AccessibilitySettings = {
  render: () => (
    <div className="space-y-6 w-96">
      <h3 className="text-lg font-semibold">Accessibility</h3>
      
      <div className="space-y-4">
        <Switch
          label="High Contrast Mode"
          description="Increase contrast for better visibility"
          defaultChecked={false}
        />
        
        <Switch
          label="Large Text"
          description="Increase font size for easier reading"
          defaultChecked={false}
        />
        
        <Switch
          label="Screen Reader Mode"
          description="Optimize interface for screen reading software"
          defaultChecked={false}
        />
        
        <Switch
          label="Reduced Motion"
          description="Minimize animations and transitions"
          defaultChecked={false}
        />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Accessibility feature toggles for inclusive design.'
      }
    }
  }
};