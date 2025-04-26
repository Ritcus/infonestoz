'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { Post } from '@/types/post'
import { usePostNavigation } from '@/lib/usePostNavigation'

type PostCarouselProps = {
    posts: Post[];
  };

export default function PostCarousel({posts}  : PostCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { navigateToPost } = usePostNavigation();

  useEffect(() => {
    if (!posts || posts.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % posts.length)
    }, 5000) // Change slide every 5 seconds

    return () => clearInterval(interval)
  }, [posts])

  if (!posts || posts.length === 0) {
    return null; // Or return a loading/empty state
  }

  return (
    <div className="absolute inset-0 w-full h-full">
      <AnimatePresence mode="wait">
        {posts.map((post, index) => (
          index === currentIndex && (
            <motion.div
              key={post.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 w-full h-full"
            >
              {/* Background Image */}
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover"
                priority
                quality={100}
              />
              
              {/* Dark Overlay */}
              <div className="absolute inset-0 bg-black/40" />
              
              {/* Content */}
              <div className="relative z-10 h-full flex flex-col justify-end p-8 sm:p-12 bg-gradient-to-t from-black/80 via-black/20 to-transparent">
                <div className="max-w-2xl">
                  <span className="inline-block px-3 py-1 mb-3 text-sm font-medium text-amber-300 bg-black/30 rounded-full backdrop-blur-sm">
                    {post.category}
                  </span>
                  <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 hover:text-amber-600 transition-colors" style={{
            cursor: "pointer", // Changes to grab hand cursor
          }}
          onClick={() => navigateToPost(post)}>
                    {post.title}
                  </h1>
                  <p className="text-gray-200 mb-4">{post.excerpt}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags?.map(tag => (
                      <span key={tag} className="px-2.5 py-1 text-xs text-amber-100 bg-amber-800/50 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )
        ))}
      </AnimatePresence>
      
      {/* Navigation Dots */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-2 z-10">
        {posts.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full transition-colors ${index === currentIndex ? 'bg-amber-400' : 'bg-white/50'}`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}