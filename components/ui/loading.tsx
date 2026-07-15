import * as React from "react"
import { Loader2 } from "lucide-react"
import { cn } from "../../lib/utils"

interface LoadingProps extends React.HTMLAttributes<HTMLDivElement> {
  text?: string
}

export function LoadingSpinner({ className, ...props }: React.HTMLAttributes<SVGElement>) {
  return (
    <Loader2 className={cn("animate-spin text-brand-500", className)} {...props} />
  )
}

export function LoadingPage({ text = "Chargement...", className, ...props }: LoadingProps) {
  return (
    <div className={cn("flex flex-col items-center justify-center min-h-[400px] w-full", className)} {...props}>
      <LoadingSpinner className="h-8 w-8 mb-4" />
      <p className="text-sm font-medium text-slate-500">{text}</p>
    </div>
  )
}

export function LoadingOverlay({ text = "Veuillez patienter...", className, ...props }: LoadingProps) {
  return (
    <div className={cn("absolute inset-0 z-50 flex flex-col items-center justify-center bg-white/80 backdrop-blur-sm", className)} {...props}>
      <LoadingSpinner className="h-8 w-8 mb-4" />
      <p className="text-sm font-medium text-slate-700">{text}</p>
    </div>
  )
}
