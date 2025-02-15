'use client'

import Link from 'next/link'
import { HomeIcon, BeakerIcon, UserIcon } from '@heroicons/react/24/outline'
import { usePathname } from 'next/navigation'

export default function BottomNav() {
  const pathname = usePathname()

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100">
      <div className="flex items-center justify-around h-14">
        <Link 
          href="/"
          className={`flex flex-col items-center space-y-1 ${
            pathname === '/' ? 'text-coffee-600' : 'text-gray-500'
          }`}
        >
          <HomeIcon className="w-6 h-6" />
          <span className="text-xs">首页</span>
        </Link>

        <Link 
          href="/tools"
          className={`flex flex-col items-center space-y-1 ${
            pathname.startsWith('/tools') ? 'text-coffee-600' : 'text-gray-500'
          }`}
        >
          <BeakerIcon className="w-6 h-6" />
          <span className="text-xs">工具</span>
        </Link>

        <Link 
          href="/profile"
          className={`flex flex-col items-center space-y-1 ${
            pathname.startsWith('/profile') ? 'text-coffee-600' : 'text-gray-500'
          }`}
        >
          <UserIcon className="w-6 h-6" />
          <span className="text-xs">我的</span>
        </Link>
      </div>
    </div>
  )
} 