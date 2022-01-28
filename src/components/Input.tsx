import { classNames } from "../common/classNames"

export const Input: React.FC<{
  placeholder?: string
  className?: string
}> = ({ placeholder, className }) => {
  return (
    <input
      placeholder={placeholder}
      className={classNames(
        'px-4 py-2 text-green-800 bg-transparent rounded-md ',
        'outline-none focus:shadow-lg',
        'border-green-800 border-2',
        'placeholder-green-800 placeholder-opacity-75',
        className
      )}
    />
  )
}