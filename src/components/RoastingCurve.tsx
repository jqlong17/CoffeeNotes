import React, { useState } from 'react';
import { RoastingFormData, WeightLossPoint, TemperaturePoint } from '@/app/tools/roasting/types';

interface RoastingCurveProps {
  formData: RoastingFormData;
  isRecording: boolean;
  currentTime: number;
  weightLossPoints: WeightLossPoint[];
  temperaturePoints: TemperaturePoint[];
  currentTag: string;
  customTag: string;
  recordMode: 'weightLoss' | 'temperature';
  onRecord: (weight?: number, temperature?: number, tag?: string) => void;
  onTemperatureRecord: (temperature: number, tag?: string) => void;
  onWeightChange: (value: number) => void;
  onTagChange: (value: string) => void;
  onCustomTagChange: (value: string) => void;
}

export default function RoastingCurve({
  formData,
  isRecording,
  currentTime,
  weightLossPoints,
  temperaturePoints,
  currentTag,
  customTag,
  recordMode,
  onRecord,
  onTemperatureRecord,
  onWeightChange,
  onTagChange,
  onCustomTagChange
}: RoastingCurveProps) {
  const [currentWeight, setCurrentWeight] = useState<number>(0);
  const [currentTemperature, setCurrentTemperature] = useState<number>(0);

  // 处理记录按钮点击
  const handleRecordClick = () => {
    if (recordMode === 'weightLoss') {
      onRecord(currentWeight, undefined, currentTag === '自定义' ? customTag : currentTag);
    } else {
      onTemperatureRecord(currentTemperature, currentTag === '自定义' ? customTag : currentTag);
    }
  };

  // 处理数值输入变化
  const handleValueChange = (value: string) => {
    const numValue = parseFloat(value);
    if (isNaN(numValue)) return;

    if (recordMode === 'weightLoss') {
      setCurrentWeight(numValue);
    } else {
      setCurrentTemperature(numValue);
    }
  };

  // 处理键盘事件
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const value = parseFloat(e.currentTarget.value);
    if (isNaN(value)) return;

    let newValue = value;
    if (e.key === 'ArrowUp') {
      newValue = value + 0.1;
    } else if (e.key === 'ArrowDown') {
      newValue = value - 0.1;
    }

    if (recordMode === 'weightLoss') {
      setCurrentWeight(Number(newValue.toFixed(1)));
    } else {
      setCurrentTemperature(Number(newValue.toFixed(1)));
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <input
          type="number"
          step="0.1"
          value={recordMode === 'weightLoss' ? currentWeight : currentTemperature}
          onChange={(e) => handleValueChange(e.target.value)}
          onKeyDown={handleKeyDown}
          className="w-24 px-2 py-1 border rounded"
        />
        <select
          value={currentTag}
          onChange={(e) => onTagChange(e.target.value)}
          className="px-2 py-1 border rounded"
        >
          <option value="">无标签</option>
          <option value="一爆开始">一爆开始</option>
          <option value="一爆结束">一爆结束</option>
          <option value="二爆开始">二爆开始</option>
          <option value="二爆结束">二爆结束</option>
          <option value="自定义">自定义</option>
        </select>
        {currentTag === '自定义' && (
          <input
            type="text"
            value={customTag}
            onChange={(e) => onCustomTagChange(e.target.value)}
            placeholder="输入自定义标签"
            className="px-2 py-1 border rounded"
          />
        )}
        <button
          onClick={handleRecordClick}
          disabled={!isRecording}
          className="px-4 py-1 text-white bg-blue-500 rounded disabled:bg-gray-400"
        >
          记录数据点
        </button>
      </div>
    </div>
  );
} 