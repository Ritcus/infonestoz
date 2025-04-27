
import PostsListing from '@/app/components/postsList/page'
import { getPostsByCategory } from '@/app/api/sanity-api/sanityServices'

export default async function BlogPosts() {
  const posts = await getPostsByCategory('Blog')
  
  return (
    <PostsListing 
      category="Blog" 
      posts={posts}
    />
  )
}
