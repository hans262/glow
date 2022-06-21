import { useEffect, useRef, useState } from "react"
import { Button } from "./Button"

/**
 * 可折叠的盒子
 * 动画延迟展开
 */
export const FoldBox: React.FC<{
  visible: boolean
  children: React.ReactNode
}> = ({ visible, children }) => {
  const [state, setState] = useState({
    contentHeight: 0,
    overflow: 'hidden' as React.CSSProperties['overflow']
  })
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (visible) {
      const contentHeight = ref.current?.getBoundingClientRect().height ?? 0
      setState(e => ({ ...e, contentHeight }))
      setTimeout(() => {
        setState(e => ({
          ...e, overflow: contentHeight > 0 ? "visible" : "hidden",
        }))
      }, 1000)
    } else {
      setState(e => ({ ...e, contentHeight: 0, overflow: 'hidden' }))
    }
  }, [visible])

  return (
    <div style={{
      overflow: state.overflow,
      transition: 'all 1s ease-in-out',
      height: state.contentHeight
    }}>
      <div ref={ref}>{children}</div>
    </div>
  )
}

export const TestFoldBox = () => {
  const [visible, setVisible] = useState(false)
  return <>
    <Button onClick={() => setVisible(e => !e)}>展开</Button>
    <FoldBox visible={visible}>
      <div style={{
        height: 300, background: '#000',
        boxShadow: '1px 1px 12px red', borderRadius: 8
      }}></div>
    </FoldBox>
  </>
}