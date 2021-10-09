import { useMemo, useState } from "react"

const UseMemo: React.FC<{}> = () => {
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
      <div>count: {count}</div>
      <div>price: {price}</div>
      <div>memo化的：{getPrice()}</div>
      <button onClick={() => setCount(c => c + 1)}>count</button>
      <button onClick={() => setPrice(p => p + 1)}>price</button>
    </>
  )
}

export default UseMemo