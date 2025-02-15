// 定义表单数据类型
export interface RoastingFormData {
  // 生豆信息
  beanName: string
  origin: string
  process: string
  // 烘焙参数
  weight: number
  moisture: number
  roastLevel: string
  firstCrackTime: string
  secondCrackTime: string
  totalTime: string
  roastingMethod: string
  // 烘焙日期
  roastingDate: string
  // 其他
  notes: string
  bean?: string
  level?: string
  date?: string
  device?: string
  environment?: string
  note?: string
}

// 定义失重率数据点类型
export interface WeightLossPoint {
  time: number // 秒数
  weight: number // 当前重量
  lossRate: number // 失重率
  tag?: string // 标签
}

// 定义温度数据点类型
export interface TemperaturePoint {
  time: number // 秒数
  temperature: number // 温度
  tag?: string // 标签
}

// 定义记录模式类型
export type RecordMode = 'temperature' | 'weightLoss'

// 处理法选项
export const PROCESS_OPTIONS = ['日晒', '水洗', '蜜处理', '厌氧发酵', '其他'] as const

// 烘焙度选项
export const ROAST_LEVEL_OPTIONS = ['浅烘', '中浅烘', '中烘', '中深烘', '深烘'] as const

// 烘焙方式选项
export const ROASTING_METHOD_OPTIONS = ['手网烘焙', '鼓风烘焙机', '其他'] as const

// 预设标签选项
export const ROASTING_TAGS = [
  '转黄',
  '脱水结束',
  '一爆开始',
  '一爆结束',
  '二爆开始',
  '二爆结束',
  '自定义',
] as const

// 色值评估
export interface ColorAssessment {
  beanSurface: number  // 豆表色值
  beanCore: number     // 豆芯色值
}

// 风味评估
export interface TasteAssessment {
  aroma: number        // 香气
  acidity: number      // 酸度
  sweetness: number    // 甜度
  body: number         // 醇度
  aftertaste: number   // 余韵
  balance: number      // 平衡度
  overall: number      // 整体评分
  notes: string        // 风味描述
}

// 完整的烘焙结果评估
export interface RoastingAssessment {
  color: ColorAssessment
  taste: TasteAssessment
  createdAt: string
}

// 完整的烘焙记录
export interface RoastingRecord {
  id?: string
  // 基础信息
  basic_info: RoastingFormData
  // 曲线数据
  curve_data: {
    weightLossPoints: WeightLossPoint[]
    temperaturePoints: TemperaturePoint[]
    targetLossRate: number
  }
  // 评估结果
  assessment: RoastingAssessment
  // 记录时间
  created_at: string
  updated_at: string
} 