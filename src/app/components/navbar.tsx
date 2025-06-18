"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { FaBars, FaBookOpen, FaChevronDown, FaCircle, FaHackerNews } from "react-icons/fa";
import { FaX } from "react-icons/fa6";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { navLinks, postCategories } from "@/types/navigation";
import { SearchBox } from "./search-box";
import { ArticleProgress } from "./article-progress";
import { ChevronDown, ChevronRight, FileText, Home, Mail, User } from "lucide-react";

export function Navbar() {
  const [sideNavOpen, setSideNavOpen] = useState(false);
  const [isPostsDropdownOpen, setIsPostsDropdownOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const pathname = usePathname();
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const closeMobileMenu = () => setSideNavOpen(false);

  useEffect(() => {
    console.log(postCategories);
  });

  const handleCategoryClick = (href: string) => {
    router.push(href);
    setIsPostsDropdownOpen(false);
    setSideNavOpen(false);
  };

  return (
    <>
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-purple-900 backdrop-blur supports-[backdrop-filter]:bg-purple-900/95 p-3">
        <ArticleProgress />
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
                src="/images/Logo1.png"
                alt="InfoNest"
                width={120}
                height={10}
                style={{
                  width: "auto", // Maintain aspect ratio
                  height: "auto", // Maintain aspect ratio
                }}
                className="h-20 w-auto hover:opacity-80 transition-opacity duration-200"
                priority
              />
            </Link>
          </div>

          {/* Desktop navigation - only visible on medium screens and up */}
          <nav className="hidden md:flex gap-6">
            {navLinks.map((link) => (
              <div
                key={link.href}
                className="relative h-full flex items-center"
              >
                {link.isSpecial ? (
                  <Link
                    href={link.href}
                    onClick={() => {
                      setIsPostsDropdownOpen(false);
                      setActiveCategory(null);
                    }}
                    className={`relative px-4 py-2 text-sm font-bold rounded-md transition-all duration-300 h-full flex items-center
                      ${
                        pathname === link.href
                          ? "text-white bg-gradient-to-r from-amber-500 to-amber-600 shadow-lg"
                          : "text-white bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 shadow-md"
                      }`}
                  >
                    {link.label}
                  </Link>
                ) : link.label === "Posts" ? (
                  <div
                    ref={dropdownRef}
                    className="relative h-full flex items-center"
                    onMouseEnter={() => setIsPostsDropdownOpen(true)}
                    onMouseLeave={() => {
                      setIsPostsDropdownOpen(false);
                      setActiveCategory(null);
                    }}
                  >
                    <button
                      onClick={() =>
                        setIsPostsDropdownOpen(!isPostsDropdownOpen)
                      }
                      className={`relative px-3 py-2 text-sm font-medium rounded-md transition-all duration-300 flex items-center h-full
                        ${
                          pathname.startsWith("/posts")
                            ? "text-white bg-black/20 shadow-inner"
                            : "text-amber-200 hover:text-white"
                        }`}
                    >
                      {link.label}
                      <FaChevronDown
                        className={`h-3 w-3 ml-1 transition-transform ${isPostsDropdownOpen ? "transform rotate-180" : ""}`}
                      />
                    </button>

                    {/* Posts Dropdown */}
                    {isPostsDropdownOpen && (
                      <div className="absolute left-0 top-full mt-0 w-48 bg-white rounded-md shadow-lg z-50 py-1">
                        {postCategories.map((category) => (
                          <div
                            key={category.href}
                            className="relative group"
                            onMouseEnter={() =>
                              category.subCategories &&
                              setActiveCategory(category.href)
                            }
                            onMouseLeave={() => setActiveCategory(null)}
                          >
                            <Link
                              href={category.href}
                              onClick={() => {
                                setIsPostsDropdownOpen(false);
                                setActiveCategory(null);
                              }}
                              className={`block px-4 py-2 text-sm transition-colors w-full text-left
                                ${
                                  pathname === category.href
                                    ? "bg-amber-100 text-amber-800"
                                    : "text-gray-800 hover:bg-gray-100"
                                } ${category.subCategories ? "pr-8" : ""}`}
                            >
                              {category.name}
                              {category.subCategories && (
                                <ChevronRight className="absolute right-2 top-1/2 transform -translate-y-1/2 h-3 w-3" />
                              )}
                            </Link>

                            {/* Subcategories Dropdown */}
                            {category.subCategories &&
                              activeCategory === category.href && (
                                <div className="absolute left-full top-0 ml-1 w-48 bg-white rounded-md shadow-lg z-50 py-1 border border-gray-200">
                                  {/* Parent category link */}
                                  <Link
                                    href={category.href}
                                    onClick={() => {
                                      setIsPostsDropdownOpen(false);
                                      setActiveCategory(null);
                                    }}
                                    className={`block px-4 py-2 text-sm transition-colors
                                    ${
                                      pathname === category.href
                                        ? "bg-amber-100 text-amber-800 font-medium"
                                        : "text-gray-800 hover:bg-gray-100 font-medium"
                                    }`}
                                  >
                                    All {category.name}
                                  </Link>

                                  <div className="border-t border-gray-200 my-1"></div>

                                  {/* Subcategories */}
                                  {category?.subCategories?.map(
                                    (subcategory) => (
                                      <Link
                                        key={subcategory.href}
                                        href={subcategory.href}
                                        onClick={() => {
                                          setIsPostsDropdownOpen(false);
                                          setActiveCategory(null);
                                        }}
                                        className={`block px-4 py-2 text-sm transition-colors
                                      ${
                                        pathname === subcategory.href
                                          ? "bg-amber-100 text-amber-800"
                                          : "text-gray-800 hover:bg-gray-100"
                                      }`}
                                      >
                                        {subcategory.name}
                                      </Link>
                                    )
                                  )}
                                </div>
                              )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    href={link.href}
                    onClick={() => {
                      setIsPostsDropdownOpen(false);
                      setActiveCategory(null);
                    }}
                    className={`relative px-3 py-2 text-sm font-medium rounded-md transition-all duration-300 h-full flex items-center
                      ${
                        pathname === link.href
                          ? "text-white bg-black/20 shadow-inner"
                          : "text-amber-200 hover:text-white"
                      }`}
                  >
                    {link.label}
                    <span
                      className={`absolute inset-x-1 bottom-2 h-0.5 bg-amber-400 transition-all duration-500
                        ${
                          pathname === link.href
                            ? "opacity-100"
                            : "opacity-0 group-hover:opacity-100 scale-x-0 group-hover:scale-x-100"
                        }`}
                    />
                  </Link>
                )}
              </div>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <SearchBox className="hidden md:flex relative" />
            {/* Hamburger icon for mobile */}
          </div>
        </div>
      </header>

      {/* Side Navigation - only for mobile */}
      <div
        className={`fixed inset-0 z-50 bg-black/50 transition-opacity duration-200 md:hidden ${
          sideNavOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => {
          setSideNavOpen(false);
          setActiveCategory(null);
        }}
      />

      <div
        className={`fixed top-0 left-0 z-50 h-full w-[280px] bg-purple-900 shadow-xl transition-transform duration-300 ease-in-out md:hidden ${
          sideNavOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-6 border-b border-purple-700/50 bg-purple-800/30">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-amber-500/20 rounded-lg">
              <FaBookOpen className="text-amber-400 h-6 w-6" />
            </div>
            <span className="text-xl text-white font-bold tracking-wide">InfoNestOz</span>
          </div>
          <button
            onClick={() => {
              setSideNavOpen(false);
              setActiveCategory(null);
            }}
            className="p-2 text-purple-300 hover:text-white hover:bg-purple-700/50 rounded-lg transition-all duration-200"
          >
             <FaX className="h-4 w-4" />
            <span className="sr-only">Close menu</span>
          </button>
        </div>

         <nav className="p-4 overflow-y-auto h-full pb-32">
          <div className="space-y-2">
            {navLinks.map((link) => (
              <div key={link.href} className="w-full">
                {link.label === "Posts" ? (
                  <div className="space-y-1" ref={dropdownRef}>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsPostsDropdownOpen(!isPostsDropdownOpen);
                        if (!isPostsDropdownOpen) setActiveCategory(null);
                      }}
                      className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-left font-medium transition-all duration-200 group
                        ${
                          pathname.startsWith("/posts")
                            ? "bg-gradient-to-r from-amber-500/20 to-amber-600/20 text-white border border-amber-500/30 shadow-lg"
                            : "text-purple-200 hover:bg-purple-700/40 hover:text-white"
                        }`}
                    >
                      <div className="flex items-center gap-3">
                        <FileText className="h-5 w-5" />
                        <span className="text-base">{link.label}</span>
                      </div>
                      <ChevronDown
                         className={`h-4 w-4 transition-transform duration-200 ${
                          isPostsDropdownOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    {isPostsDropdownOpen && (
                       <div className="ml-4 mt-2 space-y-1 border-l-2 border-purple-600/50 pl-4">
                        {postCategories.map((category) => (
                          <div key={category.href} className="space-y-1">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  if (category.subCategories) {
                                    setActiveCategory(
                                      activeCategory === category.href
                                        ? null
                                        : category.href
                                    );
                                  } else {
                                    handleCategoryClick(category.href);
                                    setActiveCategory(null);
                                  }
                                }}
                               className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-left font-medium transition-all duration-200 group
                                ${
                                  pathname === category.href ||
                                  (
                                    category.subCategories &&
                                      category.subCategories.some((sub) => sub.href === pathname)
                                  )
                                    ? "bg-gradient-to-r from-amber-400/30 to-amber-500/20 text-white border border-amber-400/40 shadow-md"
                                    : "text-purple-200 hover:bg-purple-600/30 hover:text-white"
                                }`}
                              >
                                <div className="flex items-center gap-2">
                                <FaCircle className="h-2 w-2 opacity-60" />
                                <span className="text-sm font-medium">{category.name}</span>
                              </div>
                                {category.subCategories && (
                                  <ChevronRight
                                  className={`h-3 w-3 transition-transform duration-200 ${
                                    activeCategory === category.href ? "rotate-90" : ""
                                  }`}
                                />
                                )}
                              </button>

                              {/* Subcategories for mobile */}
                              {category.subCategories &&
                                activeCategory === category.href && (
                                   <div className="ml-4 space-y-1 border-l border-purple-500/30 pl-3">
                                    {/* Parent category link */}
                                    <Link
                                      href={category.href}
                                      onClick={() => {
                                        setSideNavOpen(false);
                                        setActiveCategory(null);
                                      }}
                                      className={`block px-3 py-2 text-sm font-semibold rounded-md transition-all duration-200 border-l-2
                                      ${
                                        pathname === category.href
                                          ? "bg-amber-400/20 text-amber-200 border-amber-400 shadow-sm"
                                          : "text-purple-300 hover:bg-purple-600/20 hover:text-white border-transparent hover:border-purple-400"
                                      }`}
                                >
                                      All {category.name}
                                    </Link>

                                    {/* Subcategories */}
                                    {category.subCategories?.map(
                                      (subcategory) => (
                                        <Link
                                          key={subcategory.href}
                                          href={subcategory.href}
                                          onClick={() => {
                                            setSideNavOpen(false);
                                            setActiveCategory(null);
                                          }}
                                         className={`block px-3 py-2 text-sm rounded-md transition-all duration-200 border-l-2 relative
                                        ${
                                          pathname === subcategory.href
                                            ? "bg-gradient-to-r from-amber-300/25 to-amber-400/15 text-amber-100 border-amber-300 shadow-sm font-medium"
                                            : "text-purple-300 hover:bg-purple-600/20 hover:text-white border-transparent hover:border-purple-400"
                                        }`}
                                  >
                                        {pathname === subcategory.href && (
                                      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-4 bg-amber-400 rounded-r-full" />
                                    )}
                                    {subcategory.name}
                                        </Link>
                                      )
                                    )}
                                  </div>
                                )}
                            </div>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    href={link.href}
                    onClick={() => {
                      setSideNavOpen(false);
                      setIsPostsDropdownOpen(false);
                      setActiveCategory(null);
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-200 group
                      ${
                        pathname === link.href
                          ? link.isSpecial
                            ? "bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-lg transform scale-[1.02]"
                            : "bg-gradient-to-r from-amber-500/20 to-amber-600/20 text-white border border-amber-500/30 shadow-lg"
                          : link.isSpecial
                            ? "bg-gradient-to-r from-amber-400/80 to-amber-500/80 text-white hover:from-amber-500 hover:to-amber-600 shadow-md hover:shadow-lg transform hover:scale-[1.02]"
                            : "text-purple-200 hover:bg-purple-700/40 hover:text-white"
                      }`}
                  >
                    {link.href === "/" && <Home className="h-5 w-5" />}
                    {link.href === "/offers-and-hacks" && <FaHackerNews className="h-5 w-5" />}
                    {link.href === "/about" && <User className="h-5 w-5" />}
                    {link.href === "/contact" && <Mail className="h-5 w-5" />}
                    <span className="text-base">{link.label}</span>
                  </Link>
                )}
              </div>
            ))}
          </div>
          <div className="mt-8 pt-6 border-t border-purple-700/50">
          <h3 className="text-purple-300 text-sm font-medium mb-3 px-2">Search</h3>
            <SearchBox mobile={true} closeMenu={closeMobileMenu} />
          </div>
        </nav>
      </div>
    </>
  );
}
