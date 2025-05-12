"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Post } from "@/types/post";
import { ChevronRight, Calendar, User } from "lucide-react";
import { urlFor } from "../../../sanity/lib/image";
import {
  PortableTextRenderer,
  toCustomPortableText,
} from "../../../sanity/lib/portableTextWithSlicer";
import { Button } from "@/app/components/ui/button";
import { Badge } from "@/app/components/ui/badge";
import Link from "next/link";

interface PostCarouselProps {
  posts?: Post[];
  autoplayInterval?: number;
}

export function PostCarousels({
  posts,
  autoplayInterval = 5000,
}: PostCarouselProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slideInterval = useRef<NodeJS.Timeout | null>(null);

  // Handle automatic slideshow
  useEffect(() => {
    // Start the slideshow
    startSlideshow();

    // Cleanup on unmount
    return () => {
      if (slideInterval.current) {
        clearInterval(slideInterval.current);
      }
    };
  }, []);

  // Start slideshow function
  const startSlideshow = () => {
    if (slideInterval.current) {
      clearInterval(slideInterval.current);
    }

    slideInterval.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % posts!.length);
    }, autoplayInterval);
  };

  // Go to specific slide
  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    // Reset interval when manually changing slides
    startSlideshow();
  };

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-purple-50 relative bg-white text-gray-900 shadow-md rounded-xl">
      <div className="container px-4 md:px-6 relative">
        {/* Carousel */}
        <div className="relative overflow-hidden">
          {/* Slides */}
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {posts!.map((post) => (
              <div key={post._id} className="w-full flex-shrink-0">
                <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
                  <div className="flex flex-col justify-center space-y-4">
                    <div className="space-y-2">
                      <Badge
                        variant="outline"
                        className="inline-flex bg-purple-100 text-purple-900 hover:bg-purple-200"
                      >
                        Featured Post
                      </Badge>
                      <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                        {post.title}
                      </h1>
                      <div className="max-w-[600px] text-muted-foreground md:text-xl">
                        <PortableTextRenderer
                          content={toCustomPortableText(post.content)}
                          wordLimit={30}
                          removeImages={true}
                        />
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>
                          {new Date(post.date).toLocaleDateString("en-GB")}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <User className="h-4 w-4" />
                        <span>Ritcus Matgau</span>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2 min-[400px]:flex-row">
                      <Link href={`/post/${post._id}`}>
                        <Button className="bg-purple-900 hover:bg-purple-800">
                          Read Article
                          <ChevronRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                      <Button
                        variant="outline"
                        className="border-purple-900 text-purple-900 hover:bg-purple-100"
                      >
                        Save for Later
                      </Button>
                    </div>
                  </div>
                  <Image
                    src={urlFor(post.mainImage).url()}
                    width={800}
                    height={550}
                    alt={post.title}
                    className="mx-auto aspect-video overflow-hidden rounded-xl object-cover"
                    priority
                  />
                </div>
              </div>
            ))}
          </div>
          {/* Dots Indicator */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
            {posts!.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full ${currentSlide === index ? "bg-purple-900" : "bg-purple-200"}`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
