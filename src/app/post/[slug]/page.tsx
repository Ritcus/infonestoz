import { Metadata } from "next";
import { client } from "../../../../sanity/lib/client";
import PageContent from "./PageContent";
import { Suspense } from "react";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {

  const slug = (await params).slug;
  const post = await client.fetch(
    `*[_type == "post" && slug.current == $slug][0]{
      title,
      content,
      "mainImage": mainImage.asset->url,
      publishedAt,
      author->{name}
    }`,
    { slug: slug}
  )
  return {
    title: `Post: ${slug}` || 'Post Not Found',
    description: post.content || 'Post not available',
    openGraph: {
      title: post.title,
      description: post.content,
      type: 'article',
      publishedTime: post.publishedAt,
      images: [
        {
          url: post.mainImage,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.content,
      images: [post.mainImage],
    },
  }
}



export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  return (
      <PageContent params={params} />
  )
}
