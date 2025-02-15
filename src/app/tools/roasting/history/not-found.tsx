export default function NotFound() {
  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center">
          <div className="flex items-center text-coffee-600">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 w-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            <span className="ml-1">返回</span>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center py-12">
          <h2 className="text-2xl font-semibold text-coffee-900 mb-4">
            页面未找到
          </h2>
          <p className="text-coffee-600">
            抱歉，您访问的页面不存在
          </p>
        </div>
      </div>
    </div>
  )
} 