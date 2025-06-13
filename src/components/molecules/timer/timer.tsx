import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { Button } from "@/components/atoms/button"
import { Play, Pause, Square, Volume2 } from "lucide-react"

const timerVariants = cva(
  "relative rounded-lg border p-4",
  {
    variants: {
      variant: {
        compact: "min-w-[200px] text-sm",
        full: "min-w-[300px] text-base",
        floating: "fixed bottom-4 right-4 z-50 shadow-lg bg-background border-border min-w-[250px]",
        pasta: "min-w-[300px] text-base bg-gradient-to-br from-yellow-100 via-orange-100 to-yellow-200 border-orange-200 text-orange-900 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0icGFzdGEiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+PGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMiIgZmlsbD0icmdiYSgyNTUsMjA0LDEwMiwwLjEpIi8+PGVsbGlwc2UgY3g9IjEwIiBjeT0iMTAiIHJ4PSIxNSIgcnk9IjIiIGZpbGw9InJnYmEoMjU1LDIwNCwxMDIsMC4wNSkiLz48ZWxsaXBzZSBjeD0iMzAiIGN5PSIzMCIgcng9IjE1IiByeT0iMiIgZmlsbD0icmdiYSgyNTUsMjA0LDEwMiwwLjA1KSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNwYXN0YSkiLz48L3N2Zz4=')] before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/60 before:to-transparent before:rounded-lg before:pointer-events-none [&>*]:relative [&>*]:z-10",
        steak: "min-w-[300px] text-base bg-gradient-to-br from-red-100 via-orange-100 to-red-200 border-red-200 text-red-900 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0ic3RlYWsiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCI+PGVsbGlwc2UgY3g9IjMwIiBjeT0iMzAiIHJ4PSIyMCIgcnk9IjE1IiBmaWxsPSJyZ2JhKDE1NCw1MiwxOCwwLjA4KSIvPjxjaXJjbGUgY3g9IjE1IiBjeT0iMTUiIHI9IjMiIGZpbGw9InJnYmEoMTU0LDUyLDE4LDAuMTIpIi8+PGNpcmNsZSBjeD0iNDUiIGN5PSI0NSIgcj0iMyIgZmlsbD0icmdiYSgxNTQsNTIsMTgsMC4xMikiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjc3RlYWspIi8+PC9zdmc+')] before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/60 before:to-transparent before:rounded-lg before:pointer-events-none [&>*]:relative [&>*]:z-10",
        bread: "min-w-[300px] text-base bg-gradient-to-br from-amber-100 via-yellow-100 to-amber-200 border-amber-200 text-amber-900 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iYnJlYWQiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHdpZHRoPSI1MCIgaGVpZ2h0PSI1MCI+PGVsbGlwc2UgY3g9IjI1IiBjeT0iMjUiIHJ4PSIxOCIgcnk9IjEyIiBmaWxsPSJyZ2JhKDE5NCwxNjUsMjYsMC4xKSIvPjxjaXJjbGUgY3g9IjEyIiBjeT0iMTIiIHI9IjIiIGZpbGw9InJnYmEoMTk0LDE2NSwyNiwwLjE1KSIvPjxjaXJjbGUgY3g9IjM4IiBjeT0iMzgiIHI9IjIiIGZpbGw9InJnYmEoMTk0LDE2NSwyNiwwLjE1KSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNicmVhZCkiLz48L3N2Zz4=')] before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/60 before:to-transparent before:rounded-lg before:pointer-events-none [&>*]:relative [&>*]:z-10"
      },
    },
    defaultVariants: {
      variant: "full",
    },
  }
)

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
              isCompleted ? "text-green-600" : timeRemaining <= 60 ? "text-orange-600" : "text-foreground"
            )}>
              {formatTime(timeRemaining)}
            </div>
            {isCompleted && (
              <div className="text-sm text-green-600 font-medium mt-1">
                Timer Complete!
              </div>
            )}
          </div>

          {/* Progress bar */}
          <div className="w-full bg-secondary rounded-full h-2">
            <div
              className={cn(
                "h-2 rounded-full transition-all duration-1000",
                isCompleted ? "bg-green-600" : timeRemaining <= 60 ? "bg-orange-600" : "bg-primary"
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

export { Timer, timerVariants }