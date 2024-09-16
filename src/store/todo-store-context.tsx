'use client'

import * as React from 'react'
import { createTodoStore, TodoStoreType, TodoStore } from './todo-store'

const TodoStoreContext = React.createContext<TodoStoreType | null>(null)

export interface StoreProviderProps {
  children: React.ReactNode
  initialState?: Partial<TodoStore>
}

export function TodoStoreProvider({
  children,
  initialState,
}: StoreProviderProps) {
  const storeRef = React.useRef<TodoStoreType>()
  if (!storeRef.current) {
    storeRef.current = createTodoStore(initialState)
  }
  return (
    <TodoStoreContext.Provider value={storeRef.current}>
      {children}
    </TodoStoreContext.Provider>
  )
}

export function useTodoStore<T = TodoStore>(
  selector?: (store: TodoStore) => T
) {
  const store = React.useContext(TodoStoreContext)
  if (!store) throw new Error('Missing TodoStoreProvider')
  return selector ? store(selector) : store()
}

// export function useTodoStore(): TodoStore
// export function useTodoStore<T>(selector: (store: TodoStore) => T): T
// export function useTodoStore<T>(selector?: (store: TodoStore) => T) {
//   const store = useContext(TodoStoreContext)
//   if (!store) throw new Error('Missing TodoStoreProvider')
//   return selector ? store(selector) : store()
// }
