import * as React from 'react'

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
    <form onSubmit={handleSubmit} className="flex mb-4">
      <input
        type="text"
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder="Enter a new todo"
        className="flex-grow p-2 border rounded-l"
      />
      <button
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white rounded-r"
      >
        Add Task
      </button>
    </form>
  )
}

export default React.memo(AddTodoForm)
