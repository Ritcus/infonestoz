import { Post } from "@/types/post";

export function getPostsByDateLatest(posts: Post[]): Post[] {
    return [...posts]
      .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
  }