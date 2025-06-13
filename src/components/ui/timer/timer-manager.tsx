import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { Timer, type TimerProps } from "./timer"
import { Button } from "@/components/ui/button"
import { Plus, X } from "lucide-react"

const timerManagerVariants = cva(
  "space-y-4",
  {
    variants: {
      layout: {
        grid: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 space-y-0",
        stack: "space-y-4",
        compact: "space-y-2"
      },
    },
    defaultVariants: {
      layout: "stack",
    },
  }
)

export interface TimerConfig extends Omit<TimerProps, 'onComplete' | 'onTick'> {
  id: string
  label: string
}

export interface TimerManagerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof timerManagerVariants> {
  /** Initial timers to display */
  initialTimers?: TimerConfig[]
  /** Whether to allow adding new timers */
  allowAdd?: boolean
  /** Whether to allow removing timers */
  allowRemove?: boolean
  /** Maximum number of timers allowed */
  maxTimers?: number
  /** Callback when a timer completes */
  onTimerComplete?: (timerId: string, label: string) => void
  /** Callback when a timer ticks */
  onTimerTick?: (timerId: string, remaining: number) => void
  /** Callback when timers are added/removed */
  onTimersChange?: (timers: TimerConfig[]) => void
}

/**
 * TimerManager component for managing multiple simultaneous cooking timers
 */
const TimerManager = React.forwardRef<HTMLDivElement, TimerManagerProps>(
  ({ 
    className, 
    layout, 
    initialTimers = [], 
    allowAdd = true,
    allowRemove = true,
    maxTimers = 6,
    onTimerComplete,
    onTimerTick,
    onTimersChange,
    ...props 
  }, ref) => {
    const [timers, setTimers] = React.useState<TimerConfig[]>(initialTimers)

    // Notify parent when timers change
    React.useEffect(() => {
      onTimersChange?.(timers)
    }, [timers, onTimersChange])

    const addTimer = () => {
      if (timers.length >= maxTimers) return
      
      const newTimer: TimerConfig = {
        id: `timer-${Date.now()}`,
        label: `Timer ${timers.length + 1}`,
        duration: 300, // 5 minutes default
        variant: layout === 'grid' ? 'compact' : 'full'
      }
      
      setTimers(prev => [...prev, newTimer])
    }

    const removeTimer = (timerId: string) => {
      setTimers(prev => prev.filter(timer => timer.id !== timerId))
    }

    const updateTimer = (timerId: string, updates: Partial<TimerConfig>) => {
      setTimers(prev => prev.map(timer => 
        timer.id === timerId ? { ...timer, ...updates } : timer
      ))
    }

    const handleTimerComplete = (timerId: string) => {
      const timer = timers.find(t => t.id === timerId)
      if (timer) {
        onTimerComplete?.(timerId, timer.label)
      }
    }

    const handleTimerTick = (timerId: string, remaining: number) => {
      onTimerTick?.(timerId, remaining)
    }

    if (timers.length === 0 && allowAdd) {
      return (
        <div
          ref={ref}
          className={cn("text-center p-8 border-2 border-dashed rounded-lg", className)}
          {...props}
        >
          <div className="space-y-4">
            <div className="text-muted-foreground">
              <h3 className="text-lg font-medium">No timers running</h3>
              <p className="text-sm">Add a timer to start tracking your cooking times</p>
            </div>
            <Button onClick={addTimer} variant="default">
              <Plus className="h-4 w-4" />
              Add First Timer
            </Button>
          </div>
        </div>
      )
    }

    return (
      <div ref={ref} className={cn("space-y-4", className)} {...props}>
        {allowAdd && timers.length < maxTimers && (
          <div className="flex justify-center">
            <Button onClick={addTimer} variant="outline" size="sm">
              <Plus className="h-4 w-4" />
              Add Timer ({timers.length}/{maxTimers})
            </Button>
          </div>
        )}
        
        <div className={cn(timerManagerVariants({ layout }))}>
          {timers.map((timer) => (
            <div key={timer.id} className="relative">
              {allowRemove && timers.length > 1 && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute -top-2 -right-2 z-10 h-6 w-6 rounded-full border bg-background shadow-sm"
                  onClick={() => removeTimer(timer.id)}
                  aria-label={`Remove ${timer.label}`}
                >
                  <X className="h-3 w-3" />
                </Button>
              )}
              
              <Timer
                key={`${timer.id}-${timer.duration}`} // Force re-render when duration changes
                duration={timer.duration}
                label={timer.label}
                variant={timer.variant}
                autoStart={timer.autoStart}
                onComplete={() => handleTimerComplete(timer.id)}
                onTick={(remaining) => handleTimerTick(timer.id, remaining)}
                className={timer.className}
              />
            </div>
          ))}
        </div>

        {timers.length > 0 && (
          <div className="text-center text-sm text-muted-foreground">
            {timers.length} timer{timers.length === 1 ? '' : 's'} running
          </div>
        )}
      </div>
    )
  }
)

TimerManager.displayName = "TimerManager"

export { TimerManager, timerManagerVariants }