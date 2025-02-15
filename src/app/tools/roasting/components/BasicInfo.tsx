import { FormEvent } from 'react'
import type { RoastingFormData } from '../types'
import { PROCESS_OPTIONS, ROAST_LEVEL_OPTIONS, ROASTING_METHOD_OPTIONS } from '../types'

interface BasicInfoProps {
  formData: RoastingFormData
  onFormChange: (field: keyof RoastingFormData, value: string | number) => void
  onSubmit: (e: FormEvent) => void
  readOnly?: boolean
}

// 格式化当前日期时间为 HTML datetime-local 输入框所需的格式
const formatDateTimeForInput = (date: Date): string => {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  return `${year}-${month}-${day}T${hours}:${minutes}`
}

export default function BasicInfo({ formData, onFormChange, onSubmit, readOnly }: BasicInfoProps) {
  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold text-coffee-900">基础信息</h2>
      <form className="space-y-4" onSubmit={onSubmit}>
        {/* 烘焙日期 */}
        <div className="space-y-4 rounded-lg border border-coffee-200 p-4">
          <h3 className="font-medium text-coffee-800">烘焙日期</h3>
          <div>
            <label className="block text-sm font-medium text-coffee-700">
              日期时间
            </label>
            <input
              type="datetime-local"
              value={formData.roastingDate}
              onChange={(e) => onFormChange('roastingDate', e.target.value)}
              className="mt-1 block w-full rounded-md border border-coffee-200 px-3 py-2 text-coffee-900 focus:border-coffee-500 focus:outline-none focus:ring-1 focus:ring-coffee-500 disabled:bg-gray-100 disabled:text-gray-500"
              disabled={readOnly}
            />
          </div>
        </div>

        {/* 生豆信息 */}
        <div className="space-y-4 rounded-lg border border-coffee-200 p-4">
          <h3 className="font-medium text-coffee-800">生豆信息</h3>
          <div>
            <label className="block text-sm font-medium text-coffee-700">
              生豆名称
            </label>
            <input
              type="text"
              value={formData.beanName}
              onChange={(e) => onFormChange('beanName', e.target.value)}
              className="mt-1 block w-full rounded-md border border-coffee-200 px-3 py-2 text-coffee-900 focus:border-coffee-500 focus:outline-none focus:ring-1 focus:ring-coffee-500 disabled:bg-gray-100 disabled:text-gray-500"
              placeholder="例如：埃塞俄比亚 耶加雪菲"
              disabled={readOnly}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-coffee-700">
                产地
              </label>
              <input
                type="text"
                value={formData.origin}
                onChange={(e) => onFormChange('origin', e.target.value)}
                className="mt-1 block w-full rounded-md border border-coffee-200 px-3 py-2 text-coffee-900 focus:border-coffee-500 focus:outline-none focus:ring-1 focus:ring-coffee-500 disabled:bg-gray-100 disabled:text-gray-500"
                placeholder="国家/地区"
                disabled={readOnly}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-coffee-700">
                处理法
              </label>
              <select
                value={formData.process}
                onChange={(e) => onFormChange('process', e.target.value)}
                className="mt-1 block w-full rounded-md border border-coffee-200 px-3 py-2 text-coffee-900 focus:border-coffee-500 focus:outline-none focus:ring-1 focus:ring-coffee-500 disabled:bg-gray-100 disabled:text-gray-500"
                disabled={readOnly}
              >
                {PROCESS_OPTIONS.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* 烘焙参数 */}
        <div className="space-y-4 rounded-lg border border-coffee-200 p-4">
          <h3 className="font-medium text-coffee-800">烘焙参数</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-coffee-700">
                生豆重量 (g)
              </label>
              <input
                type="number"
                value={formData.weight || ''}
                onChange={(e) => onFormChange('weight', Number(e.target.value))}
                className="mt-1 block w-full rounded-md border border-coffee-200 px-3 py-2 text-coffee-900 focus:border-coffee-500 focus:outline-none focus:ring-1 focus:ring-coffee-500 disabled:bg-gray-100 disabled:text-gray-500"
                placeholder="300"
                disabled={readOnly}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-coffee-700">
                含水率 (%)
              </label>
              <input
                type="number"
                value={formData.moisture || ''}
                onChange={(e) => onFormChange('moisture', Number(e.target.value))}
                className="mt-1 block w-full rounded-md border border-coffee-200 px-3 py-2 text-coffee-900 focus:border-coffee-500 focus:outline-none focus:ring-1 focus:ring-coffee-500 disabled:bg-gray-100 disabled:text-gray-500"
                placeholder="10.5"
                step="0.1"
                min="0"
                max="100"
                disabled={readOnly}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-coffee-700">
                烘焙方式
              </label>
              <select
                value={formData.roastingMethod}
                onChange={(e) => onFormChange('roastingMethod', e.target.value)}
                className="mt-1 block w-full rounded-md border border-coffee-200 px-3 py-2 text-coffee-900 focus:border-coffee-500 focus:outline-none focus:ring-1 focus:ring-coffee-500 disabled:bg-gray-100 disabled:text-gray-500"
                disabled={readOnly}
              >
                {ROASTING_METHOD_OPTIONS.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-coffee-700">
                目标烘焙度
              </label>
              <select
                value={formData.roastLevel}
                onChange={(e) => onFormChange('roastLevel', e.target.value)}
                className="mt-1 block w-full rounded-md border border-coffee-200 px-3 py-2 text-coffee-900 focus:border-coffee-500 focus:outline-none focus:ring-1 focus:ring-coffee-500 disabled:bg-gray-100 disabled:text-gray-500"
                disabled={readOnly}
              >
                {ROAST_LEVEL_OPTIONS.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-coffee-700">
                一爆时间
              </label>
              <input
                type="text"
                value={formData.firstCrackTime}
                onChange={(e) => onFormChange('firstCrackTime', e.target.value)}
                className="mt-1 block w-full rounded-md border border-coffee-200 px-3 py-2 text-coffee-900 focus:border-coffee-500 focus:outline-none focus:ring-1 focus:ring-coffee-500 disabled:bg-gray-100 disabled:text-gray-500"
                placeholder="8:30"
                disabled={true}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-coffee-700">
                二爆时间
              </label>
              <input
                type="text"
                value={formData.secondCrackTime}
                onChange={(e) => onFormChange('secondCrackTime', e.target.value)}
                className="mt-1 block w-full rounded-md border border-coffee-200 px-3 py-2 text-coffee-900 focus:border-coffee-500 focus:outline-none focus:ring-1 focus:ring-coffee-500 disabled:bg-gray-100 disabled:text-gray-500"
                placeholder="10:15"
                disabled={true}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-coffee-700">
                总时间
              </label>
              <input
                type="text"
                value={formData.totalTime}
                onChange={(e) => onFormChange('totalTime', e.target.value)}
                className="mt-1 block w-full rounded-md border border-coffee-200 px-3 py-2 text-coffee-900 focus:border-coffee-500 focus:outline-none focus:ring-1 focus:ring-coffee-500 disabled:bg-gray-100 disabled:text-gray-500"
                placeholder="11:00"
                disabled={true}
              />
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-coffee-700">
            备注
          </label>
          <textarea
            value={formData.notes}
            onChange={(e) => onFormChange('notes', e.target.value)}
            className="mt-1 block w-full rounded-md border border-coffee-200 px-3 py-2 text-coffee-900 focus:border-coffee-500 focus:outline-none focus:ring-1 focus:ring-coffee-500 disabled:bg-gray-100 disabled:text-gray-500"
            rows={3}
            placeholder="记录其他细节，如环境温度、天气等"
            disabled={readOnly}
          />
        </div>
      </form>
    </div>
  )
} 