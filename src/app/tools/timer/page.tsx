'use client'

import { useState, useEffect } from 'react'
import { PlayIcon, PauseIcon, StopIcon } from '@heroicons/react/24/solid'

const presets = [
  { name: '手冲咖啡', time: 180 }, // 3分钟
  { name: '法压壶', time: 240 }, // 4分钟
  { name: '冷萃', time: 43200 }, // 12小时
]

export default function TimerPage() {
  const [time, setTime] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const [selectedPreset, setSelectedPreset] = useState<number | null>(null)

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null

    if (isRunning) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1)
      }, 1000)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isRunning])

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const remainingSeconds = seconds % 60

    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${remainingSeconds
        .toString()
        .padStart(2, '0')}`
    }
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
  }

  const handleStart = () => setIsRunning(true)
  const handlePause = () => setIsRunning(false)
  const handleStop = () => {
    setIsRunning(false)
    setTime(0)
    setSelectedPreset(null)
  }

  const handlePresetClick = (index: number) => {
    setTime(0)
    setSelectedPreset(index)
  }

  return (
    <div className="mx-auto max-w-md">
      <div className="rounded-2xl border border-coffee-200 bg-white p-8 shadow-sm">
        <div className="text-center">
          <div className="mb-8 text-6xl font-bold text-coffee-900">
            {formatTime(time)}
          </div>

          <div className="mb-8 flex justify-center gap-4">
            {isRunning ? (
              <button
                onClick={handlePause}
                className="flex h-12 w-12 items-center justify-center rounded-full bg-coffee-100 text-coffee-600 hover:bg-coffee-200"
              >
                <PauseIcon className="h-6 w-6" />
              </button>
            ) : (
              <button
                onClick={handleStart}
                className="flex h-12 w-12 items-center justify-center rounded-full bg-coffee-600 text-white hover:bg-coffee-700"
              >
                <PlayIcon className="h-6 w-6" />
              </button>
            )}
            <button
              onClick={handleStop}
              className="flex h-12 w-12 items-center justify-center rounded-full bg-coffee-100 text-coffee-600 hover:bg-coffee-200"
            >
              <StopIcon className="h-6 w-6" />
            </button>
          </div>

          <div className="grid grid-cols-3 gap-4">
            {presets.map((preset, index) => (
              <button
                key={preset.name}
                onClick={() => handlePresetClick(index)}
                className={`rounded-lg border p-3 text-sm ${
                  selectedPreset === index
                    ? 'border-coffee-600 bg-coffee-50 text-coffee-900'
                    : 'border-coffee-200 text-coffee-600 hover:border-coffee-300'
                }`}
              >
                <div className="font-medium">{preset.name}</div>
                <div className="mt-1 text-xs">{formatTime(preset.time)}</div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
} 