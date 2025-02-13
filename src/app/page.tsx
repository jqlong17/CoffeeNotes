import { BeakerIcon, BookOpenIcon, UserIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'

const features = [
  {
    name: '咖啡资讯',
    description: 'AI 生成的咖啡相关内容，包括资讯文章、知识卡片、评测和食谱。',
    href: '/news',
    icon: BookOpenIcon,
  },
  {
    name: '工具箱',
    description: '实用的咖啡工具，包括计时器、手冲记录和烘焙记录。',
    href: '/tools',
    icon: BeakerIcon,
  },
  {
    name: '个人中心',
    description: '管理你的咖啡偏好、订阅话题和浏览历史记录。',
    href: '/profile',
    icon: UserIcon,
  },
]

export default function HomePage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-coffee-900">咖啡资讯</h1>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {/* 资讯卡片占位 */}
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="aspect-[3/4] animate-pulse rounded-2xl bg-white p-4"
          />
        ))}
      </div>
    </div>
  )
}
