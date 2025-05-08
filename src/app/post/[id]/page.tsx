"use client";
import Link from "next/link";
import Image from "next/image";
import { Post } from "@/types/post";
import { use, useEffect, useState } from "react";
import { formatDate } from "@/lib/formatDate";
import { FaRegHeart, FaHeart, FaShare } from "react-icons/fa";
import PopularPostsSlider from "@/app/components/post-slider";
import { urlFor } from "../../../../sanity/lib/image";
import { renderPortableText } from "../../../../sanity/lib/renderPortableText";
import { useGlobalData } from "@/lib/globalData";
import { postsQuery } from "@/lib/queries";
import { mutate } from "swr";

export default function PostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  const { data: cachedPosts } = useGlobalData<Post[]>(postsQuery);
  const post =  cachedPosts?.find((post) => post._id === id);

  
  //const hasUserLiked = sessionStorage.getItem(postLikedKey) === "true";
  const [isLiked, setIsLiked] = useState<boolean>();
  const [postLikedKey, setpostLikedKey] = useState<string>();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const sessionId = sessionStorage.getItem("sessionId");
      setpostLikedKey(`liked_${id}_${sessionId}`);
      const hasUserLiked = sessionStorage.getItem(postLikedKey!) === "true";
      setIsLiked(hasUserLiked)
    }
  }, []);
  
  const handleLikeButton = () => {
    const newValue = !isLiked;
    setIsLiked(newValue);
    // Update popularity count
    const updatedPopularity = newValue
      ? (post!.popularity || 0) + 1
      : (post!.popularity || 0) - 1;
    if (newValue) {
      sessionStorage.setItem(postLikedKey!, "true");
    } else {
      sessionStorage.removeItem(postLikedKey!);
    }
    mutate(
      postsQuery,
      (cachedPosts: Post[] | undefined) => {
        if (!cachedPosts) return cachedPosts;
        return cachedPosts.map((p) =>
          p._id === post!._id ? { ...p, popularity: updatedPopularity } : p
        );
      },
      false
    );
  };

  if (!post) return <div>Post not found</div>;

  return (
    <div>
      <div className="bg-white text-gray-900 shadow-md rounded-xl p-5">
        {/* Breadcrumb Navigation */}
        <nav
          className="flex mb-8 text-l italic text-blue-800 "
          aria-label="Breadcrumb"
        >
          <ol className="inline-flex items-center space-x-1 md:space-x-3 ">
            <li className="inline-flex items-center ">
              <Link
                href="/"
                className="inline-flex items-center font-medium hover:text-purple-600"
              >
                Home
              </Link>
            </li>
            <li>
              <div className="flex items-center">
                <svg
                  className="w-3 h-3 mx-1 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
                <Link
                  href={`/postsCategories/${post.category?.toLowerCase()}`}
                  className="ml-1 font-medium hover:text-purple-600"
                >
                  {post.category}
                </Link>
              </div>
            </li>
            <li aria-current="page">
              <div className="flex items-center">
                <svg
                  className="w-3 h-3 mx-1 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
                <span className="ml-1 font-medium text-gray-900">
                  {post.title}
                </span>
              </div>
            </li>
          </ol>
        </nav>

        {/* Main Blog Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Title Section */}

          <h1 className="text-3xl md:text-4xl font-bold text-center mb-8">
            {post.title}
          </h1>

          {/* Tags and Date */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-12">
            <div className="flex flex-wrap gap-2 mb-4 md:mb-0">
              {post.tags?.map((tag) => (
                <span
                  key={tag}
                  className="text-xs font-medium px-2 py-1 bg-gray-100 text-gray-800 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
            <span className="text-sm text-gray-500">
              {formatDate(post.date)}
            </span>
          </div>

          {/* Main Image */}
          {1 > 0 && (
            <div className="relative w-full h-96 rounded-lg overflow-hidden mb-12">
              <Image
                src={urlFor(post.mainImage).url()}
                alt={post.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}

          {/* Content with interspersed images */}
          <article className="prose lg:prose-xl max-w-none mb-12 bg-grey-800">
            <div className="mb-4">{renderPortableText(post.content)}</div>
          </article>

          {/* Social Actions */}
          <div className="flex justify-center gap-4 mt-12">
            <button
              className="flex items-center gap-2 px-6 py-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors hover:bg-purple-300"
              onClick={handleLikeButton}
            >
              {isLiked ? <FaHeart className="text-red-500" /> : <FaRegHeart />}
              Like {post.popularity || 0 >= 1 ? `${post.popularity}` : ""}
            </button>
            <button
              className="flex items-center gap-2 px-6 py-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors hover:bg-purple-300"
              onClick={() => {
                navigator.clipboard?.writeText(window.location.href);
              }}
            >
              <FaShare className="w-5 h-5" />
              Share
            </button>
          </div>
        </div>
      </div>
      <div className="g-white text-gray-900 shadow-md rounded-xl p-5">
        <PopularPostsSlider />
      </div>
    </div>
  );
}
