'use client'
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { navLinks, postCategories } from '../../types/navigation'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { 
    FaBars, 
    FaTimes, 
    FaChevronDown
  } from 'react-icons/fa'

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isPostsDropdownOpen, setIsPostsDropdownOpen] = useState(false);
  const pathname= usePathname();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsPostsDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <header className="bg-gradient-to-r from-indigo-900 to-purple-800 shadow-lg relative">
    <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-10">
      <div className="flex justify-between items-center h-auto">
        {/* Logo */}
        <div className="flex-shrink-0 pl-4 p-3">
        <Link href="/">
          <Image
            src="/images/logo1.png"
            alt="InfoNest"
            width={120}
            height={10}
            className="h-20 w-auto hover:opacity-80 transition-opacity duration-200"
            // Maintain aspect ratio
            priority // Important for LCP
          />
        </Link>
      </div>

       {/* Desktop Navigation */}
       <nav className="hidden md:flex items-center space-x-2 h-full">
            {navLinks.map(link => (
              <div key={link.href} className="relative h-full flex items-center">
                {link.isSpecial ? (
                  <Link
                    href={link.href}
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

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setMobileMenuOpen(true)}
            className="md:hidden text-amber-200 hover:text-white p-2 rounded-md hover:bg-black/20 transition-colors"
          >
            <span className="sr-only">Open menu</span>
            <FaBars className="h-6 w-6" />
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-indigo-900/95 z-50 backdrop-blur-sm">
          <div className="flex justify-end p-4">
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="text-amber-200 hover:text-white p-2 rounded-md hover:bg-black/20 transition-colors"
            >
              <FaTimes className="h-6 w-6" />
            </button>
          </div>
          <nav className="flex flex-col items-center space-y-8 mt-12">
            {navLinks.map(link => (
              <div key={link.href} className="w-full text-center">
                {link.label === 'Posts' ? (
                  <div className="flex flex-col items-center">
                    <button
                      onClick={() => setIsPostsDropdownOpen(!isPostsDropdownOpen)}
                      className={`text-2xl font-medium px-6 py-3 rounded-lg w-64 text-center transition-all duration-300
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
                          <Link
                            key={category.href}
                            href={category.href}
                            onClick={() => {
                              setIsPostsDropdownOpen(false)
                              setMobileMenuOpen(false)
                            }}
                            className={`block px-4 py-2 text-xl rounded-lg transition-colors w-48
                              ${
                                pathname === category.href
                                  ? 'bg-amber-100 text-amber-800'
                                  : 'text-amber-200 hover:bg-black/20'
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
                    onClick={() => setMobileMenuOpen(false)}
                    className={`text-2xl font-medium px-6 py-3 rounded-lg w-64 text-center transition-all duration-300
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
          </nav>
        </div>
      )}
    </header>
  )
}