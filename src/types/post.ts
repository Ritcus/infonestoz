import { PortableTextBlock } from "sanity";

export type Post = {
    id: number;
    title: string;
    slug: {
      _type: 'slug';
      current: string;
    };
    content: PortableTextBlock[]; // Optional for full article view
    category: string;
    date: string;
    tags: string[];
    mainImage: {
      asset: {
        _ref: string;
      }
    }
    popularity?:number;
  };
  
  // For API responses
  export type PostsResponse = {
    data: Post[];
    meta?: {
      pagination?: {
        page: number;
        pageSize: number;
        total: number;
      };
    };
  };