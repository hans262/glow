import { Button } from "antd"
import { useMemo, useState } from "react"

export default function UseMemo() {
  const [count, setCount] = useState(0)
  const [price, setPrice] = useState(5)

  /**
   * 不会因count的改变
   * 而造成引用price的ui重复渲染
   */
  const getPrice = useMemo(() => {
    console.log('渲染了')
    return () => price
  }, [price])

  return (
    <>
      <h1>React: useMemo</h1>
      <div>count: {count}</div>
      <div>price: {price}</div>
      <div>memo化的price：{getPrice()}</div>
      <Button onClick={() => setCount(c => c + 1)}>count++</Button>
      <Button onClick={() => setPrice(p => p + 1)}>price++</Button>
    </>
  )
}