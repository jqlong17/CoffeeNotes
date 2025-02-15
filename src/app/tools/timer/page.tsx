'use client'

import React, { useState, useEffect } from 'react'
import { PlayIcon, PauseIcon, StopIcon, FlagIcon } from '@heroicons/react/24/solid'

interface TimePoint {
  segment: number
  duration: number
}

export default function TimerPage() {
  const [time, setTime] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const [timePoints, setTimePoints] = useState<TimePoint[]>([])
  const [lastPointTime, setLastPointTime] = useState(0)

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
    setTimePoints([])
    setLastPointTime(0)
  }

  const handlePoint = () => {
    if (!isRunning) return
    
    const duration = time - lastPointTime
    const newPoint: TimePoint = {
      segment: timePoints.length + 1,
      duration
    }
    
    setTimePoints([...timePoints, newPoint])
    setLastPointTime(time)
  }

  return (
    <div className="mx-auto max-w-md">
      <div className="rounded-2xl border border-coffee-200 bg-white p-8 shadow-sm">
        <div className="text-center">
          <div className="mb-8 text-6xl font-bold text-coffee-900">
            {formatTime(time)}
          </div>

          <div className="flex justify-center gap-4 mb-8">
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
            <button
              onClick={handlePoint}
              disabled={!isRunning}
              className="flex h-12 w-12 items-center justify-center rounded-full bg-coffee-100 text-coffee-600 hover:bg-coffee-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FlagIcon className="h-6 w-6" />
            </button>
          </div>

          {timePoints.length > 0 && (
            <div className="border-t border-coffee-100 pt-6">
              <div className="grid grid-cols-2 gap-4 text-sm text-coffee-600">
                <div className="text-left font-medium">段数</div>
                <div className="text-right font-medium">用时</div>
                {timePoints.map((point) => (
                  <React.Fragment key={point.segment}>
                    <div className="text-left border-b border-coffee-50 py-2">
                      第 {point.segment} 段
                    </div>
                    <div className="text-right border-b border-coffee-50 py-2">
                      {formatTime(point.duration)}
                    </div>
                  </React.Fragment>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 