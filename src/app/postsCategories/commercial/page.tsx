
import PostsListing from '@/app/components/postsList/page'
import { getPostsByCategory } from '@/data/posts'

export default function CommercialPosts() {
  const posts = getPostsByCategory('Commercial')
  
  return (
    <PostsListing 
      category="Commercial" 
      posts={posts}
    />
  )
}
