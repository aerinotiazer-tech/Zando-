import * as React from "react"
import { AlertTriangle, XCircle } from "lucide-react"
import { cn } from "../../lib/utils"

interface ErrorAlertProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string
  message: string
  variant?: "default" | "destructive"
}

export function ErrorAlert({ 
  title = "Une erreur est survenue", 
  message, 
  variant = "destructive",
  className, 
  ...props 
}: ErrorAlertProps) {
  return (
    <div 
      className={cn(
        "flex p-4 rounded-xl border",
        variant === "destructive" ? "bg-red-50 border-red-100 text-red-800" : "bg-amber-50 border-amber-100 text-amber-800",
        className
      )} 
      {...props}
    >
      <div className="flex-shrink-0 mr-3">
        {variant === "destructive" ? (
          <XCircle className="h-5 w-5 text-red-500" />
        ) : (
          <AlertTriangle className="h-5 w-5 text-amber-500" />
        )}
      </div>
      <div>
        <h4 className="text-sm font-semibold mb-1">{title}</h4>
        <p className="text-sm opacity-90">{message}</p>
      </div>
    </div>
  )
}
