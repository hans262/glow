import { papersub } from "./subject"
import { EditorButton } from "./TopOper"

interface LeftProps {
  width: number
}
export default function Left(props: LeftProps) {
  const { width } = props
  const onClick = () => {
    papersub.next('qwqw')
  }
  return (
    <div style={{ width }}>

      <EditorButton onClick={onClick}>获取</EditorButton>
    </div>
  )
}