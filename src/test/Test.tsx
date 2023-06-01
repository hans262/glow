import { useEffect } from 'react'
import { useCookie } from 'react-use'

export default function Test() {
  const [myCookie, updateCookie, deleteCoookie] = useCookie('my-cookie')

  useEffect(() => {
    deleteCoookie()
    updateCookie('789', {
      expires: new Date(Date.now() + 10 * 1000)
    })
  }, [])

  useEffect(() => {
    console.log(myCookie)
  }, [myCookie])

  return (
    <div className="px-8 py-3">
      {myCookie}
    </div>
  )
}