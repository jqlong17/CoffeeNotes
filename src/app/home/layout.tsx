export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* 固定的标题栏 */}
      <div className="fixed top-0 left-0 right-0 z-10 border-b border-coffee-200 bg-white">
        <div className="container mx-auto">
          <div className="px-4 py-4">
            <h1 className="text-xl font-semibold text-coffee-900">CoffeeNotes</h1>
            <p className="text-sm text-coffee-600 mt-1">发现、学习、分享咖啡的乐趣</p>
          </div>
        </div>
      </div>

      {/* 内容区域，添加上边距以避免被固定标题遮挡 */}
      <div className="container mx-auto pt-[100px]">
        {children}
      </div>
    </div>
  )
} 