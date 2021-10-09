import React, { useCallback, useState } from "react"

/**
 * 解决问题
 * 子组件onChange调用了父组件的handleOnChange
 * 父组件handleOnChange内部会执行setText(e.target.value)引起父组件更新
 * 父组件更新会得到新的handleOnChange，传递给子组件，对于子组件来说接收到一个新的props
 * 子组件进行不必要更新
 */
export default function UseCallback() {
  const [text, setText] = useState('')

  const handleOnChange = useCallback((e) => {
    setText(e.target.value)
  }, [])

  return (
    <div>
      <div>text: {text}</div>
      <Child onChange={handleOnChange} />
    </div>
  )
}

const Child = React.memo<{ onChange: any }>(props => {
  console.log('子组件渲染了')
  return (
    <input type="text" onChange={props.onChange} />
  )
})