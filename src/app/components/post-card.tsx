"use client";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight, Calendar, User } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/app/components/ui/card";
import { Badge } from "@/app/components/ui/badge";
import { Post } from "@/types/post";
import { urlFor } from "../../../sanity/lib/image";
import {
  PortableTextRenderer,
  toCustomPortableText,
} from "../../../sanity/lib/portableTextWithSlicer";

interface PostCardProps {
  post: Post;
}

export function PostCard({ post }: PostCardProps) {
  return (
    <Card className="overflow-hidden h-full flex flex-col">
      <CardHeader className="p-0">
        <Link href={`/post/${post._id}`}>
          <Image
            src={urlFor(post.mainImage).url()}
            width={500}
            height={250}
            alt={post.title}
            priority
            className="aspect-[2/1] w-full object-cover transition-transform hover:scale-105 duration-300"
          />
        </Link>
      </CardHeader>
      <CardContent className="p-4 pt-6 flex-grow">
        <div className="flex items-center justify-between mt-4 mb-1">
          <Badge
            variant="secondary"
            className="bg-purple-100 text-purple-900 hover:bg-purple-200 text-xs whitespace-nowrap"
          >
            {post.category}
          </Badge>
          <div className="flex flex-wrap gap-1">
            {post.tags && post.tags.length > 0 ? (
              post.tags.slice(0, 2).map((tag) => (
                <Badge
                  key={tag}
                  variant="outline"
                  className="text-xs border-purple-200 text-purple-700"
                >
                  {tag}
                </Badge>
              ))
            ) : (
              <div className="h-5"></div>
            )}
          </div>
        </div>
        <Link href={`/post/${post.slug.current}`}
          className="hover:text-purple-900 transition-colors"
        >
          <h3 className="text-xl font-bold">{post.title}</h3>
        </Link>
        <div className="line-clamp-2 mt-2 text-muted-foreground">
          <PortableTextRenderer
            content={toCustomPortableText(post.content)}
            wordLimit={30}
            removeImages={true}
          />
        </div>
        <div className="flex items-center gap-20 mt-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            <span>{new Date(post.date).toLocaleDateString("en-GB")}</span>
          </div>
          <div className="flex items-center gap-1">
            <User className="h-3 w-3" />
            <span>Admin</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 mt-auto">
        <Button
          variant="link"
          asChild
          className="px-0 text-purple-900 hover:text-purple-700"
        >
          <Link href={`/post/${post.slug.current}`}>
            Read More
            <ChevronRight className="ml-1 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
