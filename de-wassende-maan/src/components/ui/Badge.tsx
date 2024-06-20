import { cn } from "@/utils/cn"

type BadgeProps = {
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark'
  className?: string
}

const Badge = ({ children, variant, className }: BadgeProps) => {
  return (
    <div
      className={
        cn(
          "text-sm font-medium py-0.5 px-2 rounded-full",
          {
            'bg-badge-primary': variant === 'primary',
            'bg-badge-secondary': variant === 'secondary',
            'bg-badge-danger text-white': variant === 'danger',
            'bg-badge-warning text-white': variant === 'warning',
            'bg-badge-info': variant === 'info',
            'bg-badge-success': variant === 'success',
            'bg-badge-light': variant === 'light',
            'bg-badge-dark': variant === 'dark',
          },
          className
        )
      }
    >
      {children}
    </div>
  )
}

export default Badge