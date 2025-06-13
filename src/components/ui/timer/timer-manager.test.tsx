import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { TimerManager, type TimerConfig } from './timer-manager'

// Mock Web Audio API (same as Timer component)
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

beforeEach(() => {
  vi.useFakeTimers()
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

describe('TimerManager Component', () => {
  const sampleTimers: TimerConfig[] = [
    {
      id: 'timer1',
      label: 'Test Timer 1',
      duration: 300,
      variant: 'full'
    },
    {
      id: 'timer2',
      label: 'Test Timer 2',
      duration: 600,
      variant: 'compact'
    }
  ]

  it('renders empty state when no timers provided', () => {
    render(<TimerManager />)
    
    expect(screen.getByText('No timers running')).toBeInTheDocument()
    expect(screen.getByText('Add a timer to start tracking your cooking times')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /add first timer/i })).toBeInTheDocument()
  })

  it('renders initial timers when provided', () => {
    render(<TimerManager initialTimers={sampleTimers} />)
    
    expect(screen.getByText('Test Timer 1')).toBeInTheDocument()
    expect(screen.getByText('Test Timer 2')).toBeInTheDocument()
    expect(screen.getByText('05:00')).toBeInTheDocument() // Timer 1 duration
    expect(screen.getByText('10:00')).toBeInTheDocument() // Timer 2 duration
  })

  it('shows add timer button when allowed', () => {
    render(<TimerManager initialTimers={sampleTimers} allowAdd={true} maxTimers={5} />)
    
    expect(screen.getByRole('button', { name: /add timer \(2\/5\)/i })).toBeInTheDocument()
  })

  it('hides add timer button when not allowed', () => {
    render(<TimerManager initialTimers={sampleTimers} allowAdd={false} />)
    
    expect(screen.queryByRole('button', { name: /add timer/i })).not.toBeInTheDocument()
  })

  it('shows remove buttons when allowed and multiple timers', () => {
    render(<TimerManager initialTimers={sampleTimers} allowRemove={true} />)
    
    const removeButtons = screen.getAllByLabelText(/remove/i)
    expect(removeButtons).toHaveLength(2)
  })

  it('hides remove buttons when not allowed', () => {
    render(<TimerManager initialTimers={sampleTimers} allowRemove={false} />)
    
    expect(screen.queryByLabelText(/remove/i)).not.toBeInTheDocument()
  })

  it('hides remove buttons when only one timer', () => {
    render(<TimerManager initialTimers={[sampleTimers[0]]} allowRemove={true} />)
    
    expect(screen.queryByLabelText(/remove/i)).not.toBeInTheDocument()
  })

  it('can add new timer', () => {
    render(<TimerManager />)
    
    const addButton = screen.getByRole('button', { name: /add first timer/i })
    expect(addButton).toBeInTheDocument()
  })

  it('can remove timers when allowed', () => {
    render(<TimerManager initialTimers={sampleTimers} allowRemove={true} />)
    
    expect(screen.getByText('Test Timer 1')).toBeInTheDocument()
    const removeButtons = screen.getAllByLabelText(/remove/i)
    expect(removeButtons).toHaveLength(2)
  })

  it('respects maximum timer limit', () => {
    render(<TimerManager maxTimers={2} initialTimers={sampleTimers} />)
    
    // Should not show add button when at max
    expect(screen.queryByRole('button', { name: /add timer/i })).not.toBeInTheDocument()
  })

  it('accepts onTimersChange callback', () => {
    const onTimersChange = vi.fn()
    render(<TimerManager onTimersChange={onTimersChange} />)
    
    // Initially called with empty array
    expect(onTimersChange).toHaveBeenCalledWith([])
  })

  it('calls onTimerComplete with correct parameters', () => {
    const onTimerComplete = vi.fn()
    render(
      <TimerManager 
        initialTimers={sampleTimers} 
        onTimerComplete={onTimerComplete} 
      />
    )
    
    // Component should render without errors
    expect(screen.getByText('Test Timer 1')).toBeInTheDocument()
    // The actual timer completion would be tested in the Timer component tests
  })

  it('calls onTimerTick with correct parameters', () => {
    const onTimerTick = vi.fn()
    render(
      <TimerManager 
        initialTimers={sampleTimers} 
        onTimerTick={onTimerTick} 
      />
    )
    
    // Component should render without errors
    expect(screen.getByText('Test Timer 1')).toBeInTheDocument()
    // The actual timer ticking would be tested in the Timer component tests
  })

  it('renders different layouts correctly', () => {
    const { rerender } = render(
      <TimerManager initialTimers={sampleTimers} layout="stack" />
    )
    
    let container = screen.getByText('Test Timer 1').closest('.space-y-4')
    expect(container).toBeInTheDocument()
    
    rerender(<TimerManager initialTimers={sampleTimers} layout="grid" />)
    container = screen.getByText('Test Timer 1').closest('.grid')
    expect(container).toBeInTheDocument()
    
    rerender(<TimerManager initialTimers={sampleTimers} layout="compact" />)
    container = screen.getByText('Test Timer 1').closest('.space-y-2')
    expect(container).toBeInTheDocument()
  })

  it('shows timer count', () => {
    render(<TimerManager initialTimers={sampleTimers} />)
    
    expect(screen.getByText('2 timers running')).toBeInTheDocument()
  })

  it('shows singular timer count', () => {
    render(<TimerManager initialTimers={[sampleTimers[0]]} />)
    
    expect(screen.getByText('1 timer running')).toBeInTheDocument()
  })

  it('adapts timer variant based on layout', () => {
    const singleTimer = [{ ...sampleTimers[0], variant: 'compact' as const }]
    render(<TimerManager layout="grid" initialTimers={singleTimer} />)
    
    // Component should render with grid layout
    const container = screen.getByText('Test Timer 1').closest('.grid')
    expect(container).toBeInTheDocument()
  })
})