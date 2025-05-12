"use client";
import { useSearchParams } from "next/navigation";
import PostList_Layout from "../components/postlist-layout";
import { Suspense } from "react";

export default function TagFilterPage() {
  return (
    <Suspense>
      <TagFilter />
    </Suspense>
  );
}

function TagFilter() {
  const searchParams = useSearchParams();
  const query = searchParams.get("t") || "";

  return (
    <div>
      <PostList_Layout tag={query} />
    </div>
  );
}
