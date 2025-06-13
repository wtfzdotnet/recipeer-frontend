import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Timer } from './timer'

// Mock Web Audio API
const mockAudioContext = {
  createOscillator: vi.fn(() => ({
    connect: vi.fn(),
    frequency: { value: 0 },
    type: 'sine',
    start: vi.fn(),
    stop: vi.fn(),
  })),
  createGain: vi.fn(() => ({
    connect: vi.fn(),
    gain: {
      setValueAtTime: vi.fn(),
      exponentialRampToValueAtTime: vi.fn(),
    },
  })),
  destination: {},
  currentTime: 0,
  state: 'running',
  close: vi.fn(),
}

// Mock timers
beforeEach(() => {
  vi.useFakeTimers()
  // Mock AudioContext
  Object.defineProperty(window, 'AudioContext', {
    writable: true,
    value: vi.fn(() => mockAudioContext),
  })
  Object.defineProperty(window, 'webkitAudioContext', {
    writable: true,
    value: vi.fn(() => mockAudioContext),
  })
})

afterEach(() => {
  vi.runOnlyPendingTimers()
  vi.useRealTimers()
  vi.clearAllMocks()
})

describe('Timer Component', () => {
  it('renders with initial time display', () => {
    render(<Timer duration={300} label="Test Timer" />)
    
    expect(screen.getByText('Test Timer')).toBeInTheDocument()
    expect(screen.getByText('05:00')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /start/i })).toBeInTheDocument()
  })

  it('renders without label when not provided', () => {
    render(<Timer duration={180} />)
    
    expect(screen.getByText('03:00')).toBeInTheDocument()
    expect(screen.queryByText('Test Timer')).not.toBeInTheDocument()
  })

  it('shows pause button when auto-started', () => {
    render(<Timer duration={60} autoStart={true} />)
    
    expect(screen.getByRole('button', { name: /pause/i })).toBeInTheDocument()
  })

  it('renders different variants correctly', () => {
    const { rerender } = render(<Timer duration={300} variant="compact" />)
    expect(screen.getByText('05:00')).toHaveClass('text-2xl')
    
    rerender(<Timer duration={300} variant="full" />)
    expect(screen.getByText('05:00')).toHaveClass('text-4xl')
    
    rerender(<Timer duration={300} variant="floating" />)
    const container = screen.getByText('05:00').closest('.fixed')
    expect(container).toBeInTheDocument()
  })

  it('formats time correctly for different durations', () => {
    const { rerender } = render(<Timer duration={65} />)
    expect(screen.getByText('01:05')).toBeInTheDocument()
    
    rerender(<Timer duration={3600} />)
    expect(screen.getByText('60:00')).toBeInTheDocument()
    
    rerender(<Timer duration={5} />)
    expect(screen.getByText('00:05')).toBeInTheDocument()
  })

  it('has start, reset buttons when not running', () => {
    render(<Timer duration={60} />)
    
    expect(screen.getByRole('button', { name: /start/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /reset/i })).toBeInTheDocument()
  })

  it('shows correct initial progress bar', () => {
    render(<Timer duration={100} />)
    
    const progressBar = document.querySelector('[style*="width"]') as HTMLElement
    expect(progressBar).toHaveStyle('width: 0%')
  })

  it('accepts onComplete callback', () => {
    const onComplete = vi.fn()
    render(<Timer duration={60} onComplete={onComplete} />)
    
    // Component should render without errors
    expect(screen.getByText('01:00')).toBeInTheDocument()
  })

  it('accepts onTick callback', () => {
    const onTick = vi.fn()
    render(<Timer duration={60} onTick={onTick} />)
    
    // Component should render without errors
    expect(screen.getByText('01:00')).toBeInTheDocument()
  })
})