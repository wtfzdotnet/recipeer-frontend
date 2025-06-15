import { cva } from "class-variance-authority"

/**
 * Timer manager layout variants
 */
export const timerManagerVariants = cva(
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