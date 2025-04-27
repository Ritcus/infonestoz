
import PostsListing from '@/app/components/postsList/page'
import { getPostsByCategory } from '@/app/api/sanity-api/sanityServices'

export default async function CommercialPosts() {
  const posts = await getPostsByCategory('Commercial')
  
  return (
    <PostsListing 
      category="Commercial" 
      posts={posts}
    />
  )
}
