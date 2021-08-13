import { useEffect, useRef, useState } from "react"

/**
 * 可折叠的盒子
 * 动画延迟展开
 */
export const FoldBox: React.FC<{
  visible: boolean
}> = ({ visible, children }) => {
  const [boxHeight, setBoxHeight] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const height = ref.current?.getBoundingClientRect().height ?? 0
    if (visible) {
      setBoxHeight(height)
    } else {
      setBoxHeight(0)
    }
  }, [visible])
  return (
    <div style={{
      overflow: 'hidden',
      transition: 'height 0.3s ease-in-out',
      height: boxHeight
    }}>
      <div ref={ref}>{children}</div>
    </div >
  )
}