import { classNames } from "../common/classNames"

interface IInput extends React.InputHTMLAttributes<HTMLInputElement> { }

export const Input: React.FC<IInput> = ({
  className, ...nest
}) => {
  return (
    <input
      {...nest}
      className={classNames(
        'px-4 py-2 text-green-800 bg-transparent rounded-md ',
        'outline-none focus:shadow-lg',
        'border-green-800 border-2',
        'placeholder-green-800/50',
        className
      )}
    />
  )
}