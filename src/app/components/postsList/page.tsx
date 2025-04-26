'use client'
import { useMemo, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Post } from '@/types/post'
import { usePostNavigation } from '@/lib/usePostNavigation'



interface PostsListingProps {
  category: string
  posts: Post[]
}

export default function PostsListing({ category, posts: initialPosts }: PostsListingProps) {
  const [hasMore, setHasMore] = useState(initialPosts?.length > 6);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const [sortOption, setSortOption] = useState('dateLatest');

  const [visibleCount, setVisibleCount] = useState(6); // Initial number of posts to show

  const { navigateToPost } = usePostNavigation();

  // Filter posts based on title only (live search)
  const loadMore = () => {
    if (!initialPosts || isLoading) return;
    
    setIsLoading(true);
    setTimeout(() => {
      const newVisibleCount = visibleCount + 6;
      setVisibleCount(newVisibleCount);
      setHasMore(newVisibleCount < initialPosts.length);
      setIsLoading(false);
    }, 800);
  }

  // Process posts with filtering and sorting
  const processedPosts = useMemo(() => {
    let filtered = [...(initialPosts || [])];
    
    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(post => 
        post.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply tag filter
    if (activeFilter !== 'All') {
      filtered = filtered.filter(post => 
        post.tags?.includes(activeFilter.toLocaleLowerCase()) || post.category === activeFilter.toLocaleLowerCase()
      );
    }
    
    // Apply sorting
    switch (sortOption) {
      case 'titleAsc':
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'titleDesc':
        filtered.sort((a, b) => b.title.localeCompare(a.title));
        break;
      case 'dateOldest':
        filtered.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
        break;
      case 'dateLatest':
      default:
        filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    }
    
    return filtered;
  }, [initialPosts, searchTerm, activeFilter, sortOption]);

  // Pagination
  const displayedPosts = useMemo(() => {
    return searchTerm ? processedPosts : processedPosts.slice(0, visibleCount);
  }, [processedPosts, visibleCount, searchTerm]);


  return (
    <div>
        <div className="relative h-96 rounded-xl w-90vw mb-12 group bg-purple-500 bg-white text-gray-900 shadow-md rounded-xl">
        <Image
          src={`/images/backg.jpg`}
          alt={`${category} Posts`}
          fill
          className="object-cover transition-transform duration-700"
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 h-full flex flex-col justify-center items-center text-center p-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Our {category} Posts
          </h1>
          <p className="text-xl text-gray-200 max-w-2xl">
            Discover amazing {category?.toLowerCase()} deals and stories curated just for you.
          </p>

          <div className="w-full max-w-md mt-5">
            <div className="relative">
              <input
                type="text"
                placeholder="Search by title..."
                className="w-full px-4 py-3 rounded-full bg-white/90 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500 pr-10 transition-all duration-200"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <svg
                className="absolute right-3 top-3.5 h-5 w-5 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    <div className="w-7x1 mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-white text-gray-900 shadow-md rounded-xl">
      {/* Hero Section */}
      
        {/* Filter and Sort Controls */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-10">
          {/* Filter Buttons */}
          <div className="flex space-x-2">
            {['All', 'Free', 'Deals'].map(filter => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeFilter === filter
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
          
          {/* Sort Dropdown */}
          <div className="relative">
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="appearance-none bg-white border border-gray-300 rounded-full pl-4 pr-8 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="dateLatest">Latest</option>
              <option value="dateOldest">Oldest</option>
              <option value="titleAsc">Title (A-Z)</option>
              <option value="titleDesc">Title (Z-A)</option>
            </select>
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>
        
      {/* Posts Grid - Shows live filtered results */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
      {displayedPosts.length > 0 ? (
    displayedPosts.map(post => (
            <article key={post.id} 
            
            onClick={() => navigateToPost(post)}
            style={{
              cursor: "pointer", // Changes to grab hand cursor
              padding: "1rem",
              border: "1px solid #ddd",
              borderRadius: "8px",
            }} className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow hover:bg-gray-200 transition-colors">
              <div className="h-48 relative">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs font-medium px-2 py-1 bg-amber-100 text-amber-800 rounded-full">
                    {post.category}
                  </span>
                  <span className="text-xs text-gray-500">{post.date}</span>
                </div>
                <h3 className="text-xl font-bold mb-2 hover:text-amber-600 transition-colors">
                  <span>{post.title}</span>
                </h3>
                <p className="text-gray-600 mb-4">{post.excerpt}</p>
                <Link 
                  href={`/posts/${post.id}`}
                  className="text-amber-600 hover:text-amber-800 font-medium inline-flex items-center"
                >
                  Read more
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </article>
          ))
        ) : (
            <div className="col-span-full text-center py-12">
            <p className="text-gray-500 text-lg">
              {searchTerm 
                ? `No posts found with title containing "${searchTerm}"`
                : activeFilter !== 'All'
                  ? `No ${activeFilter} posts available`
                  : 'No posts available'}
            </p>
          </div>
        )}
      </div>

 {/* See More Button */}

      {hasMore && !searchTerm && displayedPosts?.length > 0 &&(
  <div className="text-center mt-8">
    <button
      onClick={loadMore}
      disabled={isLoading}
      className="relative overflow-hidden px-8 py-3 rounded-full font-medium shadow-lg transition-all duration-300 
        bg-purple-600 text-white group hover:bg-blue-600 disabled:opacity-60 disabled:cursor-not-allowed"
    
    >
      <span className="relative z-10 flex items-center justify-center gap-2">
        {isLoading ? (
          <>
          <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          Loading...
        </>
        ) : (
          'See More'
        )}
      </span>
      
      {/* Wavy water effect */}
      {!isLoading && (
        <div className="absolute inset-0">
          {/* Initial shimmer/waves */}
          <div className="absolute inset-0 opacity-20">
            <div className="w-full h-full bg-gradient-to-br from-blue-400/30 to-blue-500/30 animate-[waveLoop_6s_linear_infinite]" />
          </div>

          {/* Fill on hover */}
          <div className="absolute inset-0 w-0 group-hover:w-full transition-all duration-500 ease-in-out bg-blue-500/60" />

          {/* Water shimmer on hover */}
          <div className="absolute inset-0 pointer-events-none group-hover:opacity-100 opacity-0 transition-opacity duration-500">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.2)_0%,_transparent_70%)] animate-pulse" />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.4),transparent)] animate-[waterWave_2s_linear_infinite]" />
          </div>
        </div>
      )}
    </button>
  </div>
      )}
    </div>
    </div>
  )
}