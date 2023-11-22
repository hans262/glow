import { create } from 'zustand'
import { combine } from 'zustand/middleware'

export interface Todo {
  id: number
  text: string
  completed: boolean
}

export type TodoFilter = 'SHOW_ALL' | 'SHOW_COMPLETED' | 'SHOW_ACTIVE'

export const useTodoStore = create(
  combine({
    data: [] as Todo[],
    filter: 'SHOW_ALL' as TodoFilter,
  },
    set => ({
      addTodo: (payload: Todo) => {
        set(state => ({ data: [...state.data, payload] }))
      },
      toggleTodo: (payload: number) => {
        set(state => ({
          data: state.data.map(t => ({
            ...t, completed: t.id === payload ? !t.completed : t.completed
          }))
        }))
      },
      switchTodoFilter: (payload: TodoFilter) => {
        set(_ => ({ filter: payload }))
      }
    })
  )
)
