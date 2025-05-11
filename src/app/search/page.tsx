'use client'
import { useGlobalData } from "@/lib/globalData"
import PostList_Layout from "../components/postlist-layout"
import { Post } from "@/types/post"
import { postsQuery } from "@/lib/queries"
import { useEffect, useMemo, useState } from "react"
import { useSearchParams } from "next/navigation"

export default function SearchPage (){

const searchParams = useSearchParams();
const query = searchParams.get("q")|| "";

    return (
         <div>
            <PostList_Layout searchKeywords={query} />
        </div>
    )
}