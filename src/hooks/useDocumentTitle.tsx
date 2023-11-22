import { useEffect, useState } from "react"

export default function useDocumentTitle() {
  const [title, setTitle] = useState(document.title)
  useEffect(() => {
    document.title = title
  }, [title])
  return { title, setTitle }
}