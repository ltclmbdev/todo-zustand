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
    <form
      onSubmit={handleSubmit}
      className="flex mb-4 gap-4 flex-col md:flex-row"
    >
      <Input
        type="text"
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder="New task"
        className="flex-grow py-2 border rounded-l h-14 md:h-16 px-4 md:px-6 md:text-lg"
      />
      <Button className="md:text-lg px-6 h-auto">Add Task</Button>
    </form>
  )
}

export default React.memo(AddTodoForm)
