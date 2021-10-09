import { useEffect, useRef, useState } from "react"

/**
 * 可折叠的盒子
 * 动画延迟展开
 */
export const FoldBox: React.FC<{
  visible: boolean
}> = ({ visible, children }) => {
  const [state, setState] = useState({
    contentHeight: 0,
    overflow: 'hidden' as React.CSSProperties['overflow']
  })
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (visible) {
      const contentHeight = ref.current?.getBoundingClientRect().height ?? 0
      setState(e => ({ ...e, contentHeight, abc: true }))
      setTimeout(() => {
        setState(e => ({
          ...e, overflow: contentHeight > 0 ? "visible" : "hidden"
        }))
      }, 300)
    } else {
      setState(e => ({ ...e, contentHeight: 0, overflow: 'hidden' }))
    }
  }, [visible])

  return (
    <div style={{
      overflow: state.overflow,
      transition: 'height 0.3s ease-in-out',
      height: state.contentHeight
    }}>
      <div ref={ref}>{children}</div>
    </div >
  )
}

export const TextFoldBox = () => {
  const [visible, setVisible] = useState(false)
  return <>
    <button onClick={() => setVisible(e => !e)}>展开</button>
    <FoldBox visible={visible}>
      <div style={{
        height: 300, background: '#000',
        boxShadow: '1px 1px 12px red'
      }}></div>
    </FoldBox>
  </>
}