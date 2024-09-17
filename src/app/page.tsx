import TodoList from '@/components/todo-list'

export default function Home() {
  return (
    <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start mt-16">
      <div className="container">
        <TodoList />
      </div>
    </main>
  )
}
