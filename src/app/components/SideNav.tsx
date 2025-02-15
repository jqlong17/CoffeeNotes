'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { HomeIcon, BeakerIcon, UserIcon } from '@heroicons/react/24/outline'

export default function SideNav() {
  const pathname = usePathname()

  const navItems = [
    {
      name: '首页',
      href: '/',
      icon: HomeIcon,
      active: pathname === '/'
    },
    {
      name: '工具',
      href: '/tools',
      icon: BeakerIcon,
      active: pathname.startsWith('/tools')
    },
    {
      name: '我的',
      href: '/profile',
      icon: UserIcon,
      active: pathname.startsWith('/profile')
    }
  ]

  return (
    <div className="p-4">
      {/* Logo */}
      <div className="mb-8">
        <Link href="/" className="flex items-center">
          <span className="text-2xl">☕️</span>
          <span className="ml-2 text-xl font-semibold text-coffee-900">咖啡笔记</span>
        </Link>
      </div>

      {/* 导航菜单 */}
      <nav className="space-y-1">
        {navItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg ${
              item.active
                ? 'text-coffee-900 bg-coffee-50'
                : 'text-gray-600 hover:text-coffee-900 hover:bg-coffee-50'
            }`}
          >
            <item.icon className={`w-5 h-5 ${
              item.active ? 'text-coffee-600' : 'text-gray-400'
            }`} />
            <span className="ml-3">{item.name}</span>
          </Link>
        ))}
      </nav>
    </div>
  )
} 