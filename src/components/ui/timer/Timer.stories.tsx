import type { Meta, StoryObj } from '@storybook/react-vite'
import { Timer } from './timer'
import { Clock, ChefHat, Oven } from 'lucide-react'

const meta: Meta<typeof Timer> = {
  title: 'UI/Timer',
  component: Timer,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A cooking timer component with visual countdown, progress indicators, and audio alerts. Supports multiple variants and can be used for recipe timing.'
      }
    }
  },
  argTypes: {
    duration: {
      control: { type: 'number', min: 1, max: 3600 },
      description: 'Timer duration in seconds'
    },
    label: {
      control: 'text',
      description: 'Optional label for the timer'
    },
    autoStart: {
      control: 'boolean',
      description: 'Whether to start the timer automatically'
    },
    variant: {
      control: { type: 'select' },
      options: ['compact', 'full', 'floating'],
      description: 'Timer variant for different use cases'
    },
    onComplete: { action: 'timer completed' },
    onTick: { action: 'timer tick' }
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Timer>

// Basic timer stories
export const Default: Story = {
  args: {
    duration: 300, // 5 minutes
    label: 'Prep Timer'
  }
}

export const Compact: Story = {
  args: {
    duration: 180, // 3 minutes
    label: 'Quick Timer',
    variant: 'compact'
  }
}

export const Floating: Story = {
  args: {
    duration: 600, // 10 minutes
    label: 'Background Timer',
    variant: 'floating'
  },
  parameters: {
    docs: {
      description: {
        story: 'Floating timer that appears in the bottom right corner for background operation.'
      }
    }
  }
}

export const AutoStart: Story = {
  args: {
    duration: 120, // 2 minutes
    label: 'Auto-Start Timer',
    autoStart: true
  },
  parameters: {
    docs: {
      description: {
        story: 'Timer that starts automatically when rendered.'
      }
    }
  }
}

// Recipe-specific examples
export const PreheatOven: Story = {
  render: () => (
    <Timer
      duration={900} // 15 minutes
      label="Preheat Oven to 350°F"
      variant="full"
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Timer for preheating the oven - a common cooking task.'
      }
    }
  }
}

export const SteakRest: Story = {
  render: () => (
    <Timer
      duration={300} // 5 minutes
      label="Let Steak Rest"
      variant="compact"
      autoStart={true}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Timer for resting meat after cooking - starts automatically.'
      }
    }
  }
}

export const BreadRise: Story = {
  render: () => (
    <Timer
      duration={3600} // 1 hour
      label="Bread Dough Rising"
      variant="floating"
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Long timer for bread rising - uses floating variant for background operation.'
      }
    }
  }
}

export const PastaBoiling: Story = {
  render: () => (
    <Timer
      duration={480} // 8 minutes
      label="Al Dente Pasta"
      variant="full"
      autoStart={true}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Timer for cooking pasta to al dente perfection.'
      }
    }
  }
}

export const EggSoftBoiled: Story = {
  render: () => (
    <Timer
      duration={360} // 6 minutes
      label="Soft-Boiled Eggs"
      variant="compact"
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Timer for perfectly soft-boiled eggs.'
      }
    }
  }
}

// Multiple timers scenario
export const MultipleTimers: Story = {
  render: () => (
    <div className="space-y-4 p-4">
      <h3 className="text-lg font-semibold mb-4">Thanksgiving Dinner Coordination</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Timer
          duration={3600} // 1 hour
          label="Turkey in Oven"
          variant="full"
        />
        <Timer
          duration={1800} // 30 minutes
          label="Mashed Potatoes"
          variant="compact"
        />
        <Timer
          duration={2400} // 40 minutes
          label="Green Bean Casserole"
          variant="compact"
        />
        <Timer
          duration={900} // 15 minutes
          label="Gravy Preparation"
          variant="compact"
        />
      </div>
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: 'Example of multiple timers running simultaneously for complex meal preparation.'
      }
    }
  }
}

// Edge cases
export const ShortTimer: Story = {
  args: {
    duration: 30, // 30 seconds
    label: 'Toast Check',
    variant: 'compact',
    autoStart: true
  },
  parameters: {
    docs: {
      description: {
        story: 'Very short timer for quick cooking tasks.'
      }
    }
  }
}

export const LongTimer: Story = {
  args: {
    duration: 7200, // 2 hours
    label: 'Slow-Cooked Roast',
    variant: 'floating'
  },
  parameters: {
    docs: {
      description: {
        story: 'Long timer for slow cooking processes.'
      }
    }
  }
}

export const WithoutLabel: Story = {
  args: {
    duration: 600, // 10 minutes
    variant: 'full'
  },
  parameters: {
    docs: {
      description: {
        story: 'Timer without a label for simple countdown needs.'
      }
    }
  }
}