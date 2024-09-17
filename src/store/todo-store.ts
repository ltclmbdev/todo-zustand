import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export interface Todo {
  id: string
  text: string
  completed: boolean
}

export interface TodoStore {
  todos: Todo[]
  isHydrated: boolean
  addTodo: (text: string) => void
  toggleTodo: (id: string) => void
  editTodo: (id: string, text: string) => void
  deleteTodo: (id: string) => void
  reorderTodos: (newOrder: Todo[]) => void
  setHydrated: (state: boolean) => void
}

export const createTodoStore = (initState: Partial<TodoStore> = {}) =>
  create<TodoStore>()(
    persist(
      set => ({
        todos: [],
        isHydrated: false,
        ...initState,
        addTodo: text =>
          set(state => {
            const id = `${Date.now()}-${Math.random()
              .toString(36)
              .slice(2, 11)}`
            return {
              todos: [...state.todos, { id, text, completed: false }],
            }
          }),
        toggleTodo: id =>
          set(state => ({
            todos: state.todos.map(todo =>
              todo.id === id ? { ...todo, completed: !todo.completed } : todo
            ),
          })),
        editTodo: (id, text) =>
          set(state => ({
            todos: state.todos.map(todo =>
              todo.id === id ? { ...todo, text } : todo
            ),
          })),
        deleteTodo: id =>
          set(state => ({
            todos: state.todos.filter(todo => todo.id !== id),
          })),
        reorderTodos: newOrder =>
          set(() => ({
            todos: newOrder,
          })),
        setHydrated: (state: boolean) => set({ isHydrated: state }),
      }),
      {
        name: 'todo-storage',
        storage: createJSONStorage(() => localStorage),
        onRehydrateStorage: () => state => {
          state?.setHydrated(true)
        },
      }
    )
  )

export type TodoStoreType = ReturnType<typeof createTodoStore>
