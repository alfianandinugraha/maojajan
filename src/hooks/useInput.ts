import { useState } from 'react'

const useInput = <T>(initialState: T) => {
  const [state, setState] = useState(initialState)
}

export default useInput
