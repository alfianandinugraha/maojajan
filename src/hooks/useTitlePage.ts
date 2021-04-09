import { useEffect, useState } from 'react'

const useTitlePage = (
  initialTitle: string
): [string, (title: string) => void] => {
  const [title, setTitle] = useState<string>(initialTitle)

  const setTitleHandler = (newTitle: string): void => setTitle(newTitle)

  useEffect(() => {
    document.title = `${title} - MaoJajan App`
  }, [title])

  return [title, setTitleHandler]
}

export default useTitlePage
