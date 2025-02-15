import { supabase } from '@/lib/supabase'
import type { RoastingRecord } from '../types'

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

export const roastingService = {
  // 保存完整的烘焙记录
  async saveRoastingRecord(record: Omit<RoastingRecord, 'id' | 'created_at' | 'updated_at'>) {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        throw new Error('请先登录')
      }

      // 获取警告信息
      const warnings = validateRecord(record)
      
      const now = new Date().toISOString()
      console.log('正在保存数据:', {
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

      console.log('保存成功:', data[0])
      return {
        data: data[0],
        warnings: warnings.length > 0 ? warnings : undefined
      }
    } catch (error) {
      console.error('保存烘焙记录时出错:', error)
      throw error instanceof Error ? error : new Error('未知错误')
    }
  },

  // 更新烘焙记录
  async updateRoastingRecord(id: string, record: Omit<RoastingRecord, 'id' | 'created_at' | 'updated_at'>) {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        throw new Error('请先登录')
      }

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
      console.error('更新烘焙记录时出错:', error)
      throw error instanceof Error ? error : new Error('未知错误')
    }
  },

  // 获取烘焙记录列表
  async getRoastingRecords() {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        throw new Error('请先登录')
      }

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
      console.error('获取烘焙记录列表时出错:', error)
      throw error
    }
  },

  // 获取单个烘焙记录
  async getRoastingRecord(id: string) {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        throw new Error('请先登录')
      }

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
      console.error('获取单个烘焙记录时出错:', error)
      throw error
    }
  },

  // 删除烘焙记录
  async deleteRoastingRecord(id: string) {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        throw new Error('请先登录')
      }

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
      console.error('删除烘焙记录时出错:', error)
      throw error instanceof Error ? error : new Error('未知错误')
    }
  }
} 