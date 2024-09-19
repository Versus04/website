import React from 'react'

interface RadioGroupProps {
  children: React.ReactNode
  onValueChange: (value: string) => void
  variant?: 'default' | 'inline'
  size?: 'default' | 'sm' | 'lg'
}

export const RadioGroup: React.FC<RadioGroupProps> = ({
  children,
  onValueChange,
  variant = 'default',
  size = 'default',
  ...props
}) => {
  return (
    <div
      className={`radio-group ${variant} ${size}`}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => onValueChange(e.target.value)}
      {...props}
    >
      {children}
    </div>
  )
}

interface RadioGroupItemProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  variant?: 'default' | 'button'
  size?: 'default' | 'sm' | 'lg'
}

export const RadioGroupItem: React.FC<RadioGroupItemProps> = ({
  variant = 'default',
  size = 'default',
  ...props
}) => {
  return (
    <input
      type="radio"
      className={`radio-group-item ${variant} ${size}`}
      {...props}
    />
  )
}