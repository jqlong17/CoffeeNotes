export interface Post {
  id: string
  imageEmoji: string
  image_content: string
  title: string
  author: {
    name: string
    avatar: string
  }
  likes: number
  article_content: string
}

export const MOCK_POSTS: Post[] = [
  {
    id: '1',
    imageEmoji: '☕️',
    image_content: '探索完美手冲咖啡\n从这里开始你的咖啡之旅',
    title: '完美V60手冲技巧：从粉水比到注水方式的详细指南',
    author: {
      name: '咖啡师小王',
      avatar: '👨‍🍳'
    },
    likes: 892,
    article_content: `# 完美V60手冲技巧：从粉水比到注水方式的详细指南

## 引言

手冲咖啡是一门艺术，而V60则是这门艺术中最受欢迎的画笔之一。本文将详细介绍如何使用V60冲出一杯完美的手冲咖啡，从基础设置到进阶技巧，一步步带你掌握要领。

## 基础准备

### 器具清单
- V60滤杯（建议使用02号size）
- V60专用滤纸
- 手冲壶（建议使用细嘴壶）
- 电子秤
- 磨豆机
- 温度计
- 计时器

### 参数设置
- 咖啡粉量：15g
- 水温：88-92℃
- 粉水比：1:15（建议新手从这个比例开始尝试）
- 研磨度：中细（像细砂糖的颗粒大小）

## 详细步骤

### 1. 预热与冲洗滤纸
1. 将滤纸放入V60滤杯
2. 倒入90℃热水冲洗滤纸
3. 这一步可以去除滤纸的纸味，同时预热滤杯

### 2. 研磨咖啡豆
- 选择中细的研磨度
- 确保研磨均匀，避免出现过多粉末

### 3. 注水技巧（总时间约2:30-3:00）

#### 第一段注水（0-30秒）
- 倒入30g热水进行预浸泡
- 使用漩涡式手法让咖啡粉充分湿润
- 等待30秒让咖啡充分膨胀

#### 第二段注水（30-1:30）
- 从中心开始以螺旋方式由内向外注水
- 保持水位稳定，不要让咖啡粉露出水面
- 这个阶段注入总量达到150g

#### 第三段注水（1:30-2:30）
- 继续保持螺旋注水动作
- 将水量补充到225g
- 注意控制水流速度和力度

## 进阶技巧

### 温度控制
- 不同烘焙度的咖啡豆需要不同的水温
- 浅烘焙：90-92℃
- 中烘焙：88-90℃
- 深烘焙：85-88℃

### 注水手法
1. **稳定性**：保持手腕平稳，水流均匀
2. **高度**：壶嘴距离咖啡粉面约3-5cm
3. **节奏**：找到适合的注水速率，保持一致

## 常见问题解决

### 萃取过度
- 症状：苦涩、单调
- 解决方案：
  - 调粗研磨度
  - 缩短萃取时间
  - 降低水温

### 萃取不足
- 症状：酸涩、寡淡
- 解决方案：
  - 调细研磨度
  - 延长萃取时间
  - 提高水温

## 风味调整建议

根据不同产地的咖啡豆特点，可以相应调整参数：
- 非洲豆：适当提高温度，突出花香果酸
- 中南美豆：标准参数，平衡甜感
- 印尼豆：适当降温，突出醇厚度

## 总结

完美的手冲咖啡需要耐心和练习。记住以下关键点：
1. 参数的一致性
2. 注水的稳定性
3. 对细节的关注
4. 持续的记录和调整

通过不断实践和调整，你一定能找到属于自己的完美手冲方式。

> 小贴士：建议准备一个咖啡日志，记录每次冲煮的参数和口感，这样能更快找到最适合的冲煮方案。`
  },
  {
    id: '2',
    imageEmoji: '🫘',
    image_content: '探索日晒耶加雪菲\n感受埃塞俄比亚的阳光味道',
    title: '埃塞俄比亚耶加雪菲：带你认识这款传奇咖啡豆的独特风味',
    author: {
      name: '豆叔评鉴',
      avatar: '🧔'
    },
    likes: 1247,
    article_content: '> 文章内容准备中...'
  },
  {
    id: '3',
    imageEmoji: '🏠',
    image_content: '藏在京都巷子里的惊喜\n传统与现代的完美邂逅',
    title: '探店｜京都町屋里的极简咖啡馆：传统与现代的完美融合',
    author: {
      name: '咖啡馆主理人',
      avatar: '👩‍💼'
    },
    likes: 673,
    article_content: '> 文章内容准备中...'
  },
  {
    id: '4',
    imageEmoji: '🎨',
    image_content: '拉花艺术进阶指南\n让你的咖啡更有格调',
    title: '如何制作ins风超火的小熊拉花：从基础到进阶的详细步骤',
    author: {
      name: '拉花师阿杰',
      avatar: '👨‍🎨'
    },
    likes: 1589,
    article_content: '> 文章内容准备中...'
  },
  {
    id: '5',
    imageEmoji: '⚗️',
    image_content: '复古磨豆机的魅力\n寻找半世纪前的咖啡记忆',
    title: '老物件｜重现半世纪前的咖啡器具：手摇磨豆机的前世今生',
    author: {
      name: '器具控丁丁',
      avatar: '🔧'
    },
    likes: 438,
    article_content: '> 文章内容准备中...'
  },
  {
    id: '6',
    imageEmoji: '❓',
    image_content: '咖啡豆上的白色斑点\n是瑕疵还是特色？',
    title: '新手疑问：咖啡豆表面出现白色斑点是怎么回事？是发霉了吗？',
    author: {
      name: '好奇宝宝',
      avatar: '🤔'
    },
    likes: 246,
    article_content: '> 文章内容准备中...'
  },
  {
    id: '7',
    imageEmoji: '🔥',
    image_content: '掌握浅烘焙的艺术\n让花香在杯中绽放',
    title: '烘焙经验｜如何通过调整温度曲线来突出咖啡豆的花香风味',
    author: {
      name: '烘焙师老张',
      avatar: '👨‍🔧'
    },
    likes: 892,
    article_content: '> 文章内容准备中...'
  },
  {
    id: '8',
    imageEmoji: '🏗️',
    image_content: '打造理想咖啡角落\n让生活更有格调',
    title: '设计案例｜如何在10平米的空间打造一个温馨的咖啡角',
    author: {
      name: '设计师小美',
      avatar: '👩‍🎨'
    },
    likes: 735,
    article_content: '> 文章内容准备中...'
  },
  {
    id: '9',
    imageEmoji: '📚',
    image_content: '探秘蓝山咖啡\n世界顶级咖啡的传奇',
    title: '咖啡文化｜蓝山咖啡为什么这么贵：深度解析其历史与价值',
    author: {
      name: '咖啡文化研究所',
      avatar: '👨‍🏫'
    },
    likes: 1023,
    article_content: '> 文章内容准备中...'
  },
  {
    id: '10',
    imageEmoji: '🏺',
    image_content: '窑变釉的魔法\n一杯有温度的咖啡',
    title: '器皿｜传统窑变釉工艺在现代咖啡杯设计中的运用',
    author: {
      name: '陶艺师小林',
      avatar: '🎨'
    },
    likes: 567,
    article_content: '> 文章内容准备中...'
  },
  {
    id: '11',
    imageEmoji: '🍵',
    image_content: '风味探索之旅\n解锁咖啡的味蕾密码',
    title: '咖啡品鉴入门：如何识别和欣赏不同的咖啡风味',
    author: {
      name: '风味实验室',
      avatar: '🧪'
    },
    likes: 673,
    article_content: '> 文章内容准备中...'
  },
  {
    id: '12',
    imageEmoji: '🎨',
    image_content: '拿铁上的艺术\n用咖啡描绘心情',
    title: '拉花艺术：从心形到郁金香的进阶技巧详解',
    author: {
      name: '拿铁艺术家',
      avatar: '👩‍🎨'
    },
    likes: 1508,
    article_content: '> 文章内容准备中...'
  },
  {
    id: '13',
    imageEmoji: '🔥',
    image_content: '烘焙的温度与时间\n探寻完美烘焙曲线',
    title: '咖啡烘焙的艺术：如何掌控火候打造完美口感',
    author: {
      name: '烘焙师阿杰',
      avatar: '👨‍🔧'
    },
    likes: 962,
    article_content: '> 文章内容准备中...'
  },
  {
    id: '14',
    imageEmoji: '🗺️',
    image_content: '哥伦比亚咖啡之旅\n安第斯山脉的馈赠',
    title: '哥伦比亚咖啡产区指南：从安第斯山脉到您的咖啡杯',
    author: {
      name: '咖啡地理',
      avatar: '🌎'
    },
    likes: 845,
    article_content: '> 文章内容准备中...'
  },
  {
    id: '15',
    imageEmoji: '📦',
    image_content: '咖啡豆的保鲜秘诀\n延续每一颗豆子的生命',
    title: '咖啡豆的最佳保存方法：让咖啡豆持久保持新鲜',
    author: {
      name: '咖啡研究所',
      avatar: '🔬'
    },
    likes: 721,
    article_content: '> 文章内容准备中...'
  },
  {
    id: '16',
    imageEmoji: '💨',
    image_content: '浓缩咖啡的精髓\n完美萃取的艺术',
    title: '完美意式浓缩：萃取参数精确控制指南',
    author: {
      name: '浓缩咖啡师',
      avatar: '👨‍🏭'
    },
    likes: 1103,
    article_content: '> 文章内容准备中...'
  },
  {
    id: '17',
    imageEmoji: '⚙️',
    image_content: '选择理想磨豆机\n研磨出更好的咖啡',
    title: '磨豆机选购指南：从入门到专业的全方位解析',
    author: {
      name: '器具控',
      avatar: '🔧'
    },
    likes: 892,
    article_content: '> 文章内容准备中...'
  },
  {
    id: '18',
    imageEmoji: '💧',
    image_content: '水质决定咖啡品质\n寻找最佳咖啡伴侣',
    title: '水质对咖啡风味的影响：如何选择最佳冲泡水',
    author: {
      name: '咖啡科学家',
      avatar: '👨‍🔬'
    },
    likes: 634,
    article_content: '> 文章内容准备中...'
  },
  {
    id: '19',
    imageEmoji: '🌱',
    image_content: '肯尼亚咖啡庄园\n非洲大地的馈赠',
    title: '探访肯尼亚咖啡庄园：一杯好咖啡的起源',
    author: {
      name: '咖啡猎人',
      avatar: '🎯'
    },
    likes: 1432,
    article_content: '> 文章内容准备中...'
  },
  {
    id: '20',
    imageEmoji: '🧊',
    image_content: '夏日冷萃咖啡指南\n清爽醇厚的双重享受',
    title: '冷萃咖啡完全指南：在家制作清爽醇厚的冷萃',
    author: {
      name: '冷萃专家',
      avatar: '🧊'
    },
    likes: 756,
    article_content: '> 文章内容准备中...'
  },
  {
    id: '21',
    imageEmoji: '🌡️',
    image_content: '烘焙度的奥秘\n从浅到深的风味变化',
    title: '从浅焙到深焙：不同烘焙度对咖啡风味的影响',
    author: {
      name: '烘焙工坊',
      avatar: '👨‍🍳'
    },
    likes: 891,
    article_content: '> 文章内容准备中...'
  },
  {
    id: '22',
    imageEmoji: '🏺',
    image_content: '埃塞俄比亚咖啡仪式\n千年传统的魅力',
    title: '探索埃塞俄比亚咖啡仪式：传统与现代的完美融合',
    author: {
      name: '咖啡文化',
      avatar: '📚'
    },
    likes: 567,
    article_content: '> 文章内容准备中...'
  },
  {
    id: '23',
    imageEmoji: '🔍',
    image_content: '咖啡豆品质鉴别\n挑选每一颗完美豆子',
    title: '咖啡豆品质鉴别：如何识别和避免常见缺陷豆',
    author: {
      name: '品控专家',
      avatar: '👁️'
    },
    likes: 823,
    article_content: '> 文章内容准备中...'
  },
  {
    id: '24',
    imageEmoji: '🎯',
    image_content: '咖啡豆的黄金配比\n创造专属咖啡风味',
    title: '咖啡豆调配的艺术：如何创造专属咖啡配方',
    author: {
      name: '调配大师',
      avatar: '🎨'
    },
    likes: 945,
    article_content: '> 文章内容准备中...'
  },
  {
    id: '25',
    imageEmoji: '🏆',
    image_content: '冠军咖啡师的秘方\nAeroPress的无限可能',
    title: 'AeroPress冲煮技巧：咖啡大师赛获奖配方分享',
    author: {
      name: '器具达人',
      avatar: '🏆'
    },
    likes: 1267,
    article_content: '> 文章内容准备中...'
  },
  {
    id: '26',
    imageEmoji: '📝',
    image_content: '咖啡包装解码指南\n认识你的每一杯咖啡',
    title: '咖啡包装上的秘密：如何读懂咖啡豆标签信息',
    author: {
      name: '咖啡知识库',
      avatar: '📚'
    },
    likes: 678,
    article_content: '> 文章内容准备中...'
  },
  {
    id: '27',
    imageEmoji: '🧪',
    image_content: '咖啡中的化学奥秘\n解密酸质的来源',
    title: '理解咖啡酸质：从化学视角解析咖啡风味',
    author: {
      name: '咖啡实验室',
      avatar: '👨‍🔬'
    },
    likes: 789,
    article_content: '> 文章内容准备中...'
  },
  {
    id: '28',
    imageEmoji: '🏪',
    image_content: '特色咖啡馆创业指南\n打造理想咖啡空间',
    title: '特色咖啡馆经营之道：从设备选择到服务细节',
    author: {
      name: '咖啡创业者',
      avatar: '👨‍💼'
    },
    likes: 1156,
    article_content: '> 文章内容准备中...'
  },
] 