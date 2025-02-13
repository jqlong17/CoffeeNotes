import { ArrowLeftIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'

export default function ToolsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-coffee-900">工具箱</h1>
      </div>
      {children}
    </div>
  )
} 