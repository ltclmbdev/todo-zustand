import * as React from 'react'
import { Todo } from '@/store/todo-store'

interface TodoItemProps {
  todo: Todo
  toggleHandler: (id: string) => void
  deleteHandler: (id: string) => void
}

const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  toggleHandler,
  deleteHandler,
}) => {
  return (
    <li className="flex items-center space-x-2 py-2">
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => toggleHandler(todo.id)}
        className="form-checkbox h-5 w-5 text-blue-600"
      />
      <span
        className={`${
          todo.completed ? 'line-through text-gray-500' : ''
        } text-lg`}
      >
        {todo.text}
      </span>
      <button type="button" onClick={() => deleteHandler(todo.id)}>
        Delete
      </button>
    </li>
  )
}

export default React.memo(TodoItem)
