import { cn } from '@/lib/utils'

const buttonVariants = {
  default: "bg-gradient-to-r from-[#de2529] to-[#ff3b3f] text-white font-semibold hover:shadow-lg hover:shadow-red-500/50 transition-all duration-300 hover:scale-105 active:scale-95",
  destructive: "bg-red-500 text-white hover:bg-red-600",
  outline: "border border-[#1A2332] bg-[#0F1420] hover:bg-[#1A2332] hover:border-[#de2529]/50 text-gray-300 hover:text-white",
  secondary: "bg-[#1A2332] text-gray-300 hover:bg-[#2A3441] hover:text-white",
  ghost: "hover:bg-[#1A2332] text-gray-300 hover:text-white",
  link: "text-[#de2529] underline-offset-4 hover:underline hover:text-[#ff3b3f]",
}

const buttonSizes = {
  default: "h-10 px-4 py-2",
  sm: "h-9 rounded-md px-3",
  lg: "h-11 rounded-md px-8",
  icon: "h-10 w-10",
}

const Button = ({ 
  className, 
  variant = "default", 
  size = "default", 
  disabled,
  ...props 
}) => {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
        buttonVariants[variant],
        buttonSizes[size],
        className
      )}
      disabled={disabled}
      {...props}
    />
  )
}

export { Button }