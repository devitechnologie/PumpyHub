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
        primary: 'hover:bg-primary-green text-white ease-in-out bg-primary-green-dark-dwm',
        secondary: 'bg-white text-primary-black hover:bg-primary-secondary2',
        ghost: 'bg-transparent text-primary-green hover:bg-primary-green-light-dwm',
        outlined: 'bg-transparent border-2 border-primary-green text-primary-green hover:bg-primary-green-light-dwm',
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