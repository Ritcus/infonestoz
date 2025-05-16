// utils/seoUtils.ts
import { Post } from '@/types/post'
import { Metadata } from 'next'
import { toPlainText } from 'next-sanity'
import Script from 'next/script'


export function generatePostMetadata(post: Post): Metadata {

    const description = post.content ? toPlainText(post.content): "";
  
  return {
    title: `${post.title} | Your Blog`,
    description: description,                      
    openGraph: {
      type: 'article',
      title: post.title,
      description: description.substring(0, 160),
      publishedTime: post.publishedAt,
      authors: post.author?.name,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: description,
    },
    alternates: {
      canonical: `https://infonestoz.vercel.app/post/${post.slug}`,
    },
  }
}

export function PostStructuredData({ post }: { post: Post }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.content,
    "datePublished": post.publishedAt,
    "author": {
      "@type": "Person",
      "name": post.author?.name,
    },
    "image": post.mainImage,
    "url": `https://infonestoz.vercel.app/post/${post.slug}`
  }

  return (
    <Script
      id="post-structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}