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
    <ContentGrid>
      {MOCK_POSTS.map(post => (
        <ContentCard
          key={post.id}
          id={post.id}
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
  )
} 