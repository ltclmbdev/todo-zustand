'use client'

import * as React from 'react'
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'

import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'

import {
  restrictToVerticalAxis,
  restrictToParentElement,
} from '@dnd-kit/modifiers'
import { type Todo } from '@/store/todo-store'
import { useTodoStore } from '@/store/todo-store-context'
import TodoItem from './todo-item'
import AddTodoForm from './add-todo-form'
import { Card, CardContent } from '@/components/ui/card'

export default function TodoList() {
  const { todos, addTodo, toggleTodo, deleteTodo } = useTodoStore()
  const [draggableItems, setDraggableItems] = React.useState<Todo[]>(todos)
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  React.useEffect(() => {
    setDraggableItems(todos)
  }, [todos])

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

  const handleDragEnd = (event: any) => {
    const { active, over } = event

    if (active.id !== over.id) {
      setDraggableItems(prevItems => {
        const oldIndex = prevItems.findIndex(item => item.id === active.id)
        const newIndex = prevItems.findIndex(item => item.id === over.id)

        return arrayMove(prevItems, oldIndex, newIndex)
      })
    }
  }

  return (
    <div className="flex justify-center w-full">
      <div className="w-full max-w-2xl">
        <AddTodoForm onSubmit={handleAddTodo} />
        <Card>
          <CardContent className="min-h-64 p-4 flex justify-center">
            {draggableItems.length > 0 ? (
              <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
                modifiers={[restrictToVerticalAxis, restrictToParentElement]}
              >
                <SortableContext
                  items={draggableItems}
                  strategy={verticalListSortingStrategy}
                >
                  <ul className="w-full flex flex-col gap-4">
                    {draggableItems.map(item => (
                      <TodoItem
                        key={item.id}
                        todo={item}
                        toggleHandler={handleToggleTodo}
                        deleteHandler={handleDeleteTodo}
                      />
                    ))}
                  </ul>
                </SortableContext>
              </DndContext>
            ) : (
              <p className="self-center">There are no tasks yet.</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
