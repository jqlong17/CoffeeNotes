import React, { useState, useRef, useMemo } from 'react'
import {
  PlayIcon,
  StopIcon,
  TrashIcon,
} from '@heroicons/react/24/outline'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
} from 'recharts'
import type { WeightLossPoint, TemperaturePoint, RecordMode, RoastingFormData } from '../types'
import { ROASTING_TAGS } from '../types'

interface RoastingCurveProps {
  formData: RoastingFormData
  isRecording: boolean
  currentTime: number
  weightLossPoints: WeightLossPoint[]
  temperaturePoints: TemperaturePoint[]
  targetLossRate: number
  currentWeight: number
  currentTemperature: number
  currentTag: string
  customTag: string
  onStartRecording: () => void
  onStopRecording: () => void
  onReset: () => void
  onRecord: () => void
  onTemperatureRecord: () => void
  onWeightChange: (value: number) => void
  onTemperatureChange: (value: number) => void
  onDeletePoint: (index: number) => void
  onCurrentWeightChange: (weight: number) => void
  onCurrentTemperatureChange: (temperature: number) => void
  onCurrentTagChange: (tag: string) => void
  onCustomTagChange: (tag: string) => void
  readOnly?: boolean
}

// 计算Y轴范围的函数
const calculateYAxisDomain = (points: WeightLossPoint[], targetRate: number): [number, number] => {
  const initialUpperBound = Math.ceil((targetRate + 4) / 4) * 4;
  if (points.length === 0) return [0, initialUpperBound];
  const maxLossRate = Math.max(...points.map(p => p.lossRate));
  if (maxLossRate > initialUpperBound) {
    return [0, Math.ceil(maxLossRate / 4) * 4 + 4];
  }
  return [0, initialUpperBound];
};

// 计算温度Y轴范围
const calculateTemperatureYAxisDomain = (points: TemperaturePoint[]): [number, number] => {
  if (points.length === 0) return [0, 240];
  const maxTemperature = Math.max(...points.map(p => p.temperature));
  const upperBound = Math.ceil(maxTemperature / 60) * 60 + 60;
  return [0, upperBound];
};

// 计算X轴范围
const calculateXAxisDomain = (points: WeightLossPoint[] | TemperaturePoint[]): [number, number] => {
  if (points.length === 0) return [0, 300];
  const maxTime = Math.max(...points.map(p => p.time));
  const maxTimeInMinutes = Math.ceil(maxTime / 60) * 60;
  return [0, Math.max(300, maxTimeInMinutes)];
};

// 格式化时间显示
const formatTime = (seconds: number) => {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
}

const RoastingCurve = ({
  formData,
  isRecording,
  currentTime,
  weightLossPoints,
  temperaturePoints,
  targetLossRate,
  currentWeight,
  currentTemperature,
  currentTag,
  customTag,
  onStartRecording,
  onStopRecording,
  onReset,
  onRecord,
  onTemperatureRecord,
  onWeightChange,
  onTemperatureChange,
  onDeletePoint,
  onCurrentWeightChange,
  onCurrentTemperatureChange,
  onCurrentTagChange,
  onCustomTagChange,
  readOnly,
}: RoastingCurveProps): React.ReactElement => {
  const [recordMode, setRecordMode] = useState<RecordMode>('weightLoss')
  const chartTableRef = useRef<HTMLDivElement>(null)

  // 使用 useMemo 优化图表数据
  const chartData = useMemo(() => {
    return recordMode === 'weightLoss' ? weightLossPoints : temperaturePoints;
  }, [weightLossPoints, temperaturePoints, recordMode]);

  // 使用 useMemo 优化目标失重率线数据
  const targetLine = useMemo(() => {
    const maxTime = chartData.length > 0 
      ? Math.max(...chartData.map(p => p.time))
      : 300;
    return [
      { time: 0, target: targetLossRate },
      { time: Math.max(300, maxTime), target: targetLossRate }
    ];
  }, [targetLossRate, chartData]);

  // 使用 useMemo 计算 Y 轴范围
  const yAxisDomain = useMemo(() => {
    return calculateYAxisDomain(weightLossPoints, targetLossRate);
  }, [weightLossPoints, targetLossRate]);

  // 使用 useMemo 计算 X 轴范围
  const xAxisDomain = useMemo(() => {
    return calculateXAxisDomain(chartData);
  }, [chartData]);

  // 使用 useMemo 计算温度 Y 轴范围
  const temperatureYAxisDomain = useMemo(() => {
    return calculateTemperatureYAxisDomain(temperaturePoints);
  }, [temperaturePoints]);

  // 自定义数据点渲染
  interface CustomDotProps {
    cx?: number;
    cy?: number;
    payload?: {
      tag?: string;
    };
  }

  const CustomDot = (props: CustomDotProps) => {
    const { cx, cy, payload } = props;
    if (!cx || !cy) return null;
    
    if (payload?.tag) {
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
  };

  // 处理记录按钮点击
  const handleRecordClick = () => {
    if (recordMode === 'weightLoss') {
      if (!currentWeight) return;
      if (currentWeight > formData.weight) {
        alert('当前重量不能大于初始重量');
        return;
      }
      onCurrentWeightChange(currentWeight);
      onRecord();
    } else {
      if (!currentTemperature) return;
      onCurrentTemperatureChange(currentTemperature);
      onTemperatureRecord();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-coffee-900">烘焙曲线记录</h2>
        {!readOnly && (
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
        )}
      </div>

      <div className="space-y-6">
        {/* 操作区域 */}
        {!readOnly && (
          <div className="grid grid-cols-2 gap-4">
            {/* 左侧区域 */}
            <div className="space-y-4">
              {/* 目标值设置 */}
              {recordMode === 'weightLoss' && (
                <div className="h-[80px] rounded-lg border border-coffee-200 p-2">
                  <div>
                    <label className="block text-sm font-medium text-coffee-700">
                      目标失重率 (%)
                    </label>
                    <input
                      type="number"
                      value={targetLossRate}
                      onChange={(e) => onWeightChange(Number(e.target.value))}
                      className="mt-0.5 block w-full rounded-md border border-coffee-200 px-3 py-1 text-coffee-900 focus:border-coffee-500 focus:outline-none focus:ring-1 focus:ring-coffee-500"
                      placeholder="13"
                      min="0"
                      max="100"
                      step="0.1"
                    />
                  </div>
                </div>
              )}

              {/* 计时器显示 */}
              <div className="h-[80px] rounded-lg border border-coffee-200 p-2">
                <div className="flex h-full flex-col items-center justify-center">
                  <div className="text-2xl font-bold text-coffee-900">
                    {formatTime(currentTime)}
                  </div>
                  <div className="mt-0.5 text-xs text-coffee-600">
                    {isRecording ? '记录中...' : '已暂停'}
                  </div>
                </div>
              </div>

              {/* 控制按钮 */}
              <div className="h-[80px] flex items-center justify-center gap-2 rounded-lg border border-coffee-200 p-2">
                {!isRecording ? (
                  <button
                    onClick={onStartRecording}
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
                    onClick={onStopRecording}
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-coffee-600 text-white hover:bg-coffee-700"
                  >
                    <StopIcon className="h-4 w-4" />
                  </button>
                )}
                <button
                  onClick={onReset}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-red-100 text-red-600 hover:bg-red-200"
                  title="清空重置"
                >
                  <TrashIcon className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* 右侧区域 - 数据输入 */}
            <div className="space-y-4">
              <div className="h-[80px] rounded-lg border border-coffee-200 p-2">
                <label className="block text-sm font-medium text-coffee-700">
                  {recordMode === 'weightLoss' ? '当前重量差 (g)' : '当前温度 (°C)'}
                </label>
                <input
                  type="number"
                  value={recordMode === 'weightLoss' ? (currentWeight || '') : (currentTemperature || '')}
                  onChange={(e) => {
                    const value = Number(e.target.value);
                    if (recordMode === 'weightLoss') {
                      onCurrentWeightChange(value);
                    } else {
                      onCurrentTemperatureChange(value);
                      onTemperatureChange(value);
                    }
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleRecordClick();
                    } else if (recordMode === 'weightLoss') {
                      const step = e.shiftKey ? 10 : 1;
                      if (e.key === 'ArrowUp') {
                        e.preventDefault();
                        const newValue = (currentWeight || 0) + step;
                        onCurrentWeightChange(newValue);
                      } else if (e.key === 'ArrowDown') {
                        e.preventDefault();
                        const newValue = Math.max(0, (currentWeight || 0) - step);
                        onCurrentWeightChange(newValue);
                      }
                    }
                  }}
                  className="mt-0.5 block w-full rounded-md border border-coffee-200 px-3 py-1 text-coffee-900 focus:border-coffee-500 focus:outline-none focus:ring-1 focus:ring-coffee-500"
                  placeholder={recordMode === 'weightLoss' ? "输入重量减少值" : "输入当前温度"}
                />
              </div>

              <div className="h-[80px] rounded-lg border border-coffee-200 p-2">
                <label className="block text-sm font-medium text-coffee-700">
                  选择标签
                </label>
                <select
                  value={currentTag}
                  onChange={(e) => onCurrentTagChange(e.target.value)}
                  className="mt-0.5 block w-full rounded-md border border-coffee-200 px-3 py-1 text-coffee-900 focus:border-coffee-500 focus:outline-none focus:ring-1 focus:ring-coffee-500"
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
                    onChange={(e) => onCustomTagChange(e.target.value)}
                    className="mt-2 block w-full rounded-md border border-coffee-200 px-3 py-1.5 text-coffee-900 focus:border-coffee-500 focus:outline-none focus:ring-1 focus:ring-coffee-500"
                    placeholder="输入自定义标签"
                  />
                )}
              </div>

              <div className="h-[80px] rounded-lg border border-coffee-200 p-2 flex items-center">
                <button
                  onClick={handleRecordClick}
                  disabled={!isRecording || (recordMode === 'weightLoss' ? !currentWeight : !currentTemperature)}
                  className="w-full rounded-md bg-coffee-600 px-4 py-1.5 text-white hover:bg-coffee-700 disabled:opacity-50"
                >
                  记录数据点
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 图表和表格区域 */}
        <div ref={chartTableRef} className="space-y-4 bg-white rounded-lg" data-export-container>
          {/* 曲线图表区域 */}
          <div className="h-[300px] rounded-lg border border-coffee-200 bg-white" data-chart-container>
            {recordMode === 'weightLoss' ? (
              <LineChart
                width={chartTableRef.current?.offsetWidth ? chartTableRef.current.offsetWidth - 40 : 350}
                height={300}
                data={weightLossPoints}
                margin={{
                  top: 20,
                  right: 30,
                  left: 30,
                  bottom: 20
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="time"
                  tickFormatter={formatTime}
                  label={{ 
                    value: '时间', 
                    position: 'insideBottom', 
                    offset: -10,
                    style: { fontSize: 12 }
                  }}
                  tick={{ fontSize: 12 }}
                  type="number"
                  domain={xAxisDomain}
                />
                <YAxis
                  domain={yAxisDomain}
                  label={{
                    value: '失重率 (%)',
                    angle: -90,
                    position: 'insideLeft',
                    offset: 15,
                    style: { fontSize: 12 }
                  }}
                  tick={{ fontSize: 12 }}
                />
                <Legend 
                  align="right"
                  verticalAlign="top"
                  iconType="circle"
                  iconSize={6}
                  wrapperStyle={{
                    paddingRight: 10,
                    paddingTop: 5,
                    fontSize: '12px'
                  }}
                />
                
                {/* 目标失重率线 */}
                <Line
                  type="monotone"
                  data={targetLine}
                  dataKey="target"
                  name="目标失重率"
                  stroke="#E91E63"
                  strokeDasharray="5 5"
                  dot={false}
                  isAnimationActive={false}
                />
                
                {/* 实际失重率曲线 */}
                <Line
                  type="monotone"
                  dataKey="lossRate"
                  name="失重率"
                  stroke="#795548"
                  strokeWidth={2}
                  dot={<CustomDot />}
                  isAnimationActive={false}
                />
              </LineChart>
            ) : (
              <LineChart
                width={350}
                height={300}
                data={temperaturePoints}
                margin={{
                  top: 20,
                  right: 20,
                  left: 20,
                  bottom: 20
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="time"
                  tickFormatter={formatTime}
                  label={{ 
                    value: '时间', 
                    position: 'insideBottom', 
                    offset: -10,
                    style: { fontSize: 12 }
                  }}
                  tick={{ fontSize: 12 }}
                  type="number"
                  domain={xAxisDomain}
                />
                <YAxis
                  domain={temperatureYAxisDomain}
                  label={{
                    value: '温度 (°C)',
                    angle: -90,
                    position: 'insideLeft',
                    offset: 15,
                    style: { fontSize: 12 }
                  }}
                  tick={{ fontSize: 12 }}
                />
                <Legend 
                  align="right"
                  verticalAlign="top"
                  iconType="circle"
                  iconSize={6}
                  wrapperStyle={{
                    paddingRight: 10,
                    paddingTop: 5,
                    fontSize: '12px'
                  }}
                />
                
                {/* 温度曲线 */}
                <Line
                  type="monotone"
                  dataKey="temperature"
                  name="温度"
                  stroke="#FF5722"
                  strokeWidth={2}
                  dot={<CustomDot />}
                  isAnimationActive={false}
                />
              </LineChart>
            )}
          </div>

          {/* 数据表格 */}
          <div className="rounded-lg border border-coffee-200 bg-white" data-table-container>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-coffee-200 bg-gray-50">
                    <th className="px-4 py-2">时间</th>
                    {recordMode === 'weightLoss' ? (
                      <>
                        <th className="px-4 py-2 text-right">重量差</th>
                        <th className="px-4 py-2 text-right">失重率</th>
                      </>
                    ) : (
                      <th className="px-4 py-2 text-right">温度</th>
                    )}
                    <th className="px-4 py-2">标签</th>
                    {!readOnly && <th className="px-4 py-2 text-center">操作</th>}
                  </tr>
                </thead>
                <tbody>
                  {recordMode === 'weightLoss' ? (
                    weightLossPoints.map((point, index) => (
                      <tr key={index} className="border-b border-coffee-100">
                        <td className="px-4 py-2">{formatTime(point.time)}</td>
                        <td className="px-4 py-2 text-right">{point.weight}g</td>
                        <td className="px-4 py-2 text-right">{((point.weight / formData.weight) * 100).toFixed(1)}%</td>
                        <td className="px-4 py-2">{point.tag || '-'}</td>
                        {!readOnly && (
                          <td className="px-4 py-2 text-center">
                            <button
                              onClick={() => onDeletePoint(index)}
                              className="rounded bg-red-100 px-2 py-1 text-xs text-red-600 hover:bg-red-200"
                            >
                              删除
                            </button>
                          </td>
                        )}
                      </tr>
                    ))
                  ) : (
                    temperaturePoints.map((point, index) => (
                      <tr key={index} className="border-b border-coffee-100">
                        <td className="px-4 py-2">{formatTime(point.time)}</td>
                        <td className="px-4 py-2 text-right">{point.temperature}°C</td>
                        <td className="px-4 py-2">{point.tag || '-'}</td>
                        {!readOnly && (
                          <td className="px-4 py-2 text-center">
                            <button
                              onClick={() => onDeletePoint(index)}
                              className="rounded bg-red-100 px-2 py-1 text-xs text-red-600 hover:bg-red-200"
                            >
                              删除
                            </button>
                          </td>
                        )}
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RoastingCurve 