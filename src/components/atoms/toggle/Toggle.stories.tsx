import type { Meta, StoryObj } from '@storybook/react-vite'
import { 
  Eye, 
  EyeOff, 
  Volume2, 
  VolumeX, 
  Bell, 
  BellOff,
  Globe,
  Monitor,
  Palette,
  Accessibility,
  Languages,
  Heart,
  Star,
  Bookmark,
  BookmarkCheck,
  AlertTriangle,
  Check
} from 'lucide-react'
import { Toggle } from './toggle'

// Simple mock function for stories
const fn = () => () => {};

const meta: Meta<typeof Toggle> = {
  title: 'Atoms/Toggle',
  component: Toggle,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Toggle component for accessibility preferences and cultural features with comprehensive keyboard and screen reader support.'
      }
    }
  },
  argTypes: {
    onPressedChange: { action: 'pressed-changed' },
    size: {
      control: { type: 'select' },
      options: ['sm', 'default', 'lg'],
      description: 'Size variant of the toggle'
    },
    variant: {
      control: { type: 'select' },
      options: ['default', 'outline'],
      description: 'Visual style variant'
    },
    labelPosition: {
      control: { type: 'select' },
      options: ['left', 'right', 'top', 'bottom'],
      description: 'Position of the label relative to toggle'
    },
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

// Default story
export const Default: Story = {
  args: {
    children: <Eye className="h-4 w-4" />,
    label: 'Show password',
    onPressedChange: fn(),
  }
}

// Accessibility features
export const AccessibilityFeatures: Story = {
  render: () => (
    <div className="space-y-6 w-96">
      <h3 className="text-lg font-semibold">Accessibility Settings</h3>
      
      <div className="space-y-4">
        <Toggle
          label="High Contrast Mode"
          helperText="Increase contrast for better visibility"
          defaultPressed={false}
          size="lg"
          onPressedChange={fn()}
        >
          <Palette className="h-4 w-4" />
        </Toggle>
        
        <Toggle
          label="Large Text Size"
          helperText="Increase font size for easier reading"
          defaultPressed={false}
          onPressedChange={fn()}
        >
          <Monitor className="h-4 w-4" />
        </Toggle>
        
        <Toggle
          label="Screen Reader Mode"
          helperText="Optimize interface for screen reading software"
          defaultPressed={false}
          onPressedChange={fn()}
        >
          <Accessibility className="h-4 w-4" />
        </Toggle>
        
        <Toggle
          label="Voice Navigation"
          helperText="Enable hands-free navigation while cooking"
          defaultPressed={true}
          onPressedChange={fn()}
        >
          <Volume2 className="h-4 w-4" />
        </Toggle>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Accessibility feature toggles for inclusive design and WCAG AA+ compliance.'
      }
    }
  }
}

// Cultural features
export const CulturalFeatures: Story = {
  render: () => (
    <div className="space-y-6 w-96">
      <h3 className="text-lg font-semibold">Cultural Features</h3>
      
      <div className="space-y-4">
        <Toggle
          label="Show Cultural Context"
          helperText="Display historical and cultural background for recipes"
          defaultPressed={true}
          onPressedChange={fn()}
        >
          <Globe className="h-4 w-4" />
        </Toggle>
        
        <Toggle
          label="Cultural Authenticity Warnings"
          helperText="Alert when recipes may not represent authentic traditions"
          defaultPressed={true}
          variant="outline"
          onPressedChange={fn()}
        >
          <AlertTriangle className="h-4 w-4" />
        </Toggle>
        
        <Toggle
          label="Heritage Recipe Contributions"
          helperText="Allow submission of traditional family recipes"
          defaultPressed={false}
          onPressedChange={fn()}
        >
          <Heart className="h-4 w-4" />
        </Toggle>
        
        <Toggle
          label="Multi-Language Support"
          helperText="Show recipe instructions in multiple languages"
          defaultPressed={false}
          onPressedChange={fn()}
        >
          <Languages className="h-4 w-4" />
        </Toggle>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Cultural features for respectful recipe sharing and heritage preservation.'
      }
    }
  }
}

// Visual variants
export const VisualVariants: Story = {
  render: () => (
    <div className="space-y-6 w-96">
      <h3 className="text-lg font-semibold">Visual Variants</h3>
      
      <div className="space-y-4">
        <Toggle
          label="Default Variant"
          variant="default"
          onPressedChange={fn()}
        >
          <Eye className="h-4 w-4" />
        </Toggle>
        
        <Toggle
          label="Outline Variant"
          variant="outline"
          onPressedChange={fn()}
        >
          <Eye className="h-4 w-4" />
        </Toggle>
        
        <Toggle
          label="Default Pressed"
          variant="default"
          defaultPressed={true}
          onPressedChange={fn()}
        >
          <EyeOff className="h-4 w-4" />
        </Toggle>
        
        <Toggle
          label="Outline Pressed"
          variant="outline"
          defaultPressed={true}
          onPressedChange={fn()}
        >
          <EyeOff className="h-4 w-4" />
        </Toggle>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Different visual styles and states for the toggle component.'
      }
    }
  }
}

// Size variants
export const SizeVariants: Story = {
  render: () => (
    <div className="space-y-6 w-96">
      <h3 className="text-lg font-semibold">Size Variants</h3>
      
      <div className="space-y-4">
        <Toggle
          label="Small Size"
          size="sm"
          onPressedChange={fn()}
        >
          <Volume2 className="h-3 w-3" />
        </Toggle>
        
        <Toggle
          label="Default Size"
          size="default"
          onPressedChange={fn()}
        >
          <Volume2 className="h-4 w-4" />
        </Toggle>
        
        <Toggle
          label="Large Size"
          size="lg"
          helperText="Better for touch accessibility"
          onPressedChange={fn()}
        >
          <Volume2 className="h-5 w-5" />
        </Toggle>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Different sizes for various use cases and accessibility needs.'
      }
    }
  }
}

// Label positions
export const LabelPositions: Story = {
  render: () => (
    <div className="space-y-8 w-full max-w-2xl">
      <h3 className="text-lg font-semibold">Label Positions</h3>
      
      <div className="grid grid-cols-2 gap-8">
        <div className="space-y-4">
          <h4 className="font-medium">Left Position</h4>
          <Toggle
            label="Toggle on left"
            labelPosition="left"
            onPressedChange={fn()}
          >
            <Star className="h-4 w-4" />
          </Toggle>
        </div>
        
        <div className="space-y-4">
          <h4 className="font-medium">Right Position</h4>
          <Toggle
            label="Toggle on right"
            labelPosition="right"
            onPressedChange={fn()}
          >
            <Star className="h-4 w-4" />
          </Toggle>
        </div>
        
        <div className="space-y-4">
          <h4 className="font-medium">Top Position</h4>
          <Toggle
            label="Toggle on top"
            labelPosition="top"
            onPressedChange={fn()}
          >
            <Star className="h-4 w-4" />
          </Toggle>
        </div>
        
        <div className="space-y-4">
          <h4 className="font-medium">Bottom Position</h4>
          <Toggle
            label="Toggle on bottom"
            labelPosition="bottom"
            onPressedChange={fn()}
          >
            <Star className="h-4 w-4" />
          </Toggle>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Different label positioning options for flexible layouts.'
      }
    }
  }
}

// States
export const States: Story = {
  render: () => (
    <div className="space-y-6 w-96">
      <h3 className="text-lg font-semibold">Toggle States</h3>
      
      <div className="space-y-4">
        <Toggle
          label="Default State"
          defaultPressed={false}
          onPressedChange={fn()}
        >
          <Bell className="h-4 w-4" />
        </Toggle>
        
        <Toggle
          label="Pressed State"
          defaultPressed={true}
          onPressedChange={fn()}
        >
          <BellOff className="h-4 w-4" />
        </Toggle>
        
        <Toggle
          label="Disabled State"
          disabled={true}
          onPressedChange={fn()}
        >
          <Bell className="h-4 w-4" />
        </Toggle>
        
        <Toggle
          label="Disabled Pressed"
          disabled={true}
          defaultPressed={true}
          onPressedChange={fn()}
        >
          <BellOff className="h-4 w-4" />
        </Toggle>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Different interaction states including disabled states.'
      }
    }
  }
}

// Without labels
export const WithoutLabels: Story = {
  render: () => (
    <div className="space-y-6 w-96">
      <h3 className="text-lg font-semibold">Icon-Only Toggles</h3>
      
      <div className="flex gap-4">
        <Toggle
          aria-label="Toggle bookmark"
          onPressedChange={fn()}
        >
          <Bookmark className="h-4 w-4" />
        </Toggle>
        
        <Toggle
          aria-label="Toggle favorite"
          defaultPressed={true}
          onPressedChange={fn()}
        >
          <Heart className="h-4 w-4" />
        </Toggle>
        
        <Toggle
          aria-label="Toggle rating"
          variant="outline"
          onPressedChange={fn()}
        >
          <Star className="h-4 w-4" />
        </Toggle>
        
        <Toggle
          aria-label="Toggle check"
          size="lg"
          defaultPressed={true}
          onPressedChange={fn()}
        >
          <Check className="h-5 w-5" />
        </Toggle>
      </div>
      
      <p className="text-sm text-muted-foreground">
        Icon-only toggles with proper ARIA labels for screen readers
      </p>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Icon-only toggles with proper accessibility labels.'
      }
    }
  }
}

// Recipe specific use cases
export const RecipeUseCase: Story = {
  render: () => (
    <div className="space-y-6 w-96">
      <h3 className="text-lg font-semibold">Recipe Features</h3>
      
      <div className="space-y-4">
        <Toggle
          label="Show Nutritional Information"
          helperText="Display calories, macros, and dietary information"
          defaultPressed={true}
          onPressedChange={fn()}
        >
          <Check className="h-4 w-4" />
        </Toggle>
        
        <Toggle
          label="Enable Cooking Timer Alerts"
          helperText="Get notifications for recipe timing"
          defaultPressed={false}
          onPressedChange={fn()}
        >
          <Bell className="h-4 w-4" />
        </Toggle>
        
        <Toggle
          label="Show Cultural Origins"
          helperText="Display heritage and traditional context"
          defaultPressed={true}
          onPressedChange={fn()}
        >
          <Globe className="h-4 w-4" />
        </Toggle>
        
        <Toggle
          label="Voice-Guided Instructions"
          helperText="Audio narration for hands-free cooking"
          defaultPressed={false}
          size="lg"
          onPressedChange={fn()}
        >
          <Volume2 className="h-4 w-4" />
        </Toggle>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Recipe platform specific toggle use cases with cultural and accessibility considerations.'
      }
    }
  }
}