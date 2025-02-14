'use client'

import { useState, FormEvent, useEffect } from 'react'
import {
  ChartBarIcon,
  ClipboardIcon,
  StarIcon,
  PlayIcon,
  PauseIcon,
  StopIcon,
  TrashIcon,
} from '@heroicons/react/24/outline'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'

// 定义表单数据类型
interface RoastingFormData {
  // 生豆信息
  beanName: string
  origin: string
  process: string
  grade: string
  // 烘焙参数
  weight: number
  roastLevel: string
  firstCrackTime: string
  secondCrackTime: string
  totalTime: string
  roastingMethod: string
  // 其他
  notes: string
}

// 处理法选项
const PROCESS_OPTIONS = ['日晒', '水洗', '蜜处理', '厌氧发酵', '其他'] as const
// 烘焙度选项
const ROAST_LEVEL_OPTIONS = ['浅烘', '中浅烘', '中烘', '中深烘', '深烘'] as const

// 烘焙方式选项
const ROASTING_METHOD_OPTIONS = ['手网烘焙', '鼓风烘焙机', '其他'] as const

// 定义失重率数据点类型
interface WeightLossPoint {
  time: number // 秒数
  weight: number // 当前重量
  lossRate: number // 失重率
  tag?: string // 标签
}

// 预设标签选项
const ROASTING_TAGS = [
  '转黄',
  '脱水结束',
  '一爆开始',
  '一爆结束',
  '二爆开始',
  '二爆结束',
  '自定义',
] as const

// 定义记录模式类型
type RecordMode = 'temperature' | 'weightLoss'

// 添加一个计算Y轴范围的函数
const calculateYAxisDomain = (points: WeightLossPoint[], targetRate: number): [number, number] => {
  if (points.length === 0) return [0, 16];
  
  const maxLossRate = Math.max(
    ...points.map(p => p.lossRate),
    targetRate
  );
  
  // 向上取整到最接近的4的倍数,并额外增加4作为缓冲
  const upperBound = Math.ceil(maxLossRate / 4) * 4 + 4;
  
  return [0, upperBound];
};

export default function RoastingPage() {
  const [activeTab, setActiveTab] = useState('form') // 'form' | 'curve' | 'result'
  
  // 表单数据状态
  const [formData, setFormData] = useState<RoastingFormData>({
    beanName: '',
    origin: '',
    process: PROCESS_OPTIONS[0],
    grade: '',
    weight: 0,
    roastLevel: ROAST_LEVEL_OPTIONS[0],
    firstCrackTime: '',
    secondCrackTime: '',
    totalTime: '',
    roastingMethod: ROASTING_METHOD_OPTIONS[0],
    notes: '',
  })

  // 烘焙曲线相关状态
  const [isRecording, setIsRecording] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)

  // 失重率相关状态
  const [weightLossPoints, setWeightLossPoints] = useState<WeightLossPoint[]>([])
  const [currentWeight, setCurrentWeight] = useState<number>(0)
  const [targetLossRate, setTargetLossRate] = useState<number>(13) // 默认目标失重率为13%
  const [currentTag, setCurrentTag] = useState<string>('')
  const [customTag, setCustomTag] = useState<string>('')

  // 记录模式相关状态
  const [recordMode, setRecordMode] = useState<RecordMode>('weightLoss')
  const [currentTemperature, setCurrentTemperature] = useState<number>(0)

  // 编辑相关状态
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editingWeight, setEditingWeight] = useState<number>(0);
  const [editingTag, setEditingTag] = useState<string>('');

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

  // 处理表单提交
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    console.log('提交的数据：', formData)
    // TODO: 保存数据到本地存储或后端
  }

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

  // 修改记录按钮处理函数
  const handleRecord = () => {
    if (isRecording && !isNaN(currentWeight) && formData.weight > 0) {
      const lossRate = ((formData.weight - currentWeight) / formData.weight) * 100
      const tag = currentTag === '自定义' ? customTag : currentTag
      console.log('记录数据点:', {
        time: currentTime,
        weight: currentWeight,
        lossRate: lossRate,
        tag: tag
      })
      setWeightLossPoints((prev) => [
        ...prev,
        {
          time: currentTime,
          weight: currentWeight,
          lossRate: Math.max(0, lossRate),
          tag: tag || undefined
        },
      ])
      // 清空标签输入
      setCurrentTag('')
      setCustomTag('')
    }
  }

  // 处理开始记录
  const handleStartRecording = () => {
    // 检查初始重量
    if (!formData.weight || formData.weight <= 0) {
      console.log('没有设置初始重量')
      return
    }
    
    console.log('开始记录，初始重量:', formData.weight)
    
    // 重置所有状态
    setIsRecording(true)
    setCurrentTime(0)
    setWeightLossPoints([]) // 清除之前的记录
    
    // 设置当前重量为初始重量
    const initialWeight = formData.weight
    setCurrentWeight(initialWeight)
    
    // 添加初始点
    const initialPoint = {
      time: 0,
      weight: initialWeight,
      lossRate: 0
    }
    console.log('添加初始点:', initialPoint)
    setWeightLossPoints([initialPoint])
  }

  // 在组件初始化和formData.weight变化时更新currentWeight
  useEffect(() => {
    if (formData.weight > 0 && !isRecording) {
      setCurrentWeight(formData.weight)
    }
  }, [formData.weight, isRecording])

  // 处理暂停记录
  const handlePauseRecording = () => {
    console.log('暂停记录')
    setIsRecording(false)
  }

  // 处理停止记录
  const handleStopRecording = () => {
    console.log('停止记录')
    setIsRecording(false)
    setCurrentTime(0)
    setWeightLossPoints([])
  }

  // 处理重量输入和失重率计算
  const handleWeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const weight = Number(e.target.value)
    setCurrentWeight(weight)
  }

  // 处理温度输入
  const handleTemperatureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const temp = Number(e.target.value)
    setCurrentTemperature(temp)
  }

  // 格式化时间显示
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
  }

  // 添加重置函数
  const handleReset = () => {
    if (isRecording) {
      setIsRecording(false)
    }
    setCurrentTime(0)
    setWeightLossPoints([])
    setCurrentWeight(formData.weight || 0)
  }

  // 在现有函数后添加编辑和删除的处理函数
  const handleEditClick = (index: number) => {
    const point = weightLossPoints[index];
    setEditingIndex(index);
    setEditingWeight(point.weight);
    setEditingTag(point.tag || '');
  };

  const handleEditSave = (index: number) => {
    if (editingWeight && formData.weight > 0) {
      const lossRate = ((formData.weight - editingWeight) / formData.weight) * 100;
      setWeightLossPoints((prev) => {
        const newPoints = [...prev];
        newPoints[index] = {
          ...newPoints[index],
          weight: editingWeight,
          lossRate: Math.max(0, lossRate),
          tag: editingTag || undefined
        };
        return newPoints;
      });
    }
    setEditingIndex(null);
  };

  const handleEditCancel = () => {
    setEditingIndex(null);
  };

  const handleDeletePoint = (index: number) => {
    if (window.confirm('确定要删除这条记录吗？')) {
      setWeightLossPoints((prev) => prev.filter((_, i) => i !== index));
    }
  };

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
          <ClipboardIcon className="h-5 w-5" />
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
          <ChartBarIcon className="h-5 w-5" />
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
          <StarIcon className="h-5 w-5" />
          结果评估
        </button>
      </div>

      {/* 内容区域 */}
      <div className="rounded-2xl border border-coffee-200 bg-white p-6">
        {activeTab === 'form' && (
          <div className="space-y-6">
            <h2 className="text-lg font-semibold text-coffee-900">基础信息</h2>
            <form className="space-y-4" onSubmit={handleSubmit}>
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
                    onChange={(e) => handleChange('beanName', e.target.value)}
                    className="mt-1 block w-full rounded-md border border-coffee-200 px-3 py-2 text-coffee-900 focus:border-coffee-500 focus:outline-none focus:ring-1 focus:ring-coffee-500"
                    placeholder="例如：埃塞俄比亚 耶加雪菲"
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
                      onChange={(e) => handleChange('origin', e.target.value)}
                      className="mt-1 block w-full rounded-md border border-coffee-200 px-3 py-2 text-coffee-900 focus:border-coffee-500 focus:outline-none focus:ring-1 focus:ring-coffee-500"
                      placeholder="国家/地区"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-coffee-700">
                      处理法
                    </label>
                    <select
                      value={formData.process}
                      onChange={(e) => handleChange('process', e.target.value)}
                      className="mt-1 block w-full rounded-md border border-coffee-200 px-3 py-2 text-coffee-900 focus:border-coffee-500 focus:outline-none focus:ring-1 focus:ring-coffee-500"
                    >
                      {PROCESS_OPTIONS.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-coffee-700">
                    生豆等级
                  </label>
                  <input
                    type="text"
                    value={formData.grade}
                    onChange={(e) => handleChange('grade', e.target.value)}
                    className="mt-1 block w-full rounded-md border border-coffee-200 px-3 py-2 text-coffee-900 focus:border-coffee-500 focus:outline-none focus:ring-1 focus:ring-coffee-500"
                    placeholder="例如：Grade 1"
                  />
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
                      onChange={(e) => handleChange('weight', Number(e.target.value))}
                      className="mt-1 block w-full rounded-md border border-coffee-200 px-3 py-2 text-coffee-900 focus:border-coffee-500 focus:outline-none focus:ring-1 focus:ring-coffee-500"
                      placeholder="300"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-coffee-700">
                      烘焙度
                    </label>
                    <select
                      value={formData.roastLevel}
                      onChange={(e) => handleChange('roastLevel', e.target.value)}
                      className="mt-1 block w-full rounded-md border border-coffee-200 px-3 py-2 text-coffee-900 focus:border-coffee-500 focus:outline-none focus:ring-1 focus:ring-coffee-500"
                    >
                      {ROAST_LEVEL_OPTIONS.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-coffee-700">
                      烘焙方式
                    </label>
                    <select
                      value={formData.roastingMethod}
                      onChange={(e) => handleChange('roastingMethod', e.target.value)}
                      className="mt-1 block w-full rounded-md border border-coffee-200 px-3 py-2 text-coffee-900 focus:border-coffee-500 focus:outline-none focus:ring-1 focus:ring-coffee-500"
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
                      一爆时间 (分:秒)
                    </label>
                    <input
                      type="text"
                      value={formData.firstCrackTime}
                      onChange={(e) => handleChange('firstCrackTime', e.target.value)}
                      className="mt-1 block w-full rounded-md border border-coffee-200 px-3 py-2 text-coffee-900 focus:border-coffee-500 focus:outline-none focus:ring-1 focus:ring-coffee-500"
                      placeholder="8:30"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-coffee-700">
                      二爆时间 (分:秒)
                    </label>
                    <input
                      type="text"
                      value={formData.secondCrackTime}
                      onChange={(e) => handleChange('secondCrackTime', e.target.value)}
                      className="mt-1 block w-full rounded-md border border-coffee-200 px-3 py-2 text-coffee-900 focus:border-coffee-500 focus:outline-none focus:ring-1 focus:ring-coffee-500"
                      placeholder="10:15"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-coffee-700">
                    总烘焙时间 (分:秒)
                  </label>
                  <input
                    type="text"
                    value={formData.totalTime}
                    onChange={(e) => handleChange('totalTime', e.target.value)}
                    className="mt-1 block w-full rounded-md border border-coffee-200 px-3 py-2 text-coffee-900 focus:border-coffee-500 focus:outline-none focus:ring-1 focus:ring-coffee-500"
                    placeholder="11:00"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-coffee-700">
                  备注
                </label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => handleChange('notes', e.target.value)}
                  className="mt-1 block w-full rounded-md border border-coffee-200 px-3 py-2 text-coffee-900 focus:border-coffee-500 focus:outline-none focus:ring-1 focus:ring-coffee-500"
                  rows={3}
                  placeholder="记录其他细节，如环境温度、天气等"
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

        {activeTab === 'curve' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-coffee-900">烘焙曲线记录</h2>
              <div className="flex rounded-lg border border-coffee-200 p-1">
                <button
                  onClick={() => setRecordMode('temperature')}
                  className={`flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium ${
                    recordMode === 'temperature'
                      ? 'bg-coffee-600 text-white'
                      : 'text-coffee-600 hover:bg-coffee-50'
                  }`}
                >
                  温度曲线
                </button>
                <button
                  onClick={() => setRecordMode('weightLoss')}
                  className={`flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium ${
                    recordMode === 'weightLoss'
                      ? 'bg-coffee-600 text-white'
                      : 'text-coffee-600 hover:bg-coffee-50'
                  }`}
                >
                  失重率曲线
                </button>
              </div>
            </div>

            <div className="space-y-6">
              {/* 操作区域 */}
              <div className="grid grid-cols-2 gap-4">
                {/* 左侧区域 */}
                <div className="space-y-4">
                  {/* 目标值设置 */}
                  {recordMode === 'weightLoss' && (
                    <div className="rounded-lg border border-coffee-200 p-2">
                      <div>
                        <label className="block text-sm font-medium text-coffee-700">
                          目标失重率 (%)
                        </label>
                        <input
                          type="number"
                          value={targetLossRate}
                          onChange={(e) => setTargetLossRate(Number(e.target.value))}
                          className="mt-1 block w-32 rounded-md border border-coffee-200 px-2 py-1 text-coffee-900 focus:border-coffee-500 focus:outline-none focus:ring-1 focus:ring-coffee-500"
                          placeholder="13"
                          min="0"
                          max="100"
                          step="0.1"
                        />
                      </div>
                    </div>
                  )}

                  {/* 计时器显示 */}
                  <div className="rounded-lg border border-coffee-200 p-2">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-coffee-900">
                        {formatTime(currentTime)}
                      </div>
                      <div className="mt-0.5 text-xs text-coffee-600">
                        {isRecording ? '记录中...' : '已暂停'}
                      </div>
                    </div>
                  </div>

                  {/* 控制按钮 */}
                  <div className="flex items-center justify-center gap-2 rounded-lg border border-coffee-200 p-2">
                    {!isRecording ? (
                      <button
                        onClick={handleStartRecording}
                        disabled={!formData.weight || formData.weight <= 0}
                        title={!formData.weight || formData.weight <= 0 ? "请先在基础信息中设置生豆重量" : "开始记录"}
                        className={`flex h-9 w-9 items-center justify-center rounded-full text-white ${
                          !formData.weight || formData.weight <= 0
                            ? 'bg-coffee-300 cursor-not-allowed'
                            : 'bg-coffee-600 hover:bg-coffee-700'
                        }`}
                      >
                        <PlayIcon className="h-4 w-4" />
                      </button>
                    ) : (
                      <button
                        onClick={handlePauseRecording}
                        className="flex h-9 w-9 items-center justify-center rounded-full bg-coffee-600 text-white hover:bg-coffee-700"
                      >
                        <PauseIcon className="h-4 w-4" />
                      </button>
                    )}
                    <button
                      onClick={handleStopRecording}
                      className="flex h-9 w-9 items-center justify-center rounded-full bg-coffee-100 text-coffee-600 hover:bg-coffee-200"
                    >
                      <StopIcon className="h-4 w-4" />
                    </button>
                    <button
                      onClick={handleReset}
                      className="flex h-9 w-9 items-center justify-center rounded-full bg-red-100 text-red-600 hover:bg-red-200"
                      title="清空重置"
                    >
                      <TrashIcon className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {/* 右侧区域 - 数据输入 */}
                <div className="rounded-lg border border-coffee-200 p-2">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-coffee-700">
                        {recordMode === 'weightLoss' ? '当前重量 (g)' : '当前温度 (°C)'}
                      </label>
                      <input
                        type="number"
                        value={recordMode === 'weightLoss' ? (currentWeight || '') : (currentTemperature || '')}
                        onChange={recordMode === 'weightLoss' ? handleWeightChange : handleTemperatureChange}
                        onKeyDown={(e) => {
                          if (recordMode === 'weightLoss') {
                            const step = e.shiftKey ? 10 : 1;
                            if (e.key === 'ArrowUp') {
                              e.preventDefault();
                              setCurrentWeight(prev => (prev || 0) + step);
                            } else if (e.key === 'ArrowDown') {
                              e.preventDefault();
                              setCurrentWeight(prev => Math.max(0, (prev || 0) - step));
                            }
                          }
                        }}
                        className="mt-1 block w-full rounded-md border border-coffee-200 px-3 py-1.5 text-coffee-900 focus:border-coffee-500 focus:outline-none focus:ring-1 focus:ring-coffee-500"
                        placeholder={recordMode === 'weightLoss' ? "输入当前重量" : "输入当前温度"}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-coffee-700">
                        选择标签
                      </label>
                      <select
                        value={currentTag}
                        onChange={(e) => setCurrentTag(e.target.value)}
                        className="mt-1 block w-full rounded-md border border-coffee-200 px-3 py-1.5 text-coffee-900 focus:border-coffee-500 focus:outline-none focus:ring-1 focus:ring-coffee-500"
                      >
                        <option value="">选择标签</option>
                        {ROASTING_TAGS.map((tag) => (
                          <option key={tag} value={tag}>
                            {tag}
                          </option>
                        ))}
                      </select>
                      {currentTag === '自定义' && (
                        <input
                          type="text"
                          value={customTag}
                          onChange={(e) => setCustomTag(e.target.value)}
                          className="mt-2 block w-full rounded-md border border-coffee-200 px-3 py-1.5 text-coffee-900 focus:border-coffee-500 focus:outline-none focus:ring-1 focus:ring-coffee-500"
                          placeholder="输入自定义标签"
                        />
                      )}
                    </div>
                    <button
                      onClick={handleRecord}
                      disabled={!isRecording || (recordMode === 'weightLoss' ? !currentWeight : !currentTemperature)}
                      className="w-full rounded-md bg-coffee-600 px-4 py-1.5 text-white hover:bg-coffee-700 disabled:opacity-50"
                    >
                      记录数据点
                    </button>
                  </div>
                </div>
              </div>

              {/* 曲线图表区域 */}
              <div className="h-[300px] rounded-lg border border-coffee-200 p-2">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={weightLossPoints}
                    margin={{
                      top: 10,
                      right: 10,
                      left: 0,
                      bottom: 10,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                      dataKey="time"
                      tickFormatter={formatTime}
                      label={{ value: '时间', position: 'insideBottom', offset: -10 }}
                      type="number"
                      domain={[0, 'auto']}
                    />
                    <YAxis
                      domain={calculateYAxisDomain(weightLossPoints, targetLossRate)}
                      label={{
                        value: '失重率 (%)',
                        angle: -90,
                        position: 'insideLeft',
                        offset: 20,
                      }}
                    />
                    <Tooltip
                      formatter={(value: number, name: string) => [
                        `${value.toFixed(1)}%`,
                        name === 'lossRate' ? '失重率' : name === 'target' ? '目标失重率' : name,
                      ]}
                      labelFormatter={(label: number) => `时间: ${formatTime(label)}`}
                      contentStyle={{
                        backgroundColor: 'rgba(255, 255, 255, 0.9)',
                        border: '1px solid #795548',
                        borderRadius: '4px',
                        padding: '8px',
                      }}
                    />
                    <Legend
                      wrapperStyle={{
                        paddingTop: '10px',
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="lossRate"
                      name="失重率"
                      stroke="#795548"
                      dot={(props) => {
                        const { cx, cy, payload } = props;
                        if (payload.tag) {
                          return (
                            <g>
                              <circle cx={cx} cy={cy} r={4} fill="#795548" />
                              <text
                                x={cx}
                                y={cy - 10}
                                textAnchor="middle"
                                fill="#795548"
                                fontSize="12"
                              >
                                {payload.tag}
                              </text>
                            </g>
                          );
                        }
                        return <circle cx={cx} cy={cy} r={2} fill="#795548" />;
                      }}
                      strokeWidth={2}
                      isAnimationActive={false}
                    />
                    {weightLossPoints.length > 0 && (
                      <Line
                        type="monotone"
                        data={[
                          { time: weightLossPoints[0].time, target: targetLossRate, key: 'start' },
                          { time: weightLossPoints[weightLossPoints.length - 1].time, target: targetLossRate, key: 'end' }
                        ]}
                        dataKey="target"
                        name="目标失重率"
                        stroke="#E91E63"
                        strokeDasharray="5 5"
                        dot={false}
                        isAnimationActive={false}
                      />
                    )}
                  </LineChart>
                </ResponsiveContainer>
              </div>

              {/* 数据表格 */}
              <div className="rounded-lg border border-coffee-200 p-2">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead>
                      <tr className="border-b border-coffee-200">
                        <th className="w-20 px-2 py-1">时间</th>
                        <th className="w-24 px-2 py-1 text-right">重量</th>
                        <th className="w-24 px-2 py-1 text-right">失重率</th>
                        <th className="w-28 px-2 py-1">标签</th>
                        <th className="w-32 px-2 py-1 text-center">操作</th>
                      </tr>
                    </thead>
                    <tbody>
                      {weightLossPoints.map((point, index) => (
                        <tr key={index} className="border-b border-coffee-100">
                          <td className="px-2 py-1">{formatTime(point.time)}</td>
                          <td className="px-2 py-1 text-right">
                            {editingIndex === index ? (
                              <input
                                type="number"
                                value={editingWeight}
                                onChange={(e) => setEditingWeight(Number(e.target.value))}
                                className="w-20 rounded-md border border-coffee-200 px-2 py-1 text-right"
                              />
                            ) : (
                              point.weight
                            )}
                          </td>
                          <td className="px-2 py-1 text-right">{point.lossRate.toFixed(1)}%</td>
                          <td className="px-2 py-1">
                            {editingIndex === index ? (
                              <select
                                value={editingTag}
                                onChange={(e) => setEditingTag(e.target.value)}
                                className="w-full rounded-md border border-coffee-200 px-2 py-1"
                              >
                                <option value="">无标签</option>
                                {ROASTING_TAGS.map((tag) => (
                                  <option key={tag} value={tag}>
                                    {tag}
                                  </option>
                                ))}
                              </select>
                            ) : (
                              point.tag || '-'
                            )}
                          </td>
                          <td className="px-2 py-1 text-center">
                            {editingIndex === index ? (
                              <div className="flex justify-center gap-1">
                                <button
                                  onClick={() => handleEditSave(index)}
                                  className="rounded bg-coffee-600 px-2 py-1 text-xs text-white hover:bg-coffee-700"
                                >
                                  保存
                                </button>
                                <button
                                  onClick={handleEditCancel}
                                  className="rounded bg-gray-500 px-2 py-1 text-xs text-white hover:bg-gray-600"
                                >
                                  取消
                                </button>
                              </div>
                            ) : (
                              <div className="flex justify-center gap-1">
                                <button
                                  onClick={() => handleEditClick(index)}
                                  className="rounded bg-coffee-100 px-2 py-1 text-xs text-coffee-600 hover:bg-coffee-200"
                                >
                                  编辑
                                </button>
                                <button
                                  onClick={() => handleDeletePoint(index)}
                                  className="rounded bg-red-100 px-2 py-1 text-xs text-red-600 hover:bg-red-200"
                                >
                                  删除
                                </button>
                              </div>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* 底部按钮 */}
              <div className="flex gap-2 bg-white">
                <button className="flex-1 rounded-md bg-coffee-600 px-4 py-2 text-white hover:bg-coffee-700">
                  保存记录
                </button>
                <button className="flex-1 rounded-md border border-coffee-600 px-4 py-2 text-coffee-600 hover:bg-coffee-50">
                  导出曲线图片
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'result' && (
          <div className="text-center">
            <h2 className="mb-4 text-lg font-semibold text-coffee-900">结果评估</h2>
            <p className="text-coffee-600">结果评估功能开发中...</p>
          </div>
        )}
      </div>
    </div>
  )
} 