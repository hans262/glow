import { useEffect, useRef } from "react";
import { DuckShooter } from "./DuckShooter";
import { useMount, useUnmount, useSize } from "react-use";

export default function DuckShooterGraph() {
  const divRef = useRef<HTMLDivElement>(null)
  const gameRef = useRef<DuckShooter>()

  const [sized, { width, height }] = useSize(() => <div></div>)

  useMount(() => {
    gameRef.current = new DuckShooter(divRef.current!)
  })

  useEffect(() => {
    gameRef.current?.resizeCanvs()
  }, [width])

  useUnmount(() => {
    gameRef.current?.close()
  })

  return (
    <div
      ref={divRef}
      // className="overflow-hidden"
      style={{
        background: '#ccc',
        width: '100vw',
        height: '100vh',
      }}>
      {sized}
    </div>
  )
}