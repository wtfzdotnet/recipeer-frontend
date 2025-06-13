import { render, screen, fireEvent, act } from '@testing-library/react'
import { describe, it, expect, beforeEach } from 'vitest'
import { ThemeToggle } from './ThemeToggle'
import { ThemeProvider } from '../ThemeProvider'

// Helper function to render ThemeToggle with provider
const renderWithProvider = (defaultTheme = 'system') => {
  return render(
    <ThemeProvider defaultTheme={defaultTheme}>
      <ThemeToggle />
    </ThemeProvider>
  )
}

describe('ThemeToggle', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear()
    // Reset document classes
    document.documentElement.classList.remove('light', 'dark')
  })

  it('renders without crashing', () => {
    renderWithProvider()
    const button = screen.getByRole('button')
    expect(button).toBeInTheDocument()
  })

  it('has accessible label', () => {
    renderWithProvider()
    const button = screen.getByRole('button')
    expect(button).toHaveAttribute('aria-label')
    expect(button).toHaveAttribute('title')
  })

  it('toggles theme when clicked', async () => {
    renderWithProvider('light')
    const button = screen.getByRole('button')
    
    // Initially should be light mode
    expect(button).toHaveAttribute('aria-label', 'Switch to system mode')
    
    // Click to switch to system
    await act(async () => {
      fireEvent.click(button)
    })
    expect(button).toHaveAttribute('aria-label', 'Switch to dark mode')
    
    // Click to switch to dark
    await act(async () => {
      fireEvent.click(button)
    })
    expect(button).toHaveAttribute('aria-label', 'Switch to light mode')
    
    // Click to switch back to light
    await act(async () => {
      fireEvent.click(button)
    })
    expect(button).toHaveAttribute('aria-label', 'Switch to system mode')
  })

  it('displays correct icon for light theme', () => {
    renderWithProvider('light')
    const button = screen.getByRole('button')
    // Icon presence test - just check that the button contains an SVG
    const svgIcon = button.querySelector('svg')
    expect(svgIcon).toBeInTheDocument()
  })

  it('displays correct icon for dark theme', () => {
    renderWithProvider('dark')
    const button = screen.getByRole('button')
    // Icon presence test - just check that the button contains an SVG
    const svgIcon = button.querySelector('svg')
    expect(svgIcon).toBeInTheDocument()
  })

  it('applies correct CSS classes when theme changes', async () => {
    renderWithProvider('light')
    const button = screen.getByRole('button')
    
    // Start with light theme
    expect(document.documentElement.classList.contains('light')).toBe(true)
    
    // Switch to system (which should be light in test environment)
    await act(async () => {
      fireEvent.click(button)
    })
    
    // Switch to dark
    await act(async () => {
      fireEvent.click(button)
    })
    expect(document.documentElement.classList.contains('dark')).toBe(true)
    
    // Switch back to light
    await act(async () => {
      fireEvent.click(button)
    })
    expect(document.documentElement.classList.contains('light')).toBe(true)
  })

  it('stores theme preference in localStorage', async () => {
    renderWithProvider('light')
    const button = screen.getByRole('button')
    
    // Click to change theme
    await act(async () => {
      fireEvent.click(button) // light -> system
    })
    expect(localStorage.getItem('ui-theme')).toBe('system')
    
    await act(async () => {
      fireEvent.click(button) // system -> dark
    })
    expect(localStorage.getItem('ui-theme')).toBe('dark')
    
    await act(async () => {
      fireEvent.click(button) // dark -> light
    })
    expect(localStorage.getItem('ui-theme')).toBe('light')
  })
})