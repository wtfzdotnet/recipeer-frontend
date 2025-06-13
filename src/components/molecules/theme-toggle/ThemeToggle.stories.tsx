import type { Meta, StoryObj } from '@storybook/react-vite'
import { ThemeToggle } from './ThemeToggle'

const meta: Meta<typeof ThemeToggle> = {
  title: 'Components/ThemeToggle',
  component: ThemeToggle,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A toggle button that switches between light, dark, and system theme modes. The button cycles through the modes: light → system → dark → light.',
      },
    },
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof ThemeToggle>

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: 'The default theme toggle button. Click to cycle through light, system, and dark modes.',
      },
    },
  },
}

export const WithDescription: Story = {
  render: () => (
    <div className="flex flex-col items-center gap-4 p-6">
      <div className="text-center">
        <h3 className="text-lg font-semibold mb-2">Theme Toggle</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Click the button to cycle through theme modes: Light → System → Dark
        </p>
      </div>
      <ThemeToggle />
      <div className="text-xs text-muted-foreground max-w-md text-center">
        The theme preference is stored in localStorage and will persist across sessions.
        System mode automatically follows your OS preference.
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Theme toggle with explanatory text showing how it works in different theme modes.',
      },
    },
  },
}

export const InToolbar: Story = {
  render: () => (
    <div className="flex items-center justify-between p-4 bg-card border rounded-lg min-w-96">
      <div>
        <h3 className="font-semibold">Application Header</h3>
        <p className="text-sm text-muted-foreground">Example toolbar placement</p>
      </div>
      <ThemeToggle />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Example of theme toggle placement in a typical application header or toolbar.',
      },
    },
  },
}