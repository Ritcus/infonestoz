"use client";
import Link from "next/link";
import { PostCarousels } from "../components/post-carousel";
import { useEffect, useState } from "react";
import { Post } from "@/types/post";
import getUniqueTags from "../../lib/getUniqueTags";
import { TagsWithCount } from "@/types/TagsWithCount";
import { useGlobalData } from "@/lib/globalData";
import { postsQuery } from "@/lib/queries";
import { useRouter } from "next/navigation";
import { PostCard } from "../components/post-card";
import { InstallButton } from "../components/app-install-button";
import { Button } from "../components/ui/button";
import NewsLetterSection from "../components/newsletter";
import { getPostsByDateLatest } from "@/lib/getLatestPosts";

export default function Home() {
  const [postsList, setPosts] = useState<Post[]>([]);
  const { data: posts } = useGlobalData<Post[]>(postsQuery);
  const [tagsList, settagsList] = useState<TagsWithCount[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      if (posts) {
        const sortedPost =posts? getPostsByDateLatest(posts):[];
        const latestPost = sortedPost.slice(0,8);
        setPosts(latestPost);
        settagsList(getUniqueTags(sortedPost));
      }
    };
    fetchData();
  }, [posts]);

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        {/* Featured Post Carousel */}
        <PostCarousels
          posts={posts?.filter((f) => f.isFeatured).slice(0, 3)}
        />

        {/* Recent Posts */}
        <section className="w-full py-12 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
              <div className="space-y-1">
                <h2 className="text-3xl font-bold tracking-tighter">
                  Recent Articles
                </h2>
                <p className="text-muted-foreground">
                  Explore our latest thoughts and insights
                </p>
              </div>
              <Button
                variant="outline"
                asChild
                className="border-purple-900 text-purple-900 hover:bg-purple-100"
              >
                <Link href="/post">View All Posts</Link>
              </Button>
            </div>

            <div className="grid gap-6 pt-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
              {postsList.length> 0 ? postsList.map((post) => (
                <PostCard key={post._id} post={post} />
              )): (<p>No posts found</p>)}
            </div>
          </div>
        </section>
        {/* Categories */}
        <section className="w-full py-12 md:py-24 bg-purple-900 text-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                  Browse by Tags
                </h2>
                <p className="mx-auto max-w-[700px] md:text-xl">
                  Find exactly what you&apos;re looking for in our diverse
                  collection of topics
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-8 md:grid-cols-3 lg:grid-cols-4">
              {tagsList?.slice(0, 8).map((tag) => (
                <Link
                  key={tag.name}
                  href={`/tagfilter?t=${encodeURIComponent(tag.name)}`}
                  onClick={() =>
                    router.push(`/tagfilter?t=${encodeURIComponent(tag.name)}`)
                  }
                  className="flex flex-col items-center justify-center p-6 rounded-lg text-black bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600"
                >
                  <h3 className="text-lg font-medium">{tag.name.toLocaleLowerCase()}</h3>
                  <p className="text-sm text-muted-foreground">
                    {tag.count} articles
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
        <div className="mt-10">
        <NewsLetterSection/>
        </div>
      </main>
      <InstallButton />
    </div>
  );
}
