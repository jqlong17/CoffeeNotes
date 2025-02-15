'use client'

import { usePathname } from 'next/navigation'
import BottomNav from './components/BottomNav'
import SideNav from './components/SideNav'

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const hideNav = pathname?.startsWith('/posts/')

  if (hideNav) {
    return <div className="min-h-screen bg-gray-50">{children}</div>
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 桌面端左侧导航 */}
      <div className="hidden lg:block fixed left-0 top-0 h-screen w-64 border-r border-coffee-200 bg-white">
        <SideNav />
      </div>

      {/* 主内容区域 */}
      <div className="lg:pl-64">
        <main className={`min-h-[calc(100vh-3.5rem)] pb-14 lg:pb-8`}>
          {children}
        </main>
      </div>

      {/* 移动端底部导航 */}
      <div className="lg:hidden">
        <BottomNav />
      </div>
    </div>
  )
} 