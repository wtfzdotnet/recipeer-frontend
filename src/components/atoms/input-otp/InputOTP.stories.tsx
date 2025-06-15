import type { Meta, StoryObj } from '@storybook/react-vite'
import { InputOTP } from './input-otp'

// Simple mock function for stories
const fn = () => () => {};

const meta: Meta<typeof InputOTP> = {
  title: 'Atoms/InputOTP',
  component: InputOTP,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Input OTP component for secure account verification and authentication with full accessibility support.'
      }
    }
  },
  argTypes: {
    length: {
      control: { type: 'number', min: 4, max: 8 },
      description: 'Number of OTP digits'
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'Size variant of the input'
    },
    onChange: { action: 'changed' },
    onComplete: { action: 'completed' },
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

// Default story
export const Default: Story = {
  args: {
    length: 6,
    label: 'Verification Code',
    helperText: 'Enter the 6-digit code sent to your email',
    onChange: fn(),
    onComplete: fn(),
  }
}

// Account verification use case
export const AccountVerification: Story = {
  args: {
    length: 6,
    label: 'Email Verification',
    helperText: 'Check your email for the verification code',
    required: true,
    autoFocus: true,
    onChange: fn(),
    onComplete: fn(),
  },
  parameters: {
    docs: {
      description: {
        story: 'Account verification scenario with email OTP.'
      }
    }
  }
}

// Cultural expert verification
export const CulturalExpertVerification: Story = {
  args: {
    length: 8,
    label: 'Cultural Expert Verification',
    helperText: 'Enter the code provided by our cultural heritage team',
    required: true,
    size: 'lg',
    onChange: fn(),
    onComplete: fn(),
  },
  parameters: {
    docs: {
      description: {
        story: 'Enhanced security verification for cultural experts and heritage contributors.'
      }
    }
  }
}

// Two-factor authentication
export const TwoFactorAuth: Story = {
  args: {
    length: 6,
    label: 'Two-Factor Authentication',
    helperText: 'Enter the code from your authenticator app',
    required: true,
    onChange: fn(),
    onComplete: fn(),
  },
  parameters: {
    docs: {
      description: {
        story: 'Two-factor authentication for enhanced account security.'
      }
    }
  }
}

// Size variants
export const SmallSize: Story = {
  args: {
    length: 4,
    size: 'sm',
    label: 'PIN Verification',
    helperText: 'Enter your 4-digit PIN',
    onChange: fn(),
    onComplete: fn(),
  }
}

export const MediumSize: Story = {
  args: {
    length: 6,
    size: 'md',
    label: 'Standard Verification',
    helperText: 'Enter the 6-digit verification code',
    onChange: fn(),
    onComplete: fn(),
  }
}

export const LargeSize: Story = {
  args: {
    length: 6,
    size: 'lg',
    label: 'Accessibility-Friendly Verification',
    helperText: 'Large touch targets for easier interaction',
    onChange: fn(),
    onComplete: fn(),
  }
}

// Error state
export const WithError: Story = {
  args: {
    length: 6,
    label: 'Verification Code',
    error: 'Invalid verification code. Please try again.',
    value: '123456',
    onChange: fn(),
    onComplete: fn(),
  },
  parameters: {
    docs: {
      description: {
        story: 'Error state with validation message.'
      }
    }
  }
}

// Disabled state
export const Disabled: Story = {
  args: {
    length: 6,
    label: 'Verification Code',
    helperText: 'Verification is currently disabled',
    disabled: true,
    value: '123',
    onChange: fn(),
    onComplete: fn(),
  }
}

// Pre-filled value
export const PreFilled: Story = {
  args: {
    length: 6,
    label: 'Verification Code',
    helperText: 'Code pre-filled for demonstration',
    value: '123456',
    onChange: fn(),
    onComplete: fn(),
  }
}

// Different lengths
export const FourDigits: Story = {
  args: {
    length: 4,
    label: 'SMS Code',
    helperText: 'Enter the 4-digit SMS code',
    onChange: fn(),
    onComplete: fn(),
  }
}

export const EightDigits: Story = {
  args: {
    length: 8,
    label: 'Backup Code',
    helperText: 'Enter your 8-digit backup code',
    onChange: fn(),
    onComplete: fn(),
  }
}

// Accessibility demonstration
export const AccessibilityFeatures: Story = {
  render: () => (
    <div className="space-y-6 w-96">
      <h3 className="text-lg font-semibold">Accessibility Features</h3>
      
      <div className="space-y-4">
        <InputOTP
          length={6}
          label="Screen Reader Optimized"
          helperText="Full ARIA support and keyboard navigation"
          autoFocus={true}
          onChange={fn()}
          onComplete={fn()}
          aria-label="6 digit verification code with full accessibility support"
        />
        
        <InputOTP
          length={6}
          label="High Contrast Compatible"
          helperText="Works with high contrast mode and custom themes"
          size="lg"
          onChange={fn()}
          onComplete={fn()}
        />
        
        <InputOTP
          length={4}
          label="Motor Accessibility"
          helperText="Large touch targets for users with motor impairments"
          size="lg"
          onChange={fn()}
          onComplete={fn()}
        />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Comprehensive accessibility features including screen reader support, keyboard navigation, and large touch targets.'
      }
    }
  }
}

// Cultural considerations
export const CulturalConsiderations: Story = {
  render: () => (
    <div className="space-y-6 w-96">
      <h3 className="text-lg font-semibold">Cultural Considerations</h3>
      
      <div className="space-y-4">
        <InputOTP
          length={6}
          label="Recipe Heritage Verification"
          helperText="Verify your contribution to cultural recipe heritage"
          onChange={fn()}
          onComplete={fn()}
        />
        
        <InputOTP
          length={8}
          label="Cultural Expert Access"
          helperText="Enhanced verification for cultural food historians"
          size="lg"
          onChange={fn()}
          onComplete={fn()}
        />
        
        <InputOTP
          length={6}
          label="Community Moderator"
          helperText="Access code for cultural appropriation review"
          onChange={fn()}
          onComplete={fn()}
        />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Cultural and heritage-focused verification scenarios for recipe platform use cases.'
      }
    }
  }
}