import type { Meta, StoryObj } from '@storybook/react-vite'
import { StorybookDebug } from './storybook-debug'

const meta: Meta<typeof StorybookDebug> = {
  title: 'Test/Storybook Debug',
  component: StorybookDebug,
  parameters: {
    docs: {
      description: {
        component: 'Debug component to verify environment detection and z-index values in Storybook.',
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  name: 'Environment Detection',
  render: () => <StorybookDebug />,
  parameters: {
    docs: {
      description: {
        story: 'Shows detected environment and z-index values. Check browser console for detailed debug info.',
      },
    },
  },
}
