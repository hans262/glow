import { Button } from "antd"
import { useCallback, useMemo, useState } from "react"

export default function UseMemo() {
  const [count, setCount] = useState(0)
  const [name, setName] = useState('hans')

  /**
   * 不会因count的改变
   * 下面的函数渲染
   */
  const getName = useMemo(() => {
    console.log('不会渲染')
    return 'my name is ' + name
  }, [name])

  //每次count更新，该函数执行了，这是不必要的
  const getName2 = useCallback( () => {
    console.log('渲染了')
    return 'my name is ' + name
  },[name])

  return (
    <>
      <h1>React: useMemo</h1>
      <div>count: {count}</div>
      <div>{getName}</div>
      <div>{getName2()}</div>
      <Button onClick={() => setCount(c => c + 1)}>count++</Button>
      <Button onClick={() => setName('hans2')}>setName</Button>
    </>
  )
}