import { HeartIcon } from '@heroicons/react/24/outline'
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid'

interface ContentCardProps {
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
  imageEmoji,
  image_content,
  title,
  author,
  likes,
  isLiked = false,
  onLike,
  onClick,
}: ContentCardProps) {
  return (
    <div 
      className="group flex flex-col rounded-2xl overflow-hidden bg-white hover:bg-gray-50 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer border border-gray-100"
      onClick={onClick}
    >
      {/* 封面区域 */}
      <div className="relative aspect-[4/3] bg-gray-50">
        {/* 空白背景 */}
        <div className="absolute inset-0 bg-white" />
        
        {/* 内容容器 */}
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
          {/* Emoji */}
          <div className="text-[100px] leading-none mb-6 opacity-90">
            {imageEmoji}
          </div>
          {/* 大字文本 */}
          <div className="relative inline-block">
            <span className="absolute inset-0 bg-yellow-100/80 -rotate-1 block"></span>
            <span className="relative text-2xl font-medium text-gray-900 px-4 py-1.5 inline-block">
              {image_content}
            </span>
          </div>
        </div>
      </div>

      {/* 内容区域 */}
      <div className="p-4">
        {/* 标题 */}
        <h3 className="text-base text-gray-900 leading-normal mb-3">
          {title}
        </h3>

        {/* 作者和点赞信息 */}
        <div className="flex items-center justify-between">
          {/* 作者信息 */}
          <div className="flex items-center gap-2">
            <span className="w-5 h-5 flex items-center justify-center text-sm">
              {author.avatar}
            </span>
            <span className="text-sm text-gray-600">
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
              <HeartSolidIcon className="w-4 h-4 text-red-500" />
            ) : (
              <HeartIcon className="w-4 h-4" />
            )}
            <span className="text-sm text-gray-400">{likes}</span>
          </div>
        </div>
      </div>
    </div>
  )
} 