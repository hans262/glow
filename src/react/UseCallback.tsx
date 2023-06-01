import { useCallback, useState } from "react"

/**
 * 解决问题
 * 组件重新渲染之间缓存函数定义
 * 
 */

export default function UseCallback() {
  const [text, setText] = useState('')

  console.log('组件渲染了')
  //状态更新，函数不会被重新定义
  const handleSubmit = useCallback((value: string) => {
    setText(value)
  }, [])

  return (
    <div>
      <div>text: {text}</div>
      <input
        type="text"
        onChange={e => handleSubmit(e.target.value)}
      />
    </div>
  )
}
