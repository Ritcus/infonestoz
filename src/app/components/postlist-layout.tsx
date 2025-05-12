"use client";

import { useState, useEffect } from "react";
import { SortSelector, type SortOption } from "./sort-selector";
import { Search } from "lucide-react";
import { Input } from "@/app/components/ui/input";
import { Post } from "@/types/post";
import { useGlobalData } from "@/lib/globalData";
import { postsQuery } from "@/lib/queries";
import { CategoryFilter } from "./category-filter";
import { PostCard } from "./post-card";
import { Pagination } from "./pagination";
import { TagFilter } from "./tag-filter";

interface PostsListsProps {
  category?: string;
  searchKeywords?: string;
  tag?: string;
}

export default function PostList_Layout({
  category,
  searchKeywords,
  tag,
}: PostsListsProps) {
  const { data: posts } = useGlobalData<Post[]>(postsQuery);

  const allCategories = Array.from(
    new Set(posts?.map((post) => post.category))
  );

  const allTags = Array.from(
    new Set(posts?.flatMap((post) => post.tags || []))
  );

  // State for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 12; // 4 columns x 3 rows

  // State for filtering and sorting
  const [searchQuery, setSearchQuery] = useState(searchKeywords || "");
  const [selectedCategories, setSelectedCategories] = useState<string[]>(() =>
    category ? [category] : []
  );
  const [selectedTags, setSelectedTags] = useState<string[]>(() =>
    tag ? [tag] : []
  );

  const [sortOption, setSortOption] = useState<SortOption>("newest");

  // Filter and sort posts
  const filteredPosts = posts?.filter((post) => {
    // Filter by search query
    const matchesSearch =
      searchQuery === "" ||
      post.title.toLowerCase().includes(searchQuery.toLowerCase());

    // Filter by selected categories
    const matchesCategory =
      selectedCategories.length === 0 ||
      selectedCategories.includes(post.category);

    // Filter by selected tags
    const matchesTags =
      selectedTags.length === 0 ||
      selectedTags.some((tag) => post.tags && post.tags.includes(tag));

    return tag
      ? matchesSearch && matchesTags
      : matchesSearch && matchesCategory;
  });

  // Sort posts
  const sortedPosts = [...(filteredPosts || [])].sort((a, b) => {
    switch (sortOption) {
      case "newest":
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      case "oldest":
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      case "a-z":
        return a.title.localeCompare(b.title);
      case "z-a":
        return b.title.localeCompare(a.title);
      default:
        return 0;
    }
  });

  // Calculate pagination
  const totalPages = Math.ceil(sortedPosts.length / postsPerPage);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = sortedPosts.slice(indexOfFirstPost, indexOfLastPost);

  // Handle page change
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    // Scroll to top when changing pages
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedCategories, tag ? selectedTags : null, sortOption]);

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-purple-900 text-white py-16 md:py-24">
          <div className=" px-4 md:px-6">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-3xl md:text-5xl font-bold mb-4">
                Explore Our{" "}
                {selectedCategories.length > 1 ? "" : selectedCategories.join()}{" "}
                Articles
              </h1>
              <p className="text-lg md:text-xl text-purple-100 mb-8">
                Discover insights, tutorials, and stories from our collection of
                thoughtfully crafted articles
              </p>

              {/* Search Bar */}
              <div className="relative max-w-xl mx-auto">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-purple-300" />
                </div>
                <Input
                  type="search"
                  placeholder="Search articles, topics, or authors..."
                  className="pl-10 bg-purple-800 border-purple-700 text-white placeholder:text-purple-300 focus-visible:ring-purple-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Posts Section */}
        <section className="py-12 md:py-16">
          <div className="container px-4 md:px-6">
            {/* Filters and Sorting */}
            <div className="flex flex-row justify-between items-start gap-4 mb-8">
              <div className="flex ">
                {tag ? (
                  <TagFilter
                    tags={allTags}
                    selectedTags={selectedTags}
                    onTagChange={setSelectedTags}
                  />
                ) : (
                  <CategoryFilter
                    categories={allCategories}
                    selectedCategories={selectedCategories}
                    onCategoryChange={setSelectedCategories}
                  />
                )}
              </div>
              <div className="flex items-center gap-2">
                <p className="text-sm text-muted-foreground whitespace-nowrap">
                  Showing{" "}
                  <span className="font-medium">{sortedPosts.length}</span>{" "}
                  articles
                </p>
                <SortSelector
                  currentSort={sortOption}
                  onSortChange={setSortOption}
                />
              </div>
            </div>

            {/* Posts Grid */}
            {currentPosts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {currentPosts.map((post) => (
                  <PostCard key={post._id} post={post} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <h3 className="text-xl font-semibold mb-2">
                  No articles found
                </h3>
                <p className="text-muted-foreground mb-6">
                  Try adjusting your search or filter criteria to find what
                  you&apos;re looking for.
                </p>
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            )}
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="bg-purple-50 py-12 md:py-16">
          <div className="container px-4 md:px-6">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                Stay Updated with Our Latest Articles
              </h2>
              <p className="text-muted-foreground mb-6">
                Join our newsletter and never miss out on new content.
                We&apos;ll deliver the best articles straight to your inbox.
              </p>
              <div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1"
                />
                <button className="bg-purple-900 hover:bg-purple-800 text-white px-4 py-2 rounded-md font-medium">
                  Subscribe
                </button>
              </div>
              <p className="text-xs text-muted-foreground mt-4">
                By subscribing, you agree to our Terms of Service and Privacy
                Policy.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
