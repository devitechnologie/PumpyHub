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
        primary: 'hover:bg-primary-green text-white ease-in-out bg-primary-green-dark-dwm',
        secondary: 'bg-white text-primary-black hover:bg-primary-secondary2',
        ghost: 'bg-transparent text-primary-green hover:bg-primary-green-light-dwm',
        outlined: 'text-primary-green-dark-dwm border border-primary-green-dark-dwm hover:bg-primary-green hover:text-white hover:border-transparent',
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