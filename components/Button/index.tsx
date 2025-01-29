// components/ui/Button.tsx
'use client'
import { ComponentProps } from 'react'
import clsx from 'clsx'

type ButtonProps = ComponentProps<'button'> & {
  isLoading?: boolean
  variant?: 'primary' | 'danger' | 'secondary'
}

export const Button = ({
  children,
  isLoading,
  variant = 'primary',
  className,
  ...props
}: ButtonProps) => (
  <button
    {...props}
    disabled={isLoading || props.disabled}
    className={clsx(
      'px-1 py-4 rounded-md transition-colors w-full cursor-pointer font-medium mr-2',
      {
        'bg-green-400 text-white hover:bg-green-500': variant === 'primary',
        'bg-red-600 text-white hover:bg-red-700': variant === 'danger',
        'bg-gray-200 text-gray-700 hover:bg-gray-300': variant === 'secondary',
        'opacity-50 cursor-not-allowed': isLoading || props.disabled
      },
      className
    )}
  >
    {isLoading ? 'Processing...' : children}
  </button>
)