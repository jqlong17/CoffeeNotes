'use client'

export default function ToolsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-xl font-semibold text-coffee-900">工具箱</h1>
      </div>
      {children}
    </div>
  )
} 