"use client";

import { useState } from "react";
import { Button } from "@/app/components/ui/button";
import { ThumbsUp, Bookmark, Flag } from "lucide-react";
import { cn } from "@/lib/utils";

interface ArticleActionsProps {
  articleId: string;
  variant?: "default" | "compact";
  popularity?: number;
}

export function ArticleActions({
  popularity,
  variant = "default",
}: ArticleActionsProps) {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(popularity || 0);
  const [bookmarked, setBookmarked] = useState(false);

  const handleLike = async () => {
    // In a real app, you would call an API to like the article
    setLiked(!liked);
    setLikeCount(liked ? likeCount - 1 : likeCount + 1);
  };

  const handleBookmark = async () => {
    // In a real app, you would call an API to bookmark the article
    setBookmarked(!bookmarked);
  };

  if (variant === "compact") {
    return (
      <div className="flex items-center">
        <Button
          variant="ghost"
          size="icon"
          onClick={handleLike}
          className={cn(
            "h-9 w-9",
            liked ? "text-purple-700" : "text-gray-600 hover:text-purple-700"
          )}
        >
          <ThumbsUp className="h-4 w-4" />
          <span className="sr-only">{liked ? "Unlike" : "Like"}</span>
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={handleBookmark}
          className={cn(
            "h-9 w-9",
            bookmarked
              ? "text-purple-700"
              : "text-gray-600 hover:text-purple-700"
          )}
        >
          <Bookmark className="h-4 w-4" />
          <span className="sr-only">
            {bookmarked ? "Remove bookmark" : "Bookmark"}
          </span>
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap gap-2">
      <Button
        variant="outline"
        onClick={handleLike}
        className={cn(
          "gap-2",
          liked
            ? "bg-purple-100 text-purple-900 border-purple-300"
            : "text-gray-700 hover:text-purple-900 hover:border-purple-300"
        )}
      >
        <ThumbsUp className="h-4 w-4" />
        <span>{liked ? "Liked" : "Like"}</span>
        <span className="ml-1 text-xs bg-gray-100 px-2 py-0.5 rounded-full">
          {likeCount}
        </span>
      </Button>
      <Button
        variant="outline"
        onClick={handleBookmark}
        className={cn(
          "gap-2",
          bookmarked
            ? "bg-purple-100 text-purple-900 border-purple-300"
            : "text-gray-700 hover:text-purple-900 hover:border-purple-300"
        )}
      >
        <Bookmark className="h-4 w-4" />
        <span>{bookmarked ? "Bookmarked" : "Bookmark"}</span>
      </Button>
      <Button
        variant="outline"
        className="gap-2 text-gray-700 hover:text-red-600 hover:border-red-200"
      >
        <Flag className="h-4 w-4" />
        <span>Report</span>
      </Button>
    </div>
  );
}
