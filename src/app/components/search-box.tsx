"use client";

import type React from "react";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { FaChevronRight, FaSearch } from "react-icons/fa";
import { Post } from "@/types/post";
import { usePostNavigation } from "@/lib/usePostNavigation";
import { useGlobalData } from "@/lib/globalData";
import { postsQuery } from "@/lib/queries";

interface SearchBoxProps {
  className?: string;
  placeholder?: string;
  mobile?: boolean;
  initialQuery?: string;
}

export function SearchBox({
  className,
  placeholder = "Search...",
  mobile = false,
  initialQuery = "",
}: SearchBoxProps) {
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [showDropdown, setShowDropdown] = useState(false);
  const { data: cachedPosts } = useGlobalData<Post[]>(postsQuery);
  const [searchResults, setSearchResults] = useState<typeof cachedPosts>([]);
  const router = useRouter();
  const searchBoxRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const { navigateToPost } = usePostNavigation();

  // Update search query when initialQuery changes
  useEffect(() => {
    setSearchQuery(initialQuery);
  }, [initialQuery]);

  // Filter search results as user types
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }

    const lowercaseQuery = searchQuery.toLowerCase();
    const results = cachedPosts?.filter(
      (post) =>
        post.title.toLowerCase().includes(lowercaseQuery) ||
        post.category.toLowerCase().includes(lowercaseQuery)
    );
    setSearchResults(results);
  }, [searchQuery]);

  // Handle click outside to close dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        searchBoxRef.current &&
        !searchBoxRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Handle form submission for full search
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Navigate to the search page with the query
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setShowDropdown(false);
    }
  };

  // Handle input focus
  const handleFocus = () => {
    if (searchQuery.trim() && searchResults!.length > 0) {
      setShowDropdown(true);
    }
  };

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    setShowDropdown(value.trim() !== "");
  };

  return (
    <div ref={searchBoxRef} className={`relative ${className}`}>
      <form onSubmit={handleSearch} className="w-full">
        <div className="relative flex items-center">
          <input
            ref={inputRef}
            type="search"
            placeholder={placeholder}
            className={`w-full pl-10 pr-4 py-2 rounded-md bg-white text-gray-900 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
              mobile ? "" : "md:w-[250px]"
            }`}
            value={searchQuery}
            onChange={handleInputChange}
            onFocus={handleFocus}
          />
          <FaSearch className="absolute left-3 h-4 w-4 text-gray-400" />
        </div>
      </form>

      {/* Search Results Dropdown */}
      {showDropdown && (
        <div className="absolute z-50 w-full top-full mt-1 rounded-md bg-white shadow-lg border border-gray-200 max-h-[300px] overflow-auto">
          <div className="py-1 relative">
            {/* Limited results */}
            {searchResults!.length > 0 &&
              searchResults?.slice(0, 5).map((post) => (
                <div
                  key={post._id}
                  className="px-4 py-2 hover:bg-purple-50 cursor-pointer"
                  onClick={() => {
                    navigateToPost(post);
                    setShowDropdown(false);
                    setSearchQuery("");
                  }}
                >
                  <div className="flex items-start">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {post.title}
                      </p>
                      <p className="text-xs text-gray-500">{post.category}</p>
                    </div>
                  </div>
                </div>
              ))}
            {/* See more link */}
            {
              <div className="border-t border-gray-100 mt-1">
                <button
                  className="flex items-center justify-between w-full px-4 py-2 text-sm text-purple-900 hover:bg-purple-50"
                  onClick={() => {
                    router.push(
                      `/search?q=${encodeURIComponent(searchQuery.trim())}`
                    );
                    setShowDropdown(false);
                    setSearchQuery("");
                  }}
                >
                  <span>See all results</span>
                  <FaChevronRight className="h-4 w-4" />
                </button>
              </div>
            }
          </div>
        </div>
      )}
    </div>
  );
}
