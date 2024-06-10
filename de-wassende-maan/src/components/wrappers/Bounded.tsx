import { cn } from "@/utils/cn"

type BoundedProps = {
  as?: React.ElementType
  children: React.ReactNode
  className?: string
} & React.HTMLAttributes<HTMLElement>

const Bounded = ({ as: Wrapper = "section", children, className, ...props }: BoundedProps) => {
  return (
    <Wrapper
      className={cn("container mx-auto px-4 max-w-[1300px]", className)}
      {...props}
    >
      {children}
    </Wrapper>
  )
}

export default Bounded