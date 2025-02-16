import { supabase } from '@/lib/supabase'
import type { RoastingRecord, RoastingPoint } from '../types'

// 自定义错误类
export class AuthError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'AuthError'
  }
}

// 验证数据并返回警告信息
const validateRecord = (record: Omit<RoastingRecord, 'id' | 'created_at' | 'updated_at'>): string[] => {
  const warnings = []
  if (!record.basic_info.beanName) {
    warnings.push('生豆名称未填写')
  }
  if (!record.basic_info.weight || record.basic_info.weight <= 0) {
    warnings.push('生豆重量未填写或无效')
  }
  return warnings
}

// 检查用户登录状态
const checkAuth = async () => {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    throw new AuthError('请先登录')
  }
  return user
}

export const roastingService = {
  // 保存完整的烘焙记录
  async saveRoastingRecord(record: Omit<RoastingRecord, 'id' | 'created_at' | 'updated_at'>) {
    try {
      const user = await checkAuth()

      // 获取警告信息
      const warnings = validateRecord(record)
      
      const now = new Date().toISOString()
      console.error('正在保存数据:', {
        basic_info: record.basic_info,
        curve_data: record.curve_data,
        assessment: record.assessment
      })

      const { data, error } = await supabase
        .from('roasting_records')
        .insert([
          {
            basic_info: record.basic_info,
            curve_data: record.curve_data,
            assessment: record.assessment,
            created_at: now,
            updated_at: now,
            user_id: user.id
          }
        ])
        .select()

      if (error) {
        console.error('Supabase 错误:', error)
        if (error.code === '42P01') {
          throw new Error('数据表不存在，请确保已创建必要的数据表')
        }
        throw new Error(`保存失败: ${error.message}`)
      }

      if (!data || data.length === 0) {
        throw new Error('保存成功但未返回数据')
      }

      console.error('保存成功:', data[0])
      return {
        data: data[0],
        warnings: warnings.length > 0 ? warnings : undefined
      }
    } catch (error) {
      if (error instanceof AuthError) {
        throw error
      }
      console.error('保存烘焙记录时出错:', error)
      throw error instanceof Error ? error : new Error('未知错误')
    }
  },

  // 更新烘焙记录
  async updateRoastingRecord(id: string, record: Omit<RoastingRecord, 'id' | 'created_at' | 'updated_at'>) {
    try {
      const user = await checkAuth()

      // 获取警告信息
      const warnings = validateRecord(record)
      
      const now = new Date().toISOString()
      const { data, error } = await supabase
        .from('roasting_records')
        .update({
          basic_info: record.basic_info,
          curve_data: record.curve_data,
          assessment: record.assessment,
          updated_at: now
        })
        .eq('id', id)
        .eq('user_id', user.id)
        .select()

      if (error) {
        console.error('Supabase 错误:', error)
        throw new Error(`更新失败: ${error.message}`)
      }

      if (!data || data.length === 0) {
        throw new Error('未找到记录或无权限修改')
      }

      return {
        data: data[0],
        warnings: warnings.length > 0 ? warnings : undefined
      }
    } catch (error) {
      if (error instanceof AuthError) {
        throw error
      }
      console.error('更新烘焙记录时出错:', error)
      throw error instanceof Error ? error : new Error('未知错误')
    }
  },

  // 获取烘焙记录列表
  async getRoastingRecords() {
    try {
      const user = await checkAuth()

      const { data, error } = await supabase
        .from('roasting_records')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Supabase 错误:', error)
        throw new Error(`获取记录失败: ${error.message}`)
      }

      return data || []
    } catch (error) {
      if (error instanceof AuthError) {
        throw error
      }
      console.error('获取烘焙记录列表时出错:', error)
      throw error
    }
  },

  // 获取单个烘焙记录
  async getRoastingRecord(id: string) {
    try {
      const user = await checkAuth()

      const { data, error } = await supabase
        .from('roasting_records')
        .select('*')
        .eq('id', id)
        .eq('user_id', user.id)
        .single()

      if (error) {
        console.error('Supabase 错误:', error)
        throw new Error(`获取记录失败: ${error.message}`)
      }

      if (!data) {
        throw new Error('未找到记录或无权限访问')
      }

      return data
    } catch (error) {
      if (error instanceof AuthError) {
        throw error
      }
      console.error('获取单个烘焙记录时出错:', error)
      throw error
    }
  },

  // 删除烘焙记录
  async deleteRoastingRecord(id: string) {
    try {
      const user = await checkAuth()

      const { error } = await supabase
        .from('roasting_records')
        .delete()
        .eq('id', id)
        .eq('user_id', user.id)

      if (error) {
        console.error('Supabase 错误:', error)
        throw new Error(`删除失败: ${error.message}`)
      }

      return true
    } catch (error) {
      if (error instanceof AuthError) {
        throw error
      }
      console.error('删除烘焙记录时出错:', error)
      throw error instanceof Error ? error : new Error('未知错误')
    }
  },

  // 创建烘焙记录
  async createRoastingRecord(record: Omit<RoastingRecord, 'id' | 'created_at'>) {
    try {
      const { data, error } = await supabase
        .from('roasting_records')
        .insert([record])
        .select()
        .single()

      if (error) throw error
      return { data, error: null }
    } catch (error) {
      console.error('创建烘焙记录失败:', error)
      return { data: null, error }
    }
  },

  // 更新烘焙记录
  async updateRoastingRecord(id: string, record: Partial<RoastingRecord>) {
    try {
      const { data, error } = await supabase
        .from('roasting_records')
        .update(record)
        .eq('id', id)
        .select()
        .single()

      if (error) throw error
      return { data, error: null }
    } catch (error) {
      console.error('更新烘焙记录失败:', error)
      return { data: null, error }
    }
  },

  // 添加烘焙点位
  async addRoastingPoint(point: Omit<RoastingPoint, 'id' | 'created_at'>) {
    try {
      const { data, error } = await supabase
        .from('roasting_points')
        .insert([point])
        .select()
        .single()

      if (error) throw error
      return { data, error: null }
    } catch (error) {
      console.error('添加烘焙点位失败:', error)
      return { data: null, error }
    }
  },

  // 获取烘焙点位列表
  async getRoastingPoints(recordId: string) {
    try {
      const { data, error } = await supabase
        .from('roasting_points')
        .select('*')
        .eq('record_id', recordId)
        .order('created_at', { ascending: true })

      if (error) throw error
      return { data, error: null }
    } catch (error) {
      console.error('获取烘焙点位列表失败:', error)
      return { data: null, error }
    }
  }
} 