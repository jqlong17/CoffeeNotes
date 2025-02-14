'use client'

import { useState } from 'react'
import { BeakerIcon, ClockIcon, ListBulletIcon } from '@heroicons/react/24/outline'

export default function BrewingPage() {
  const [activeTab, setActiveTab] = useState('form') // 'form' | 'timer' | 'history'

  return (
    <div className="mx-auto max-w-2xl">
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
          <BeakerIcon className="h-5 w-5" />
          记录
        </button>
        <button
          onClick={() => setActiveTab('timer')}
          className={`flex flex-1 items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-medium ${
            activeTab === 'timer'
              ? 'bg-coffee-600 text-white'
              : 'text-coffee-600 hover:bg-coffee-50'
          }`}
        >
          <ClockIcon className="h-5 w-5" />
          计时
        </button>
        <button
          onClick={() => setActiveTab('history')}
          className={`flex flex-1 items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-medium ${
            activeTab === 'history'
              ? 'bg-coffee-600 text-white'
              : 'text-coffee-600 hover:bg-coffee-50'
          }`}
        >
          <ListBulletIcon className="h-5 w-5" />
          历史
        </button>
      </div>

      {/* 内容区域 */}
      <div className="rounded-2xl border border-coffee-200 bg-white p-6">
        {activeTab === 'form' && (
          <div className="space-y-6">
            <h2 className="text-lg font-semibold text-coffee-900">记录参数</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-coffee-700">
                  咖啡豆
                </label>
                <input
                  type="text"
                  className="mt-1 block w-full rounded-md border border-coffee-200 px-3 py-2 text-coffee-900 focus:border-coffee-500 focus:outline-none focus:ring-1 focus:ring-coffee-500"
                  placeholder="例如：埃塞俄比亚 耶加雪菲"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-coffee-700">
                    咖啡粉重量 (g)
                  </label>
                  <input
                    type="number"
                    className="mt-1 block w-full rounded-md border border-coffee-200 px-3 py-2 text-coffee-900 focus:border-coffee-500 focus:outline-none focus:ring-1 focus:ring-coffee-500"
                    placeholder="15"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-coffee-700">
                    水量 (ml)
                  </label>
                  <input
                    type="number"
                    className="mt-1 block w-full rounded-md border border-coffee-200 px-3 py-2 text-coffee-900 focus:border-coffee-500 focus:outline-none focus:ring-1 focus:ring-coffee-500"
                    placeholder="250"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-coffee-700">
                  水温 (°C)
                </label>
                <input
                  type="number"
                  className="mt-1 block w-full rounded-md border border-coffee-200 px-3 py-2 text-coffee-900 focus:border-coffee-500 focus:outline-none focus:ring-1 focus:ring-coffee-500"
                  placeholder="92"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-coffee-700">
                  研磨度
                </label>
                <select className="mt-1 block w-full rounded-md border border-coffee-200 px-3 py-2 text-coffee-900 focus:border-coffee-500 focus:outline-none focus:ring-1 focus:ring-coffee-500">
                  <option>极细</option>
                  <option>细</option>
                  <option>中细</option>
                  <option>中</option>
                  <option>中粗</option>
                  <option>粗</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-coffee-700">
                  备注
                </label>
                <textarea
                  className="mt-1 block w-full rounded-md border border-coffee-200 px-3 py-2 text-coffee-900 focus:border-coffee-500 focus:outline-none focus:ring-1 focus:ring-coffee-500"
                  rows={3}
                  placeholder="记录其他细节，如风味描述、冲煮步骤等"
                />
              </div>
              <button
                type="submit"
                className="w-full rounded-lg bg-coffee-600 px-4 py-2 text-white hover:bg-coffee-700"
              >
                保存记录
              </button>
            </form>
          </div>
        )}

        {activeTab === 'timer' && (
          <div className="text-center">
            <h2 className="mb-4 text-lg font-semibold text-coffee-900">计时器</h2>
            <p className="text-coffee-600">计时器功能开发中...</p>
          </div>
        )}

        {activeTab === 'history' && (
          <div>
            <h2 className="mb-4 text-lg font-semibold text-coffee-900">历史记录</h2>
            <p className="text-coffee-600">暂无记录</p>
          </div>
        )}
      </div>
    </div>
  )
} 