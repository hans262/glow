import { classNames } from "../common/classNames"

const Loading = () => {
  return (
    <div className={classNames(
      'flex items-center justify-center flex-col h-screen w-full'
    )}>
      <span className="flex items-center space-x-4">
        <span className="animate-ping h-5 w-5 rounded-full bg-sky-400 opacity-75"></span>
        <span className="animate-ping h-6 w-6 rounded-full bg-sky-400 opacity-75"></span>
        <span className="animate-ping h-7 w-7 rounded-full bg-sky-400 opacity-75"></span>
      </span>
    </div>
  )
}

export default Loading