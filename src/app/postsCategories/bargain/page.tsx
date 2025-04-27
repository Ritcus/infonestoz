
import { getPostsByCategory } from '@/app/api/sanity-api/sanityServices'
import PostsListing from '@/app/components/postsList/page'


export default async function BargainPosts() {
  const posts = await getPostsByCategory('Bargain')
  
  return (
    <PostsListing 
      category="Bargain" 
      posts={posts}
    />
  )
}
