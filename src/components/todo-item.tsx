import * as React from 'react'
import { Todo } from '@/store/todo-store'
import { twMerge } from 'tailwind-merge'
import { Card, CardContent } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { EllipsisVertical } from 'lucide-react'

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
    <li>
      <Card className="flex items-center space-x-2 p-4 shadow-none">
        <Checkbox
          id={todo.id}
          checked={todo.completed}
          onCheckedChange={() => toggleHandler(todo.id)}
        />
        <span
          className={twMerge(
            'grow',
            todo.completed && 'line-through text-gray-500'
          )}
        >
          {todo.text}
        </span>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="px-2">
              <EllipsisVertical size="sm" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-32" align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem onClick={() => deleteHandler(todo.id)}>
                Delete
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </Card>
    </li>
  )
}

export default React.memo(TodoItem)
