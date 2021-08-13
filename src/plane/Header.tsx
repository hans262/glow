export const Header: React.FC<{
  height: number,
  style?: React.CSSProperties
}> = ({ height, style }) => {
  return (
    <div style={{ height, display: 'flex', alignItems: 'center', ...style }}>
      {menuList.map((v, k) => <Button style={{
        borderRight: menuList.length - 1 !== k ? '1px solid' : undefined,
      }} key={k} items={v.items}>{v.label}</Button>)}
    </div>
  )
}

const menuList = [
  { value: 0, label: 'File', items: [{ value: 0, label: 'open' }, { value: 1, label: 'close' }] },
  { value: 1, label: 'Edit' },
  { value: 2, label: 'Layout' },
  { value: 3, label: 'View' },
  { value: 4, label: 'Help' }
]

type ButtonProps = React.PropsWithChildren<{
  style?: React.CSSProperties
  onClick?: () => void
  items?: { value: number, label: string }[]
}>

function Button(props: ButtonProps) {
  const { children, style, onClick, items } = props
  return (
    <div className="hover1 headerBtn" style={{
      display: 'inline-block',
      cursor: 'pointer',
      borderRight: '1px solid',
      padding: '0 10px', position: 'relative',
      height: 28, lineHeight: '28px',
      ...style
    }} onClick={onClick}>
      {children}
      {items && <div className="box" style={{
        position: 'absolute', left: 0, top: 28,
        width: 100, height: 100, background: '#444', color: 'white'
      }}>
        {items?.map((v, k) => <div key={k}>{v.label}</div>)}
      </div>}
    </div>
  )
}