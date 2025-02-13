export default function ProfilePage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-coffee-900">个人中心</h1>
      </div>
      <div className="rounded-2xl bg-white p-6">
        <div className="flex items-center gap-4">
          <div className="h-16 w-16 rounded-full bg-coffee-100" />
          <div>
            <div className="text-lg font-semibold text-coffee-900">未登录</div>
            <div className="text-sm text-coffee-600">点击登录账号</div>
          </div>
        </div>
      </div>
    </div>
  )
} 