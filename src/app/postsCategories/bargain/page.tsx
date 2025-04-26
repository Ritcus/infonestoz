
import PostsListing from '@/app/components/postsList/page'
import { getPostsByCategory } from '@/data/posts'


export default function BargainPosts() {
  const posts = getPostsByCategory('Bargain')
  
  return (
    <PostsListing 
      category="Bargain" 
      posts={posts}
    />
  )
}
