import { useEffect, useRef, useState } from "react"

/**
 * 图片懒加载
 * 在用户需要的时候才加载
 * 加载的时机需要开发者自己管理
 */

export const LazyImage: React.FC<{
  src: string
  load: boolean
}> = ({ src, load }) => {
  const ref = useRef<HTMLImageElement>(null)
  const [opacity, setOpacity] = useState(0)

  useEffect(() => {
    if (load && src && ref.current) {
      ref.current.src = src
      ref.current.onload = () => {
        setOpacity(1)
      }
    }
  }, [src, load])

  return (
    <img ref={ref} alt="图片加载失败" data-src={src} style={{
      width: '100%', height: '100%', objectFit: 'cover',
      opacity: opacity,
      transition: 'opacity 0.5s ease-out',
      verticalAlign: 'bottom'
    }} />
  )
}

export const TeztLazyImage = () => {
  const [load, setLoad] = useState(false)
  return <>
    <button onClick={() => setLoad(e => !e)}>load</button>
    <div style={{ width: 300, height: 200 }}>
      <LazyImage src={
        'https://swiperjs.com/demos/images/nature-7.jpg'
      } load={load} />
    </div>
    <div>test</div>
  </>
}