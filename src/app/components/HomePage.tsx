'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import ContentCard from '@/app/components/ContentCard'
import ContentGrid from '@/app/components/ContentGrid'
import { getPosts, updatePostLikes, type Post, type Author } from '@/app/api/posts'
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

export default function HomePage() {
  const router = useRouter()
  const [posts, setPosts] = useState<Post[]>([])
  const [authors, setAuthors] = useState<Record<string, Author>>({})
  const [likedPosts, setLikedPosts] = useState<string[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadData() {
      // 获取文章列表
      const postsData = await getPosts()
      setPosts(postsData)

      // 获取所有作者信息
      const { data: authorsData } = await supabase
        .from('authors')
        .select('*')
      
      if (authorsData) {
        // 创建一个以 user_id 为键的作者信息映射
        const authorsMap = authorsData.reduce((acc, author) => ({
          ...acc,
          [author.user_id]: author
        }), {} as Record<string, Author>)
        setAuthors(authorsMap)
      }

      setLoading(false)
    }
    loadData()
  }, [])

  const handleLike = async (postId: string) => {
    const post = posts.find(p => p.article_id === postId)
    if (!post) return

    const newLikes = likedPosts.includes(postId) ? post.likes - 1 : post.likes + 1
    const success = await updatePostLikes(postId, newLikes)
    
    if (success) {
      // 更新本地状态
      setPosts(prev => prev.map(p => 
        p.article_id === postId ? { ...p, likes: newLikes } : p
      ))
      setLikedPosts(prev => 
        prev.includes(postId) 
          ? prev.filter(id => id !== postId)
          : [...prev, postId]
      )
    }
  }

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
    </div>
  }

  return (
    <ContentGrid>
      {posts.map(post => {
        const author = authors[post.user_id]
        if (!author) return null // 如果找不到作者信息，不显示这篇文章

        return (
          <ContentCard
            key={post.article_id}
            id={post.article_id}
            imageEmoji={post.image_emoji}
            image_content={cleanText(post.image_content)}
            title={cleanText(post.title)}
            author={{
              name: author.name,
              avatar: author.avatar
            }}
            likes={post.likes}
            isLiked={likedPosts.includes(post.article_id)}
            onLike={() => handleLike(post.article_id)}
            onClick={() => router.push(`/posts/${post.article_id}`)}
          />
        )
      })}
    </ContentGrid>
  )
} 