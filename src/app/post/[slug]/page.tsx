import { Metadata } from "next";
import { client } from "../../../../sanity/lib/client";
import Script from "next/script";
import PageContent from "./PageContent";

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const post = await client.fetch(
    `*[_type == "post" && slug.current == $slug][0]{
      title,
      content,
      "mainImage": mainImage.asset->url,
      publishedAt,
      author->{name}
    }`,
    { slug: params.slug }
  )

  console.log(post)
  return {
    title: `${post.title} | Your Blog`,
    description: post.content,
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



export default function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return (
    <PageContent params={params} />
  )
}
