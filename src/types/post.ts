import { PortableTextBlock } from "sanity";

export type Author = {
    name: string;
    image?:string;
}

export const subCategories: string[] = [
  "Travel",
  "Finance",
  "Health",
  "Review & Recommendations",
  "Tips & Advice",
  "Life Hacks",
  "Food",
  "Technology",
  "News",
];

export type Post = {
  _id: string;
  title: string;
  slug: {
    _type: "slug";
    current: string;
  };
  content: PortableTextBlock[];
  category: string;
  subCategory: string;
  publishedAt: string;
  tags: string[];
  isFeatured: boolean;
  readMinute?: string;
  author?: Author;
  mainImage: {
    asset: {
      _ref: string;
    };
  };
  popularity?: number;
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
