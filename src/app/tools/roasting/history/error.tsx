'use client'

import { useEffect } from 'react'
import { ArrowLeftIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('历史记录页面错误:', error)
  }, [error])

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
            加载历史记录时出错
          </h2>
          <p className="text-coffee-600 mb-6">
            {error.message || '发生了一些错误，请重试'}
          </p>
          <button
            onClick={reset}
            className="rounded-md bg-coffee-600 px-4 py-2 text-white hover:bg-coffee-700"
          >
            重试
          </button>
        </div>
      </div>
    </div>
  )
} 