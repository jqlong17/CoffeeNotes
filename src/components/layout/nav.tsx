'use client'

import { HomeIcon, BeakerIcon, UserIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

const navigation = [
  { name: '首页', href: '/', icon: HomeIcon },
  { name: '工具', href: '/tools', icon: BeakerIcon },
  { name: '我的', href: '/profile', icon: UserIcon },
]

export function Nav() {
  const pathname = usePathname()

  return (
    <>
      {/* 移动端底部导航 */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-coffee-200 bg-white lg:hidden">
        <div className="flex h-16">
          {navigation.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  'flex flex-1 flex-col items-center justify-center gap-1',
                  isActive ? 'text-coffee-900' : 'text-coffee-500 hover:text-coffee-700'
                )}
              >
                <item.icon className="h-6 w-6" />
                <span className="text-xs">{item.name}</span>
              </Link>
            )
          })}
        </div>
      </nav>

      {/* 桌面端侧边栏 */}
      <nav className="fixed bottom-0 left-0 top-0 hidden w-64 border-r border-coffee-200 bg-white lg:block">
        <div className="flex h-16 items-center border-b border-coffee-200 px-6">
          <h1 className="text-xl font-bold text-coffee-900">☕ Coffee Notes</h1>
        </div>
        <div className="p-4">
          {navigation.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  'mb-2 flex items-center gap-3 rounded-lg px-4 py-3',
                  isActive
                    ? 'bg-coffee-50 text-coffee-900'
                    : 'text-coffee-500 hover:bg-coffee-50 hover:text-coffee-700'
                )}
              >
                <item.icon className="h-6 w-6" />
                <span>{item.name}</span>
              </Link>
            )
          })}
        </div>
      </nav>
    </>
  )
} 