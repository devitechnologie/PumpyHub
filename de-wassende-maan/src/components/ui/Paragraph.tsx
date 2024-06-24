import { createClient } from "@/prismicio"
import { cn } from "@/utils/cn"
import { getFont } from "@/utils/fonts"

import { cva } from "class-variance-authority"

type ParagraphProps = React.HTMLAttributes<HTMLParagraphElement> & {
  children: React.ReactNode
  className?: string
  size?: 'sm' | 'base' | 'lg'
}

const Paragraph = async ({ children, className, size, ...props }: ParagraphProps) => {
  const client = createClient()
  const settings = await client.getSingle("settings")
  const font = getFont(settings.data.paragraphs_font_family)

  return (
    <p
      {...props}
      className={cn(paragraphVariants({ size: size }), font.className, className)}
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