import { cn } from '@/utils/cn'

type DividerProps = {
  className?: string
  vertical?: boolean
}

const Divider = ({ className, vertical }: DividerProps) => {

  if (vertical) {
    return (
      <div
        className={cn(
          "w-[1px] h-full bg-gray-300",
          className
        )}
      />
    )
  }

  return (
    <div
      className={cn(
        "w-full h-[1px] bg-gray-300",
        className
      )}
    />
  )
}

export default Divider