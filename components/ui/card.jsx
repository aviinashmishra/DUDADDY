import { cn } from '@/lib/utils'

const Card = ({ className, ...props }) => (
  <div
    className={cn(
      "bg-[#0F1420] border border-[#1A2332] rounded-xl text-white shadow-lg hover:border-[#de2529]/50 transition-all duration-300",
      className
    )}
    {...props}
  />
)

const CardHeader = ({ className, ...props }) => (
  <div className={cn("flex flex-col space-y-1.5 p-6", className)} {...props} />
)

const CardTitle = ({ className, ...props }) => (
  <h3
    className={cn(
      "text-2xl font-semibold leading-none tracking-tight text-white",
      className
    )}
    {...props}
  />
)

const CardDescription = ({ className, ...props }) => (
  <p
    className={cn("text-sm text-gray-400", className)}
    {...props}
  />
)

const CardContent = ({ className, ...props }) => (
  <div className={cn("p-6 pt-0", className)} {...props} />
)

const CardFooter = ({ className, ...props }) => (
  <div className={cn("flex items-center p-6 pt-0", className)} {...props} />
)

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }