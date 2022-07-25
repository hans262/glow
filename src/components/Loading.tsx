import { classNames } from "../common/classNames"
import imgsrc from '../common/dog.gif'

const Loading = () => {
  return (
    <div className={classNames(
      'flex items-center justify-center flex-col h-screen'
    )}>
      <img src={imgsrc} alt="" />
    </div>
  )
}

export default Loading