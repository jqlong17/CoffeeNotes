'use client'

import { useState, use, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeftIcon, ShareIcon } from '@heroicons/react/24/outline'
import { HeartIcon, StarIcon } from '@heroicons/react/24/outline'
import { HeartIcon as HeartSolidIcon, StarIcon as StarSolidIcon } from '@heroicons/react/24/solid'
import ReactMarkdown from 'react-markdown'
import { getPostById, type Post, type Author } from '@/app/api/posts'
import { MOCK_COMMENTS } from '@/app/data/mockComments'
import { supabase } from '@/app/lib/supabase'

// 添加处理文本的工具函数
function cleanText(text: string) {
  return text
    .replace(/\\n/g, '\n') // 首先处理转义的换行符
    .replace(/^\*\*"(.*)"\*\*$/g, '$1') // 处理带引号的外层加粗标记
    .replace(/^\*\*(.*)\*\*$/g, '$1') // 处理不带引号的外层加粗标记
    .replace(/\*\*([^*]+)\*\*/g, '$1') // 处理内部的加粗文本
    .replace(/\*\*/g, '') // 处理剩余的 ** 符号
    .replace(/^[""]|[""]$/g, '') // 移除开头和结尾的引号
    .replace(/[""〝〞「」]/g, '') // 移除所有中文引号
    .replace(/["]/g, '') // 移除所有英文引号
    .replace(/\[|\]/g, '') // 移除方括号
    .replace(/['''〈〉《》]/g, '') // 移除所有类型的单引号和箭头符号
    .replace(/^\s+|\s+$/g, '') // 移除首尾空格
    .split('\n')
    .map(line => {
      if (line.startsWith('# ')) {
        return line
          .replace(/^\*\*"(.*)"\*\*$/g, '$1') // 处理带引号的外层加粗标记
          .replace(/^\*\*(.*)\*\*$/g, '$1') // 处理不带引号的外层加粗标记
          .replace(/\*\*([^*]+)\*\*/g, '$1') // 处理内部的加粗文本
          .replace(/\*\*/g, '') // 处理剩余的 ** 符号
          .replace(/^[""]|[""]$/g, '') // 移除开头和结尾的引号
          .replace(/[""〝〞「」]/g, '') // 移除所有中文引号
          .replace(/["]/g, '') // 移除所有英文引号
          .replace(/['''〈〉《》]/g, '') // 移除单引号
      }
      return line
    })
    .join('\n')
}

interface PageProps {
  params: Promise<{
    id: string
  }>
}

export default function PostDetail({ params }: PageProps) {
  const router = useRouter()
  const { id } = use(params)
  const [post, setPost] = useState<Post | null>(null)
  const [author, setAuthor] = useState<Author | null>(null)
  const [loading, setLoading] = useState(true)
  const [isLiked, setIsLiked] = useState(false)
  const [isStarred, setIsStarred] = useState(false)
  const [isFollowing, setIsFollowing] = useState(false)
  const [comment, setComment] = useState('')
  const [likedComments, setLikedComments] = useState<string[]>([])

  useEffect(() => {
    async function loadData() {
      // 获取文章详情
      const postData = await getPostById(id)
      if (postData) {
        // 处理文章内容中的换行符
        postData.article_content = postData.article_content.replace(/\\n/g, '\n')
        // 移除文章内容中的一级标题
        postData.article_content = postData.article_content
          .split('\n')
          .filter(line => !line.startsWith('# '))
          .join('\n')
        // 处理图片描述中的换行符
        postData.image_content = postData.image_content.replace(/\\n/g, '\n')
        setPost(postData)

        // 获取作者信息
        const { data: authorData } = await supabase
          .from('authors')
          .select('*')
          .eq('user_id', postData.user_id)
          .single()
        
        if (authorData) {
          setAuthor(authorData)
        }
      }

      setLoading(false)
    }
    loadData()
  }, [id])
  
  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
    </div>
  }

  if (!post || !author) {
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
        <div className="flex items-center justify-between px-4 h-14">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => router.back()}
              className="p-1 -ml-1 rounded-full hover:bg-gray-100"
            >
              <ArrowLeftIcon className="w-5 h-5 text-gray-700" />
            </button>
            
            {/* 作者信息 */}
            <div className="flex items-center gap-2">
              <div className="text-2xl">{author.avatar}</div>
              <div className="font-medium text-gray-900">{author.name}</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsFollowing(!isFollowing)}
              className={`px-4 py-1 rounded-full text-sm font-medium ${
                isFollowing
                  ? 'bg-gray-200 text-gray-800'
                  : 'bg-gray-800 text-white'
              }`}
            >
              {isFollowing ? '已关注' : '关注'}
            </button>
            <button className="p-2 rounded-full hover:bg-gray-100">
              <ShareIcon className="w-5 h-5 text-gray-700" />
            </button>
          </div>
        </div>
      </div>

      {/* 文章内容 */}
      <div className="max-w-2xl mx-auto px-4 pt-16 pb-20">
        {/* 文章标题 */}
        <h1 className="text-2xl font-bold text-gray-900 mt-6">{cleanText(post.title)}</h1>

        {/* 发布时间 */}
        <div className="mt-2 text-sm text-gray-500">
          {new Date(post.created_at).toLocaleDateString('zh-CN', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        </div>

        {/* 文章配图 */}
        <div className="mt-6 bg-gray-100 rounded-lg p-4">
          <div className="text-4xl mb-2">{post.image_emoji}</div>
          <div className="text-gray-800 whitespace-pre-line">{cleanText(post.image_content)}</div>
        </div>

        {/* 文章正文 */}
        <div className="mt-8 prose prose-slate max-w-none border border-gray-200 rounded-lg p-6">
          <ReactMarkdown>{post.article_content}</ReactMarkdown>
        </div>

        {/* 文章操作栏 */}
        <div className="flex items-center gap-4 mt-8">
          <button
            onClick={() => setIsLiked(!isLiked)}
            className="flex items-center gap-1"
          >
            {isLiked ? (
              <HeartSolidIcon className="w-6 h-6 text-red-500" />
            ) : (
              <HeartIcon className="w-6 h-6 text-gray-500" />
            )}
            <span className="text-sm text-gray-500">{post.likes}</span>
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
          </button>
        </div>

        {/* 评论区 */}
        <div className="mt-8">
          <h2 className="text-lg font-bold text-gray-900">评论</h2>
          
          {/* 评论输入框 */}
          <div className="mt-4 flex gap-2">
            <div className="text-2xl">{author.avatar}</div>
            <div className="flex-1">
              <input
                type="text"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="写下你的评论..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200"
              />
            </div>
          </div>

          {/* 评论列表 */}
          <div className="mt-6 space-y-4 border border-gray-200 rounded-lg p-6">
            {MOCK_COMMENTS.map(comment => (
              <div key={comment.id} className="flex gap-2">
                <div className="text-2xl">{comment.author.avatar}</div>
                <div className="flex-1">
                  <div className="font-medium text-gray-900">{comment.author.name}</div>
                  <div className="mt-1 text-gray-800">{comment.content}</div>
                  <div className="mt-2 flex items-center gap-4">
                    <button
                      onClick={() => handleLikeComment(comment.id)}
                      className="flex items-center gap-1"
                    >
                      {likedComments.includes(comment.id) ? (
                        <HeartSolidIcon className="w-4 h-4 text-red-500" />
                      ) : (
                        <HeartIcon className="w-4 h-4 text-gray-500" />
                      )}
                      <span className="text-sm text-gray-500">{comment.likes}</span>
                    </button>
                    <span className="text-sm text-gray-500">
                      {comment.time}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
} 