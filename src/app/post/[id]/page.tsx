'use client'
import Link from 'next/link'
import Image from 'next/image'
import { Post } from '@/types/post'
import { useEffect, useState } from 'react'
import { formatDate } from '@/lib/utils'
import { FaRegHeart, FaHeart, FaShare } from 'react-icons/fa';
import PopularPostsSlider from '@/app/components/postSlider/page'
import { useParams } from 'next/navigation'
import { urlFor } from '../../../../sanity/lib/image'
import { PortableText } from 'next-sanity'


export default function PostPage() {
  const [post, setPost] = useState<Post>();
  const [isLiked, setIsLiked] = useState(false);
  //const {id} = await params;
  const {id} = useParams();
  const postId = id;

console.log("postId",postId)
  useEffect(() => {
    console.log(sessionStorage.getItem(`post_${postId}`));
      const storedPost = sessionStorage.getItem(`post_${postId}`);
      console.log("storedid",storedPost)
      if (storedPost) {
        setPost(JSON.parse(storedPost));
        console.log(storedPost)    
    }
  }, [postId]);

  if (!post) return <div>Post not found</div>

  // const renderContent = () => {
  //   // Double-check post.content exists
  //   if (!post?.content) {
  //     console.error("No content found in post:", post);
  //     return <p className="text-gray-500">No content available</p>;
  //   }
  
  //   // Debug: Log the raw content
  //   console.log("Raw content:", post.content);
  
  //   // Normalize content - handle both {/n} and natural paragraphs
  //   let paragraphs = [];
    
  //   if (typeof post.content === 'string') {
  //     // Check if {/n} markers exist
  //     if (post.content.includes('{/n}')) {
  //       paragraphs = post.excerpt.split('{/n}');
  //     } else {
  //       // Fallback to splitting by double newlines or single if content is short
  //       paragraphs = post.excerpt.split(/\n\n+/);
        
  //       // If still no paragraphs, split by single newlines
  //       if (paragraphs.length <= 1) {
  //         paragraphs = post.excerpt.split('\n');
  //       }
  //     }
      
  //     // Clean up paragraphs
  //     paragraphs = paragraphs
  //       .map(p => p.trim())
  //       .filter(p => p.length > 0);
  //   } else {
  //     console.error("Post content is not a string:", typeof post.content);
  //     return <p className="text-gray-500">Content format invalid</p>;
  //   }
  
    // Debug: Log parsed paragraphs
    //console.log("Parsed paragraphs:", paragraphs);
  
    // Ensure images array exists
    //const images = Array.isArray(post.images) ? post.images : [];
  
    //return paragraphs.map((paragraph, index) => {
      // Determine if we should show an image (skip index 0 which is featured)
      //const shouldShowImage = images.length > index + 1;
  
  //     return (
  //       <div key={`para-${index}`} className="mb-6">
  //         {/* Paragraph text */}
  //         <p className="text-gray-700 mb-4 whitespace-pre-line">
  //           {paragraph}
  //         </p>
  
  //         {/* Show image if available */}
  //         {shouldShowImage && images[index + 1] && (
  //           <div className="my-8 flex justify-center">
  //           <div className="relative w-full max-w-2xl h-64 md:h-80 lg:h-96 rounded-lg overflow-hidden">
  //             <Image
  //               src={images[index + 1]}
  //               alt={`${post.title} illustration ${index + 1}`}
  //               fill
  //               className="object-cover"
  //               sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
  //               onError={(e) => {
  //                 console.error("Failed to load image:", images[index + 1]);
  //                 e.currentTarget.style.display = 'none';
  //               }}
  //             />
  //           </div>
  //           </div>
  //         )}
  //       </div>
  //     );
  //   });
  // };
  return (
    <div>
    <div className='bg-white text-gray-900 shadow-md rounded-xl p-5'>
      
      {/* Breadcrumb Navigation */}
      <nav className="flex mb-8 text-l italic text-blue-800 " aria-label="Breadcrumb">
        <ol className="inline-flex items-center space-x-1 md:space-x-3 ">
          <li className="inline-flex items-center ">
            <Link href="/" className="inline-flex items-center font-medium hover:text-purple-600">
              Home
            </Link>
          </li>
          <li>
            <div className="flex items-center">
              <svg className="w-3 h-3 mx-1 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
              <Link href={`/postsCategories/${post.category?.toLowerCase()}`} className="ml-1 font-medium hover:text-purple-600">
                {post.category}
              </Link>
            </div>
          </li>
          <li aria-current="page">
            <div className="flex items-center">
              <svg className="w-3 h-3 mx-1 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
              <span className="ml-1 font-medium text-gray-900">{post.title}</span>
            </div>
          </li>
        </ol>
      </nav>
      
      {/* Main Blog Section */}
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
      {/* Title Section */}
      
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-8">{post.title}</h1>

      {/* Tags and Date */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-12">
        <div className="flex flex-wrap gap-2 mb-4 md:mb-0">
          {post.tags?.map(tag => (
            <span key={tag} className="text-xs font-medium px-2 py-1 bg-gray-100 text-gray-800 rounded-full">
              {tag}
            </span>
          ))}
        </div>
        <span className="text-sm text-gray-500">{formatDate(post.date)}</span>
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
          {/* Image gallery indicators if multiple images */}
          {/* {post.images.length > 1 && (
            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
              {post.images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-3 h-3 rounded-full ${currentImageIndex === index ? 'bg-white' : 'bg-white/50'}`}
                  aria-label={`Go to image ${index + 1}`}
                />
              ))}
            </div>
          )} */}
        </div>
      )}

      {/* Content with interspersed images */}
      <article className="prose lg:prose-xl max-w-none mb-12 bg-grey-800">
         <div className="mb-4">
                            <PortableText value={post.content ?? []}/>
        </div>
      </article>

      {/* Social Actions */}
      <div className="flex justify-center gap-4 mt-12">
        <button className="flex items-center gap-2 px-6 py-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors hover:bg-purple-300"
        onClick={() => {
          const newValue = !isLiked;
          setIsLiked(newValue);
          // Update popularity count
          const updatedPost = {
            ...post,
            popularity: (newValue ? (post.popularity || 0) + 1 :(post.popularity || 0) - 1)
          };
          
          // Save to sessionStorage
          sessionStorage.setItem(`post_${post.id}`, JSON.stringify(updatedPost));
          
          // Optional: Send to API
          // fetch(`/api/posts/${post.id}/like`, { method: 'POST' });
          
          // Update local state if needed
          setPost(updatedPost);
        }}
      >
          {isLiked ? (
          <FaHeart className="text-red-500" />
        ) : (
          <FaRegHeart />
        )}
        Like{post.popularity || 0 >= 1 ? ` ${post.popularity}` : ''}
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
    <div className='g-white text-gray-900 shadow-md rounded-xl p-5'>
    <PopularPostsSlider />
  </div>
  </div>
  )
}