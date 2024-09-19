import React from 'react'

interface SliderProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  onValueChange: (value: number[]) => void
  variant?: 'default' | 'range'
  size?: 'default' | 'sm' | 'lg'
}

export const Slider: React.FC<SliderProps> = ({
  onValueChange,
  variant = 'default',
  size = 'default',
  ...props
}) => {
  return (
    <input
      type="range"
      className={`slider ${variant} ${size}`}
      onChange={(e) => onValueChange([Number(e.target.value)])}
      {...props}
    />
  )
}