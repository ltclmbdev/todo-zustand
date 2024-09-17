'use client'

import * as React from 'react'
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
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
import { Card } from '@/components/ui/card'

export default function TodoList() {
  const { todos, addTodo, toggleTodo, deleteTodo, editTodo } = useTodoStore()
  const [draggableItems, setDraggableItems] = React.useState<Todo[]>(todos)
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

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

  const handleEditTodo = React.useCallback(
    (id: string, text: string) => {
      editTodo(id, text)
    },
    [editTodo]
  )

  React.useEffect(() => {
    setDraggableItems(todos)
  }, [todos])

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (active.id !== over?.id) {
      setDraggableItems(prevItems => {
        const oldIndex = prevItems.findIndex(item => item.id === active.id)
        const newIndex = prevItems.findIndex(item => item.id === over?.id)

        return arrayMove(prevItems, oldIndex, newIndex)
      })
    }
  }

  return (
    <div className="flex justify-center w-full">
      <div className="w-full max-w-2xl">
        <AddTodoForm onSubmit={handleAddTodo} />
        <Card className="shadow-none rounded-sm p-3 md:p-4 flex justify-center min-h-64">
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
                      editHandler={handleEditTodo}
                    />
                  ))}
                </ul>
              </SortableContext>
            </DndContext>
          ) : (
            <p className="self-center">There are no tasks yet.</p>
          )}
        </Card>
      </div>
    </div>
  )
}
