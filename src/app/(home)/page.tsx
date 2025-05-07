"use client"
import Link from "next/link"
import Image from "next/image"
import { PostCarousels } from "../components/post-carousel"
import { ChevronRight, Calendar, User } from "lucide-react"
import { useEffect, useState } from "react";
import { Post } from "@/types/post";
import { urlFor } from "../../../sanity/lib/image";
import { PortableTextRenderer, toCustomPortableText } from "../../../sanity/lib/portableTextWithSlicer";
import getUniqueTags from "../../lib/getUniqueTags"
import { TagsWithCount } from "@/types/TagsWithCount";
import { Card,
  CardContent,
  CardFooter,
  CardHeader, } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useGlobalData } from "@/lib/globalData"
import { postsQuery } from "@/lib/queries"

export default function Home() {

  const [postsList, setPosts] = useState<Post[]>([]);
  const { data: posts } = useGlobalData<Post[]>(postsQuery)
  const [tagsList, settagsList] = useState<TagsWithCount[]>([]);
    useEffect(() => {
      const fetchData = async () => {
        if(posts){
          setPosts(posts);
          settagsList(getUniqueTags(posts));
        } 
       }
       fetchData();
    }, [posts])
    
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        {/* Featured Post Carousel */}
        <PostCarousels posts={postsList?.slice(0, 3)} />

        {/* Recent Posts */}
        <section className="w-full py-12 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
              <div className="space-y-1">
                <h2 className="text-3xl font-bold tracking-tighter">Recent Articles</h2>
                <p className="text-muted-foreground">Explore our latest thoughts and insights</p>
              </div>
              <Button variant="outline" asChild className="border-purple-900 text-purple-900 hover:bg-purple-100">
                <Link href="/post">View All Posts</Link>
              </Button>
            </div>

            <div className="grid gap-6 pt-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
              {postsList?.map((post) => (
                <Card key={post._id} className="overflow-hidden bg-white text-gray-900 shadow-md rounded-xl">
                  <CardHeader className="p-0">
                    <Image
                      src={urlFor(post.mainImage).url()}
                      width={500}
                      height={250}
                      alt={post.title}
                      className="aspect-[2/1] w-full object-cover"
                    />
                  </CardHeader>
                  <CardContent className="p-4 pt-6">
                  <Badge variant="secondary" className="mb-2 bg-purple-100 text-purple-900 hover:bg-purple-200">
                      {post.category}
                    </Badge>
                    <h3 className="text-xl font-bold">{post.title}</h3>
                    <div className="line-clamp-2 mt-2 text-muted-foreground"> 
                      <PortableTextRenderer content={toCustomPortableText(post.content)} wordLimit={30} removeImages={true}/></div>
                    <div className="flex items-center gap-2 mt-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        <span>{new Date(post.date).toLocaleDateString('en-GB')}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <User className="h-3 w-3" />
                        <span>Ritcus Matgau</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="p-4 pt-0">
                  <Link href={`/post/${post._id}`}>
                  <Button variant="link" className="px-0 text-purple-900 hover:text-purple-700">                  
                      Read More
                      <ChevronRight className="ml-1 h-4 w-4" />
                      
                    </Button>
                    </Link>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>
        {/* Categories */}
        <section className="w-full py-12 md:py-24 bg-purple-900 text-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Browse by Category</h2>
                <p className="mx-auto max-w-[700px] md:text-xl">
                  Find exactly what you&apos;re looking for in our diverse collection of topics
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-8 md:grid-cols-3 lg:grid-cols-4">
              {tagsList.slice(0,8).map((tag) => (
                <Link
                  key={tag.name}
                  href="#"
                  className="flex flex-col items-center justify-center p-6 rounded-lg text-black bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600"
                >
                  <h3 className="text-lg font-medium">{tag.name}</h3>
                  <p className="text-sm text-muted-foreground">{tag.count} articles</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter */}
        <section className="w-full py-12 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Stay Updated</h2>
                <p className="text-muted-foreground">
                  Subscribe to our newsletter to get the latest articles, resources, and insights delivered straight to
                  your inbox.
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <form className="flex w-full max-w-sm flex-col gap-2 sm:flex-row sm:max-w-md">
                  <input type="email" placeholder="Enter your email" className="flex-1" />
                  <Button type="submit" className="bg-purple-900 hover:bg-purple-800">
                    Subscribe
                  </Button>
                </form>
                <p className="text-xs text-muted-foreground">
                  By subscribing, you agree to our Terms of Service and Privacy Policy.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

