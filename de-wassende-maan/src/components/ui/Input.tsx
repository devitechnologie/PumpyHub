import { cn } from "@/utils/cn"

import { cva } from "class-variance-authority"
import { forwardRef } from "react"

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  variant?: 'primary' | 'secondary'
  size?: 'sm' | 'md' | 'lg'
  validation?: boolean
}

const Input = forwardRef<HTMLInputElement, InputProps>(({ className, variant, size, validation, ...props }, ref) => {
  return (
    <input
      {...props}
      ref={ref}
      className={cn(inputVariants({ variant, size }), className, validation && 'ring-1 ring-red-500 border-transparent focus:ring-0')}
    />
  );
})

Input.displayName = 'Input';

const inputVariants = cva(
  'px-4 py-2 rounded-md outline-none transition-all',
  {
    variants: {
      variant: {
        primary: 'border border-gray-300 focus:border-primary-green',
        secondary: 'focus:ring-1 focus:ring-primary-green-dark-dwm',
      },
      size: {
        sm: 'text-sm',
        md: 'text-base',
        lg: 'text-lg',
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
)

export default Input