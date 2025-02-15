import { ReactNode } from 'react'

interface ContentGridProps {
  children: ReactNode
}

export default function ContentGrid({ children }: ContentGridProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 p-3">
      {children}
    </div>
  )
} 