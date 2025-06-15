import * as React from "react"

export type ToasterToast = {
  id: string
  title?: React.ReactNode
  description?: React.ReactNode
  action?: React.ReactNode
  variant?: "default" | "destructive" | "success" | "warning"
  open?: boolean
}