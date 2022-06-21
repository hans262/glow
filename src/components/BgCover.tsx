/**
 * 背景图组件
 * 覆盖在盒子中，上下左右居中
 */
export const BgCover: React.FC<{
  style?: React.CSSProperties
  src: string
  children?: React.ReactNode
}> = ({ style, src, children }) => {
  const { backgroundImage, ...rest } = style ?? {}
  return <div style={{
    backgroundImage: backgroundImage ?? `url(${src})`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    ...rest
  }}>
    {children}
  </div>
}