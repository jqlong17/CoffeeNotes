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
    <main>
      <div className="container mx-auto p-4">
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
          {tools.map((tool) => (
            <Link
              key={tool.name}
              href={tool.href}
              className="flex flex-col gap-4 rounded-xl border border-coffee-200 bg-white p-4 hover:border-coffee-300 hover:shadow-lg transition-all duration-200"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-coffee-50">
                <tool.icon className="h-5 w-5 text-coffee-600" />
              </div>
              <div>
                <h2 className="text-base font-semibold text-coffee-900">{tool.name}</h2>
                <p className="mt-2 text-sm text-coffee-600">{tool.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  )
} 