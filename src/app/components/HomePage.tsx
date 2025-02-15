'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import ContentCard from '@/app/components/ContentCard'
import ContentGrid from '@/app/components/ContentGrid'
import { MOCK_POSTS } from '@/app/data/mockPosts'

export default function HomePage() {
  const router = useRouter()
  const [likedPosts, setLikedPosts] = useState<string[]>([])

  const handleLike = (postId: string) => {
    setLikedPosts(prev => 
      prev.includes(postId) 
        ? prev.filter(id => id !== postId)
        : [...prev, postId]
    )
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto">
        <div className="border-b border-coffee-200 bg-white">
          <div className="px-4 py-4">
            <h1 className="text-xl font-semibold text-coffee-900">咖啡笔记</h1>
            <p className="text-sm text-coffee-600 mt-1">发现、学习、分享咖啡的乐趣</p>
          </div>
        </div>
        
        <ContentGrid>
          {MOCK_POSTS.map(post => (
            <ContentCard
              key={post.id}
              imageEmoji={post.imageEmoji}
              image_content={post.image_content}
              title={post.title}
              author={post.author}
              likes={post.likes}
              isLiked={likedPosts.includes(post.id)}
              onLike={() => handleLike(post.id)}
              onClick={() => router.push(`/posts/${post.id}`)}
            />
          ))}
        </ContentGrid>
      </div>
    </main>
  )
} 