import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Heart, ShoppingCart, Clock, CheckCircle, AlertTriangle } from 'lucide-react';
import { 
  Toast, 
  ToastAction, 
  ToastClose, 
  ToastDescription, 
  ToastProvider, 
  ToastTitle, 
  ToastViewport 
} from './toast';
import { Button } from '../../atoms/button';

const meta: Meta<typeof Toast> = {
  title: 'Design System/Components/Feedback/Toast',
  component: Toast,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
# Toast Component

Action confirmations and cooking reminders for recipe interactions.

## Features

- **Action feedback**: Confirm recipe saves, timer starts, and meal plan updates
- **Cooking reminders**: Timer notifications and cooking step alerts
- **Non-intrusive**: Temporary notifications that don't block cooking workflow
- **Mobile-optimized**: Appropriate sizing and positioning for kitchen use
- **Accessible**: Screen reader announcements for cooking status updates

## Usage

Use toasts for:
- Recipe saved confirmations
- Timer started/finished notifications
- Meal plan updates
- Shopping list changes
- Cooking step completions
        `
      }
    }
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <ToastProvider>
        <Story />
        <ToastViewport />
      </ToastProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Toast>;

// Recipe saved confirmation
export const RecipeSaved: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    
    return (
      <>
        <Button onClick={() => setOpen(true)} className="gap-2">
          <Heart className="h-4 w-4" />
          Save Recipe
        </Button>
        <Toast open={open} onOpenChange={setOpen} variant="success">
          <div className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <div className="grid gap-1">
              <ToastTitle>Recipe Saved!</ToastTitle>
              <ToastDescription>
                "Mediterranean Pasta Salad" added to your favorites
              </ToastDescription>
            </div>
          </div>
          <ToastAction altText="View collection" onClick={() => console.log('View collection')}>
            View
          </ToastAction>
          <ToastClose />
        </Toast>
      </>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Success toast for recipe save confirmations with action to view collection.'
      }
    }
  }
};

// Timer started notification
export const TimerStarted: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    
    return (
      <>
        <Button onClick={() => setOpen(true)} className="gap-2">
          <Clock className="h-4 w-4" />
          Start Timer
        </Button>
        <Toast open={open} onOpenChange={setOpen}>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-blue-600" />
            <div className="grid gap-1">
              <ToastTitle>Timer Started</ToastTitle>
              <ToastDescription>
                Pasta cooking timer: 12 minutes
              </ToastDescription>
            </div>
          </div>
          <ToastAction altText="View timer" onClick={() => console.log('View timer')}>
            View Timer
          </ToastAction>
          <ToastClose />
        </Toast>
      </>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Timer notification with action to view active timers.'
      }
    }
  }
};

// Meal plan updated
export const MealPlanUpdated: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    
    return (
      <>
        <Button onClick={() => setOpen(true)} variant="outline">
          Add to Meal Plan
        </Button>
        <Toast open={open} onOpenChange={setOpen} variant="success">
          <div className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <div className="grid gap-1">
              <ToastTitle>Added to Meal Plan</ToastTitle>
              <ToastDescription>
                Tuesday dinner: Mediterranean Pasta Salad
              </ToastDescription>
            </div>
          </div>
          <ToastAction altText="View meal plan" onClick={() => console.log('View meal plan')}>
            View Plan
          </ToastAction>
          <ToastClose />
        </Toast>
      </>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Confirmation toast for meal plan updates with navigation action.'
      }
    }
  }
};

// Shopping list updated
export const ShoppingListUpdated: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    
    return (
      <>
        <Button onClick={() => setOpen(true)} className="gap-2">
          <ShoppingCart className="h-4 w-4" />
          Add Ingredients
        </Button>
        <Toast open={open} onOpenChange={setOpen} variant="success">
          <div className="flex items-center gap-2">
            <ShoppingCart className="h-4 w-4 text-green-600" />
            <div className="grid gap-1">
              <ToastTitle>Shopping List Updated</ToastTitle>
              <ToastDescription>
                Added 8 ingredients from Mediterranean Pasta Salad
              </ToastDescription>
            </div>
          </div>
          <ToastAction altText="View shopping list" onClick={() => console.log('View shopping list')}>
            View List
          </ToastAction>
          <ToastClose />
        </Toast>
      </>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Shopping list update confirmation with ingredient count.'
      }
    }
  }
};

// Timer finished notification
export const TimerFinished: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    
    return (
      <>
        <Button onClick={() => setOpen(true)} variant="outline">
          Simulate Timer End
        </Button>
        <Toast open={open} onOpenChange={setOpen} variant="warning">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-yellow-600" />
            <div className="grid gap-1">
              <ToastTitle>Timer Finished!</ToastTitle>
              <ToastDescription>
                Pasta cooking time is up - check for doneness
              </ToastDescription>
            </div>
          </div>
          <ToastAction altText="Mark complete" onClick={() => console.log('Mark complete')}>
            Done
          </ToastAction>
          <ToastClose />
        </Toast>
      </>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Timer completion alert with action to mark cooking step complete.'
      }
    }
  }
};

// Error notification
export const ErrorNotification: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    
    return (
      <>
        <Button onClick={() => setOpen(true)} variant="destructive">
          Trigger Error
        </Button>
        <Toast open={open} onOpenChange={setOpen} variant="destructive">
          <div className="grid gap-1">
            <ToastTitle>Save Failed</ToastTitle>
            <ToastDescription>
              Could not save recipe. Check your connection and try again.
            </ToastDescription>
          </div>
          <ToastAction altText="Retry save" onClick={() => console.log('Retry save')}>
            Retry
          </ToastAction>
          <ToastClose />
        </Toast>
      </>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Error notification with retry action for failed operations.'
      }
    }
  }
};

// Default example
export const Default: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    
    return (
      <>
        <Button onClick={() => setOpen(true)} variant="outline">
          Show Toast
        </Button>
        <Toast open={open} onOpenChange={setOpen}>
          <div className="grid gap-1">
            <ToastTitle>Recipe Notification</ToastTitle>
            <ToastDescription>
              This is a basic toast notification for recipe interactions.
            </ToastDescription>
          </div>
          <ToastClose />
        </Toast>
      </>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Basic toast structure for recipe-related notifications.'
      }
    }
  }
};