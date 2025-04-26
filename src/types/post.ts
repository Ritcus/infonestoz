export type Post = {
    id: number;
    title: string;
    excerpt: string;
    content?: string; // Optional for full article view
    category: string;
    date: string;
    tags: string[];
    image: string;
    images:string[];
    popularity?:number;
    slug: string; // Added for clean URLs
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