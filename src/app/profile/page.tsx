'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { authService } from '@/app/services/authService'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

interface UserInfo {
  email: string
  created_at: string
}

export default function ProfilePage() {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser()
        if (user) {
          setUserInfo({
            email: user.email || '',
            created_at: user.created_at
          })
        }
      } catch (error) {
        console.error('获取用户信息失败:', error)
      } finally {
        setIsLoading(false)
      }
    }

    getUserInfo()
  }, [])

  const handleLogout = async () => {
    try {
      await authService.signOut()
      router.push('/login')
    } catch (error) {
      console.error('登出失败:', error)
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-coffee-600"></div>
      </div>
    )
  }

  if (!userInfo) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh]">
        <div className="text-lg font-semibold text-coffee-900 mb-4">未登录</div>
        <Link
          href="/login"
          className="px-4 py-2 text-sm font-medium text-white bg-coffee-600 rounded-md hover:bg-coffee-700 transition-colors"
        >
          去登录
        </Link>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-coffee-900">个人中心</h1>
      </div>
      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="h-16 w-16 rounded-full bg-coffee-100 flex items-center justify-center">
            <span className="text-2xl text-coffee-600">
              {userInfo.email[0].toUpperCase()}
            </span>
          </div>
          <div className="flex-1">
            <div className="text-lg font-semibold text-coffee-900">{userInfo.email}</div>
            <div className="text-sm text-coffee-600">
              注册时间：{new Date(userInfo.created_at).toLocaleString('zh-CN')}
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="px-4 py-2 text-sm font-medium text-white bg-coffee-600 rounded-md hover:bg-coffee-700 transition-colors whitespace-nowrap"
          >
            退出登录
          </button>
        </div>
      </div>
    </div>
  )
} 