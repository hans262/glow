import React from "react"

/**
 * 双飞翼布局
 * 两侧固定宽，中间自适应
 */
type DoubleWingsProps = React.PropsWithChildren<{
  left?: React.ReactNode
  right?: React.ReactNode
}>
export function DoubleWings(props: DoubleWingsProps) {
  const { children, left, right } = props
  return (
    <div style={{ display: 'flex' }}>
      <div style={{ overflow: 'hidden' }}>{left}</div>
      <div style={{ flex: 1, overflow: 'hidden' }}>{children}</div>
      <div style={{ overflow: 'hidden' }}>{right}</div>
    </div>
  )
}