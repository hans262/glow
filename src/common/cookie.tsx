import { useEffect } from 'react'
import { useCookie } from 'react-use'

export default function Demo() {
  const [myCookie, updateCookie, deleteCoookie] = useCookie('my-cookie')

  useEffect(() => {
    deleteCoookie() //删除
    updateCookie('456', {
      expires: new Date(Date.now() + 10 * 1000) //过期时间 10s后
    })
  }, [])

  return (
    <div className="px-8 py-3">
      {myCookie}
    </div>
  )
}