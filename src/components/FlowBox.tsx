
/**
 * 一种流式加载盒子
 */
export const FlowBox: React.FC<{
  height: string | number
  style?: React.CSSProperties
  onScrollBottom?: () => void
}> = ({ children, style, height, onScrollBottom }) => {
  const onScroll = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
    const div = e.target as HTMLDivElement
    if (div.scrollTop >= div.scrollHeight - div.clientHeight) {
      onScrollBottom && onScrollBottom()
    }
  }
  return (
    <div style={{
      overflow: 'scroll',
      height,
      ...style
    }} onScroll={onScroll}>
      {children}
    </div>
  )
}