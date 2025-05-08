"use client"

import { useState, useRef } from "react"
import Link from "next/link"
import { FaBars, FaBookOpen, FaChevronDown } from "react-icons/fa"
import { FaX } from "react-icons/fa6"
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import { navLinks, postCategories } from "@/types/navigation"
import { SearchBox } from "./search-box"

export function Navbar() {
  const [sideNavOpen, setSideNavOpen] = useState(false)
    const [isPostsDropdownOpen, setIsPostsDropdownOpen] = useState(false);
    const pathname = usePathname();
    const router = useRouter();
    const dropdownRef = useRef<HTMLDivElement>(null);


    const handleCategoryClick = (href: string) => {
        router.push(href);
        setIsPostsDropdownOpen(false);
        setSideNavOpen(false);
      };

  return (
    <>
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-purple-900 backdrop-blur supports-[backdrop-filter]:bg-purple-900/95 p-3">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            {/* Hamburger menu - only visible on mobile */}
            <button
              className="text-white hover:bg-purple-800 md:hidden"
              onClick={() => setSideNavOpen(true)}
            >
              <FaBars className="h-5 w-5" />
              <span className="sr-only">Open menu</span>
            </button>
            <Link href="/">
              <Image
                src="/images/logo1.png"
                alt="InfoNest"
                width={120}
                height={10}
                style={{
                  width: 'auto', // Maintain aspect ratio
                  height: 'auto' // Maintain aspect ratio
                }}
                className="h-20 w-auto hover:opacity-80 transition-opacity duration-200"
                priority
              />
            </Link>
          </div>

          {/* Desktop navigation - only visible on medium screens and up */}
          <nav className="hidden md:flex gap-6">
          {navLinks.map(link => (
              <div key={link.href} className="relative h-full flex items-center">
                {link.isSpecial ? (
                  <Link
                    href={link.href}
                    onClick={() => setIsPostsDropdownOpen(false)}
                    className={`relative px-4 py-2 text-sm font-bold rounded-md transition-all duration-300 h-full flex items-center
                      ${
                        pathname === link.href
                          ? 'text-white bg-gradient-to-r from-amber-500 to-amber-600 shadow-lg'
                          : 'text-white bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 shadow-md'
                      }`}
                  >
                    {link.label}
                  </Link>
                ) : link.label === 'Posts' ? (
                  <div 
                    ref={dropdownRef}
                    className="relative h-full flex items-center"
                  >
                    <button
                      onClick={() => setIsPostsDropdownOpen(!isPostsDropdownOpen)}
                      className={`relative px-3 py-2 text-sm font-medium rounded-md transition-all duration-300 flex items-center h-full
                        ${
                          pathname.startsWith('/posts')
                            ? 'text-white bg-black/20 shadow-inner'
                            : 'text-amber-200 hover:text-white'
                        }`}
                    >
                      {link.label}
                      <FaChevronDown className={`h-3 w-3 ml-1 transition-transform ${isPostsDropdownOpen ? 'transform rotate-180' : ''}`} />
                    </button>
                    
                    {/* Posts Dropdown */}
                    {isPostsDropdownOpen && (
                      <div className="absolute left-0 top-full mt-0 w-48 bg-white rounded-md shadow-lg z-50 py-1">
                        {postCategories.map(category => (
                          <Link
                            key={category.href}
                            href={category.href}
                            onClick={() => setIsPostsDropdownOpen(false)}
                            className={`block px-4 py-2 text-sm transition-colors
                              ${
                                pathname === category.href
                                  ? 'bg-amber-100 text-amber-800'
                                  : 'text-gray-800 hover:bg-gray-100'
                              }`}
                          >
                            {category.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    href={link.href}
                    onClick={() => setIsPostsDropdownOpen(false)}
                    className={`relative px-3 py-2 text-sm font-medium rounded-md transition-all duration-300 h-full flex items-center
                      ${
                        pathname === link.href
                          ? 'text-white bg-black/20 shadow-inner'
                          : 'text-amber-200 hover:text-white'
                      }`}
                  >
                    {link.label}
                    <span className={`absolute inset-x-1 bottom-2 h-0.5 bg-amber-400 transition-all duration-500
                      ${
                        pathname === link.href
                          ? 'opacity-100'
                          : 'opacity-0 group-hover:opacity-100 scale-x-0 group-hover:scale-x-100'
                      }`}
                    />
                  </Link>
                )}
              </div>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <SearchBox className="hidden md:flex relative"/>
          </div>
        </div>
      </header>

      {/* Side Navigation - only for mobile */}
      <div
        className={`fixed inset-0 z-50 bg-black/50 transition-opacity duration-200 md:hidden ${
          sideNavOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setSideNavOpen(false)}
      />

      <div
        className={`fixed top-0 left-0 z-50 h-full w-[280px] bg-purple-900 shadow-xl transition-transform duration-300 ease-in-out md:hidden ${
          sideNavOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center gap-2">
            <FaBookOpen className="h-6 w-6" />
            <span className="text-xl font-bold">InfoNestOz</span>
          </div>
          <button
            onClick={() => setSideNavOpen(false)}
            className="text-gray-500 hover:bg-gray-100"
          >
            <FaX className="h-5 w-5" />
            <span className="sr-only">Close menu</span>
          </button>
        </div>

        <nav className="p-5">
          <div className="space-y-1">
          {navLinks.map(link => (
              <div key={link.href} className="w-full text-center p-3">
                {link.label === 'Posts' ? (
                  <div className="flex flex-col items-center" ref={dropdownRef}>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsPostsDropdownOpen(!isPostsDropdownOpen);
                      }}
                      className={`text-xl font-medium px-6 py-3 rounded-lg w-64 text-center transition-all duration-300
                        ${
                          pathname.startsWith('/posts')
                            ? 'text-white bg-amber-500/20 shadow-lg'
                            : 'text-amber-200 hover:bg-black/20 hover:text-white'
                        }`}
                    >
                      {link.label}
                      <FaChevronDown className={`inline-block ml-2 h-4 w-4 transition-transform ${isPostsDropdownOpen ? 'transform rotate-180' : ''}`} />
                    </button>
                    {isPostsDropdownOpen && (
                      <div className="mt-2 space-y-2">
                        {postCategories.map(category => (
                          <button
                            key={category.href}
                            onClick={() => handleCategoryClick(category.href)}
                            className={`block px-4 py-2 text-l rounded-lg transition-colors w-48 mx-auto
                              ${
                                pathname === category.href
                                  ? 'bg-amber-100 text-amber-800'
                                  : 'text-amber-200 hover:bg-black/20 hover:text-white'
                              }`}
                          >
                            {category.name}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    href={link.href}
                    onClick={() => setSideNavOpen(false)}
                    className={`text-xl font-medium px-6 py-3 rounded-lg w-64 text-center transition-all duration-300
                      ${
                        pathname === link.href
                          ? link.isSpecial 
                            ? 'text-white bg-gradient-to-r from-amber-500 to-amber-600 shadow-lg'
                            : 'text-white bg-amber-500/20 shadow-lg'
                          : link.isSpecial
                            ? 'text-white bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 shadow-md'
                            : 'text-amber-200 hover:bg-black/20 hover:text-white'
                      }`}
                  >
                    {link.label}
                  </Link>
                )}
              </div>
            ))}
          </div>
          <div className="mt-6 pt-6 border-t">
            <SearchBox mobile={true}/>
          </div>
        </nav>
      </div>
    </>
  )
}
