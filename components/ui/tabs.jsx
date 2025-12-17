'use client'

import { createContext, useContext } from 'react'
import { cn } from '@/lib/utils'

const TabsContext = createContext()

const Tabs = ({ value, onValueChange, className, children, ...props }) => {
  return (
    <TabsContext.Provider value={{ value, onValueChange }}>
      <div className={cn("w-full", className)} {...props}>
        {children}
      </div>
    </TabsContext.Provider>
  )
}

const TabsList = ({ className, children, ...props }) => {
  return (
    <div
      className={cn(
        "inline-flex h-12 items-center justify-center rounded-xl bg-[#0F1420] border border-[#1A2332] p-1 text-gray-400",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

const TabsTrigger = ({ value, className, children, ...props }) => {
  const context = useContext(TabsContext)
  const isActive = context?.value === value

  return (
    <button
      className={cn(
        "inline-flex items-center justify-center whitespace-nowrap rounded-lg px-4 py-2 text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#de2529] disabled:pointer-events-none disabled:opacity-50",
        isActive
          ? "bg-gradient-to-r from-[#de2529] to-[#ff3b3f] text-white shadow-lg"
          : "text-gray-400 hover:text-white hover:bg-[#1A2332]",
        className
      )}
      onClick={() => context?.onValueChange?.(value)}
      {...props}
    >
      {children}
    </button>
  )
}

const TabsContent = ({ value, className, children, ...props }) => {
  const context = useContext(TabsContext)
  const isActive = context?.value === value

  if (!isActive) return null

  return (
    <div
      className={cn(
        "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export { Tabs, TabsList, TabsTrigger, TabsContent }