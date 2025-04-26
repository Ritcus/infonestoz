'use client'
import { useState, useEffect } from 'react';
import Image from 'next/image';

import { posts } from '@/data/posts';
import { Post } from '@/types/post';
import { usePostNavigation } from '@/lib/usePostNavigation';

export default function PopularPostsSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [popularPosts, setPopularPosts] = useState<Post[]>([]);
  //const popularPosts = posts.filter(post => post.popularity|| 0 > 10).slice(0, 5);
  const [loading, setLoading] = useState(true);
  const { navigateToPost } = usePostNavigation();

  useEffect(() => {
    async function fetchPopularPosts() {
      try {
        const filtered = posts.filter((post) => post.popularity|| 0 > 10);
        setPopularPosts(filtered);
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchPopularPosts();
    console.log(popularPosts)
  }, [posts]);

  // Move to next group of 3
  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 3) % popularPosts.length);
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 3 + popularPosts.length) % popularPosts.length);
  };

  useEffect(() => {
    if (popularPosts.length === 0) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const getVisiblePosts = () => {
    if (popularPosts.length === 0) return [];
    const posts = [];
    for (let i = 0; i < 3; i++) {
      posts.push(popularPosts[(currentIndex + i) % popularPosts.length]);
    }
    return posts;
  };

  const visiblePosts = getVisiblePosts();

  if (loading) return <div className="text-center py-8">Loading...</div>;
  if (popularPosts.length === 0) return null;

  return (
    <div className="mt-12 relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-6">
        <h3 className="font-bold text-black text-xl inline-block px-4 relative z-10">
          Popular Posts
        </h3>
        <div className="h-2 w-full bg-purple-800"></div>
      </div>

      <div className="relative flex overflow-hidden ">
        {visiblePosts.map((post, index) => (
          <div key={`${post.id}-${index}`} className="w-1/3 p-2 " 
          onClick={() => navigateToPost(post)}
          style={{
            cursor: "pointer", // Changes to grab hand cursor
          }}>
            <div className="bg-white p-4 rounded-lg shadow-md h-full flex flex-col transition-shadow hover:bg-gray-200 transition-colors">
              <div className="relative h-40 w-full mb-3 rounded-md overflow-hidden flex-shrink-0">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-grow">
                <h4 className="font-semibold text-lg mb-1">{post.title}</h4>
              </div>
              <div className="flex justify-between items-center mt-2">
                <span className="text-sm text-gray-500">
                  {new Date(post.date).toLocaleDateString()}
                </span>
                <span className="text-sm font-medium text-purple-800">
                  {post.popularity} likes
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={prevSlide}
        className="absolute left-0 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-md z-10 hover:bg-gray-100"
      >
        &lt;
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-0 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-md z-10 hover:bg-gray-100"
      >
        &gt;
      </button>
    </div>
  );
}