"use client";
import Link from "next/link";
import Image from "next/image";
import { Post } from "@/types/post";
import { formatDate } from "@/lib/formatDate";
import PopularPostsSlider from "@/app/components/related-post-slider";
import { urlFor } from "../../../../sanity/lib/image";
import { renderPortableText } from "../../../../sanity/lib/renderPortableText";
import { useGlobalData } from "@/lib/globalData";
import { postsQuery } from "@/lib/queries";
import { Button } from "@/app/components/ui/button";
import { ArrowLeft, Calendar, Clock, ThumbsUp } from "lucide-react";
import { Badge } from "@/app/components/ui/badge";
import { useRouter } from "next/navigation";
import { ShareButtons } from "@/app/components/share-buttons";
import { ArticleActions } from "@/app/components/article-actions";
import { AuthorCard } from "@/app/components/author-card";
import Script from "next/script";
import { use } from "react";
import Spinner from "@/app/components/spinner";

function StructuredData({ post }: { post: Post }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.content,
    datePublished: post.publishedAt,
    image: post.mainImage,
  };

  return (
    <Script
      id="structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export default function PageContent({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);

  const {
    data: cachedPosts,
    isLoading,
    error,
  } = useGlobalData<Post[]>(postsQuery);
  const post = cachedPosts?.find((post) => post.slug.current === slug);

  const router = useRouter();

  if (isLoading)
    return (
      <div>
        <Spinner loadingName="article" />
      </div>
    );

  if (error || !post) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold">Article Not Found</h2>
        <p className="mt-4 text-gray-600">
          The article you&apos;re looking for doesn&apos;t exist or may have been removed.
        </p>
        <button
          onClick={() => router.back()}
          className="mt-6 px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="max-w-7xl mx-auto">
        <section className="w-full py-6 md:py-12 lg:py-16 bg-gradient-to-b from-purple-50 to-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-start gap-4 md:gap-6">
              <Button
                variant="ghost"
                onClick={() => router.back()}
                asChild
                className="text-purple-900 hover:bg-purple-100"
              >
                <Link href={""} className="flex items-center gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  Back to Articles
                </Link>
              </Button>

              <div className="flex flex-wrap gap-2">
                <Badge
                  variant="secondary"
                  className="bg-purple-100 text-purple-900 hover:bg-purple-200"
                >
                  {post.category}
                </Badge>
              </div>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight max-w-4xl">
                {post.title}
              </h1>

              <p className="text-lg md:text-xl text-gray-700 max-w-3xl"></p>

              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-5">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>{formatDate(post.publishedAt)}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{post?.readMinute || 10} mins read</span>
                </div>
                <div className="flex items-center gap-1">
                  <ThumbsUp className="h-4 w-4" />
                  <span>{post.popularity || 0} views</span>
                </div>
              </div>
            </div>
          </div>
        </section>

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
          </div>
        )}

        {/* Content with interspersed images */}
        <article className="prose lg:prose-xl max-w-none mb-12 bg-grey-800">
          <div className="mb-4">{renderPortableText(post.content)}</div>
          <div className="mt-8 pt-8 border-t">
            <AuthorCard author={post.author} />
          </div>
          <div className="flex justify-center gap-4 mt-10">
            <ArticleActions
              articleId={post._id}
              popularity={post?.popularity}
            />
          </div>
        </article>
      </div>
      {/* Mobile Share & Actions Bar - Fixed at bottom on mobile */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t p-3 z-40 flex justify-between items-center">
        <ShareButtons
          title={post.title}
          slug={post.slug.current}
          variant="compact"
        />
        <ArticleActions articleId={post._id} variant="compact" />
      </div>
      <div className="g-white text-gray-900 shadow-md rounded-xl p-5">
        <PopularPostsSlider tags={post.tags} currentPostId={post._id} />
      </div>
      <StructuredData post={post} />
    </div>
  );
}
