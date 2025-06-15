import * as React from "react"
import { cn } from "@/lib/utils"

interface InputOTPSlotProps extends React.InputHTMLAttributes<HTMLInputElement> {
  isActive: boolean
}

const InputOTPSlot = React.forwardRef<HTMLInputElement, InputOTPSlotProps>(
  ({ className, isActive, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(
          "relative flex h-10 w-10 items-center justify-center border-y border-r border-input text-sm text-center transition-all",
          "focus:z-10 focus:ring-2 focus:ring-ring focus:ring-offset-2 focus-visible:outline-none",
          "disabled:cursor-not-allowed disabled:opacity-50",
          "first:rounded-l-md first:border-l last:rounded-r-md",
          isActive && "ring-2 ring-ring ring-offset-2",
          className
        )}
        type="text"
        inputMode="numeric"
        pattern="[0-9]*"
        maxLength={1}
        {...props}
      />
    )
  }
)
InputOTPSlot.displayName = "InputOTPSlot"

interface InputOTPProps {
  length?: number
  value?: string
  onChange?: (value: string) => void
  onComplete?: (value: string) => void
  disabled?: boolean
  className?: string
  autoFocus?: boolean
  placeholder?: string
  'aria-label'?: string
  'aria-describedby'?: string
  'aria-invalid'?: boolean
}

const InputOTP = React.forwardRef<HTMLDivElement, InputOTPProps>(
  ({ 
    length = 6,
    value = "",
    onChange,
    onComplete,
    disabled = false,
    className,
    autoFocus = false,
    placeholder = "•",
    'aria-label': ariaLabel,
    'aria-describedby': ariaDescribedBy,
    'aria-invalid': ariaInvalid,
    ...props 
  }, ref) => {
    const [values, setValues] = React.useState<string[]>(
      Array(length).fill("").map((_, i) => value[i] || "")
    )
    const [activeIndex, setActiveIndex] = React.useState<number>(autoFocus ? 0 : -1)
    const inputRefs = React.useRef<(HTMLInputElement | null)[]>([])

    // Update values when external value changes
    React.useEffect(() => {
      const newValues = Array(length).fill("").map((_, i) => value[i] || "")
      setValues(newValues)
    }, [value, length])

    // Handle input change
    const handleChange = (index: number, newValue: string) => {
      if (disabled) return
      
      // Only allow single digit
      const digit = newValue.replace(/\D/g, '').slice(-1)
      
      // Don't update if it's not a digit and there's input
      if (newValue && !digit) {
        return
      }
      
      const newValues = [...values]
      newValues[index] = digit
      setValues(newValues)
      
      const fullValue = newValues.join("")
      onChange?.(fullValue)
      
      // Move to next input or complete
      if (digit && index < length - 1) {
        setActiveIndex(index + 1)
        inputRefs.current[index + 1]?.focus()
      } else if (fullValue.length === length) {
        onComplete?.(fullValue)
      }
    }

    // Handle key down for navigation and deletion
    const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
      if (disabled) return

      if (e.key === "Backspace" && !values[index] && index > 0) {
        setActiveIndex(index - 1)
        inputRefs.current[index - 1]?.focus()
      } else if (e.key === "ArrowLeft" && index > 0) {
        e.preventDefault()
        setActiveIndex(index - 1)
        inputRefs.current[index - 1]?.focus()
      } else if (e.key === "ArrowRight" && index < length - 1) {
        e.preventDefault()
        setActiveIndex(index + 1)
        inputRefs.current[index + 1]?.focus()
      }
    }

    // Handle focus
    const handleFocus = (index: number) => {
      setActiveIndex(index)
    }

    // Handle paste
    const handlePaste = (e: React.ClipboardEvent) => {
      if (disabled) return
      
      e.preventDefault()
      const pastedData = e.clipboardData.getData("text").replace(/\D/g, '')
      const pastedValues = pastedData.slice(0, length).split("")
      
      const newValues = Array(length).fill("").map((_, i) => pastedValues[i] || "")
      setValues(newValues)
      
      const fullValue = newValues.join("")
      onChange?.(fullValue)
      
      if (fullValue.length === length) {
        onComplete?.(fullValue)
      } else if (pastedValues.length > 0) {
        const nextIndex = Math.min(pastedValues.length, length - 1)
        setActiveIndex(nextIndex)
        inputRefs.current[nextIndex]?.focus()
      }
    }

    return (
      <div
        ref={ref}
        className={cn("flex items-center gap-2", className)}
        onPaste={handlePaste}
        aria-label={ariaLabel}
        {...props}
      >
        {Array.from({ length }, (_, index) => (
          <InputOTPSlot
            key={index}
            ref={(el) => (inputRefs.current[index] = el)}
            value={values[index]}
            isActive={activeIndex === index}
            disabled={disabled}
            placeholder={values[index] ? undefined : placeholder}
            onChange={(e) => handleChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            onFocus={() => handleFocus(index)}
            autoFocus={autoFocus && index === 0}
            aria-label={`Digit ${index + 1} of ${length}`}
            aria-describedby={ariaDescribedBy}
            aria-invalid={ariaInvalid}
          />
        ))}
      </div>
    )
  }
)
InputOTP.displayName = "InputOTP"

export { InputOTP, InputOTPSlot }