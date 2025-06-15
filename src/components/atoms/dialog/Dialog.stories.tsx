import type { Meta, StoryObj } from '@storybook/react-vite'
import React, { useState } from 'react'
// Simple mock function for stories
const fn = () => () => {};

import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './dialog'
import { Button } from '../button'

const meta = {
  title: 'Atoms/Dialog',
  component: Dialog,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A basic Dialog component for modal interactions following atomic design principles. Built on shadcn/ui Dialog primitives with design token compliance and accessibility features.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    open: {
      control: 'boolean',
      description: 'Controls dialog open state',
    },
    onOpenChange: {
      action: 'onOpenChange',
      description: 'Callback when dialog state changes',
    },
  },
} satisfies Meta<typeof Dialog>

export default meta
type Story = StoryObj<typeof meta>

// Helper component for controlled stories
interface DialogDemoProps {
  title?: string;
  description?: string;
  triggerText?: string;
  children?: React.ReactNode;
}

const DialogDemo = ({ 
  title = "Edit Profile", 
  description = "Make changes to your profile here. Click save when you're done.",
  triggerText = "Open Dialog",
  children,
}: DialogDemoProps) => {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>{triggerText}</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        {children || (
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="name" className="text-right">
                Name
              </label>
              <input
                id="name"
                defaultValue="John Doe"
                className="col-span-3 px-3 py-2 border border-border rounded-md"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="email" className="text-right">
                Email
              </label>
              <input
                id="email"
                defaultValue="john@example.com"
                className="col-span-3 px-3 py-2 border border-border rounded-md"
              />
            </div>
          </div>
        )}
        <DialogFooter>
          <Button onClick={() => setOpen(false)}>Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export const Default: Story = {
  render: () => <DialogDemo />,
  parameters: {
    docs: {
      description: {
        story: 'The default dialog with title, description, form fields, and action buttons.',
      },
    },
  },
}

export const WithForm: Story = {
  render: () => (
    <DialogDemo 
      title="Add Recipe"
      description="Fill in the details to create a new recipe."
      triggerText="Add Recipe"
    >
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <label htmlFor="recipe-name" className="text-right">
            Recipe Name
          </label>
          <input
            id="recipe-name"
            placeholder="Enter recipe name"
            className="col-span-3 px-3 py-2 border border-border rounded-md"
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <label htmlFor="prep-time" className="text-right">
            Prep Time
          </label>
          <input
            id="prep-time"
            placeholder="e.g., 30 minutes"
            className="col-span-3 px-3 py-2 border border-border rounded-md"
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <label htmlFor="difficulty" className="text-right">
            Difficulty
          </label>
          <select className="col-span-3 px-3 py-2 border border-border rounded-md">
            <option>Easy</option>
            <option>Medium</option>
            <option>Hard</option>
          </select>
        </div>
      </div>
    </DialogDemo>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Dialog with a form for creating a new recipe.',
      },
    },
  },
}

export const Confirmation: Story = {
  render: () => (
    <DialogDemo 
      title="Confirm Deletion"
      description="This action cannot be undone. This will permanently delete the recipe and all associated data."
      triggerText="Delete Recipe"
    >
      <DialogFooter>
        <Button variant="outline" onClick={fn()}>Cancel</Button>
        <Button variant="destructive" onClick={fn()}>Delete</Button>
      </DialogFooter>
    </DialogDemo>
  ),
  parameters: {
    docs: {
      description: {
        story: 'A confirmation dialog for destructive actions.',
      },
    },
  },
}

export const LongContent: Story = {
  render: () => (
    <DialogDemo 
      title="Terms and Conditions"
      description="Please read our terms and conditions carefully."
      triggerText="View Terms"
    >
      <div className="max-h-96 overflow-y-auto space-y-4 py-4">
        <p className="text-sm">
          By using this application, you agree to the following terms and conditions:
        </p>
        <p className="text-sm">
          1. You must be at least 13 years old to use this service.
        </p>
        <p className="text-sm">
          2. You are responsible for maintaining the confidentiality of your account.
        </p>
        <p className="text-sm">
          3. You agree not to use the service for any unlawful purposes.
        </p>
        <p className="text-sm">
          4. We reserve the right to modify these terms at any time.
        </p>
        <p className="text-sm">
          5. Your use of the service is at your own risk.
        </p>
        <p className="text-sm">
          6. We are not liable for any damages arising from your use of the service.
        </p>
        <p className="text-sm">
          7. These terms are governed by the laws of your jurisdiction.
        </p>
        <p className="text-sm">
          8. Any disputes will be resolved through arbitration.
        </p>
        <p className="text-sm">
          9. You can terminate your account at any time.
        </p>
        <p className="text-sm">
          10. We can terminate your account for violations of these terms.
        </p>
      </div>
    </DialogDemo>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Dialog with scrollable content for long text.',
      },
    },
  },
}

export const MobileResponsive: Story = {
  render: () => <DialogDemo title="Mobile Dialog" description="This dialog adapts to mobile screens." />,
  parameters: {
    docs: {
      description: {
        story: 'The dialog automatically adapts to mobile screen sizes with responsive design.',
      },
    },
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
}