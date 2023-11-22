import React, { useImperativeHandle, useRef } from "react";

interface RefType {
  focus: () => void
}

export const FancyInput = React.forwardRef<
  RefType,
  { defaultValue: any }
>((props, ref) => {
  const inputRef = useRef<HTMLInputElement>(null)

  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current?.focus()
    }
  }), [])

  return <input defaultValue={props.defaultValue} ref={inputRef} />
})


export const Input = React.forwardRef<
  HTMLInputElement,
  { defaultValue: any }
>((props, ref) => {
  return <input defaultValue={props.defaultValue} ref={ref} />
})

export default function UseImperativeHandle() {
  const ref = useRef<RefType>(null)
  const ref2 = useRef<HTMLInputElement>(null)
  return (
    <>
      <h1>React: forwardRef</h1>
      <p>传递ref</p>
      <button onClick={() => {
        console.log(ref2.current?.value)
      }}>获取value</button>
      <Input defaultValue={222} ref={ref2} />

      <h1>React: useImperativeHandle</h1>
      <p>上层组件调用子组件暴露的方法</p>
      <button onClick={() => {
        ref.current?.focus()
      }}>focus</button>
      <FancyInput defaultValue={11} ref={ref} />
    </>
  )
}