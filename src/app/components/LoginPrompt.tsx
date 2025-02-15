'use client'

import { useRouter } from 'next/navigation'
import Dialog from './Dialog'

interface LoginPromptProps {
  isOpen: boolean
  onClose: () => void
  redirectPath?: string
}

export default function LoginPrompt({ isOpen, onClose, redirectPath = '/tools/roasting' }: LoginPromptProps) {
  const router = useRouter()

  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      title="需要登录"
    >
      <div className="mt-2">
        <p className="text-sm text-gray-500">
          此功能需要登录后才能使用，是否现在登录？
        </p>
      </div>
      <div className="mt-4 flex justify-end gap-2">
        <button
          type="button"
          className="px-3 py-1.5 text-sm font-medium text-gray-600 hover:text-gray-700 hover:bg-gray-50 rounded-md"
          onClick={onClose}
        >
          取消
        </button>
        <button
          type="button"
          className="px-3 py-1.5 text-sm font-medium text-white bg-coffee-600 hover:bg-coffee-700 rounded-md"
          onClick={() => {
            onClose()
            router.push(`/login?redirectedFrom=${redirectPath}`)
          }}
        >
          登录
        </button>
      </div>
    </Dialog>
  )
} 