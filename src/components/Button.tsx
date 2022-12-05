import { classNames } from '../common/classNames'

interface IButton extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string
  children: React.ReactNode
}

export const Button: React.FC<IButton> = ({
  children, className, ...props
}) => {
  return (
    <button
      {...props}
      className={classNames(
        'py-2 px-4 md:text-lg font-bold',
        'cursor-pointer hover:bg-green-700 text-white',
        'hover:text-white shadow',
        'bg-green-600 hover:shadow-md rounded-lg',
        'hover:scale-105 transition',
        (props.disabled && 'disabled:cursor-not-allowed disabled:bg-[#607d8b]'),
        className
      )}
    >
      {children}
    </button>
  )
}