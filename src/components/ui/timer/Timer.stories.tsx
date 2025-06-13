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
      options: ['compact', 'full', 'floating', 'pasta', 'steak', 'bread'],
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
    layout: 'fullscreen',
    docs: {
      description: {
        story: 'Floating timer that appears in the bottom right corner for background operation. Note: In Storybook, this appears in the iframe context - in a real app it would be fixed to the viewport.'
      }
    }
  },
  render: (args) => (
    <div style={{ height: '100vh', position: 'relative', background: '#f8f9fa', padding: '20px' }}>
      <div style={{ marginBottom: '20px', fontSize: '14px', color: '#666' }}>
        This demonstrates the floating timer positioned in the bottom-right corner.
        In a real application, it would be fixed relative to the viewport.
      </div>
      <Timer {...args} />
    </div>
  )
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
    <div style={{ height: '100vh', position: 'relative', background: '#f8f9fa', padding: '20px' }}>
      <div style={{ marginBottom: '20px', fontSize: '14px', color: '#666' }}>
        Long timer for bread rising using floating variant for background operation.
        In a real application, this would be fixed to the viewport corner.
      </div>
      <Timer
        duration={3600} // 1 hour
        label="Bread Dough Rising"
        variant="floating"
      />
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: 'Long timer for bread rising - uses floating variant for background operation. Note: In Storybook, this appears in the iframe context - in a real app it would be fixed to the viewport.'
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
    layout: 'fullscreen',
    docs: {
      description: {
        story: 'Long timer for slow cooking processes. Note: In Storybook, this appears in the iframe context - in a real app it would be fixed to the viewport.'
      }
    }
  },
  render: (args) => (
    <div style={{ height: '100vh', position: 'relative', background: '#f8f9fa', padding: '20px' }}>
      <div style={{ marginBottom: '20px', fontSize: '14px', color: '#666' }}>
        Long timer for slow cooking processes using floating variant.
        In a real application, this would be fixed to the viewport corner.
      </div>
      <Timer {...args} />
    </div>
  )
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

// Background themed variants
export const PastaTimer: Story = {
  args: {
    duration: 480, // 8 minutes
    label: 'Al Dente Pasta',
    variant: 'pasta',
    autoStart: true
  },
  parameters: {
    docs: {
      description: {
        story: 'Pasta-themed timer with subtle background pattern and warm colors.'
      }
    }
  }
}

export const SteakTimer: Story = {
  args: {
    duration: 300, // 5 minutes
    label: 'Medium-Rare Steak',
    variant: 'steak'
  },
  parameters: {
    docs: {
      description: {
        story: 'Steak-themed timer with rich red tones and subtle meat pattern.'
      }
    }
  }
}

export const BreadTimer: Story = {
  args: {
    duration: 1800, // 30 minutes
    label: 'Artisan Bread Baking',
    variant: 'bread'
  },
  parameters: {
    docs: {
      description: {
        story: 'Bread-themed timer with warm golden colors and subtle texture pattern.'
      }
    }
  }
}

// Themed timers in action
export const ThemedCookingSession: Story = {
  render: () => (
    <div className="space-y-6 p-6 bg-gray-50 rounded-lg">
      <h3 className="text-xl font-semibold mb-4">Themed Cooking Timers</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Timer
          duration={480} // 8 minutes
          label="Fresh Linguine"
          variant="pasta"
          autoStart={true}
        />
        <Timer
          duration={420} // 7 minutes
          label="Ribeye Steak"
          variant="steak"
        />
        <Timer
          duration={2700} // 45 minutes
          label="Sourdough Loaf"
          variant="bread"
        />
      </div>
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: 'Multiple themed timers showing the different background variants in a cooking session.'
      }
    }
  }
}