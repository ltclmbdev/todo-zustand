'use client'

import { useTodoStore } from '@/store/todo-store-context'

export default function TodoList() {
  const { todos, addTodo, toggleTodo } = useTodoStore()
  console.log('todos', todos)

  return (
    <div>
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodo(todo.id)}
            />
            {todo.text}
          </li>
        ))}
      </ul>
      <button onClick={() => addTodo('New Todo')}>Add Todo</button>
    </div>
  )
}
