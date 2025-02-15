'use client'

import { usePathname, useRouter } from 'next/navigation'
import { ArrowLeftIcon, PlusIcon, DocumentCheckIcon } from '@heroicons/react/24/outline'

const getToolName = (pathname: string) => {
  if (pathname.startsWith('/tools/timer')) return '计时器'
  if (pathname.startsWith('/tools/brewing')) return '手冲记录'
  if (pathname.startsWith('/tools/roasting')) return '烘焙记录'
  return ''
}

export default function ToolsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const router = useRouter()
  const isSubPage = pathname !== '/tools'
  const toolName = getToolName(pathname)
  const isRoastingPage = pathname === '/tools/roasting'

  return (
    <div>
      {isSubPage && (
        <div className="fixed top-0 left-0 right-0 z-10 border-b border-coffee-200 bg-white">
          <div className="container mx-auto px-4">
            <div className="flex items-center h-12 relative">
              <button 
                onClick={() => router.back()}
                className="p-1 -ml-1 rounded-full hover:bg-gray-100"
              >
                <ArrowLeftIcon className="w-5 h-5 text-gray-700" />
              </button>
              <h1 className="absolute left-1/2 -translate-x-1/2 text-base font-medium text-gray-900">
                {toolName}
              </h1>
              {isRoastingPage ? (
                <div className="ml-auto flex items-center gap-2">
                  <button
                    onClick={() => {
                      const event = new CustomEvent('roasting:new')
                      window.dispatchEvent(event)
                    }}
                    className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-coffee-600 hover:text-coffee-700 hover:bg-coffee-50 rounded-md"
                  >
                    <PlusIcon className="w-4 h-4" />
                    新建
                  </button>
                  <button
                    onClick={() => {
                      const event = new CustomEvent('roasting:save')
                      window.dispatchEvent(event)
                    }}
                    className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium bg-coffee-600 text-white hover:bg-coffee-700 rounded-md"
                  >
                    <DocumentCheckIcon className="w-4 h-4" />
                    保存
                  </button>
                </div>
              ) : (
                <div className="w-9"></div>
              )}
            </div>
          </div>
        </div>
      )}
      <div className={isSubPage ? 'pt-16' : ''}>
        {children}
      </div>
    </div>
  )
} 