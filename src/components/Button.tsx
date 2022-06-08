import React from 'react'
import { classNames } from '../common/classNames'

export const Button: React.FC<{
  className?: string
  onClick?: () => void
}> = ({ children, className, onClick }) => {
  return (
    <button
      className={classNames(
        'text-white py-2 px-4 shadow',
        'cursor-pointer hover:bg-green-700',
        'hover:text-white font-bold md:text-lg',
        'bg-green-600 hover:shadow-md rounded-md',
        className
      )}
      onClick={onClick}
    >
      {children}
    </button>
  )
}