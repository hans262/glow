import React from 'react'

export const Button: React.FC = ({ children }) => {
  return (
    <button className={
      'text-white py-3 px-6 shadow rounded-full cursor-pointer hover:bg-hover ' +
      'hover:text-white font-bold md:text-lg bg-blue-700'
    }>
      {children}
    </button>
  )
}