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
}

export const MOCK_POSTS: Post[] = [
  {
    id: '1',
    imageEmoji: '☕️',
    image_content: '完美手冲从这里开始',
    title: '完美V60手冲技巧：从粉水比到注水方式的详细指南',
    author: {
      name: '咖啡师小王',
      avatar: '👨‍🍳'
    },
    likes: 892,
  },
  {
    id: '2',
    imageEmoji: '🫘',
    image_content: '日晒耶加的秘密',
    title: '埃塞俄比亚耶加雪菲：带你认识这款传奇咖啡豆的独特风味',
    author: {
      name: '豆叔评鉴',
      avatar: '🧔'
    },
    likes: 1247,
  },
  {
    id: '3',
    imageEmoji: '🏠',
    image_content: '藏在巷子里的惊喜',
    title: '探店｜京都町屋里的极简咖啡馆：传统与现代的完美融合',
    author: {
      name: '咖啡馆主理人',
      avatar: '👩‍💼'
    },
    likes: 673,
  },
  {
    id: '4',
    imageEmoji: '🎨',
    image_content: '3D立体拉花教程',
    title: '如何制作ins风超火的小熊拉花：从基础到进阶的详细步骤',
    author: {
      name: '拉花师阿杰',
      avatar: '👨‍🎨'
    },
    likes: 1589,
  },
  {
    id: '5',
    imageEmoji: '⚗️',
    image_content: '复刻1950手摇磨豆机',
    title: '老物件｜重现半世纪前的咖啡器具：手摇磨豆机的前世今生',
    author: {
      name: '器具控丁丁',
      avatar: '🔧'
    },
    likes: 438,
  },
  {
    id: '6',
    imageEmoji: '❓',
    image_content: '为什么豆子有白点？',
    title: '新手疑问：咖啡豆表面出现白色斑点是怎么回事？是发霉了吗？',
    author: {
      name: '好奇宝宝',
      avatar: '🤔'
    },
    likes: 246,
  },
  {
    id: '7',
    imageEmoji: '🔥',
    image_content: '浅烘焙的完美曲线',
    title: '烘焙经验｜如何通过调整温度曲线来突出咖啡豆的花香风味',
    author: {
      name: '烘焙师老张',
      avatar: '👨‍🔧'
    },
    likes: 892,
  },
  {
    id: '8',
    imageEmoji: '🏗️',
    image_content: '极简风的咖啡角',
    title: '设计案例｜如何在10平米的空间打造一个温馨的咖啡角',
    author: {
      name: '设计师小美',
      avatar: '👩‍🎨'
    },
    likes: 735,
  },
  {
    id: '9',
    imageEmoji: '📚',
    image_content: '蓝山咖啡的前世今生',
    title: '咖啡文化｜蓝山咖啡为什么这么贵：深度解析其历史与价值',
    author: {
      name: '咖啡文化研究所',
      avatar: '👨‍🏫'
    },
    likes: 1023,
  },
  {
    id: '10',
    imageEmoji: '🏺',
    image_content: '手工陶艺咖啡杯',
    title: '器皿｜传统窑变釉工艺在现代咖啡杯设计中的运用',
    author: {
      name: '陶艺师小林',
      avatar: '🎨'
    },
    likes: 567,
  },
  {
    id: '11',
    imageEmoji: '🍵',
    image_content: '舌尖上的咖啡冒险',
    title: '咖啡品鉴入门：如何识别和欣赏不同的咖啡风味',
    author: {
      name: '风味实验室',
      avatar: '🧪'
    },
    likes: 673,
  },
  {
    id: '12',
    imageEmoji: '🎨',
    image_content: '一杯拿铁就是艺术',
    title: '拉花艺术：从心形到郁金香的进阶技巧详解',
    author: {
      name: '拿铁艺术家',
      avatar: '👩‍🎨'
    },
    likes: 1508,
  },
  {
    id: '13',
    imageEmoji: '🔥',
    image_content: '掌控火候的秘密',
    title: '咖啡烘焙的艺术：如何掌控火候打造完美口感',
    author: {
      name: '烘焙师阿杰',
      avatar: '👨‍🔧'
    },
    likes: 962,
  },
  {
    id: '14',
    imageEmoji: '🗺️',
    image_content: '寻味安第斯山脉',
    title: '哥伦比亚咖啡产区指南：从安第斯山脉到您的咖啡杯',
    author: {
      name: '咖啡地理',
      avatar: '🌎'
    },
    likes: 845,
  },
  {
    id: '15',
    imageEmoji: '📦',
    image_content: '留住咖啡豆的芳香',
    title: '咖啡豆的最佳保存方法：让咖啡豆持久保持新鲜',
    author: {
      name: '咖啡研究所',
      avatar: '🔬'
    },
    likes: 721,
  },
  {
    id: '16',
    imageEmoji: '💨',
    image_content: '浓缩咖啡的灵魂',
    title: '完美意式浓缩：萃取参数精确控制指南',
    author: {
      name: '浓缩咖啡师',
      avatar: '👨‍🏭'
    },
    likes: 1103,
  },
  {
    id: '17',
    imageEmoji: '⚙️',
    image_content: '磨豆机的选择指南',
    title: '磨豆机选购指南：从入门到专业的全方位解析',
    author: {
      name: '器具控',
      avatar: '🔧'
    },
    likes: 892,
  },
  {
    id: '18',
    imageEmoji: '💧',
    image_content: '好水才有好咖啡',
    title: '水质对咖啡风味的影响：如何选择最佳冲泡水',
    author: {
      name: '咖啡科学家',
      avatar: '👨‍🔬'
    },
    likes: 634,
  },
  {
    id: '19',
    imageEmoji: '🌱',
    image_content: '肯尼亚的咖啡日记',
    title: '探访肯尼亚咖啡庄园：一杯好咖啡的起源',
    author: {
      name: '咖啡猎人',
      avatar: '🎯'
    },
    likes: 1432,
  },
  {
    id: '20',
    imageEmoji: '🧊',
    image_content: '夏日冷萃解暑指南',
    title: '冷萃咖啡完全指南：在家制作清爽醇厚的冷萃',
    author: {
      name: '冷萃专家',
      avatar: '🧊'
    },
    likes: 756,
  },
  {
    id: '21',
    imageEmoji: '🌡️',
    image_content: '从浅到深的风味',
    title: '从浅焙到深焙：不同烘焙度对咖啡风味的影响',
    author: {
      name: '烘焙工坊',
      avatar: '👨‍🍳'
    },
    likes: 891,
  },
  {
    id: '22',
    imageEmoji: '🏺',
    image_content: '千年咖啡仪式感',
    title: '探索埃塞俄比亚咖啡仪式：传统与现代的完美融合',
    author: {
      name: '咖啡文化',
      avatar: '📚'
    },
    likes: 567,
  },
  {
    id: '23',
    imageEmoji: '🔍',
    image_content: '挑选完美咖啡豆',
    title: '咖啡豆品质鉴别：如何识别和避免常见缺陷豆',
    author: {
      name: '品控专家',
      avatar: '👁️'
    },
    likes: 823,
  },
  {
    id: '24',
    imageEmoji: '🎯',
    image_content: '调配大师的秘方',
    title: '咖啡豆调配的艺术：如何创造专属咖啡配方',
    author: {
      name: '调配大师',
      avatar: '🎨'
    },
    likes: 945,
  },
  {
    id: '25',
    imageEmoji: '🏆',
    image_content: '冠军咖啡师的配方',
    title: 'AeroPress冲煮技巧：咖啡大师赛获奖配方分享',
    author: {
      name: '器具达人',
      avatar: '🏆'
    },
    likes: 1267,
  },
  {
    id: '26',
    imageEmoji: '📝',
    image_content: '读懂咖啡豆密码',
    title: '咖啡包装上的秘密：如何读懂咖啡豆标签信息',
    author: {
      name: '咖啡知识库',
      avatar: '📚'
    },
    likes: 678,
  },
  {
    id: '27',
    imageEmoji: '🧪',
    image_content: '酸质背后的故事',
    title: '理解咖啡酸质：从化学视角解析咖啡风味',
    author: {
      name: '咖啡实验室',
      avatar: '👨‍🔬'
    },
    likes: 789,
  },
  {
    id: '28',
    imageEmoji: '🏪',
    image_content: '开一家理想咖啡馆',
    title: '特色咖啡馆经营之道：从设备选择到服务细节',
    author: {
      name: '咖啡创业者',
      avatar: '👨‍💼'
    },
    likes: 1156,
  },
] 