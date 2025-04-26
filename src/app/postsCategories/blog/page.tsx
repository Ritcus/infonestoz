
import PostsListing from '@/app/components/postsList/page'
import { getPostsByCategory } from '@/data/posts'

export default function BlogPosts() {
  const posts = getPostsByCategory('Blog')
  
  return (
    <PostsListing 
      category="Blog" 
      posts={posts}
    />
  )
}
