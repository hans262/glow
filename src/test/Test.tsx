import { useState, useEffect, useCallback } from 'react'

const Component = () => {
  const [count, setCount] = useState(0)
  useEffect(() => console.log('开始计数'), [])

  const onClick = useCallback(() => {
    console.log(count)
    setCount(count + 1)
  }, [count])

  return (
    <>
      <span>{count}</span>
      <button onClick={onClick}>+1</button >
    </>
  )
}
export default Component
