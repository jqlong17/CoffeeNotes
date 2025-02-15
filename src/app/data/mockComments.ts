export interface Comment {
  id: string
  author: {
    name: string
    avatar: string
  }
  content: string
  time: string
  likes: number
}

export const MOCK_COMMENTS: Comment[] = [
  {
    id: '1',
    author: {
      name: '手冲爱好者',
      avatar: '☕️'
    },
    content: '这个粉水比例确实很关键，我最近用1:15的比例效果不错，但是对于不同产地的豆子可能需要微调。',
    time: '2小时前',
    likes: 15
  },
  {
    id: '2',
    author: {
      name: '咖啡师Alex',
      avatar: '👨‍🍳'
    },
    content: '补充一点，水温对于浅烘焙的豆子建议控制在90-92度，这样可以更好地带出花香和果香。',
    time: '3小时前',
    likes: 28
  },
  {
    id: '3',
    author: {
      name: '烘焙新手',
      avatar: '🔥'
    },
    content: '感谢分享！请问一下，第一次爆裂后要等多久才开始降温比较合适？',
    time: '4小时前',
    likes: 8
  },
  {
    id: '4',
    author: {
      name: '咖啡实验室',
      avatar: '🧪'
    },
    content: '从化学角度来看，这个萃取方法确实能最大程度保留咖啡中的芳香物质，尤其是那些水溶性的化合物。',
    time: '5小时前',
    likes: 42
  },
  {
    id: '5',
    author: {
      name: '器具控',
      avatar: '⚙️'
    },
    content: '用这种方法之前最好确保磨豆机的一致性，我建议用专业一点的磨豆机，起码要确保粒度均匀。',
    time: '6小时前',
    likes: 19
  },
  {
    id: '6',
    author: {
      name: '咖啡农场主',
      avatar: '🌱'
    },
    content: '作为一个种植者，很高兴看到有人这么认真地对待每一杯咖啡。好的冲泡方法才能真正展现出好豆子的品质。',
    time: '8小时前',
    likes: 67
  }
] 