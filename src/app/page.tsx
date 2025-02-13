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

export default function Home() {
  return (
    <div className="py-12">
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight text-coffee-900 sm:text-6xl">
          ☕ Coffee Notes
        </h1>
        <p className="mt-6 text-lg leading-8 text-coffee-600">
          一个面向咖啡爱好者的应用，提供咖啡资讯、实用工具和个性化学习体验。
        </p>
      </div>

      <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
        <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
          {features.map((feature) => (
            <Link
              key={feature.name}
              href={feature.href}
              className="group relative flex flex-col rounded-2xl border border-coffee-200 bg-white p-6 hover:border-coffee-300 hover:shadow-lg"
            >
              <dt className="flex items-center gap-x-3 text-lg font-semibold leading-7 text-coffee-900">
                <feature.icon
                  className="h-5 w-5 flex-none text-coffee-600"
                  aria-hidden="true"
                />
                {feature.name}
              </dt>
              <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-coffee-600">
                <p className="flex-auto">{feature.description}</p>
              </dd>
            </Link>
          ))}
        </dl>
      </div>
    </div>
  )
}
