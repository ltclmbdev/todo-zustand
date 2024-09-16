import * as React from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface AddTodoFormProps {
  onSubmit: (text: string) => void
}

const AddTodoForm: React.FC<AddTodoFormProps> = ({ onSubmit }) => {
  const [text, setText] = React.useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(text)
    setText('')
  }

  return (
    <form onSubmit={handleSubmit} className="flex mb-4 gap-4">
      <Input
        type="text"
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder="Add new task"
        className="flex-grow p-2 border rounded-l"
      />
      <Button variant="secondary">Add Task</Button>
    </form>
  )
}

export default React.memo(AddTodoForm)
