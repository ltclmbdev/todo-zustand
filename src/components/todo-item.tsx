import * as React from 'react'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { type Todo } from '@/store/todo-store'
import { cn } from '@/lib/utils'
import { Card } from '@/components/ui/card'
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
import { EllipsisVertical, GripVertical, Check, X } from 'lucide-react'
import { Input } from '@/components/ui/input'

interface TodoItemProps {
  todo: Todo
  toggleHandler: (id: string) => void
  deleteHandler: (id: string) => void
  editHandler: (id: string, text: string) => void
}

const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  toggleHandler,
  deleteHandler,
  editHandler,
}) => {
  const [isEditing, setIsEditing] = React.useState(false)
  const [editedText, setEditedText] = React.useState(todo.text)
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: todo.id })
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }
  const isCursorGrabbing = attributes['aria-pressed']

  const handleEditClick = () => {
    setIsEditing(true)
  }

  const handleEditSubmit = () => {
    if (editedText.trim() !== '') {
      editHandler(todo.id, editedText.trim())
      setIsEditing(false)
    }
  }

  const handleEditCancel = () => {
    setEditedText(todo.text)
    setIsEditing(false)
  }

  return (
    <li ref={setNodeRef} style={style} key={todo.id}>
      <Card
        className={cn(
          'flex items-center space-x-2 p-3 md:p-4 shadow-none rounded-sm duration-150 select-none text-sm md:text-base',
          isCursorGrabbing
            ? 'border-dashed bg-slate-100 border-slate-300 dark:bg-zinc-900 dark:border-slate-600'
            : 'border'
        )}
      >
        <Checkbox
          id={todo.id}
          checked={todo.completed}
          onCheckedChange={() => toggleHandler(todo.id)}
        />
        {isEditing ? (
          <div className="grow flex items-center space-x-2">
            <Input
              value={editedText}
              onChange={e => setEditedText(e.target.value)}
              onKeyDown={e => {
                if (e.key === 'Enter') handleEditSubmit()
              }}
              className="flex-grow shadow-none"
            />
            <Button
              onClick={handleEditSubmit}
              size="sm"
              className="px-2 md:px-2"
            >
              <span className="hidden md:block">Save</span>
              <span>
                <Check size={16} className="md:hidden" />
              </span>
            </Button>
            <Button
              onClick={handleEditCancel}
              variant="outline"
              size="sm"
              className="px-2 md:px-2"
            >
              <span className="hidden md:block">Cancel</span>
              <span>
                <X size={16} className="md:hidden" />
              </span>
            </Button>
          </div>
        ) : (
          <span
            className={cn(
              'grow select-none truncate',
              todo.completed && 'line-through text-gray-500'
            )}
          >
            {todo.text}
          </span>
        )}
        {!isEditing && (
          <>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="px-2">
                  <EllipsisVertical size={16} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-32" align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem onClick={handleEditClick}>
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => deleteHandler(todo.id)}>
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button
              {...attributes}
              {...listeners}
              variant="outline"
              className={cn(
                'px-2 select-none',
                isCursorGrabbing ? 'cursor-grabbing' : 'cursor-grab'
              )}
            >
              <GripVertical size={16} />
            </Button>
          </>
        )}
      </Card>
    </li>
  )
}

export default React.memo(TodoItem)
