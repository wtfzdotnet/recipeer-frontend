import * as React from "react"
import { type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { Button } from "@/components/atoms/button"
import { Play, Pause, Square, Volume2 } from "lucide-react"
import { timerVariants } from "./timer-variants"

export interface TimerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof timerVariants> {
  /** Timer duration in seconds */
  duration: number
  /** Optional label for the timer */
  label?: string
  /** Whether to start the timer automatically */
  autoStart?: boolean
  /** Callback when timer completes */
  onComplete?: () => void
  /** Callback on each tick with remaining time */
  onTick?: (remaining: number) => void
}

/**
 * Format seconds to MM:SS format
 */
const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
}

/**
 * Timer component for cooking timers with countdown display and audio alerts
 */
const Timer = React.forwardRef<HTMLDivElement, TimerProps>(
  ({ className, variant, duration, label, autoStart = false, onComplete, onTick, ...props }, ref) => {
    const [timeRemaining, setTimeRemaining] = React.useState(duration)
    const [isRunning, setIsRunning] = React.useState(autoStart)
    const [isCompleted, setIsCompleted] = React.useState(false)
    const intervalRef = React.useRef<number | null>(null)
    const audioRef = React.useRef<{ play?: () => void } | null>(null)

    // Reset timer when duration changes
    React.useEffect(() => {
      setTimeRemaining(duration)
      setIsCompleted(false)
      if (!autoStart) {
        setIsRunning(false)
      }
    }, [duration, autoStart])

    // Initialize audio on component mount
    React.useEffect(() => {
      // Create a simple beep sound using Web Audio API
      const audioContext = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)()
      const createBeep = () => {
        const oscillator = audioContext.createOscillator()
        const gainNode = audioContext.createGain()
        
        oscillator.connect(gainNode)
        gainNode.connect(audioContext.destination)
        
        oscillator.frequency.value = 800
        oscillator.type = 'sine'
        
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime)
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5)
        
        oscillator.start(audioContext.currentTime)
        oscillator.stop(audioContext.currentTime + 0.5)
      }
      
      audioRef.current = { play: createBeep }
      
      return () => {
        if (audioContext.state !== 'closed') {
          audioContext.close()
        }
      }
    }, [])

    // Timer logic
    React.useEffect(() => {
      if (isRunning && timeRemaining > 0 && !isCompleted) {
        intervalRef.current = window.setInterval(() => {
          setTimeRemaining((prev) => {
            const newTime = prev - 1
            onTick?.(newTime)
            
            if (newTime <= 0) {
              setIsRunning(false)
              setIsCompleted(true)
              // Play audio alert
              audioRef.current?.play?.()
              onComplete?.()
              return 0
            }
            
            return newTime
          })
        }, 1000)
      } else {
        if (intervalRef.current) {
          clearInterval(intervalRef.current)
          intervalRef.current = null
        }
      }

      return () => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current)
        }
      }
    }, [isRunning, timeRemaining, isCompleted, onComplete, onTick])

    const handleStart = () => {
      if (isCompleted) {
        // Reset timer
        setTimeRemaining(duration)
        setIsCompleted(false)
      }
      setIsRunning(true)
    }

    const handlePause = () => {
      setIsRunning(false)
    }

    const handleStop = () => {
      setIsRunning(false)
      setTimeRemaining(duration)
      setIsCompleted(false)
    }

    const progress = ((duration - timeRemaining) / duration) * 100

    return (
      <div
        ref={ref}
        className={cn(timerVariants({ variant }), className)}
        {...props}
      >
        {label && (
          <div className="mb-2 font-medium text-sm text-muted-foreground">
            {label}
          </div>
        )}
        
        <div className="space-y-3">
          {/* Time display */}
          <div className="text-center">
            <div className={cn(
              "font-mono font-bold",
              variant === "compact" ? "text-2xl" : "text-4xl",
              isCompleted ? "text-success" : timeRemaining <= 60 ? "text-warning" : "text-foreground"
            )}>
              {formatTime(timeRemaining)}
            </div>
            {isCompleted && (
              <div className="text-sm text-success font-medium mt-1">
                Timer Complete!
              </div>
            )}
          </div>

          {/* Progress bar */}
          <div className="w-full bg-secondary rounded-full h-2">
            <div
              className={cn(
                "h-2 rounded-full transition-all duration-1000",
                isCompleted ? "bg-success" : timeRemaining <= 60 ? "bg-warning" : "bg-primary"
              )}
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Controls */}
          <div className="flex justify-center gap-2">
            {!isRunning ? (
              <Button size="sm" onClick={handleStart} variant="default">
                <Play className="h-4 w-4" />
                {isCompleted ? "Restart" : "Start"}
              </Button>
            ) : (
              <Button size="sm" onClick={handlePause} variant="secondary">
                <Pause className="h-4 w-4" />
                Pause
              </Button>
            )}
            
            <Button size="sm" onClick={handleStop} variant="outline">
              <Square className="h-4 w-4" />
              Reset
            </Button>

            {isCompleted && (
              <Button size="sm" variant="ghost" onClick={() => audioRef.current?.play?.()}>
                <Volume2 className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </div>
    )
  }
)

Timer.displayName = "Timer"

export { Timer }