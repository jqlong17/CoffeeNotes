'use client'

import { useState, useEffect } from 'react'
import {
  PlusIcon,
  DocumentCheckIcon,
} from '@heroicons/react/24/outline'
import type { RoastingFormData, WeightLossPoint, TemperaturePoint, RoastingAssessment } from './types'
import { PROCESS_OPTIONS, ROAST_LEVEL_OPTIONS, ROASTING_METHOD_OPTIONS } from './types'
import BasicInfo from './components/BasicInfo'
import RoastingCurve from './components/RoastingCurve'
import RoastingResult from './components/RoastingResult'
import Dialog from '@/app/components/Dialog'
import { roastingService } from './services/roastingService'
import { formatDateTimeForInput } from './utils/dateUtils'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import LoginPrompt from '@/app/components/LoginPrompt'

// 初始状态
const getInitialState = () => ({
  formData: {
    beanName: '',
    origin: '',
    process: PROCESS_OPTIONS[0],
    weight: 70,
    moisture: 0,
    roastLevel: ROAST_LEVEL_OPTIONS[0],
    firstCrackTime: '',
    secondCrackTime: '',
    totalTime: '',
    roastingMethod: ROASTING_METHOD_OPTIONS[0],
    roastingDate: formatDateTimeForInput(new Date()),
    notes: '',
  },
  assessment: {
    color: {
      beanSurface: 0,
      beanCore: 0
    },
    taste: {
      aroma: 0,
      acidity: 0,
      sweetness: 0,
      body: 0,
      aftertaste: 0,
      balance: 0,
      overall: 0,
      notes: ''
    },
    createdAt: new Date().toISOString()
  },
  weightLossPoints: [] as WeightLossPoint[],
  temperaturePoints: [] as TemperaturePoint[],
  targetLossRate: 13,
  currentTime: 0,
  isRecording: false,
})

export default function RoastingPage() {
  const [activeTab, setActiveTab] = useState('form') // 'form' | 'curve' | 'result'
  const [currentRecordId, setCurrentRecordId] = useState<string | null>(null)
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [saveMessage, setSaveMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)
  const [showConfirmDialog, setShowConfirmDialog] = useState(false)
  const [showLoginDialog, setShowLoginDialog] = useState(false)
  
  // 表单数据状态
  const [formData, setFormData] = useState<RoastingFormData>(getInitialState().formData)

  // 烘焙曲线相关状态
  const [isRecording, setIsRecording] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [weightLossPoints, setWeightLossPoints] = useState<WeightLossPoint[]>([])
  const [temperaturePoints, setTemperaturePoints] = useState<TemperaturePoint[]>([])
  const [targetLossRate, setTargetLossRate] = useState<number>(13)
  const [currentTag, setCurrentTag] = useState<string>('')
  const [customTag, setCustomTag] = useState<string>('')
  const [currentWeight, setCurrentWeight] = useState<number>(0)
  const [currentTemperature, setCurrentTemperature] = useState<number>(0)

  // 评估结果状态
  const [assessment, setAssessment] = useState<RoastingAssessment>(getInitialState().assessment)

  const router = useRouter()
  const supabase = createClientComponentClient()

  // 监听数据变化
  useEffect(() => {
    setHasUnsavedChanges(true)
  }, [formData, assessment, weightLossPoints, temperaturePoints, targetLossRate])

  // 计时器
  useEffect(() => {
    let timer: NodeJS.Timeout
    if (isRecording) {
      timer = setInterval(() => {
        setCurrentTime((prev) => prev + 1)
      }, 1000)
    }
    return () => {
      if (timer) clearInterval(timer)
    }
  }, [isRecording])

  // 处理表单字段变化
  const handleChange = (
    field: keyof RoastingFormData,
    value: string | number
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  // 处理开始记录
  const handleStartRecording = () => {
    if (!formData.weight || formData.weight <= 0) {
      alert('请先设置初始重量');
      return;
    }
    
    setIsRecording(true);
    
    // 只在没有数据点时（第一次开始）重置时间和添加初始点
    if (weightLossPoints.length === 0) {
      setCurrentTime(0);
      setWeightLossPoints([{
        time: 0,
        weight: 0, // 初始重量差为0
        lossRate: 0, // 初始失重率为0
        tag: '开始'
      }]);
    }
  }

  // 处理停止记录
  const handleStopRecording = () => {
    setIsRecording(false)
  }

  // 处理重置
  const handleReset = () => {
    setIsRecording(false);
    setCurrentTime(0);
    setWeightLossPoints([]);
    setTemperaturePoints([]);
  }

  // 处理记录重量数据点
  const handleWeightRecord = () => {
    if (!isRecording || !formData.weight || !currentWeight) return;
    
    // 确保当前重量差不大于初始重量
    if (currentWeight > formData.weight) {
      alert('重量差不能大于初始重量');
      return;
    }
    
    const newPoint: WeightLossPoint = {
      time: currentTime,
      weight: currentWeight, // 直接存储重量差
      lossRate: (currentWeight / formData.weight) * 100, // 失重率 = 重量差/初始重量 * 100
      tag: currentTag === '自定义' ? customTag : currentTag || undefined
    };
    
    setWeightLossPoints(prev => [...prev, newPoint]);
    setCurrentTag('');
    setCustomTag('');
  };

  // 处理记录温度数据点
  const handleTemperatureRecord = () => {
    if (!isRecording || !currentTemperature) return;
    
    const newPoint: TemperaturePoint = {
      time: currentTime,
      temperature: currentTemperature,
      tag: currentTag === '自定义' ? customTag : currentTag || undefined
    };
    
    setTemperaturePoints(prev => [...prev, newPoint]);
    setCurrentTag('');
    setCustomTag('');
  };

  // 处理删除数据点
  const handleDeletePoint = (index: number) => {
    if (window.confirm('确定要删除这条记录吗？')) {
      setWeightLossPoints((prev) => prev.filter((_, i) => i !== index));
      setTemperaturePoints((prev) => prev.filter((_, i) => i !== index));
    }
  }

  // 处理评估结果变更
  const handleAssessmentChange = (newAssessment: RoastingAssessment) => {
    setAssessment(newAssessment)
  }

  // 保存完整记录
  const handleSave = async () => {
    const { data: { session } } = await supabase.auth.getSession()
    
    if (!session) {
      setShowLoginDialog(true)
      return
    }
    
    try {
      setIsSaving(true)
      setSaveMessage(null)

      const record = {
        basic_info: formData,
        curve_data: {
          weightLossPoints,
          temperaturePoints,
          targetLossRate
        },
        assessment
      }

      if (currentRecordId) {
        await roastingService.updateRoastingRecord(currentRecordId, record)
      } else {
        const { data } = await roastingService.saveRoastingRecord(record)
        setCurrentRecordId(data.id)
      }

      setHasUnsavedChanges(false)
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
    } finally {
      setIsSaving(false)
    }
  }

  // 新建记录
  const handleNew = () => {
    const initialState = getInitialState()
    setFormData(initialState.formData)
    setAssessment(initialState.assessment)
    setWeightLossPoints(initialState.weightLossPoints)
    setTemperaturePoints(initialState.temperaturePoints)
    setTargetLossRate(initialState.targetLossRate)
    setCurrentTime(initialState.currentTime)
    setIsRecording(initialState.isRecording)
    setCurrentRecordId(null)
    setHasUnsavedChanges(false)
  }

  // 新建记录
  const handleNewClick = () => {
    if (hasUnsavedChanges) {
      setShowConfirmDialog(true)
    } else {
      handleNew()
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 页面标题 */}
      <div className="border-b border-coffee-200 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-4">
            <h1 className="text-xl font-semibold text-coffee-900">烘焙记录</h1>
            <div className="flex items-center gap-2">
              <button
                onClick={handleNewClick}
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
        </div>
      </div>

      {/* 主要内容 */}
      <div className="container mx-auto">
        {saveMessage && (
          <div className="px-4 py-2 m-4">
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
          </div>
        )}
        
        <div className="p-4 space-y-8">
          {/* 标签切换 */}
          <div className="mb-6 flex rounded-lg border border-coffee-200 bg-white p-1">
            <button
              onClick={() => setActiveTab('form')}
              className={`flex flex-1 items-center justify-center rounded-md px-4 py-2 text-sm font-medium ${
                activeTab === 'form'
                  ? 'bg-coffee-600 text-white'
                  : 'text-coffee-600 hover:bg-coffee-50'
              }`}
            >
              基础信息
            </button>
            <button
              onClick={() => setActiveTab('curve')}
              className={`flex flex-1 items-center justify-center rounded-md px-4 py-2 text-sm font-medium ${
                activeTab === 'curve'
                  ? 'bg-coffee-600 text-white'
                  : 'text-coffee-600 hover:bg-coffee-50'
              }`}
            >
              烘焙曲线
            </button>
            <button
              onClick={() => setActiveTab('result')}
              className={`flex flex-1 items-center justify-center rounded-md px-4 py-2 text-sm font-medium ${
                activeTab === 'result'
                  ? 'bg-coffee-600 text-white'
                  : 'text-coffee-600 hover:bg-coffee-50'
              }`}
            >
              结果评估
            </button>
            <Link
              href="/tools/roasting/history"
              className="flex flex-1 items-center justify-center rounded-md px-4 py-2 text-sm font-medium text-coffee-600 hover:bg-coffee-50"
            >
              历史
            </Link>
          </div>

          {/* 内容区域 */}
          <div className="rounded-2xl border border-coffee-200 bg-white p-6">
            {activeTab === 'form' && (
              <BasicInfo
                formData={formData}
                onFormChange={handleChange}
                onSubmit={(e) => {
                  e.preventDefault()
                  handleSave()
                }}
              />
            )}

            {activeTab === 'curve' && (
              <RoastingCurve
                formData={formData}
                isRecording={isRecording}
                currentTime={currentTime}
                weightLossPoints={weightLossPoints}
                temperaturePoints={temperaturePoints}
                targetLossRate={targetLossRate}
                currentWeight={currentWeight}
                currentTemperature={currentTemperature}
                currentTag={currentTag}
                customTag={customTag}
                onStartRecording={handleStartRecording}
                onStopRecording={handleStopRecording}
                onReset={handleReset}
                onRecord={handleWeightRecord}
                onTemperatureRecord={handleTemperatureRecord}
                onWeightChange={setTargetLossRate}
                onTemperatureChange={setCurrentTemperature}
                onDeletePoint={handleDeletePoint}
                onCurrentWeightChange={setCurrentWeight}
                onCurrentTemperatureChange={setCurrentTemperature}
                onCurrentTagChange={setCurrentTag}
                onCustomTagChange={setCustomTag}
              />
            )}

            {activeTab === 'result' && (
              <RoastingResult
                assessment={assessment}
                onAssessmentChange={handleAssessmentChange}
              />
            )}
          </div>
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
              handleNew()
            }}
          >
            确认新建
          </button>
        </div>
      </Dialog>

      {/* 登录对话框 */}
      <LoginPrompt
        isOpen={showLoginDialog}
        onClose={() => setShowLoginDialog(false)}
        redirectPath="/tools/roasting"
      />
    </div>
  )
} 