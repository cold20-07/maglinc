import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils"

/**
 * Button Component - Pfizer-Inspired Design System
 * 
 * Primary: Deep Blue (#0052CC) - Main CTAs, trust & authority
 * Secondary: Outline style with blue border
 * Accent: Teal/Mint (#1DD1A1) - Secondary CTAs, highlights
 * 
 * Sizes follow accessibility guidelines (min 48px height for touch targets)
 */
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#0052CC] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        // Primary - Deep Blue (Pfizer-inspired)
        default:
          "bg-[#0052CC] text-white rounded-md shadow-sm hover:bg-[#003BA3] hover:shadow-md active:bg-[#00274D] active:scale-[0.98]",
        
        // Accent - Teal/Mint for secondary CTAs
        accent:
          "bg-[#1DD1A1] text-white rounded-md shadow-sm hover:bg-[#0FA361] hover:shadow-md active:scale-[0.98]",
        
        // Outline - Blue border
        outline:
          "border-2 border-[#0052CC] bg-transparent text-[#0052CC] rounded-md hover:bg-[#E3F2FD] active:scale-[0.98]",
        
        // Secondary - Light background
        secondary:
          "bg-[#E3F2FD] text-[#0052CC] rounded-md shadow-sm hover:bg-[#BBDEFB] hover:shadow-md active:scale-[0.98]",
        
        // Ghost - Minimal style
        ghost: 
          "hover:bg-[#F5F5F5] hover:text-[#0052CC] rounded-md active:scale-[0.98]",
        
        // Link style
        link: 
          "text-[#0052CC] underline-offset-4 hover:underline hover:text-[#003BA3]",
        
        // Destructive
        destructive:
          "bg-[#F44336] text-white rounded-md shadow-sm hover:bg-[#D32F2F] hover:shadow-md active:scale-[0.98]",
        
        // Navy - Dark variant
        navy:
          "bg-[#001F3F] text-white rounded-md shadow-sm hover:bg-[#00152A] hover:shadow-md active:scale-[0.98]",
      },
      size: {
        // Small - 32px height
        sm: "h-8 px-4 text-sm rounded-md",
        
        // Default - 40px height
        default: "h-10 px-6 text-sm",
        
        // Large - 48px height (recommended for primary CTAs)
        lg: "h-12 px-8 text-base",
        
        // Extra Large - 56px height (hero CTAs)
        xl: "h-14 px-10 text-lg",
        
        // Icon button
        icon: "h-10 w-10 rounded-md",
        
        // Icon Large
        "icon-lg": "h-12 w-12 rounded-md",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

const Button = React.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button"
  return (
    <Comp
      className={cn(buttonVariants({ variant, size, className }))}
      ref={ref}
      {...props}
    />
  );
})
Button.displayName = "Button"

export { Button, buttonVariants }
