import { cn } from "@/utils/cn";

import { cva } from "class-variance-authority"
import { PrismicNextLink, PrismicNextLinkProps } from "@prismicio/next";

type ButtonLinkProps = PrismicNextLinkProps & {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outlined' | 'link' | 'none'
}

const ButtonLink = ({ className, variant, ...props }: ButtonLinkProps) => {
  return (
    <PrismicNextLink
      {...props}
      className={cn(buttonLinkVariants({ variant }), className)}
    />
  )
}

const buttonLinkVariants = cva(
  'inline-block px-4 py-2 rounded-md font-semibold transition-all',
  {
    variants: {
      variant: {
        primary: 'hover:bg-button-primary-hover text-white ease-in-out bg-button-primary',
        secondary: 'bg-white text-primary-black hover:bg-button-secondary',
        ghost: 'bg-transparent text-button-ghost-text hover:bg-button-ghost',
        outlined: 'text-button-outlined-text border border-button-outlined-border hover:bg-button-outlined-hover hover:text-white hover:border-transparent',
        link: 'px-0 py-0 bg-transparent underline',
        none: 'bg-transparent text-black px-0 py-0 font-normal rounded-none',
      },
    },
    defaultVariants: {
      variant: "primary",
    },
  }
)

export default ButtonLink