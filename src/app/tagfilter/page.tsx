'use client'
import { useSearchParams } from "next/navigation";
import PostList_Layout from "../components/postlist-layout";

export default function TagFilterPage (){

const searchParams = useSearchParams();
const query = searchParams.get("t")|| "";

    return (
         <div>
            <PostList_Layout tag={query} />
        </div>
    )
}