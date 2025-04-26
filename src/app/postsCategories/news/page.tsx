
import PostsListing from '@/app/components/postsList/page'
import { getPostsByCategory } from '@/data/posts'

export default function NewsPosts() {
  const posts = getPostsByCategory('News')
  
  return (
    <PostsListing 
      category="News" 
      posts={posts}
    />
  )
}
