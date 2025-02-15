'use client'

import { PlusIcon, DocumentCheckIcon } from '@heroicons/react/24/outline'
import Dialog from '@/app/components/Dialog'
import { useState } from 'react'

interface RoastingHeaderProps {
  hasUnsavedChanges: boolean
  onNew: () => void
  onSave: () => Promise<void>
  isSaving: boolean
}

export default function RoastingHeader({
  hasUnsavedChanges,
  onNew,
  onSave,
  isSaving
}: RoastingHeaderProps) {
  const [showConfirmDialog, setShowConfirmDialog] = useState(false)
  const [saveMessage, setSaveMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(
    null
  )

  const handleNew = () => {
    if (hasUnsavedChanges) {
      setShowConfirmDialog(true)
    } else {
      onNew()
    }
  }

  const handleSave = async () => {
    try {
      setSaveMessage(null)
      await onSave()
      setSaveMessage({
        type: 'success',
        text: '烘焙记录已保存'
      })
      // 3秒后自动清除消息
      setTimeout(() => setSaveMessage(null), 3000)
    } catch (error) {
      setSaveMessage({
        type: 'error',
        text: error instanceof Error ? error.message : '保存失败，请重试'
      })
    }
  }

  return (
    <div className="relative flex items-center justify-end px-6 py-4 border-b border-coffee-200">
      <div className="flex items-center gap-4">
        {/* 保存状态消息 */}
        {saveMessage && (
          <div
            className={`px-4 py-2 rounded-lg text-sm ${
              saveMessage.type === 'success'
                ? 'bg-green-50 text-green-800'
                : 'bg-red-50 text-red-800'
            }`}
          >
            {saveMessage.type === 'success' && '✓ '}
            {saveMessage.text}
          </div>
        )}

        {/* 操作按钮 */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleNew}
            className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-coffee-600 hover:text-coffee-700 hover:bg-coffee-50 rounded-md"
          >
            <PlusIcon className="w-4 h-4" />
            新建
          </button>
          <button
            onClick={handleSave}
            disabled={isSaving || !hasUnsavedChanges}
            className={`flex items-center gap-1 px-3 py-1.5 text-sm font-medium rounded-md
              ${
                isSaving || !hasUnsavedChanges
                  ? 'bg-coffee-100 text-coffee-400 cursor-not-allowed'
                  : 'bg-coffee-600 text-white hover:bg-coffee-700'
              }`}
          >
            <DocumentCheckIcon className="w-4 h-4" />
            {isSaving ? '保存中...' : '保存'}
          </button>
        </div>
      </div>

      {/* 确认对话框 */}
      <Dialog
        isOpen={showConfirmDialog}
        onClose={() => setShowConfirmDialog(false)}
        title="确认新建"
      >
        <div className="mt-2">
          <p className="text-sm text-gray-500">
            当前有未保存的修改，新建将会清空这些数据。是否确认新建？
          </p>
        </div>
        <div className="mt-4 flex justify-end gap-2">
          <button
            type="button"
            className="px-3 py-1.5 text-sm font-medium text-gray-600 hover:text-gray-700 hover:bg-gray-50 rounded-md"
            onClick={() => setShowConfirmDialog(false)}
          >
            取消
          </button>
          <button
            type="button"
            className="px-3 py-1.5 text-sm font-medium text-white bg-coffee-600 hover:bg-coffee-700 rounded-md"
            onClick={() => {
              setShowConfirmDialog(false)
              onNew()
            }}
          >
            确认新建
          </button>
        </div>
      </Dialog>
    </div>
  )
} 