import { HeartIcon } from '@heroicons/react/24/outline'
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid'
import { useMemo } from 'react'

// 背景颜色选项
const BG_COLORS = [
  'bg-yellow-100/80',  // 黄色
  'bg-blue-100/80',    // 蓝色
  'bg-green-100/80',   // 绿色
  'bg-pink-100/80',    // 粉色
  'bg-purple-100/80',  // 紫色
  'bg-orange-100/80',  // 橙色
]

interface ContentCardProps {
  id: string
  imageEmoji: string
  image_content: string
  title: string
  author: {
    name: string
    avatar: string
  }
  likes: number
  isLiked?: boolean
  onLike?: () => void
  onClick?: () => void
}

export default function ContentCard({
  id,
  imageEmoji,
  image_content,
  title,
  author,
  likes,
  isLiked = false,
  onLike,
  onClick,
}: ContentCardProps) {
  // 使用 id 来确定性地选择颜色
  const bgColor = useMemo(() => {
    const index = parseInt(id, 10) % BG_COLORS.length
    return BG_COLORS[index]
  }, [id])

  return (
    <div 
      className="group flex flex-col justify-between rounded-2xl overflow-hidden bg-white hover:bg-gray-50 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer border border-gray-100 min-h-[300px]"
      onClick={onClick}
    >
      {/* 封面区域 */}
      <div className="relative aspect-[4/3] bg-gray-50 mb-0">
        {/* 空白背景 */}
        <div className="absolute inset-0 bg-white" />
        
        {/* 内容容器 */}
        <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
          {/* Emoji */}
          <div className="text-[60px] leading-none mb-4 opacity-90">
            {imageEmoji}
          </div>
          {/* 大字文本 */}
          <div className="relative inline-block max-w-[90%]">
            <span className={`absolute inset-0 ${bgColor} -rotate-1 block`}></span>
            <span className="relative text-xl font-medium text-gray-900 px-3 py-1 inline-block">
              {image_content}
            </span>
          </div>
        </div>
      </div>

      {/* 内容区域 */}
      <div className="p-3 mt-0">
        {/* 标题 */}
        <h3 className="text-sm text-gray-900 leading-normal mb-2 line-clamp-2">
          {title}
        </h3>

        {/* 作者和点赞信息 */}
        <div className="flex items-center justify-between">
          {/* 作者信息 */}
          <div className="flex items-center gap-1.5">
            <span className="w-4 h-4 flex items-center justify-center text-sm">
              {author.avatar}
            </span>
            <span className="text-xs text-gray-600">
              {author.name}
            </span>
          </div>
          
          {/* 点赞按钮 */}
          <div 
            className="flex items-center gap-1 text-gray-400"
            onClick={(e) => {
              e.stopPropagation();
              onLike?.();
            }}
          >
            {isLiked ? (
              <HeartSolidIcon className="w-3.5 h-3.5 text-red-500" />
            ) : (
              <HeartIcon className="w-3.5 h-3.5" />
            )}
            <span className="text-xs text-gray-400">{likes}</span>
          </div>
        </div>
      </div>
    </div>
  )
} 