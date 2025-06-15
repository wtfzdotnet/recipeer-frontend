import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Button } from '@/components/atoms/button'

describe('Button Color Validation', () => {
  it('should apply bg-primary class for default variant', () => {
    render(<Button variant="default">Test Button</Button>)
    const button = screen.getByRole('button')
    
    // Check if the button has the bg-primary class
    expect(button.className).toContain('bg-primary')
    expect(button.className).toContain('text-primary-foreground')
  })

  it('should apply correct color classes for all variants', () => {
    const variants = [
      { variant: 'default', expectedClasses: ['bg-primary', 'text-primary-foreground'] },
      { variant: 'destructive', expectedClasses: ['bg-destructive'] },
      { variant: 'secondary', expectedClasses: ['bg-secondary', 'text-secondary-foreground'] },
      { variant: 'outline', expectedClasses: ['border', 'bg-background'] },
    ] as const

    variants.forEach(({ variant, expectedClasses }) => {
      const { unmount } = render(<Button variant={variant}>Test</Button>)
      const button = screen.getByRole('button')
      
      expectedClasses.forEach(expectedClass => {
        expect(button.className).toContain(expectedClass)
      })
      
      unmount()
    })
  })

  it('should not contain hardcoded color values in className', () => {
    render(<Button variant="default">Test Button</Button>)
    const button = screen.getByRole('button')
    
    // Check that className doesn't contain hardcoded colors like bg-orange-500, bg-blue-600, etc.
    const hardcodedColorPattern = /bg-(red|blue|green|yellow|purple|pink|indigo|gray|slate|zinc|neutral|stone|orange|amber|lime|emerald|teal|cyan|sky|violet|fuchsia|rose)-\d+/
    expect(button.className).not.toMatch(hardcodedColorPattern)
  })
})