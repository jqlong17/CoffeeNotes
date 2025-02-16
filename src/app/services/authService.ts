import { supabase } from '@/app/lib/supabase'

export const authService = {
  // 使用邮箱密码注册
  async signUp(email: string, password: string) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password
    })

    if (error) {
      if (error.message.includes('User already registered')) {
        throw new Error('该邮箱已注册，请直接登录')
      }
      throw error
    }

    if (!data.user) {
      throw new Error('注册失败，请重试')
    }

    return data
  },

  // 使用邮箱密码登录
  async signIn(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })

    if (error) {
      if (error.message.includes('Invalid login credentials')) {
        throw new Error('邮箱或密码错误')
      }
      throw error
    }

    if (!data.user || !data.session) {
      throw new Error('登录失败，请重试')
    }

    return data
  },

  // 使用 Google 登录
  async signInWithGoogle() {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`
        }
      })
      
      if (error) throw error
      return { data, error: null }
    } catch (error) {
      console.error('Google 登录失败:', error)
      return { data: null, error }
    }
  },

  // 退出登录
  async signOut() {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error
      return { error: null }
    } catch (error) {
      console.error('退出登录失败:', error)
      return { error }
    }
  },

  // 获取会话
  async getSession() {
    try {
      const { data: { session }, error } = await supabase.auth.getSession()
      if (error) throw error
      return { session, error: null }
    } catch (error) {
      console.error('获取会话失败:', error)
      return { session: null, error }
    }
  }
} 