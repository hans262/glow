import { useCallback, useState } from "react"

type Patch<T> = Partial<T> | ((patch: T) => Partial<T>)

export function useSetState<S>(initState: S): [S, (patch: Patch<S>) => void] {
  const [state, setState] = useState<S>(initState)

  const setMergeState = useCallback((patch: Patch<S>) => {
    setState(prevState => {
      let newState;
      newState = typeof patch === 'function' ? patch(prevState) : patch
      if (typeof newState === 'object') {
        newState = { ...prevState, ...newState }
      }
      return newState
    })
  }, [])
  return [state, setMergeState]
}
