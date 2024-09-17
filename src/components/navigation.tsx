'use client'

import ThemeToggle from '@/components/theme-toggle'

const Navigation = () => {
  return (
    <header className="py-2">
      <nav className="container flex max-w-none justify-end">
        <ThemeToggle />
      </nav>
    </header>
  )
}

export default Navigation
