import { classNames } from "../common/classNames"

interface IInput extends React.InputHTMLAttributes<HTMLInputElement> { }

export const Input: React.FC<IInput> = ({
  className, ...nest
}) => {
  return (
    <input
      {...nest}
      className={classNames(
        'px-4 py-2 md:text-lg',
        ' rounded-md ',
        'outline-none focus:shadow-lg',
        'text-green-700 ring-green-700 ring-1',
        'placeholder-green-700/50',
        className
      )}
    />
  )
}

interface ITextarea extends React.TextareaHTMLAttributes<HTMLTextAreaElement> { }

export const Textarea: React.FC<ITextarea> = ({
  className, ...nest
}) => {
  return (
    <textarea
      {...nest}
      className={classNames(
        'px-4 py-2 md:text-lg',
        ' rounded-md',
        'align-bottom min-h-[100px]',
        'outline-none focus:shadow-lg',
        'ring-green-700 text-green-700 ring-1',
        'placeholder-green-700/50',
        className
      )}
    />
  )
}
