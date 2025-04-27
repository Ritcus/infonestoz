
import PostsListing from '@/app/components/postsList/page'
import { getPostsByCategory } from '@/app/api/sanity-api/sanityServices'

export default async function NewsPosts() {
  const posts = await getPostsByCategory('News')
  
  return (
    <PostsListing 
      category="News" 
      posts={posts}
    />
  )
}
