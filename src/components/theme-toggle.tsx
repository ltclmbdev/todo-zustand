'use client'

import * as React from 'react'
import { useTheme } from 'next-themes'
import { Sun, Moon } from 'lucide-react'
import { Button } from '@/components/ui/button'

const ThemeToggle: React.FC<{ className?: string }> = () => {
  const { theme, setTheme } = useTheme()

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  return (
    <Button
      variant={null}
      size="icon"
      onClick={toggleTheme}
      className="w-auto px-0"
    >
      <div className="rotate-0 scale-100 cursor-pointer text-xl transition-all dark:-rotate-90 dark:scale-0 md:text-2xl">
        <Moon />
      </div>
      <div className="absolute rotate-90 scale-0 text-xl transition-all dark:rotate-0 dark:scale-100 md:text-2xl">
        <Sun />
      </div>
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}

export default ThemeToggle
