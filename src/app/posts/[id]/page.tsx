'use client'

import { useState, use } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeftIcon, ShareIcon } from '@heroicons/react/24/outline'
import { HeartIcon, StarIcon, ChatBubbleLeftIcon } from '@heroicons/react/24/outline'
import { HeartIcon as HeartSolidIcon, StarIcon as StarSolidIcon } from '@heroicons/react/24/solid'
import ReactMarkdown from 'react-markdown'
import { MOCK_POSTS } from '@/app/data/mockPosts'
import { MOCK_COMMENTS } from '@/app/data/mockComments'

interface PageProps {
  params: Promise<{
    id: string
  }>
}

export default function PostDetail({ params }: PageProps) {
  const router = useRouter()
  const { id } = use(params)
  const post = MOCK_POSTS.find(p => p.id === id)
  const [isLiked, setIsLiked] = useState(false)
  const [isStarred, setIsStarred] = useState(false)
  const [isFollowing, setIsFollowing] = useState(false)
  const [comment, setComment] = useState('')
  const [likedComments, setLikedComments] = useState<string[]>([])
  
  if (!post) {
    return <div>文章不存在</div>
  }

  const handleLikeComment = (commentId: string) => {
    setLikedComments(prev => 
      prev.includes(commentId)
        ? prev.filter(id => id !== commentId)
        : [...prev, commentId]
    )
  }

  return (
    <div className="min-h-screen bg-white">
      {/* 顶部导航栏 */}
      <div className="fixed top-0 left-0 right-0 bg-white border-b border-gray-100 z-10">
        <div className="flex items-center justify-between px-4 h-12">
          <div className="flex items-center gap-2">
            <button 
              onClick={() => router.back()}
              className="p-1 -ml-1 rounded-full hover:bg-gray-100"
            >
              <ArrowLeftIcon className="w-5 h-5 text-gray-700" />
            </button>
            <span className="w-5 h-5 flex items-center justify-center text-sm">
              {post.author.avatar}
            </span>
            <span className="text-sm text-gray-700">{post.author.name}</span>
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsFollowing(!isFollowing)}
              className={`px-4 py-1 rounded-full text-sm border ${
                isFollowing 
                  ? 'border-gray-200 text-gray-600' 
                  : 'border-pink-500 text-pink-500'
              }`}
            >
              {isFollowing ? '已关注' : '关注'}
            </button>
            <button className="p-1 rounded-full hover:bg-gray-100">
              <ShareIcon className="w-5 h-5 text-gray-700" />
            </button>
          </div>
        </div>
      </div>

      {/* 内容区域 */}
      <div className="pt-12 pb-32">
        {/* 标题 */}
        <div className="px-4 py-4">
          <h1 className="text-xl font-bold text-gray-900">{post.title}</h1>
          <div className="mt-2 text-sm text-gray-500">
            1/15
          </div>
        </div>

        {/* 封面区域 */}
        <div className="relative aspect-[4/3] bg-gray-50 mx-4">
          {/* 空白背景 */}
          <div className="absolute inset-0 bg-white border border-gray-100 rounded-xl shadow-sm" />
          
          {/* 内容容器 */}
          <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
            {/* Emoji */}
            <div className="text-[140px] leading-none mb-8 opacity-90">
              {post.imageEmoji}
            </div>
            {/* 大字文本 */}
            <div className="relative inline-block">
              <span className="absolute inset-0 bg-yellow-100/80 -rotate-1 block"></span>
              <span className="relative text-4xl font-medium text-gray-900 px-6 py-2 inline-block whitespace-pre-line">
                {post.image_content}
              </span>
            </div>
          </div>
        </div>

        {/* 文章内容 */}
        <div className="px-4 py-6">
          <article className="prose prose-sm max-w-none prose-headings:font-medium prose-h1:text-xl prose-h2:text-lg prose-h3:text-base prose-p:text-gray-700 prose-p:leading-relaxed prose-a:text-coffee-600 prose-blockquote:text-gray-500 prose-blockquote:border-coffee-200 prose-strong:text-gray-700 prose-code:text-coffee-600 prose-pre:bg-gray-50 prose-pre:text-sm border border-gray-100 rounded-xl p-6 shadow-sm bg-white">
            <ReactMarkdown>{post.article_content}</ReactMarkdown>
          </article>
        </div>

        {/* 评论区 */}
        <div className="mt-6 mx-4">
          <div className="border border-gray-100 rounded-xl shadow-sm bg-white">
            <div className="px-4 py-4 border-b border-gray-100">
              <h2 className="text-base font-medium text-gray-900">
                共 {MOCK_COMMENTS.length} 条评论
              </h2>
            </div>
            
            <div className="divide-y divide-gray-100">
              {MOCK_COMMENTS.map(comment => (
                <div key={comment.id} className="px-4 py-4">
                  {/* 评论头部 */}
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-2">
                      <span className="w-8 h-8 flex items-center justify-center text-lg bg-gray-50 rounded-full">
                        {comment.author.avatar}
                      </span>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium text-gray-900">
                            {comment.author.name}
                          </span>
                          <span className="text-xs text-gray-500">
                            {comment.time}
                          </span>
                        </div>
                        <p className="mt-1 text-sm text-gray-700">
                          {comment.content}
                        </p>
                      </div>
                    </div>
                    
                    <button
                      onClick={() => handleLikeComment(comment.id)}
                      className="flex items-center gap-1 p-1"
                    >
                      {likedComments.includes(comment.id) ? (
                        <HeartSolidIcon className="w-4 h-4 text-red-500" />
                      ) : (
                        <HeartIcon className="w-4 h-4 text-gray-400" />
                      )}
                      <span className="text-xs text-gray-500">
                        {comment.likes + (likedComments.includes(comment.id) ? 1 : 0)}
                      </span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 底部互动区域 */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100">
        <div className="flex items-center justify-between px-4 h-12">
          {/* 评论输入框 */}
          <div className="flex-1 max-w-[200px]">
            <input
              type="text"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="说点什么..."
              className="w-full h-8 px-3 text-sm bg-gray-100 rounded-full focus:outline-none focus:ring-1 focus:ring-coffee-500"
            />
          </div>

          {/* 互动按钮 */}
          <div className="flex items-center gap-6">
            <button 
              onClick={() => setIsLiked(!isLiked)}
              className="flex items-center gap-1"
            >
              {isLiked ? (
                <HeartSolidIcon className="w-6 h-6 text-red-500" />
              ) : (
                <HeartIcon className="w-6 h-6 text-gray-500" />
              )}
              <span className="text-sm text-gray-600">{post.likes}</span>
            </button>

            <button 
              onClick={() => setIsStarred(!isStarred)}
              className="flex items-center gap-1"
            >
              {isStarred ? (
                <StarSolidIcon className="w-6 h-6 text-yellow-500" />
              ) : (
                <StarIcon className="w-6 h-6 text-gray-500" />
              )}
              <span className="text-sm text-gray-600">1644</span>
            </button>

            <button className="flex items-center gap-1">
              <ChatBubbleLeftIcon className="w-6 h-6 text-gray-500" />
              <span className="text-sm text-gray-600">{MOCK_COMMENTS.length}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
} 