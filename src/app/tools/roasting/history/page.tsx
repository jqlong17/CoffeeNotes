'use client'

import { useState, useEffect } from 'react'
import { ArrowLeftIcon, TrashIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import { roastingService } from '../services/roastingService'
import type { RoastingRecord } from '../types'
import Dialog from '@/app/components/Dialog'

export default function RoastingHistoryPage() {
  const [records, setRecords] = useState<RoastingRecord[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [recordToDelete, setRecordToDelete] = useState<RoastingRecord | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const data = await roastingService.getRoastingRecords()
        setRecords(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : '加载失败')
      } finally {
        setIsLoading(false)
      }
    }

    fetchRecords()
  }, [])

  const handleDeleteClick = (record: RoastingRecord) => {
    setRecordToDelete(record)
    setShowDeleteDialog(true)
  }

  const handleDeleteConfirm = async () => {
    if (!recordToDelete) return

    setIsDeleting(true)
    try {
      await roastingService.deleteRoastingRecord(recordToDelete.id!)
      setRecords(records.filter(r => r.id !== recordToDelete.id))
      setShowDeleteDialog(false)
      setRecordToDelete(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : '删除失败')
    } finally {
      setIsDeleting(false)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="text-center text-coffee-600">加载中...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="text-center text-red-600">{error}</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 页面标题 */}
      <div className="border-b border-coffee-200 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 py-4">
            <Link
              href="/tools/roasting"
              className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-coffee-50"
            >
              <ArrowLeftIcon className="h-5 w-5 text-coffee-600" />
            </Link>
            <h1 className="text-xl font-semibold text-coffee-900">烘焙历史</h1>
          </div>
        </div>
      </div>

      {/* 记录列表 */}
      <div className="container mx-auto p-4">
        <div className="rounded-lg border border-coffee-200 bg-white">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-coffee-200 bg-gray-50">
                  <th className="px-4 py-2">烘焙日期</th>
                  <th className="px-4 py-2">生豆名称</th>
                  <th className="px-4 py-2 text-center">操作</th>
                </tr>
              </thead>
              <tbody>
                {records.map((record) => (
                  <tr key={record.id} className="border-b border-coffee-100">
                    <td className="px-4 py-2">
                      {new Date(record.basic_info.roastingDate).toLocaleString('zh-CN', {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </td>
                    <td className="px-4 py-2">{record.basic_info.beanName}</td>
                    <td className="px-4 py-2 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <Link
                          href={`/tools/roasting/${record.id}`}
                          className="inline-block rounded bg-coffee-100 px-3 py-1 text-sm text-coffee-600 hover:bg-coffee-200"
                        >
                          查看详情
                        </Link>
                        <button
                          onClick={() => handleDeleteClick(record)}
                          className="inline-flex items-center rounded bg-red-100 px-2 py-1 text-sm text-red-600 hover:bg-red-200"
                        >
                          <TrashIcon className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* 删除确认对话框 */}
      <Dialog
        isOpen={showDeleteDialog}
        onClose={() => {
          if (!isDeleting) {
            setShowDeleteDialog(false)
            setRecordToDelete(null)
          }
        }}
        title="确认删除"
      >
        <div className="mt-2">
          <p className="text-sm text-gray-500">
            确定要删除"{recordToDelete?.basic_info.beanName}"的烘焙记录吗？此操作无法撤销。
          </p>
        </div>
        <div className="mt-4 flex justify-end gap-2">
          <button
            type="button"
            className="px-3 py-1.5 text-sm font-medium text-gray-600 hover:text-gray-700 hover:bg-gray-50 rounded-md"
            onClick={() => {
              setShowDeleteDialog(false)
              setRecordToDelete(null)
            }}
            disabled={isDeleting}
          >
            取消
          </button>
          <button
            type="button"
            className="px-3 py-1.5 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-md disabled:opacity-50"
            onClick={handleDeleteConfirm}
            disabled={isDeleting}
          >
            {isDeleting ? '删除中...' : '确认删除'}
          </button>
        </div>
      </Dialog>
    </div>
  )
} 