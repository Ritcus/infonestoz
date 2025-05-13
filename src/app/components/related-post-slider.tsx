"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { Post } from "@/types/post";
import { urlFor } from "../../../sanity/lib/image";
import { useGlobalData } from "@/lib/globalData";
import { postsQuery } from "@/lib/queries";
import { ArrowBigDown, ArrowBigUp } from "lucide-react";
import { useRouter } from "next/navigation";

interface RelatedPostsSliderProps{
  tags: string[];
  currentPostId: string;
}

export default function RelatedPostsSlider({tags, currentPostId}: RelatedPostsSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const router = useRouter();
  const { data: cachedPosts } = useGlobalData<Post[]>(postsQuery);
  const relatedPosts = cachedPosts!
    .filter((post) => tags.some(s => post.tags.includes(s))&& post._id !== currentPostId)
    .slice(0, 6);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 3) % relatedPosts.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prev) => (prev - 3 + relatedPosts.length) % relatedPosts.length
    );
  };

  useEffect(() => {
    if (relatedPosts.length === 0) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const getVisiblePosts = () => {
    if (relatedPosts.length === 0) return [];
    const posts = [];
    for (let i = 0; i < 3; i++) {
      posts.push(relatedPosts[(currentIndex + i) % relatedPosts.length]);
    }
    return posts;
  };

  const visiblePosts = getVisiblePosts();

  if (relatedPosts.length === 0) return null;

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 mx-auto">
      <div className="text-center mb-8">
        <h3 className="font-bold text-black text-xl sm:text-2xl inline-block px-4">
          Related Articles
        </h3>
        <div className="h-2 w-full bg-purple-800"></div>
        <button
          onClick={prevSlide}
          className=" md:hidden bg-white p-2 rounded-full shadow-md z-10 hover:bg-gray-100"
        >
          <ArrowBigUp />
        </button>
      </div>

      <div className="relative">
        <div className="flex justify-center">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-7xl w-full">
            {visiblePosts.map((post, index) => (
              <div
                key={`${post._id}-${index}`}
                className="cursor-pointer bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-all hover:bg-gray-50"
                onClick={() => {
                  router.push(`/post/${post.slug.current}`);
                }}
                style={{
                  cursor: "pointer",
                }}
              >
                <div className="relative h-48 w-full mb-4 rounded-md overflow-hidden">
                  <Image
                    src={urlFor(post.mainImage).url()}
                    alt={post.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    priority
                  />
                </div>
                <h4 className="font-semibold text-lg mb-2 line-clamp-2">
                  {post.title}
                </h4>
                <div className="flex justify-between items-center mt-4">
                  <span className="text-sm text-gray-500">
                    {new Date(post.date).toLocaleDateString()}
                  </span>
                  <span className="text-sm font-medium text-purple-800">
                    {post.category}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <button
          onClick={prevSlide}
          className="hidden md:block absolute left-0 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-md z-10 hover:bg-gray-100"
        >
          &lt;
        </button>
        <button
          onClick={nextSlide}
          className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-md z-10 hover:bg-gray-100"
        >
          &gt;
        </button>
        <div className="flex justify-center">
          <button
            onClick={prevSlide}
            className="md:hidden absolute bg-white p-2 rounded-full shadow-md z-10 hover:bg-gray-100"
          >
            <ArrowBigDown />
          </button>
        </div>
      </div>
    </div>
  );
}
