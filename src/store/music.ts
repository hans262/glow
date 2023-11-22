import { create } from 'zustand'
import { combine } from 'zustand/middleware'

export const useMusicStore = create(
  combine({
    data: [] as string[],
    pending: false,
  },
    set => ({
      fetch: async (payload: string) => {
        set(_ => ({ pending: true }))
        const result = await fetch('./data.json').then(res => res.json())

        setTimeout(() => {
          set(_ => ({ data: result[payload], pending: false }))
        }, 1000)
      }
    })
  )
)
