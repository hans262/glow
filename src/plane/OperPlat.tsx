import { useAppDispatch, useAppSelector } from "../store"
import { switchEditorType } from '../store/plane'

export const OperPlat: React.FC<{
  height: number
  style?: React.CSSProperties
}> = ({ height, style }) => {
  const dispatch = useAppDispatch()
  const { editorType } = useAppSelector(state => state.plane)
  function onClick(type: string) {
    dispatch(switchEditorType(type))
  }
  return (
    <div style={{ height, display: 'flex', alignItems: 'center', ...style }}>
      {edts.map(e =>
        <EditorButton onClick={() => onClick(e.type)}
          style={{
            marginLeft: 10,
            color: editorType === e.type ? 'red' : 'inherit'
          }} key={e.type}
        >{e.label}</EditorButton>
      )}
    </div>
  )
}

const edts = [
  { type: 'draw', label: '勾画' },
  { type: 'move', label: '移动' },
  { type: 'daub', label: '涂抹' },
  { type: 'union', label: '联合' }
]

type EditorButtonProps = React.PropsWithChildren<{
  style?: React.CSSProperties
  onClick?: () => void
}>

export function EditorButton(props: EditorButtonProps) {
  const { style, children, onClick } = props
  return (
    <div className="hover1" onClick={onClick} style={{
      cursor: 'pointer',
      border: '1px solid',
      padding: '3px 10px',
      display: 'inline-block',
      ...style
    }}>{children}</div>
  )
}