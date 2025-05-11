'use client'
import { useGlobalData } from "@/lib/globalData";
import PostList_Layout from "../components/postlist-layout";
import { Post } from "@/types/post";
import { postsQuery } from "@/lib/queries";

export default function Posts(){
       const { data: posts } = useGlobalData<Post[]>(postsQuery, {
            revalidateIfStale: true,  // Always revalidate if data exists
            revalidateOnMount: true,  // Force fetch even if cache exists
            revalidateOnFocus: false, // Optional: prevent refetch on window focus
          })
    
    return(
        <div>
            <PostList_Layout category="Commercial"  />
        </div>
    )
}