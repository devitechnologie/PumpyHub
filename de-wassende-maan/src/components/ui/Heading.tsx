import { cn } from "@/utils/cn";

import { cva } from "class-variance-authority"

type HeadingProps = React.HTMLAttributes<HTMLHeadingElement> & {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
}

const Heading = ({ as = 'h2', variant = 'h2', className, ...props }: HeadingProps) => {
  const Component = as

  return (
    <Component
      {...props}
      className={cn(headingVariants({ variant }), className)}
    />
  )
}

const headingVariants = cva(
  'font-bold text-primary-black',
  {
    variants: {
      variant: {
        h1: 'md:text-4xl text-3xl',
        h2: 'md:text-3xl text-2xl',
        h3: 'md:text-xl text-lg',
        h4: 'text-lg',
        h5: 'text-base',
        h6: 'text-sm',
      },
    },
    defaultVariants: {
      variant: "h2",
    },
  }
)

export default Heading