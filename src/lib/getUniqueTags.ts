import { TagsWithCount } from "@/types/TagsWithCount";

const getUniqueTags = (posts: { tags: string[] }[]): TagsWithCount[] => {
  if (!posts || !Array.isArray(posts)) return [];

  // Count all tag occurrences
  const tagCounts = new Map<string, number>();
  console.log(posts);
  posts.forEach((post) => {
    post.tags?.forEach((tagName) => {
      tagCounts.set(tagName, (tagCounts.get(tagName) || 0) + 1);
    });
  });

  // Convert to sorted array (most frequent first)
  return Array.from(tagCounts.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count); // Optional: sort by count
};

export default getUniqueTags;
