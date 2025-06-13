import type { Meta, StoryObj } from '@storybook/react-vite';
import { AlertCircle, CheckCircle, Info, AlertTriangle, XCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const meta: Meta<typeof Alert> = {
  title: 'Design System/Components/Feedback/Alert',
  component: Alert,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
# Alert Component

Alerts display important messages to users in a prominent way. They can convey different types of information using color coding and icons.

## Features

- **Semantic Variants**: Different styles for default, destructive, warning, success, and info states
- **Accessible**: Built with proper ARIA attributes and semantic HTML
- **Compound Structure**: Title and description components for flexible content
- **Icon Support**: Easy to add contextual icons

## Usage

Use alerts to:
- Show system status messages
- Display form validation results  
- Communicate important information
- Provide feedback after user actions

Choose the appropriate variant based on the message type and urgency.
        `
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'destructive', 'warning', 'success', 'info'],
      description: 'The visual variant of the alert',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic variants
export const Default: Story = {
  render: () => (
    <Alert className="w-96">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Heads up!</AlertTitle>
      <AlertDescription>
        You can add components to your app using the cli.
      </AlertDescription>
    </Alert>
  ),
};

export const Destructive: Story = {
  render: () => (
    <Alert variant="destructive" className="w-96">
      <XCircle className="h-4 w-4" />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>
        Your recipe could not be saved. Please check your connection and try again.
      </AlertDescription>
    </Alert>
  ),
};

export const Warning: Story = {
  render: () => (
    <Alert variant="warning" className="w-96">
      <AlertTriangle className="h-4 w-4" />
      <AlertTitle>Warning</AlertTitle>
      <AlertDescription>
        This recipe contains nuts. Please check for allergies before serving.
      </AlertDescription>
    </Alert>
  ),
};

export const Success: Story = {
  render: () => (
    <Alert variant="success" className="w-96">
      <CheckCircle className="h-4 w-4" />
      <AlertTitle>Success</AlertTitle>
      <AlertDescription>
        Your recipe has been published successfully and is now visible to the community.
      </AlertDescription>
    </Alert>
  ),
};

export const InfoAlert: Story = {
  render: () => (
    <Alert variant="info" className="w-96">
      <Info className="h-4 w-4" />
      <AlertTitle>Pro Tip</AlertTitle>
      <AlertDescription>
        For best results, let your dough rest at room temperature for 30 minutes before rolling.
      </AlertDescription>
    </Alert>
  ),
};

// Without title
export const DescriptionOnly: Story = {
  render: () => (
    <Alert className="w-96">
      <AlertCircle className="h-4 w-4" />
      <AlertDescription>
        This is a simple alert with just a description and no title.
      </AlertDescription>
    </Alert>
  ),
};

// Without icon
export const NoIcon: Story = {
  render: () => (
    <Alert className="w-96">
      <AlertTitle>Simple Alert</AlertTitle>
      <AlertDescription>
        This alert doesn't have an icon, just text content.
      </AlertDescription>
    </Alert>
  ),
};

// Recipe-specific examples
export const RecipeAlert: Story = {
  render: () => (
    <Alert variant="warning" className="w-96">
      <AlertTriangle className="h-4 w-4" />
      <AlertTitle>Ingredient Substitution</AlertTitle>
      <AlertDescription>
        Buttermilk is not available? Mix 1 cup milk with 1 tablespoon lemon juice as a substitute.
      </AlertDescription>
    </Alert>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Example of how alerts can be used to provide cooking tips and substitutions.'
      }
    }
  }
};

export const CookingTimer: Story = {
  render: () => (
    <Alert variant="info" className="w-96">
      <Info className="h-4 w-4" />
      <AlertTitle>Cooking Timer</AlertTitle>
      <AlertDescription>
        Your oven is preheated to 350°F. You can now place your dish in the oven.
      </AlertDescription>
    </Alert>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Example of using alerts for cooking process notifications.'
      }
    }
  }
};

export const AllVariants = {
  render: () => (
    <div className="space-y-4 w-96">
      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Default Alert</AlertTitle>
        <AlertDescription>This is the default alert style.</AlertDescription>
      </Alert>
      
      <Alert variant="info">
        <Info className="h-4 w-4" />
        <AlertTitle>Info Alert</AlertTitle>
        <AlertDescription>This provides additional information.</AlertDescription>
      </Alert>
      
      <Alert variant="success">
        <CheckCircle className="h-4 w-4" />
        <AlertTitle>Success Alert</AlertTitle>
        <AlertDescription>Action completed successfully.</AlertDescription>
      </Alert>
      
      <Alert variant="warning">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Warning Alert</AlertTitle>
        <AlertDescription>Please pay attention to this warning.</AlertDescription>
      </Alert>
      
      <Alert variant="destructive">
        <XCircle className="h-4 w-4" />
        <AlertTitle>Error Alert</AlertTitle>
        <AlertDescription>Something went wrong.</AlertDescription>
      </Alert>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All alert variants displayed together for comparison.'
      }
    }
  }
};