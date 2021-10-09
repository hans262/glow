import React, { useImperativeHandle, useRef } from "react";

/**
 * useImperativeHandle
 * 上层组件可以调用子组件暴露的方法
 */

interface RefType {
  focus: () => void
}

export const FancyInput = React.forwardRef<
  RefType,
  React.PropsWithChildren<{}>
>((props, ref) => {
  const inputRef = useRef<HTMLInputElement>(null)

  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current?.focus()
    }
  }), [])

  return <input ref={inputRef} />
})

export default function Test() {
  const ref = useRef<RefType>(null)
  return (
    <>
      <button onClick={() => {
        ref.current?.focus()
      }}>哈哈</button>
      <FancyInput ref={ref} />
    </>
  )
}