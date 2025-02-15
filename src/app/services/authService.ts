import { supabase } from '@/lib/supabase'

export const authService = {
  // 使用邮箱密码注册
  async signUp(email: string, password: string) {
    console.log('调用 signUp:', { email })
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    })

    if (error) {
      console.error('注册错误:', error)
      if (error.message.includes('User already registered')) {
        throw new Error('该邮箱已注册，请直接登录')
      }
      throw error
    }

    if (!data.user) {
      console.error('注册异常：没有返回用户数据')
      throw new Error('注册失败，请重试')
    }

    console.log('注册成功:', { userId: data.user.id })
    return data
  },

  // 使用邮箱密码登录
  async signIn(email: string, password: string) {
    console.log('调用 signIn:', { email })
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      console.error('登录错误:', error)
      if (error.message.includes('Invalid login credentials')) {
        throw new Error('邮箱或密码错误')
      }
      throw error
    }

    if (!data.user || !data.session) {
      console.error('登录异常：没有返回用户数据或会话')
      throw new Error('登录失败，请重试')
    }

    console.log('登录成功:', { userId: data.user.id })
    return data
  },

  // 登出
  async signOut() {
    const { error } = await supabase.auth.signOut()
    if (error) {
      throw error
    }
  },

  // 获取当前用户
  async getCurrentUser() {
    const { data: { user } } = await supabase.auth.getUser()
    return user
  },

  // 获取会话
  async getSession() {
    const { data: { session } } = await supabase.auth.getSession()
    return session
  }
} 