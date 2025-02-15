export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto">
        <div className="border-b border-coffee-200 bg-white">
          <div className="px-4 py-4">
            <h1 className="text-xl font-semibold text-coffee-900">咖啡笔记</h1>
            <p className="text-sm text-coffee-600 mt-1">发现、学习、分享咖啡的乐趣</p>
          </div>
        </div>
        {children}
      </div>
    </div>
  )
} 