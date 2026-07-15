import * as React from "react"
import { cn } from "../../lib/utils"
import { SearchX, FolderOpen, ShoppingCart, LucideIcon } from "lucide-react"

interface EmptyStateProps extends React.HTMLAttributes<HTMLDivElement> {
  icon?: LucideIcon
  title: string
  description?: string
  action?: React.ReactNode
}

export function EmptyState({ 
  icon: Icon = FolderOpen, 
  title, 
  description, 
  action, 
  className, 
  ...props 
}: EmptyStateProps) {
  return (
    <div className={cn("flex flex-col items-center justify-center p-8 text-center bg-white rounded-xl border border-slate-100 shadow-sm", className)} {...props}>
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-50 mb-4">
        <Icon className="h-8 w-8 text-slate-400" />
      </div>
      <h3 className="text-lg font-semibold text-slate-900 mb-1">{title}</h3>
      {description && <p className="text-sm text-slate-500 max-w-sm mb-4">{description}</p>}
      {action && <div>{action}</div>}
    </div>
  )
}

export function EmptySearch(props: Omit<EmptyStateProps, "icon">) {
  return <EmptyState icon={SearchX} {...props} />
}

export function EmptyCart(props: Omit<EmptyStateProps, "icon">) {
  return <EmptyState icon={ShoppingCart} {...props} />
}
