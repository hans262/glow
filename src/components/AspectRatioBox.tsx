/**
 * 纵横比盒子
 */
export const AspectRatioBox: React.FC<{
  style?: React.CSSProperties
  children?: React.ReactNode
  aspectRatio?: [number, number]
}> = ({ children, style, aspectRatio = [16, 9] }) => {

  return (
    <div
      className={`w-full aspect-[${aspectRatio[0]}/${aspectRatio[1]}]`}
      style={style}
    >
      {children}
    </div>
  )
}