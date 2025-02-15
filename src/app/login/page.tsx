'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { authService } from '../services/authService'

export default function LoginPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isSignUp, setIsSignUp] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  // 获取重定向URL
  const getRedirectUrl = () => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search)
      return params.get('redirectedFrom') || '/tools/roasting'
    }
    return '/tools/roasting'
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    console.log('开始登录/注册流程:', { email, isSignUp })

    try {
      let signInResult;
      if (isSignUp) {
        console.log('开始注册...')
        const signUpResult = await authService.signUp(email, password)
        console.log('注册结果:', signUpResult)
        // 注册成功后自动登录
        console.log('注册后开始自动登录...')
        signInResult = await authService.signIn(email, password)
      } else {
        console.log('开始登录...')
        signInResult = await authService.signIn(email, password)
      }

      if (!signInResult?.session?.access_token) {
        throw new Error('登录成功但未获取到访问令牌')
      }

      console.log('认证成功，准备跳转...')
      
      // 获取重定向URL
      const redirectUrl = getRedirectUrl()
      console.log('重定向到:', redirectUrl)

      // 将 token 信息保存到 cookie 中
      const tokenKey = 'sb-gxojxpnreheldhbtzedb-auth-token'
      const tokenValue = JSON.stringify({
        access_token: signInResult.session.access_token,
        refresh_token: signInResult.session.refresh_token,
        expires_at: signInResult.session.expires_at,
        user: signInResult.user
      })
      document.cookie = `${tokenKey}=${encodeURIComponent(tokenValue)}; path=/; max-age=3600; SameSite=Lax`
      console.log('Token 已保存到 cookie')

      // 等待一小段时间确保 token 被正确保存
      await new Promise(resolve => setTimeout(resolve, 100))

      // 使用 window.location 直接跳转，这会导致页面完全重新加载
      window.location.href = redirectUrl
    } catch (err) {
      console.error('认证错误:', err)
      setError(err instanceof Error ? err.message : '操作失败')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-coffee-900">
          {isSignUp ? '注册账号' : '登录账号'}
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-coffee-900">
                邮箱地址
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full appearance-none rounded-md border border-coffee-200 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-coffee-500 focus:outline-none focus:ring-coffee-500"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-coffee-900">
                密码
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full appearance-none rounded-md border border-coffee-200 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-coffee-500 focus:outline-none focus:ring-coffee-500"
                />
              </div>
            </div>

            {error && (
              <div className="rounded-md bg-red-50 p-4">
                <div className="text-sm text-red-700">{error}</div>
              </div>
            )}

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="flex w-full justify-center rounded-md border border-transparent bg-coffee-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-coffee-700 focus:outline-none focus:ring-2 focus:ring-coffee-500 focus:ring-offset-2 disabled:opacity-50"
              >
                {isLoading ? '处理中...' : (isSignUp ? '注册' : '登录')}
              </button>
            </div>
          </form>

          <div className="mt-6">
            <button
              type="button"
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-sm text-coffee-600 hover:text-coffee-500"
            >
              {isSignUp ? '已有账号？点击登录' : '没有账号？点击注册'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
} 