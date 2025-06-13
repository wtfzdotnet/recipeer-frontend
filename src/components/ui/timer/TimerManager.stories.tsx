import type { Meta, StoryObj } from '@storybook/react-vite'
import { TimerManager, type TimerConfig } from './timer-manager'

const meta: Meta<typeof TimerManager> = {
  title: 'UI/TimerManager',
  component: TimerManager,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A timer manager component for handling multiple simultaneous cooking timers. Perfect for complex recipes that require timing multiple steps at once.'
      }
    }
  },
  argTypes: {
    layout: {
      control: { type: 'select' },
      options: ['grid', 'stack', 'compact'],
      description: 'Layout style for displaying multiple timers'
    },
    allowAdd: {
      control: 'boolean',
      description: 'Whether to allow adding new timers'
    },
    allowRemove: {
      control: 'boolean',
      description: 'Whether to allow removing timers'
    },
    maxTimers: {
      control: { type: 'number', min: 1, max: 10 },
      description: 'Maximum number of timers allowed'
    },
    onTimerComplete: { action: 'timer completed' },
    onTimerTick: { action: 'timer tick' },
    onTimersChange: { action: 'timers changed' }
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof TimerManager>

// Basic usage
export const Default: Story = {
  args: {}
}

export const WithInitialTimers: Story = {
  args: {
    initialTimers: [
      {
        id: 'pasta',
        label: 'Pasta Cooking',
        duration: 480, // 8 minutes
        autoStart: true,
        variant: 'full'
      },
      {
        id: 'sauce',
        label: 'Sauce Simmering',
        duration: 900, // 15 minutes
        variant: 'full'
      }
    ]
  }
}

export const GridLayout: Story = {
  args: {
    layout: 'grid',
    initialTimers: [
      {
        id: 'timer1',
        label: 'Chicken Thighs',
        duration: 1800, // 30 minutes
        variant: 'compact'
      },
      {
        id: 'timer2',
        label: 'Roasted Vegetables',
        duration: 1500, // 25 minutes
        variant: 'compact'
      },
      {
        id: 'timer3',
        label: 'Rice Cooking',
        duration: 1200, // 20 minutes
        variant: 'compact'
      }
    ]
  },
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: 'Grid layout is perfect for displaying multiple timers in a compact format.'
      }
    }
  }
}

export const CompactLayout: Story = {
  args: {
    layout: 'compact',
    initialTimers: [
      {
        id: 'quick1',
        label: 'Toast',
        duration: 120, // 2 minutes
        variant: 'compact'
      },
      {
        id: 'quick2',
        label: 'Eggs',
        duration: 180, // 3 minutes
        variant: 'compact'
      }
    ]
  }
}

// Recipe-specific examples
export const ThanksgivingDinner: Story = {
  render: () => (
    <TimerManager
      layout="grid"
      maxTimers={8}
      initialTimers={[
        {
          id: 'turkey',
          label: 'Turkey in Oven',
          duration: 14400, // 4 hours
          variant: 'compact'
        },
        {
          id: 'stuffing',
          label: 'Stuffing Prep',
          duration: 3600, // 1 hour
          variant: 'compact'
        },
        {
          id: 'potatoes',
          label: 'Mashed Potatoes',
          duration: 1800, // 30 minutes
          variant: 'compact'
        },
        {
          id: 'cranberry',
          label: 'Cranberry Sauce',
          duration: 900, // 15 minutes
          variant: 'compact'
        },
        {
          id: 'gravy',
          label: 'Gravy Making',
          duration: 600, // 10 minutes
          variant: 'compact'
        }
      ]}
    />
  ),
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: 'Managing multiple timers for a complex Thanksgiving dinner preparation.'
      }
    }
  }
}

export const BreadBaking: Story = {
  render: () => (
    <TimerManager
      layout="stack"
      maxTimers={4}
      initialTimers={[
        {
          id: 'rise1',
          label: 'First Rise (Bulk Fermentation)',
          duration: 7200, // 2 hours
          variant: 'full'
        },
        {
          id: 'shape',
          label: 'Shaping Rest',
          duration: 900, // 15 minutes
          variant: 'full'
        },
        {
          id: 'proof',
          label: 'Final Proof',
          duration: 3600, // 1 hour
          variant: 'full'
        }
      ]}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Sequential timing for bread baking process with multiple fermentation stages.'
      }
    }
  }
}

export const PizzaNight: Story = {
  render: () => (
    <TimerManager
      layout="grid"
      maxTimers={6}
      initialTimers={[
        {
          id: 'dough',
          label: 'Pizza Dough Rest',
          duration: 3600, // 1 hour
          variant: 'compact'
        },
        {
          id: 'sauce',
          label: 'Sauce Reduction',
          duration: 1800, // 30 minutes
          variant: 'compact'
        },
        {
          id: 'oven',
          label: 'Oven Preheat',
          duration: 900, // 15 minutes
          autoStart: true,
          variant: 'compact'
        },
        {
          id: 'pizza1',
          label: 'First Pizza Bake',
          duration: 720, // 12 minutes
          variant: 'compact'
        }
      ]}
    />
  ),
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: 'Coordinating multiple timers for pizza night - from dough prep to baking.'
      }
    }
  }
}

export const MealPrepSunday: Story = {
  render: () => (
    <TimerManager
      layout="compact"
      maxTimers={10}
      initialTimers={[
        {
          id: 'chicken',
          label: 'Chicken Batch 1',
          duration: 1500, // 25 minutes
          variant: 'compact'
        },
        {
          id: 'rice1',
          label: 'Brown Rice',
          duration: 2700, // 45 minutes
          variant: 'compact'
        },
        {
          id: 'quinoa',
          label: 'Quinoa Cooking',
          duration: 900, // 15 minutes
          variant: 'compact'
        },
        {
          id: 'roastveg',
          label: 'Roasted Vegetables',
          duration: 2100, // 35 minutes
          variant: 'compact'
        }
      ]}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Efficient meal prep coordination with multiple timers for batch cooking.'
      }
    }
  }
}

// Edge cases and configurations
export const ReadOnlyTimers: Story = {
  args: {
    allowAdd: false,
    allowRemove: false,
    initialTimers: [
      {
        id: 'fixed1',
        label: 'Fixed Timer 1',
        duration: 600,
        variant: 'full'
      },
      {
        id: 'fixed2',
        label: 'Fixed Timer 2',
        duration: 900,
        variant: 'full'
      }
    ]
  },
  parameters: {
    docs: {
      description: {
        story: 'Read-only timer manager where users cannot add or remove timers.'
      }
    }
  }
}

export const SingleTimerOnly: Story = {
  args: {
    maxTimers: 1,
    allowRemove: false,
    initialTimers: [
      {
        id: 'single',
        label: 'Main Timer',
        duration: 1200,
        variant: 'full'
      }
    ]
  },
  parameters: {
    docs: {
      description: {
        story: 'Timer manager configured for only one timer at a time.'
      }
    }
  }
}

export const EmptyState: Story = {
  args: {
    allowAdd: true,
    maxTimers: 5
  },
  parameters: {
    docs: {
      description: {
        story: 'Empty state when no timers are configured, showing the add timer option.'
      }
    }
  }
}