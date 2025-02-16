import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabase = createClient(supabaseUrl, supabaseKey)

export interface Author {
  user_id: string
  name: string
  avatar: string
  created_at: string
  updated_at: string
}

export interface Post {
  article_id: string
  user_id: string
  title: string
  image_emoji: string
  image_content: string
  article_content: string
  likes: number
  created_at: string
  updated_at: string
}

export async function getPosts() {
  const { data: posts, error } = await supabase
    .from('posts')
    .select(`
      article_id,
      user_id,
      title,
      image_emoji,
      image_content,
      likes,
      created_at
    `)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching posts:', error)
    return []
  }

  return posts as Post[]
}

export async function updatePostLikes(postId: string, likes: number) {
  const { error } = await supabase
    .from('posts')
    .update({ likes })
    .eq('article_id', postId)

  if (error) {
    console.error('Error updating post likes:', error)
    return false
  }

  return true
}

export async function getPostById(articleId: string) {
  const { data: post, error } = await supabase
    .from('posts')
    .select('*')
    .eq('article_id', articleId)
    .single()

  if (error) {
    console.error('Error fetching post:', error)
    return null
  }

  return post as Post
} 