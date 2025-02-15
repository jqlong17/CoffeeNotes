'use client'

import { StarIcon } from '@heroicons/react/24/solid'
import { StarIcon as StarOutlineIcon } from '@heroicons/react/24/outline'
import { ColorAssessment, TasteAssessment, RoastingAssessment } from '../types'

interface StarRatingProps {
  rating: number
  onRatingChange: (rating: number) => void
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
}

const StarRating: React.FC<StarRatingProps> = ({ rating, onRatingChange, size = 'md', disabled }) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8'
  }

  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          onClick={() => !disabled && onRatingChange(star)}
          className={`text-yellow-400 ${!disabled && 'hover:scale-110'} transition-transform ${disabled && 'cursor-default opacity-70'}`}
          disabled={disabled}
        >
          {star <= rating ? (
            <StarIcon className={sizeClasses[size]} />
          ) : (
            <StarOutlineIcon className={sizeClasses[size]} />
          )}
        </button>
      ))}
    </div>
  )
}

interface RoastingResultProps {
  assessment: RoastingAssessment
  onAssessmentChange: (assessment: RoastingAssessment) => void
  readOnly?: boolean
}

export default function RoastingResult({
  assessment,
  onAssessmentChange,
  readOnly,
}: RoastingResultProps) {
  const handleTasteChange = (key: keyof TasteAssessment, value: number | string) => {
    if (readOnly) return;
    onAssessmentChange({
      ...assessment,
      taste: {
        ...assessment.taste,
        [key]: value
      }
    })
  }

  const handleColorChange = (key: keyof ColorAssessment, value: number) => {
    if (readOnly) return;
    onAssessmentChange({
      ...assessment,
      color: {
        ...assessment.color,
        [key]: value
      }
    })
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-semibold text-coffee-900 mb-6">结果评估</h2>
      
      {/* 色值评估 */}
      <section className="mb-8">
        <h3 className="text-lg font-medium text-coffee-800 mb-4">色值评估</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-coffee-700 mb-2">豆表色值</label>
            <input
              type="number"
              min="0"
              max="100"
              value={assessment.color.beanSurface}
              onChange={(e) => handleColorChange('beanSurface', Number(e.target.value))}
              className="w-full px-3 py-2 border border-coffee-200 rounded-md focus:outline-none focus:ring-2 focus:ring-coffee-500 disabled:bg-gray-100 disabled:text-gray-500"
              disabled={readOnly}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-coffee-700 mb-2">豆芯色值</label>
            <input
              type="number"
              min="0"
              max="100"
              value={assessment.color.beanCore}
              onChange={(e) => handleColorChange('beanCore', Number(e.target.value))}
              className="w-full px-3 py-2 border border-coffee-200 rounded-md focus:outline-none focus:ring-2 focus:ring-coffee-500 disabled:bg-gray-100 disabled:text-gray-500"
              disabled={readOnly}
            />
          </div>
        </div>
      </section>

      {/* 风味评估 */}
      <section className="mb-8">
        <h3 className="text-lg font-medium text-coffee-800 mb-4">风味评估</h3>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-coffee-700 mb-2">香气</label>
              <StarRating
                rating={assessment.taste.aroma}
                onRatingChange={(value) => handleTasteChange('aroma', value)}
                disabled={readOnly}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-coffee-700 mb-2">酸度</label>
              <StarRating
                rating={assessment.taste.acidity}
                onRatingChange={(value) => handleTasteChange('acidity', value)}
                disabled={readOnly}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-coffee-700 mb-2">甜度</label>
              <StarRating
                rating={assessment.taste.sweetness}
                onRatingChange={(value) => handleTasteChange('sweetness', value)}
                disabled={readOnly}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-coffee-700 mb-2">醇度</label>
              <StarRating
                rating={assessment.taste.body}
                onRatingChange={(value) => handleTasteChange('body', value)}
                disabled={readOnly}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-coffee-700 mb-2">余韵</label>
              <StarRating
                rating={assessment.taste.aftertaste}
                onRatingChange={(value) => handleTasteChange('aftertaste', value)}
                disabled={readOnly}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-coffee-700 mb-2">平衡度</label>
              <StarRating
                rating={assessment.taste.balance}
                onRatingChange={(value) => handleTasteChange('balance', value)}
                disabled={readOnly}
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-coffee-700 mb-2">整体评分</label>
            <StarRating
              rating={assessment.taste.overall}
              onRatingChange={(value) => handleTasteChange('overall', value)}
              size="lg"
              disabled={readOnly}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-coffee-700 mb-2">风味描述</label>
            <textarea
              value={assessment.taste.notes}
              onChange={(e) => handleTasteChange('notes', e.target.value)}
              className="w-full px-3 py-2 border border-coffee-200 rounded-md focus:outline-none focus:ring-2 focus:ring-coffee-500 h-32 disabled:bg-gray-100 disabled:text-gray-500"
              placeholder="请描述咖啡的风味特点..."
              disabled={readOnly}
            />
          </div>
        </div>
      </section>
    </div>
  )
} 