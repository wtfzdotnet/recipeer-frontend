import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const progressVariants = cva(
  "relative h-2 w-full overflow-hidden rounded-full bg-primary/20",
  {
    variants: {
      variant: {
        default: "bg-primary/20",
        cooking: "bg-warning/20",
        prep: "bg-primary/20", 
        success: "bg-success/20",
        warning: "bg-warning/20",
      },
      size: {
        default: "h-2",
        sm: "h-1.5",
        lg: "h-3",
        xl: "h-4",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

const progressIndicatorVariants = cva(
  "h-full w-full flex-1 transition-all",
  {
    variants: {
      variant: {
        default: "bg-primary",
        cooking: "bg-warning",
        prep: "bg-primary",
        success: "bg-success", 
        warning: "bg-warning",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface ProgressProps
  extends React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>,
    VariantProps<typeof progressVariants> {
  /** Progress value between 0 and 100 */
  value?: number
  /** Maximum value (defaults to 100) */
  max?: number
  /** Show progress label */
  showLabel?: boolean
  /** Custom label text */
  label?: string
  /** Show percentage */
  showPercentage?: boolean
}

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  ProgressProps
>(({ className, value = 0, max = 100, variant, size, showLabel, label, showPercentage, ...props }, ref) => {
  const percentage = Math.round((value / max) * 100)
  
  return (
    <div className="w-full">
      {(showLabel || showPercentage) && (
        <div className="flex justify-between items-center mb-2">
          {showLabel && (
            <span className="text-sm font-medium text-foreground">
              {label || 'Progress'}
            </span>
          )}
          {showPercentage && (
            <span className="text-sm text-muted-foreground">
              {percentage}%
            </span>
          )}
        </div>
      )}
      <ProgressPrimitive.Root
        ref={ref}
        className={cn(progressVariants({ variant, size }), className)}
        {...props}
        value={value}
        max={max}
      >
        <ProgressPrimitive.Indicator
          className={cn(progressIndicatorVariants({ variant }))}
          style={{ transform: `translateX(-${100 - percentage}%)` }}
        />
      </ProgressPrimitive.Root>
    </div>
  )
})
Progress.displayName = ProgressPrimitive.Root.displayName

export { Progress }