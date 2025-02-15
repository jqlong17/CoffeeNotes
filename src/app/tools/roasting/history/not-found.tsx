import { ArrowLeftIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center">
          <Link
            href="/tools/roasting"
            className="flex items-center text-coffee-600 hover:text-coffee-700"
          >
            <ArrowLeftIcon className="h-5 w-5" />
            <span className="ml-1">返回</span>
          </Link>
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