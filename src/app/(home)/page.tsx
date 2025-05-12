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

export default function Home() {
  const [postsList, setPosts] = useState<Post[]>([]);
  const { data: posts } = useGlobalData<Post[]>(postsQuery);
  const [tagsList, settagsList] = useState<TagsWithCount[]>([]);
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Would submit:", email); // You'll replace this later
    setSubscribed(true);
    setEmail("");
  };

  useEffect(() => {
    const fetchData = async () => {
      if (posts) {
        setPosts(posts);
        settagsList(getUniqueTags(posts));
      }
    };
    fetchData();
  }, [posts]);

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        {/* Featured Post Carousel */}
        <PostCarousels
          posts={postsList?.filter((f) => f.isFeatured).slice(0, 3)}
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
              {postsList?.map((post) => (
                <PostCard key={post._id} post={post} />
              ))}
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
              {tagsList.slice(0, 8).map((tag) => (
                <Link
                  key={tag.name}
                  href={`/tagfilter?t=${encodeURIComponent(tag.name)}`}
                  onClick={() =>
                    router.push(`/tagfilter?t=${encodeURIComponent(tag.name)}`)
                  }
                  className="flex flex-col items-center justify-center p-6 rounded-lg text-black bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600"
                >
                  <h3 className="text-lg font-medium">{tag.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {tag.count} articles
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter */}
        <section className="w-full py-12 md:py-24 text-center ">
          <div className="flex flex-col gap-3 p-6 bg-card rounded-lg border">
            <h3 className="text-lg font-medium">Stay Updated</h3>

            {subscribed ? (
              <div className="flex gap-2 text-green-500 ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <p>Thanks for subscribing!</p>
              </div>
            ) : (
              <>
                <form
                  onSubmit={handleSubmit}
                  className="flex w-full max-w-sm flex-col gap-2 sm:flex-row items-center"
                >
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your best email"
                    className="flex-1 px-4 py-2 rounded-md border bg-background focus:ring-2 focus:ring-primary/50"
                    required
                  />
                  <Button
                    type="submit"
                    className=" hover:bg-primary/90 bg-purple-900"
                  >
                    Subscribe
                  </Button>
                </form>
                <p className="text-sm text-muted-foreground">
                  We&apos;ll never spam you. Unsubscribe anytime.
                </p>
              </>
            )}
          </div>
        </section>
      </main>
      <InstallButton />
    </div>
  );
}
