'use client'

import { useState, useEffect, use } from 'react'
import { ArrowLeftIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import { roastingService } from '../services/roastingService'
import type { RoastingRecord } from '../types'
import BasicInfo from '../components/BasicInfo'
import RoastingCurve from '../components/RoastingCurve'
import RoastingResult from '../components/RoastingResult'

export default function RoastingDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const resolvedParams = use(params)
  const [record, setRecord] = useState<RoastingRecord | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState('form') // 'form' | 'curve' | 'result'

  useEffect(() => {
    const fetchRecord = async () => {
      try {
        const data = await roastingService.getRoastingRecord(resolvedParams.id)
        setRecord(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : '加载失败')
      } finally {
        setIsLoading(false)
      }
    }

    fetchRecord()
  }, [resolvedParams.id])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="text-center text-coffee-600">加载中...</div>
      </div>
    )
  }

  if (error || !record) {
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="text-center text-red-600">{error || '记录不存在'}</div>
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
              href="/tools/roasting/history"
              className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-coffee-50"
            >
              <ArrowLeftIcon className="h-5 w-5 text-coffee-600" />
            </Link>
            <h1 className="text-xl font-semibold text-coffee-900">
              {record.basic_info.beanName} - 烘焙详情
            </h1>
          </div>
        </div>
      </div>

      {/* 主要内容 */}
      <div className="container mx-auto">
        <div className="p-4 space-y-8">
          {/* 标签切换 */}
          <div className="mb-6 flex rounded-lg border border-coffee-200 bg-white p-1">
            <button
              onClick={() => setActiveTab('form')}
              className={`flex flex-1 items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-medium ${
                activeTab === 'form'
                  ? 'bg-coffee-600 text-white'
                  : 'text-coffee-600 hover:bg-coffee-50'
              }`}
            >
              基础信息
            </button>
            <button
              onClick={() => setActiveTab('curve')}
              className={`flex flex-1 items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-medium ${
                activeTab === 'curve'
                  ? 'bg-coffee-600 text-white'
                  : 'text-coffee-600 hover:bg-coffee-50'
              }`}
            >
              烘焙曲线
            </button>
            <button
              onClick={() => setActiveTab('result')}
              className={`flex flex-1 items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-medium ${
                activeTab === 'result'
                  ? 'bg-coffee-600 text-white'
                  : 'text-coffee-600 hover:bg-coffee-50'
              }`}
            >
              结果评估
            </button>
          </div>

          {/* 内容区域 */}
          <div className="rounded-2xl border border-coffee-200 bg-white p-6">
            {activeTab === 'form' && (
              <BasicInfo
                formData={record.basic_info}
                onFormChange={() => {}}
                onSubmit={(e) => e.preventDefault()}
                readOnly
              />
            )}

            {activeTab === 'curve' && (
              <RoastingCurve
                formData={record.basic_info}
                isRecording={false}
                currentTime={0}
                weightLossPoints={record.curve_data.weightLossPoints}
                temperaturePoints={record.curve_data.temperaturePoints}
                targetLossRate={record.curve_data.targetLossRate}
                currentWeight={0}
                currentTemperature={0}
                currentTag=""
                customTag=""
                onStartRecording={() => {}}
                onStopRecording={() => {}}
                onReset={() => {}}
                onRecord={() => {}}
                onTemperatureRecord={() => {}}
                onWeightChange={() => {}}
                onTemperatureChange={() => {}}
                onDeletePoint={() => {}}
                onCurrentWeightChange={() => {}}
                onCurrentTemperatureChange={() => {}}
                onCurrentTagChange={() => {}}
                onCustomTagChange={() => {}}
                readOnly
              />
            )}

            {activeTab === 'result' && (
              <RoastingResult
                assessment={record.assessment}
                onAssessmentChange={() => {}}
                readOnly
              />
            )}
          </div>
        </div>
      </div>
    </div>
  )
} 