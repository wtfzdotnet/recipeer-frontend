import { cva } from "class-variance-authority"

/**
 * Timer display variants
 */
export const timerVariants = cva(
  "relative rounded-lg border p-4",
  {
    variants: {
      variant: {
        compact: "min-w-48 text-sm",
        full: "min-w-72 text-base",
        floating: "fixed bottom-4 right-4 z-50 shadow-lg bg-background border-border min-w-60",
        pasta: "min-w-72 text-base bg-gradient-to-br from-warning via-warning to-warning border-warning text-warning-foreground bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0icGFzdGEiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+PGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMiIgZmlsbD0icmdiYSgyNTUsMjA0LDEwMiwwLjEpIi8+PGVsbGlwc2UgY3g9IjEwIiBjeT0iMTAiIHJ4PSIxNSIgcnk9IjIiIGZpbGw9InJnYmEoMjU1LDIwNCwxMDIsMC4wNSkiLz48ZWxsaXBzZSBjeD0iMzAiIGN5PSIzMCIgcng9IjE1IiByeT0iMiIgZmlsbD0icmdiYSgyNTUsMjA0LDEwMiwwLjA1KSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNwYXN0YSkiLz48L3N2Zz4=')] before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/60 before:to-transparent before:rounded-lg before:pointer-events-none [&>*]:relative [&>*]:z-10",
        steak: "min-w-72 text-base bg-gradient-to-br from-destructive via-destructive to-destructive border-destructive text-destructive-foreground bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0ic3RlYWsiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCI+PGVsbGlwc2UgY3g9IjMwIiBjeT0iMzAiIHJ4PSIyMCIgcnk9IjE1IiBmaWxsPSJyZ2JhKDE1NCw1MiwxOCwwLjA4KSIvPjxjaXJjbGUgY3g9IjE1IiBjeT0iMTUiIHI9IjMiIGZpbGw9InJnYmEoMTU0LDUyLDE4LDAuMTIpIi8+PGNpcmNsZSBjeD0iNDUiIGN5PSI0NSIgcj0iMyIgZmlsbD0icmdiYSgxNTQsNTIsMTgsMC4xMikiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjc3RlYWspIi8+PC9zdmc+')] before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/60 before:to-transparent before:rounded-lg before:pointer-events-none [&>*]:relative [&>*]:z-10",
        bread: "min-w-72 text-base bg-gradient-to-br from-warning via-warning to-warning border-warning text-warning-foreground bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iYnJlYWQiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHdpZHRoPSI1MCIgaGVpZ2h0PSI1MCI+PGVsbGlwc2UgY3g9IjI1IiBjeT0iMjUiIHJ4PSIxOCIgcnk9IjEyIiBmaWxsPSJyZ2JhKDE5NCwxNjUsMjYsMC4xKSIvPjxjaXJjbGUgY3g9IjEyIiBjeT0iMTIiIHI9IjIiIGZpbGw9InJnYmEoMTk0LDE2NSwyNiwwLjE1KSIvPjxjaXJjbGUgY3g9IjM4IiBjeT0iMzgiIHI9IjIiIGZpbGw9InJnYmEoMTk0LDE2NSwyNiwwLjE1KSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNicmVhZCkiLz48L3N2Zz4=')] before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/60 before:to-transparent before:rounded-lg before:pointer-events-none [&>*]:relative [&>*]:z-10"
      },
    },
    defaultVariants: {
      variant: "full",
    },
  }
)