'use client'

import * as React from 'react'
import { useTodoStore } from '@/store/todo-store-context'
import TodoItem from './todo-item'
import AddTodoForm from './add-todo-form'
import { Card, CardContent } from '@/components/ui/card'

export default function TodoList() {
  const { todos, addTodo, toggleTodo, deleteTodo } = useTodoStore()

  const handleToggleTodo = React.useCallback(
    (id: string) => {
      toggleTodo(id)
    },
    [toggleTodo]
  )

  const handleAddTodo = React.useCallback(
    (text: string) => {
      if (text.trim()) {
        addTodo(text.trim())
      }
    },
    [addTodo]
  )

  const handleDeleteTodo = React.useCallback(
    (id: string) => {
      deleteTodo(id)
    },
    [deleteTodo]
  )

  return (
    <div className="flex justify-center w-full">
      <div className="w-full max-w-2xl">
        <AddTodoForm onSubmit={handleAddTodo} />
        <Card>
          <CardContent className="min-h-64 p-4 flex justify-center">
            {todos.length > 0 ? (
              <ul className="w-full flex flex-col gap-4">
                {todos.map(todo => (
                  <TodoItem
                    key={todo.id}
                    todo={todo}
                    toggleHandler={handleToggleTodo}
                    deleteHandler={handleDeleteTodo}
                  />
                ))}
              </ul>
            ) : (
              <p className="self-center">There are no tasks yet.</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
