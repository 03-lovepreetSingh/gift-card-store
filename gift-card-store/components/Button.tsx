'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { ComponentPropsWithoutRef, forwardRef } from 'react'

type ButtonVariant = 'default' | 'outline' | 'ghost' | 'link'
type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonProps extends ComponentPropsWithoutRef<'button'> {
  variant?: ButtonVariant
  size?: ButtonSize
  isLoading?: boolean
  fullWidth?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(({
  children,
  variant = 'default',
  size = 'md',
  isLoading = false,
  fullWidth = false,
  leftIcon,
  rightIcon,
  className = '',
  disabled,
  ...props
}, ref) => {
  const baseStyles =
    'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring'
  
  const variantStyles = {
    default: 'bg-primary text-primary-foreground shadow hover:bg-primary/90',
    outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
    ghost: 'hover:bg-accent hover:text-accent-foreground',
    link: 'text-primary underline-offset-4 hover:underline',
  }
  
  const sizeStyles = {
    sm: 'h-8 px-3 text-xs',
    md: 'h-10 px-4 py-2 text-sm',
    lg: 'h-12 px-6 py-3 text-base',
  }
  
  const widthStyle = fullWidth ? 'w-full' : ''
  const disabledStyle = disabled || isLoading ? 'opacity-50 cursor-not-allowed' : ''
  
  const buttonProps = {
    className: cn(
      baseStyles,
      variantStyles[variant],
      sizeStyles[size],
      widthStyle,
      disabledStyle,
      className
    ),
    disabled: disabled || isLoading,
    // Explicitly type the ref to avoid type conflicts
    ref: ref as React.RefObject<HTMLButtonElement> | null,
    // Spread other props but exclude the ones we've already handled
    ...Object.fromEntries(
      Object.entries(props).filter(
        ([key]) => !['onDrag', 'onDragStart', 'onDragEnd'].includes(key)
      )
    )
  }

  return (
    <motion.button
      whileHover={!disabled && !isLoading ? { scale: 1.03 } : undefined}
      whileTap={!disabled && !isLoading ? { scale: 0.97 } : undefined}
      transition={{
        type: 'spring',
        stiffness: 400,
        damping: 17,
      }}
      // Manually spread the props to avoid type conflicts
      className={buttonProps.className}
      disabled={buttonProps.disabled}
      ref={buttonProps.ref}
      // Spread only the remaining props that are valid HTML button props
      {...Object.fromEntries(
        Object.entries(buttonProps).filter(
          ([key]) => !['className', 'disabled', 'ref'].includes(key)
        )
      )}
    >
      {isLoading && (
        <svg
          className="mr-2 h-4 w-4 animate-spin"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      )}
      {!isLoading && leftIcon && <span className="mr-2">{leftIcon}</span>}
      {children}
      {!isLoading && rightIcon && <span className="ml-2">{rightIcon}</span>}
    </motion.button>
  )
})

Button.displayName = 'Button'
