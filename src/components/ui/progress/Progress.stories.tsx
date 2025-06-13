import type { Meta, StoryObj } from '@storybook/react';
import { Progress } from './progress';
import { Clock, ChefHat, CheckCircle } from 'lucide-react';

const meta: Meta<typeof Progress> = {
  title: 'Design System/Components/Data Display/Progress',
  component: Progress,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
# Progress Component

A versatile progress indicator component for tracking cooking workflows, meal preparation completion, and recipe progress in the recipe platform.

## Features

- **Recipe-Specific Variants**: cooking, prep, success, warning
- **Multiple Sizes**: small, default, large, extra-large
- **Label Support**: Optional labels and percentage display
- **Accessibility**: Proper ARIA attributes and screen reader support
- **Smooth Animations**: CSS transitions for progress changes

## Use Cases

- **Cooking Progress**: "Step 3 of 8", "Prep: 75% complete"
- **Recipe Completion**: Track user progress through recipe steps
- **Meal Prep**: Show batch cooking or weekly meal prep progress
- **Loading States**: Recipe data loading, image uploads
- **Skill Development**: Track cooking skill progression
        `
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: { type: 'range', min: 0, max: 100, step: 5 },
      description: 'Progress value between 0 and 100'
    },
    variant: {
      control: 'select',
      options: ['default', 'cooking', 'prep', 'success', 'warning'],
      description: 'Visual variant of the progress bar'
    },
    size: {
      control: 'select',
      options: ['sm', 'default', 'lg', 'xl'],
      description: 'Size of the progress bar'
    },
    showLabel: {
      control: 'boolean',
      description: 'Show progress label'
    },
    showPercentage: {
      control: 'boolean',
      description: 'Show percentage value'
    },
    label: {
      control: 'text',
      description: 'Custom label text'
    }
  }
};

export default meta;
type Story = StoryObj<typeof Progress>;

// Default progress bar
export const Default: Story = {
  args: {
    value: 60,
    showLabel: true,
    showPercentage: true,
  },
};

// All variants
export const Variants: Story = {
  render: () => (
    <div className="space-y-6 w-80">
      <div>
        <h4 className="text-sm font-medium mb-2">Default</h4>
        <Progress value={60} showLabel label="Overall Progress" showPercentage />
      </div>
      <div>
        <h4 className="text-sm font-medium mb-2">Cooking</h4>
        <Progress value={75} variant="cooking" showLabel label="Cooking Progress" showPercentage />
      </div>
      <div>
        <h4 className="text-sm font-medium mb-2">Prep</h4>
        <Progress value={40} variant="prep" showLabel label="Prep Work" showPercentage />
      </div>
      <div>
        <h4 className="text-sm font-medium mb-2">Success</h4>
        <Progress value={100} variant="success" showLabel label="Completed" showPercentage />
      </div>
      <div>
        <h4 className="text-sm font-medium mb-2">Warning</h4>
        <Progress value={25} variant="warning" showLabel label="Behind Schedule" showPercentage />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All available progress variants with their distinct styling and use cases.'
      }
    }
  }
};

// Different sizes
export const Sizes: Story = {
  render: () => (
    <div className="space-y-6 w-80">
      <div>
        <h4 className="text-sm font-medium mb-2">Small</h4>
        <Progress value={60} size="sm" showLabel label="Small Progress" showPercentage />
      </div>
      <div>
        <h4 className="text-sm font-medium mb-2">Default</h4>
        <Progress value={60} size="default" showLabel label="Default Progress" showPercentage />
      </div>
      <div>
        <h4 className="text-sm font-medium mb-2">Large</h4>
        <Progress value={60} size="lg" showLabel label="Large Progress" showPercentage />
      </div>
      <div>
        <h4 className="text-sm font-medium mb-2">Extra Large</h4>
        <Progress value={60} size="xl" showLabel label="Extra Large Progress" showPercentage />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Progress component in different sizes for various use cases.'
      }
    }
  }
};

// Recipe cooking workflow
export const CookingWorkflow: Story = {
  render: () => (
    <div className="space-y-6 w-96">
      <div className="border rounded-lg p-6 bg-white dark:bg-gray-950">
        <div className="flex items-center gap-3 mb-4">
          <ChefHat className="h-6 w-6 text-orange-500" />
          <h3 className="text-lg font-semibold">Pasta Carbonara</h3>
        </div>
        
        <div className="space-y-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Clock className="h-4 w-4 text-blue-500" />
              <span className="text-sm font-medium">Prep Work</span>
            </div>
            <Progress value={100} variant="prep" showPercentage />
            <p className="text-xs text-muted-foreground mt-1">All ingredients ready</p>
          </div>
          
          <div>
            <div className="flex items-center gap-2 mb-2">
              <ChefHat className="h-4 w-4 text-orange-500" />
              <span className="text-sm font-medium">Cooking Steps</span>
            </div>
            <Progress value={62} variant="cooking" showLabel label="Step 5 of 8" showPercentage />
            <p className="text-xs text-muted-foreground mt-1">Adding pasta to pan</p>
          </div>
          
          <div>
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span className="text-sm font-medium">Overall Progress</span>
            </div>
            <Progress value={75} variant="default" showPercentage />
            <p className="text-xs text-muted-foreground mt-1">Almost done!</p>
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Complete cooking workflow example showing prep, cooking steps, and overall progress.'
      }
    }
  }
};

// Meal prep tracking
export const MealPrepTracking: Story = {
  render: () => (
    <div className="space-y-6 w-96">
      <div className="border rounded-lg p-6 bg-white dark:bg-gray-950">
        <h3 className="text-lg font-semibold mb-4">Weekly Meal Prep</h3>
        
        <div className="space-y-4">
          <div>
            <Progress value={100} variant="success" showLabel label="Sunday: Chicken & Rice" showPercentage />
          </div>
          <div>
            <Progress value={100} variant="success" showLabel label="Monday: Pasta Salad" showPercentage />
          </div>
          <div>
            <Progress value={80} variant="cooking" showLabel label="Tuesday: Stir Fry" showPercentage />
          </div>
          <div>
            <Progress value={60} variant="prep" showLabel label="Wednesday: Soup" showPercentage />
          </div>
          <div>
            <Progress value={30} variant="default" showLabel label="Thursday: Tacos" showPercentage />
          </div>
          <div>
            <Progress value={0} variant="default" showLabel label="Friday: Pizza Night" showPercentage />
          </div>
          <div>
            <Progress value={0} variant="default" showLabel label="Saturday: Brunch" showPercentage />
          </div>
        </div>
        
        <div className="mt-6 pt-4 border-t">
          <Progress value={53} variant="cooking" showLabel label="Week Progress" showPercentage size="lg" />
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Meal prep tracking example showing daily progress and weekly overview.'
      }
    }
  }
};

// Skill development tracking
export const SkillDevelopment: Story = {
  render: () => (
    <div className="space-y-6 w-96">
      <div className="border rounded-lg p-6 bg-white dark:bg-gray-950">
        <h3 className="text-lg font-semibold mb-4">Cooking Skills Progress</h3>
        
        <div className="space-y-4">
          <div>
            <Progress value={90} variant="success" showLabel label="Basic Knife Skills" showPercentage />
            <p className="text-xs text-muted-foreground mt-1">9/10 techniques mastered</p>
          </div>
          <div>
            <Progress value={75} variant="cooking" showLabel label="Pasta Techniques" showPercentage />
            <p className="text-xs text-muted-foreground mt-1">6/8 recipes completed</p>
          </div>
          <div>
            <Progress value={45} variant="prep" showLabel label="Sauce Making" showPercentage />
            <p className="text-xs text-muted-foreground mt-1">5/11 sauces learned</p>
          </div>
          <div>
            <Progress value={20} variant="warning" showLabel label="Baking Fundamentals" showPercentage />
            <p className="text-xs text-muted-foreground mt-1">2/10 recipes attempted</p>
          </div>
          <div>
            <Progress value={5} variant="default" showLabel label="Advanced Techniques" showPercentage />
            <p className="text-xs text-muted-foreground mt-1">Just getting started</p>
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Skill development tracking showing user progress across different cooking categories.'
      }
    }
  }
};

// Loading states
export const LoadingStates: Story = {
  render: () => (
    <div className="space-y-6 w-80">
      <div>
        <h4 className="text-sm font-medium mb-2">Recipe Loading</h4>
        <Progress value={35} variant="default" showLabel label="Loading recipe data..." />
      </div>
      <div>
        <h4 className="text-sm font-medium mb-2">Image Upload</h4>
        <Progress value={78} variant="prep" showLabel label="Uploading image..." showPercentage />
      </div>
      <div>
        <h4 className="text-sm font-medium mb-2">Processing</h4>
        <Progress value={100} variant="success" showLabel label="Complete!" showPercentage />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Progress bars used for loading states and data processing.'
      }
    }
  }
};

// Interactive demo
export const InteractiveDemo: Story = {
  render: () => {
    const [progress, setProgress] = React.useState(0)
    
    React.useEffect(() => {
      const timer = setTimeout(() => {
        setProgress((prev) => {
          if (prev >= 100) return 0
          return prev + 10
        })
      }, 500)
      
      return () => clearTimeout(timer)
    }, [progress])
    
    return (
      <div className="w-80">
        <Progress 
          value={progress} 
          variant="cooking" 
          showLabel 
          label="Cooking in Progress..." 
          showPercentage 
          size="lg"
        />
        <p className="text-sm text-muted-foreground mt-2">
          Watch the cooking progress animation
        </p>
      </div>
    )
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive demo showing progress animation and real-time updates.'
      }
    }
  }
};