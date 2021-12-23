import { useEffect, useState } from 'react';
import { fromEvent } from 'rxjs'
import { debounceTime, map } from 'rxjs/operators'

interface WindowSize {
  innerHeight: number
  innerWidth: number
  outerHeight: number
  outerWidth: number
}

function getSize(): WindowSize {
  return {
    innerHeight: window.innerHeight,
    innerWidth: window.innerWidth,
    outerHeight: window.outerHeight,
    outerWidth: window.outerWidth
  }
}

/**
 * 实时获取window尺寸 可截流
 * @param dueTime 延迟毫秒
 * @returns WindowSize
 */
export default function useWindowSize(dueTime: number) {
  const [windowSize, setWindowSize] = useState(getSize())
  useEffect(() => {
    const observable = fromEvent(window, 'resize').pipe(
      debounceTime(dueTime),
      map(_ => getSize())
    )
    const subscription = observable.subscribe(v => setWindowSize(v))
    return () => {
      subscription.unsubscribe()
    }
  }, [dueTime])
  return windowSize
}