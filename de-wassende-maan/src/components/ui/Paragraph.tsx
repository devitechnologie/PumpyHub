import { cn } from "@/utils/cn"

import { cva } from "class-variance-authority"

type ParagraphProps = React.HTMLAttributes<HTMLParagraphElement> & {
  children: React.ReactNode
  className?: string
  size?: 'sm' | 'base' | 'lg'
}

const Paragraph = ({ children, className, size, ...props }: ParagraphProps) => {
  return (
    <p
      {...props}
      className={cn(paragraphVariants({ size: size }), className)}
    >
      {children}
    </p>
  )
}

const paragraphVariants = cva(
  'text-paragraph-primary',
  {
    variants: {
      size: {
        sm: 'text-sm',
        base: 'text-base',
        lg: 'text-lg',
      },
    },
    defaultVariants: {
      size: "base",
    },
  }
)

export default Paragraph