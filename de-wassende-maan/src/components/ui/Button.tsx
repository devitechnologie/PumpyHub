import { cn } from "@/utils/cn";

import { cva } from "class-variance-authority"

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outlined' | 'link' | 'icon' | 'none'
  isLoading?: boolean
}

const Button = ({ className, variant, isLoading, ...props }: ButtonProps) => {
  return (
    <button
      {...props}
      className={cn(buttonVariants({ variant }), className, isLoading && 'cursor-not-allowed bg-opacity-50 hover:bg-opacity-50')}
    />
  )
}

const buttonVariants = cva(
  'px-4 py-2 rounded-md font-semibold transition-all',
  {
    variants: {
      variant: {
        primary: 'hover:bg-button-primary-hover text-white ease-in-out bg-button-primary',
        secondary: 'bg-white text-primary-black hover:bg-button-secondary',
        ghost: 'bg-transparent text-button-ghost-text hover:bg-button-ghost',
        outlined: 'text-button-outlined-text border border-button-outlined-border hover:bg-button-outlined-hover hover:text-white hover:border-transparent',
        link: 'px-0 py-0 bg-transparent underline',
        icon: 'bg-white text-primary-black p-2 rounded-full hover:text-primary-black hover:bg-primary-black hover:text-primary-white',
        none: 'bg-transparent text-black px-0 py-0 font-normal rounded-none',
      },
    },
    defaultVariants: {
      variant: "primary",
    },
  }
)

export default Button