import { useEffect, useRef, useState } from "react"

export const ImagePreview: React.FC<{
  src: string
  onClosePreview?: () => void
}> = ({ src, onClosePreview }) => {
  const contentRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLImageElement>(null)

  const [state, setState] = useState({
    naturalWidth: undefined as undefined | number,
    width: undefined as undefined | number,
    maxWidth: '100%' as undefined | string,
    initialWidth: undefined as undefined | number,
    top: 0
  })

  const onLoad = (evt: React.SyntheticEvent<HTMLImageElement, Event>) => {
    if (!contentRef.current?.clientWidth) throw new Error('未获取到父容器宽度')
    const image = evt.target as HTMLImageElement
    const width = (image.width / contentRef.current?.clientWidth) * 100
    setState(e => ({
      ...e,
      naturalWidth: image.naturalWidth,
      width, initialWidth: width
    }))
  }

  useEffect(() => {
    if (!state.width) return
    if (contentRef.current) {
      contentRef.current.scrollTo(
        (contentRef.current.scrollWidth - contentRef.current.clientWidth) / 2,
        (contentRef.current.scrollHeight - contentRef.current.clientHeight) / 2
      )
    }
    if (imageRef.current && contentRef.current) {
      const n = contentRef.current.clientHeight - imageRef.current.clientHeight
      setState(e => ({ ...e, top: n > 0 ? n / 2 : 0 }))
    }
  }, [state.width])

  const onZoomClick = (type: '+' | '-') => {
    if (typeof state.naturalWidth === 'undefined') return
    if (typeof state.width === 'undefined') return
    if (typeof state.initialWidth === 'undefined') return

    const step = 10
    let width = state.width
    let maxWidth: string | undefined = state.maxWidth
    let top = state.top
    if (type === '+') {
      width += step
      if (width > 100) {
        maxWidth = undefined
      }
    } else {
      width -= step
      if (width < state.initialWidth) {
        // width = state.initialWidth
      }
      if (width < 100) {
        maxWidth = '100%'
      }
    }
    setState(e => ({ ...e, width, maxWidth, top }))
  }

  return (
    <div style={{ position: 'relative', height: '100%' }}>
      <div style={{ position: 'absolute', top: 0, right: 0 }}>
        <button onClick={() => onZoomClick('+')}>放大</button>
        <button onClick={() => onZoomClick('-')}>缩小</button>
        {onClosePreview && <button onClick={onClosePreview}>关闭</button>}
      </div>
      <div ref={contentRef} style={{
        height: '100%',
        overflow: 'auto',
        textAlign: 'center'
      }}>
        <img src={src} ref={imageRef}
          style={{
            width: state.width && state.width + '%',
            maxWidth: state.maxWidth,
            marginTop: state.top,
            userSelect: 'none'
          }}
          alt=""
          onLoad={onLoad}
        />
      </div>
    </div>
  )
}