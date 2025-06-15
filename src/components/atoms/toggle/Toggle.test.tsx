import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Toggle } from './toggle'

describe('Toggle', () => {
  describe('Rendering', () => {
    it('renders toggle button', () => {
      render(<Toggle>Toggle content</Toggle>)
      
      expect(screen.getByRole('button')).toBeInTheDocument()
      expect(screen.getByText('Toggle content')).toBeInTheDocument()
    })

    it('renders with label', () => {
      render(<Toggle label="Test toggle">Content</Toggle>)
      
      expect(screen.getByText('Test toggle')).toBeInTheDocument()
      expect(screen.getByLabelText('Test toggle')).toBeInTheDocument()
    })

    it('renders without label when showLabel is false', () => {
      render(<Toggle label="Test toggle" showLabel={false}>Content</Toggle>)
      
      expect(screen.queryByText('Test toggle')).not.toBeInTheDocument()
      expect(screen.getByRole('button')).toBeInTheDocument()
    })

    it('renders helper text', () => {
      render(<Toggle helperText="This is helper text">Content</Toggle>)
      
      expect(screen.getByText('This is helper text')).toBeInTheDocument()
    })

    it('associates helper text with toggle via aria-describedby', () => {
      render(<Toggle helperText="Helper text" id="test-toggle">Content</Toggle>)
      
      const toggle = screen.getByRole('button')
      expect(toggle).toHaveAttribute('aria-describedby', 'test-toggle-helper')
    })
  })

  describe('Accessibility', () => {
    it('has proper ARIA label', () => {
      render(<Toggle aria-label="Custom toggle">Content</Toggle>)
      
      const toggle = screen.getByRole('button')
      expect(toggle).toHaveAttribute('aria-label', 'Custom toggle')
    })

    it('falls back to default aria-label when no label is provided', () => {
      render(<Toggle>Content</Toggle>)
      
      const toggle = screen.getByRole('button')
      expect(toggle).toHaveAttribute('aria-label', 'Toggle button')
    })

    it('uses label as accessible name when label is provided', () => {
      render(<Toggle label="Test label">Content</Toggle>)
      
      const toggle = screen.getByRole('button')
      expect(toggle).not.toHaveAttribute('aria-label')
      expect(screen.getByLabelText('Test label')).toBeInTheDocument()
    })

    it('supports keyboard interaction', async () => {
      const user = userEvent.setup()
      const handlePressedChange = vi.fn()
      render(<Toggle onPressedChange={handlePressedChange}>Content</Toggle>)
      
      const toggle = screen.getByRole('button')
      toggle.focus()
      
      await user.keyboard('{Enter}')
      expect(handlePressedChange).toHaveBeenCalledWith(true)
      
      await user.keyboard(' ')
      expect(handlePressedChange).toHaveBeenCalledWith(false)
    })

    it('has proper pressed state ARIA attribute', () => {
      render(<Toggle defaultPressed={true}>Content</Toggle>)
      
      const toggle = screen.getByRole('button')
      expect(toggle).toHaveAttribute('aria-pressed', 'true')
    })
  })

  describe('User Interaction', () => {
    it('calls onPressedChange when clicked', async () => {
      const user = userEvent.setup()
      const handlePressedChange = vi.fn()
      render(<Toggle onPressedChange={handlePressedChange}>Content</Toggle>)
      
      const toggle = screen.getByRole('button')
      await user.click(toggle)
      
      expect(handlePressedChange).toHaveBeenCalledWith(true)
    })

    it('toggles state correctly', async () => {
      const user = userEvent.setup()
      const handlePressedChange = vi.fn()
      render(<Toggle onPressedChange={handlePressedChange}>Content</Toggle>)
      
      const toggle = screen.getByRole('button')
      
      // First click - should be pressed
      await user.click(toggle)
      expect(handlePressedChange).toHaveBeenCalledWith(true)
      
      // Second click - should be unpressed
      await user.click(toggle)
      expect(handlePressedChange).toHaveBeenCalledWith(false)
    })

    it('respects controlled pressed state', () => {
      render(<Toggle pressed={true}>Content</Toggle>)
      
      const toggle = screen.getByRole('button')
      expect(toggle).toHaveAttribute('aria-pressed', 'true')
    })

    it('respects default pressed state', () => {
      render(<Toggle defaultPressed={true}>Content</Toggle>)
      
      const toggle = screen.getByRole('button')
      expect(toggle).toHaveAttribute('aria-pressed', 'true')
    })

    it('clicking label activates toggle', async () => {
      const user = userEvent.setup()
      const handlePressedChange = vi.fn()
      render(<Toggle label="Test label" onPressedChange={handlePressedChange}>Content</Toggle>)
      
      const label = screen.getByText('Test label')
      await user.click(label)
      
      expect(handlePressedChange).toHaveBeenCalledWith(true)
    })
  })

  describe('States', () => {
    it('renders disabled state', () => {
      render(<Toggle disabled>Content</Toggle>)
      
      const toggle = screen.getByRole('button')
      expect(toggle).toBeDisabled()
    })

    it('does not call onPressedChange when disabled', async () => {
      const user = userEvent.setup()
      const handlePressedChange = vi.fn()
      render(<Toggle disabled onPressedChange={handlePressedChange}>Content</Toggle>)
      
      const toggle = screen.getByRole('button')
      await user.click(toggle)
      
      expect(handlePressedChange).not.toHaveBeenCalled()
    })
  })

  describe('Visual Variants', () => {
    it('applies size classes correctly', () => {
      const { rerender } = render(<Toggle size="sm">Content</Toggle>)
      let toggle = screen.getByRole('button')
      expect(toggle).toHaveClass('h-9')
      
      rerender(<Toggle size="default">Content</Toggle>)
      toggle = screen.getByRole('button')
      expect(toggle).toHaveClass('h-10')
      
      rerender(<Toggle size="lg">Content</Toggle>)
      toggle = screen.getByRole('button')
      expect(toggle).toHaveClass('h-11')
    })

    it('applies variant classes correctly', () => {
      const { rerender } = render(<Toggle variant="default">Content</Toggle>)
      let toggle = screen.getByRole('button')
      expect(toggle).toHaveClass('bg-transparent')
      
      rerender(<Toggle variant="outline">Content</Toggle>)
      toggle = screen.getByRole('button')
      expect(toggle).toHaveClass('border')
    })

    it('applies custom className', () => {
      render(<Toggle className="custom-class">Content</Toggle>)
      
      const toggle = screen.getByRole('button')
      expect(toggle).toHaveClass('custom-class')
    })
  })

  describe('Label Positioning', () => {
    it('positions label on the right by default', () => {
      render(<Toggle label="Test label">Content</Toggle>)
      
      const container = screen.getByText('Test label').parentElement
      expect(container).toHaveClass('flex-row')
    })

    it('positions label on the left', () => {
      render(<Toggle label="Test label" labelPosition="left">Content</Toggle>)
      
      const container = screen.getByText('Test label').parentElement
      expect(container).toHaveClass('flex-row-reverse')
    })

    it('positions label on top', () => {
      render(<Toggle label="Test label" labelPosition="top">Content</Toggle>)
      
      const container = screen.getByText('Test label').parentElement
      expect(container).toHaveClass('flex-col')
    })

    it('positions label on bottom', () => {
      render(<Toggle label="Test label" labelPosition="bottom">Content</Toggle>)
      
      const container = screen.getByText('Test label').parentElement
      expect(container).toHaveClass('flex-col-reverse')
    })
  })

  describe('ID Generation', () => {
    it('uses provided ID', () => {
      render(<Toggle id="custom-id">Content</Toggle>)
      
      const toggle = screen.getByRole('button')
      expect(toggle).toHaveAttribute('id', 'custom-id')
    })

    it('generates random ID when not provided', () => {
      render(<Toggle>Content</Toggle>)
      
      const toggle = screen.getByRole('button')
      const id = toggle.getAttribute('id')
      expect(id).toMatch(/^toggle-/)
    })
  })

  describe('Helper Text Association', () => {
    it('associates helper text with correct ID', () => {
      render(<Toggle helperText="Helper text" id="test-toggle">Content</Toggle>)
      
      const helperText = screen.getByText('Helper text')
      expect(helperText).toHaveAttribute('id', 'test-toggle-helper')
    })

    it('does not set aria-describedby when no helper text', () => {
      render(<Toggle>Content</Toggle>)
      
      const toggle = screen.getByRole('button')
      expect(toggle).not.toHaveAttribute('aria-describedby')
    })
  })
})