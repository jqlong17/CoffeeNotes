import { createClient } from '@supabase/supabase-js'

if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
  throw new Error('请在 .env.local 文件中设置 NEXT_PUBLIC_SUPABASE_URL')
}

if (!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
  throw new Error('请在 .env.local 文件中设置 NEXT_PUBLIC_SUPABASE_ANON_KEY')
}

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
      storageKey: 'sb-gxojxpnreheldhbtzedb-auth-token',
      storage: {
        getItem: (key) => {
          if (typeof window === 'undefined') {
            return null
          }
          const item = window.localStorage.getItem(key)
          console.log('获取存储项:', { key, value: item })
          return item
        },
        setItem: (key, value) => {
          if (typeof window === 'undefined') {
            return
          }
          console.log('设置存储项:', { key, value })
          window.localStorage.setItem(key, value)
        },
        removeItem: (key) => {
          if (typeof window === 'undefined') {
            return
          }
          console.log('移除存储项:', { key })
          window.localStorage.removeItem(key)
        }
      }
    }
  }
) 