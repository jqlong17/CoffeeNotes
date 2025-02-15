import { createServerClient } from '@supabase/ssr'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  console.log('中间件开始处理请求:', req.nextUrl.pathname)
  const res = NextResponse.next()
  
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          const cookie = req.cookies.get(name)
          console.log('获取 cookie:', { name, value: cookie?.value })
          return cookie?.value
        },
        set(name: string, value: string, options: { path: string; maxAge?: number; domain?: string; sameSite?: string }) {
          console.log('设置 cookie:', { name, value, options })
          res.cookies.set({
            name,
            value,
            ...options,
            secure: process.env.NODE_ENV === 'production',
            httpOnly: true,
            sameSite: 'lax'
          })
        },
        remove(name: string, options: { path: string }) {
          console.log('删除 cookie:', { name, options })
          res.cookies.set({
            name,
            value: '',
            ...options,
            maxAge: -1
          })
        }
      }
    }
  )

  // 尝试从请求头中获取认证信息
  const authHeader = req.headers.get('authorization')
  if (authHeader) {
    console.log('从请求头获取到认证信息')
    const token = authHeader.replace('Bearer ', '')
    await supabase.auth.setSession({
      access_token: token,
      refresh_token: ''
    })
  }

  // 尝试从 cookie 中获取会话信息
  const {
    data: { session },
  } = await supabase.auth.getSession()

  // 如果没有会话，尝试从 localStorage 中获取 token
  if (!session) {
    const localStorageKey = 'sb-gxojxpnreheldhbtzedb-auth-token'
    const localStorageValue = req.cookies.get(localStorageKey)?.value
    if (localStorageValue) {
      try {
        const parsedValue = JSON.parse(localStorageValue)
        if (parsedValue.access_token) {
          console.log('从 localStorage 获取到 token')
          await supabase.auth.setSession({
            access_token: parsedValue.access_token,
            refresh_token: parsedValue.refresh_token || ''
          })
          const { data: { session: newSession } } = await supabase.auth.getSession()
          if (newSession) {
            console.log('使用 localStorage token 创建新会话成功')
          }
        }
      } catch (error) {
        console.error('解析 localStorage token 失败:', error)
      }
    }
  }
  
  console.log('当前会话状态:', { 
    hasSession: !!session,
    userId: session?.user?.id,
    path: req.nextUrl.pathname 
  })

  // 需要认证的路由
  const protectedRoutes = ['/tools/roasting']

  // 检查当前路由是否需要认证
  const isProtectedRoute = protectedRoutes.some(route => 
    req.nextUrl.pathname.startsWith(route)
  )

  console.log('路由检查:', { 
    isProtectedRoute,
    currentPath: req.nextUrl.pathname
  })

  // 如果是受保护的路由且用户未登录，重定向到登录页
  if (isProtectedRoute && !session) {
    console.log('未登录访问受保护路由，重定向到登录页')
    const redirectUrl = req.nextUrl.clone()
    redirectUrl.pathname = '/login'
    redirectUrl.searchParams.set(`redirectedFrom`, req.nextUrl.pathname)
    return NextResponse.redirect(redirectUrl)
  }

  // 如果用户已登录且访问登录页，重定向到首页
  if (session && req.nextUrl.pathname === '/login') {
    console.log('已登录用户访问登录页，重定向到首页')
    const redirectUrl = req.nextUrl.clone()
    redirectUrl.pathname = '/tools/roasting'
    return NextResponse.redirect(redirectUrl)
  }

  // 设置响应头
  if (session) {
    res.headers.set('x-user-id', session.user.id)
  }

  console.log('中间件处理完成，继续请求')
  return res
}

export const config = {
  matcher: [
    '/tools/:path*',
    '/login',
  ],
} 