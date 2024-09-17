import * as React from 'react'
import { TodoStoreProvider } from '@/store/todo-store-context'
import { ThemeProvider as NextThemesProvider } from 'next-themes'

const Providers: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <NextThemesProvider attribute="class" defaultTheme="system" enableSystem>
      <TodoStoreProvider>{children}</TodoStoreProvider>
    </NextThemesProvider>
  )
}

export default Providers
