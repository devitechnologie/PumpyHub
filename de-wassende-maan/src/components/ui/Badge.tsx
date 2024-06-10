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
            'bg-primary-lime2': variant === 'primary',
            'bg-primary-secondary': variant === 'secondary',
            'bg-primary-red text-white': variant === 'danger',
            'bg-primary-light-orange text-white': variant === 'warning',
            'bg-primary-blue-sky': variant === 'info',
            'bg-primary-green-light-dwm': variant === 'success',
            'bg-primary-surface': variant === 'light',
            'bg-primary-black': variant === 'dark',
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