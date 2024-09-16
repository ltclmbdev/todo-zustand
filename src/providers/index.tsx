import * as React from 'react'
import { TodoStoreProvider } from '@/store/todo-store-context'

const Providers: React.FC<React.PropsWithChildren> = ({ children }) => {
  return <TodoStoreProvider>{children}</TodoStoreProvider>
}

export default Providers
