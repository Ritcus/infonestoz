import { Post } from "@/types/post";
import { useRouter } from "next/navigation";

// utils/navigatePost.ts
export function usePostNavigation() {
  const router = useRouter();
  // Store the post data in sessionStorage
  
  // Navigate to the post page with the category as a query parameter

  const navigateToPost = (post: Post) => {
    sessionStorage.setItem(`post_${post._id}`, JSON.stringify(post));

    console.log("Sending Post",post);
    
    router.push(`/post/${post._id}`);
  };

  return { navigateToPost };
}