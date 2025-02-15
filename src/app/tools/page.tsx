import {
  ClockIcon,
  BeakerIcon,
  FireIcon,
} from '@heroicons/react/24/outline'
import Link from 'next/link'

const tools = [
  {
    name: '计时器',
    description: '精确计时，支持预设多种冲煮方案。',
    href: '/tools/timer',
    icon: ClockIcon,
  },
  {
    name: '手冲记录',
    description: '记录水温、粉水比、冲煮方法等参数。',
    href: '/tools/brewing',
    icon: BeakerIcon,
  },
  {
    name: '烘焙记录',
    description: '记录烘焙曲线、豆子信息等数据。',
    href: '/tools/roasting',
    icon: FireIcon,
  },
]

export default function ToolsPage() {
  return (
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-3 lg:gap-6 pt-2">
      {tools.map((tool) => (
        <Link
          key={tool.name}
          href={tool.href}
          className="flex flex-col gap-2 lg:gap-4 rounded-xl lg:rounded-2xl border border-coffee-200 bg-white p-3 lg:p-6 hover:border-coffee-300 hover:shadow-lg"
        >
          <div className="flex h-8 w-8 lg:h-12 lg:w-12 items-center justify-center rounded-lg lg:rounded-xl bg-coffee-50">
            <tool.icon className="h-4 w-4 lg:h-6 lg:w-6 text-coffee-600" />
          </div>
          <div>
            <h2 className="text-base lg:text-lg font-semibold text-coffee-900">{tool.name}</h2>
            <p className="mt-1 lg:mt-2 text-xs lg:text-sm text-coffee-600">{tool.description}</p>
          </div>
        </Link>
      ))}
    </div>
  )
} 