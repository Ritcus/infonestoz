'use client'
import Image from "next/image";
import Link from 'next/link';
import { posts } from "@/data/posts";
import { FaFacebook, FaInstagram, FaTiktok, FaYoutube } from 'react-icons/fa'
import { usePostNavigation } from "@/lib/usePostNavigation";
import { postCategories } from "@/types/navigation";
import PostCarousel from "../components/postCarousel/PostCarousel";


export default function Home() {

  const { navigateToPost } = usePostNavigation();
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section  className="w-full flex-grow-0 h-[100vh] max-h-[800px] relative bg-white text-gray-900 shadow-md rounded-xl">
        <PostCarousel posts={posts.slice(0, 3)} /> {/* Only use 3 latest posts */}
      </section >

      <div className="flex-grow flex w-full ">    
      <div className="lg:w-2/3 px-4 py-12 lg:pl-8 lg:pr-12 mt-5 justify-self-auto bg-white text-gray-900 shadow-md rounded-xl">
      {/* Blog Posts */}
      <div className="text-center">
    <h3 className="font-bold text-black text-4xl inline-block px-4 relative z-10">
      Featured Posts
    </h3>
    <div className="h-2 w-full bg-purple-800"></div>
  </div>
  <div>
        {posts.slice(0,5).map(post => (
          <article key={post.id} className="border-b pb-12 p-5 hover:bg-gray-200 hover:text-amber-600 line-clamp-2 transition-colors" style={{
            cursor: "pointer", // Changes to grab hand cursor
          }}
          onClick={() => navigateToPost(post)}
          >
            <div className="flex flex-col md:flex-row gap-6 transition-shadow">
              <div className="md:w-1/3">
                <Image 
                  src={post.image} 
                  alt={post.title}
                  width={400}
                  height={300}
                  className="rounded-lg object-cover w-full h-48"
                />
              </div>
              <div className="md:w-2/3">
                <h3 className="text-2xl font-bold mb-2">{post.title}</h3>
                <p className="text-gray-600 mb-4">{post.excerpt}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.map(tag => (
                    <span key={tag} className="bg-gray-200 px-3 py-1 rounded-full text-sm">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="text-sm text-gray-500">
                  {post.date} · {post.category}
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
      </div>
      
      
      <div className="lg:w-1/3 px-4 py-12 lg:pr-8 lg:pl-4 space-y-10">
  {/* 1. Work & Life Categories */}
  <div className="bg-white p-6 rounded-xl bg-white text-gray-900 shadow-md rounded-xl">
  <div className="text-center">
    <h3 className="font-bold text-black text-xl inline-block px-4 relative z-10">
      Categories
    </h3>
    <div className="h-2 w-full bg-purple-800"></div>
  </div>
    <ul className="space-y-3 p-5">
      {postCategories.map((category) => (
        <li key={category.name}>
          <Link 
            href={category.href}
            className="flex items-center gap-3 p-2 hover:bg-gray-300 rounded-lg transition-colors"
          >
            <div className="w-2 h-2 bg-amber-400 rounded-full"></div>
            <span className="font-medium text-gray-700 hover:text-amber-600">
              {category.name}
            </span>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-4 w-4 ml-auto text-gray-400" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </li>
      ))}
    </ul>
  </div>

  {/* 2. Staff Picks */}
  <div className="bg-white p-6 rounded-xl shadow-sm bg-white text-gray-900 shadow-md rounded-xl">
  <div className="text-center">
    <h3 className="font-bold text-black text-xl inline-block px-4 relative z-10">
      Staff Pick
    </h3>
    <div className="h-2 w-full bg-purple-800"></div>
  </div>
    <div className="space-y-4 p-5">
      {posts.slice(0, 5).map((post) => (
        <div key={post.id} className="group" style={{
          cursor: "pointer", // Changes to grab hand cursor
        }}
        onClick={() => navigateToPost(post)}>
          <div 
            className="flex gap-3 items-start py-3"
          >
            <div className="flex-shrink-0 w-16 h-16 relative overflow-hidden rounded-md">
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform"
              />
            </div>
            <div>
              <h4 className="font-medium text-gray-900 group-hover:text-amber-600 line-clamp-2">
                {post.title}
              </h4>
              <p className="text-xs text-gray-500 mt-1">{post.date}</p>
            </div>
          </div>
          <div className="border-t border-gray-100 last:hidden"></div>
        </div>
      ))}
    </div>
  </div>

  {/* 3. Connect With Us */}
  <div className="bg-white p-6 rounded-xl shadow-sm bg-white text-gray-900 shadow-md rounded-xl">
  <div className="text-center">
    <h3 className="font-bold text-black text-xl inline-block px-4 relative z-10">
      Connect With Us
    </h3>
    <div className="h-2 w-full bg-purple-800"></div>
  </div>
    <div className="space-y-3 p-5">{[
      {name:"Facebook", icon: FaFacebook, color:"blue" },
      {name:"Instagram", icon: FaInstagram, color:"yellow"},
      {name:"Tiktok", icon: FaTiktok, color:"black"},
      {name:"Youtube", icon: FaYoutube, color:"red"},
    ].map((social) => (
        <a
          key={social.name}
          href="#"
          className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-300 transition-colors group"
          aria-label={social.name}
        >
            <social.icon/>
          <span className="font-medium text-gray-700">{social.name}</span>
        </a>
      ))}
    
  </div>
</div>
      </div>
      </div>
      
    </div>
  );
}
