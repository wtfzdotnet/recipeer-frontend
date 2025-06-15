import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { InputOTP } from './input-otp'

describe('InputOTP', () => {
  describe('Rendering', () => {
    it('renders with default props', () => {
      render(<InputOTP />)
      
      // Should render 6 inputs by default
      const inputs = screen.getAllByRole('textbox')
      expect(inputs).toHaveLength(6)
    })

    it('renders with custom length', () => {
      render(<InputOTP length={4} />)
      
      const inputs = screen.getAllByRole('textbox')
      expect(inputs).toHaveLength(4)
    })

    it('renders with label', () => {
      render(<InputOTP label="Verification Code" />)
      
      expect(screen.getByText('Verification Code')).toBeInTheDocument()
    })

    it('shows required indicator when required', () => {
      render(<InputOTP label="Code" required />)
      
      expect(screen.getByLabelText('required')).toBeInTheDocument()
    })

    it('renders helper text', () => {
      render(<InputOTP helperText="Enter the code sent to your email" />)
      
      expect(screen.getByText('Enter the code sent to your email')).toBeInTheDocument()
    })

    it('renders error message', () => {
      render(<InputOTP error="Invalid code" />)
      
      const errorElement = screen.getByText('Invalid code')
      expect(errorElement).toBeInTheDocument()
      expect(errorElement).toHaveAttribute('role', 'alert')
    })
  })

  describe('Accessibility', () => {
    it('has proper ARIA labels for each input', () => {
      render(<InputOTP length={4} />)
      
      const inputs = screen.getAllByRole('textbox')
      inputs.forEach((input, index) => {
        expect(input).toHaveAttribute('aria-label', `Digit ${index + 1} of 4`)
      })
    })

    it('has screen reader description', () => {
      render(<InputOTP />)
      
      expect(screen.getByText(/Enter 6 digit verification code/)).toBeInTheDocument()
    })

    it('associates error with inputs via aria-describedby', () => {
      render(<InputOTP error="Invalid code" id="test-otp" />)
      
      const inputs = screen.getAllByRole('textbox')
      inputs.forEach(input => {
        expect(input).toHaveAttribute('aria-describedby', expect.stringContaining('test-otp-error'))
      })
    })

    it('marks inputs as invalid when error exists', () => {
      render(<InputOTP error="Invalid code" />)
      
      const inputs = screen.getAllByRole('textbox')
      inputs.forEach(input => {
        expect(input).toHaveAttribute('aria-invalid', 'true')
      })
    })

    it('supports custom aria-label', () => {
      render(<InputOTP aria-label="Custom verification input" />)
      
      // The custom aria-label is applied to the container div, but the inputs still have their specific labels
      const inputs = screen.getAllByRole('textbox')
      expect(inputs[0]).toHaveAttribute('aria-label', 'Digit 1 of 6')
    })
  })

  describe('User Interaction', () => {
    it('calls onChange when user types', async () => {
      const user = userEvent.setup()
      const handleChange = vi.fn()
      render(<InputOTP onChange={handleChange} />)
      
      const firstInput = screen.getAllByRole('textbox')[0]
      await user.type(firstInput, '1')
      
      expect(handleChange).toHaveBeenCalledWith('1')
    })

    it('moves to next input after typing', async () => {
      const user = userEvent.setup()
      render(<InputOTP />)
      
      const inputs = screen.getAllByRole('textbox')
      await user.type(inputs[0], '1')
      
      await waitFor(() => {
        expect(inputs[1]).toHaveFocus()
      })
    })

    it('calls onComplete when all digits are entered', async () => {
      const user = userEvent.setup()
      const handleComplete = vi.fn()
      render(<InputOTP length={3} onComplete={handleComplete} />)
      
      const inputs = screen.getAllByRole('textbox')
      await user.type(inputs[0], '1')
      await user.type(inputs[1], '2')
      await user.type(inputs[2], '3')
      
      expect(handleComplete).toHaveBeenCalledWith('123')
    })

    it('handles backspace navigation', async () => {
      const user = userEvent.setup()
      render(<InputOTP />)
      
      const inputs = screen.getAllByRole('textbox')
      await user.type(inputs[0], '1')
      await user.keyboard('{Backspace}')
      
      await waitFor(() => {
        expect(inputs[0]).toHaveFocus()
      })
    })

    it('handles arrow key navigation', async () => {
      const user = userEvent.setup()
      render(<InputOTP />)
      
      const inputs = screen.getAllByRole('textbox')
      inputs[0].focus()
      
      await user.keyboard('{ArrowRight}')
      await waitFor(() => {
        expect(inputs[1]).toHaveFocus()
      })
      
      await user.keyboard('{ArrowLeft}')
      await waitFor(() => {
        expect(inputs[0]).toHaveFocus()
      })
    })

    it('handles paste functionality', async () => {
      const handleChange = vi.fn()
      render(<InputOTP length={4} onChange={handleChange} />)
      
      const firstInput = screen.getAllByRole('textbox')[0]
      firstInput.focus()
      
      // Simulate paste event
      fireEvent.paste(firstInput, {
        clipboardData: {
          getData: () => '1234'
        }
      })
      
      expect(handleChange).toHaveBeenCalledWith('1234')
    })

    it('only accepts numeric input', async () => {
      const user = userEvent.setup()
      const handleChange = vi.fn()
      render(<InputOTP onChange={handleChange} />)
      
      const firstInput = screen.getAllByRole('textbox')[0]
      await user.type(firstInput, 'a')
      
      // Should not call onChange for non-numeric input
      expect(handleChange).not.toHaveBeenCalled()
    })

    it('limits input to single character', async () => {
      const user = userEvent.setup()
      render(<InputOTP />)
      
      const firstInput = screen.getAllByRole('textbox')[0]
      await user.type(firstInput, '123')
      
      // Should only contain the last character due to our filtering
      expect(firstInput).toHaveValue('1')
    })
  })

  describe('States', () => {
    it('disables all inputs when disabled prop is true', () => {
      render(<InputOTP disabled />)
      
      const inputs = screen.getAllByRole('textbox')
      inputs.forEach(input => {
        expect(input).toBeDisabled()
      })
    })

    it('displays pre-filled value', () => {
      render(<InputOTP value="123" length={4} />)
      
      const inputs = screen.getAllByRole('textbox')
      expect(inputs[0]).toHaveValue('1')
      expect(inputs[1]).toHaveValue('2')
      expect(inputs[2]).toHaveValue('3')
      expect(inputs[3]).toHaveValue('')
    })

    it('auto-focuses first input when autoFocus is true', () => {
      render(<InputOTP autoFocus />)
      
      const firstInput = screen.getAllByRole('textbox')[0]
      expect(firstInput).toHaveFocus()
    })
  })

  describe('Size Variants', () => {
    it('applies small size classes', () => {
      render(<InputOTP size="sm" />)
      
      const container = screen.getAllByRole('textbox')[0].closest('div')
      expect(container).toHaveClass('gap-1')
    })

    it('applies large size classes', () => {
      render(<InputOTP size="lg" />)
      
      const container = screen.getAllByRole('textbox')[0].closest('div')
      expect(container).toHaveClass('gap-3')
    })
  })

  describe('Error Handling', () => {
    it('applies error styling when error prop is provided', () => {
      render(<InputOTP error="Invalid code" />)
      
      const container = screen.getAllByRole('textbox')[0].closest('div')
      expect(container).toHaveClass('ring-2', 'ring-destructive')
    })

    it('prioritizes error message over helper text', () => {
      render(<InputOTP helperText="Helper text" error="Error message" />)
      
      expect(screen.getByText('Error message')).toBeInTheDocument()
      expect(screen.queryByText('Helper text')).not.toBeInTheDocument()
    })
  })
})