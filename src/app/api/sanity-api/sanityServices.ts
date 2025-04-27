import { Post } from "@/types/post";
import { client } from "../../../../sanity/lib/client";
import { postsQuery } from "@/lib/queries";

export const getAllPosts = async (): Promise<Post[]> => {
    const posts = await client.fetch<Post[]>(postsQuery)
    return posts
  }

  export async function getPostsByCategory(category: string): Promise<Post[]> {
      const data = await getAllPosts();
    return data.filter(data => data.category.toLowerCase() === category.toLowerCase())
    }

