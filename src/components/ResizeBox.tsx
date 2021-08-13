
/**
 * 高度相对于宽度的盒子
 * default height = width * 100%
 */
export const ResizeBox: React.FC<{
  height?: number | string,
  style?: React.CSSProperties
}> = ({ children, height, style }) => {
  const { height: sth = '100%', ...rest } = style ?? {}
  return <div
    style={{
      height: 0,
      paddingBottom: height ?? sth,
      position: "relative",
      ...rest
    }}
  >
    <div style={{ position: "absolute", width: "100%", height: "100%" }}>
      {children}
    </div>
  </div>
}