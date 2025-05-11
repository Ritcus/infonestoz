'use client'
import { Suspense } from "react";
import PostList_Layout from "../components/postlist-layout"
import { useSearchParams } from "next/navigation"

function Search(){

const searchParams = useSearchParams();
const query = searchParams.get("q")|| "";

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <PostList_Layout key={query} searchKeywords={query} />
            </Suspense>
    )
}

export default function SearchPage () {
   
    return <Suspense>
    <Search />
  </Suspense>
  }