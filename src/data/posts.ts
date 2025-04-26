import { Post } from '@/types/post';

export function getPostsByCategory(category: string): Post[] {
    return posts.filter(post => post.category === category)
  }

export const posts : Post[] = [
    {
      id: 1,
      title: "Buying a Telescope",
      excerpt: "Buying the right telescope to take your love of astronomy to the next level...",
      category: "Bargain",
      date: "Oct 30, 2023",
      tags: ["guides", "telescopes"],
      image: "/images/telescope.jpg",
      images: ["/images/telescope.jpg"],
      slug: "buying-a-telescope"
    },
    {
        id: 10,
        title: "Buying a Telescope",
        excerpt: "Buying the right telescope to take your love of astronomy to the next level...",
        category: "Bargain",
        date: "Oct 30, 2023",
        tags: ["guides", "telescopes"],
        image: "/images/telescope.jpg",
        images: ["/images/telescope.jpg"],
        slug: "buying-a-telescope"
      },
      {
        id: 12,
        title: "Buying a Telescope",
        excerpt: "Buying the right telescope to take your love of astronomy to the next level...",
        category: "Bargain",
        date: "Oct 30, 2023",
        tags: ["guides", "telescopes"],
        images: ["/images/telescope.jpg"],
        image: "/images/telescope.jpg",
        popularity:11,
        slug: "buying-a-telescope"
      },
      {
        id: 13,
        title: "See a Telescope",
        excerpt: "Buying the right telescope to take your love of astronomy to the next level...",
        category: "Bargain",
        date: "Oct 30, 2023",
        tags: ["free", "telescopes"],
        images: ["/images/telescope.jpg"],
        image: "/images/telescope.jpg",
        popularity:11,
        slug: "buying-a-telescope"
      },
      {
        id: 15,
        title: "Sell a Telescope",
        excerpt: "Buying the right telescope to take your love of astronomy to the next level...",
        category: "Bargain",
        date: "Oct 20, 2023",
        tags: ["deals", "telescopes"],
        images: ["/images/telescope.jpg"],
        image: "/images/telescope.jpg",
        popularity:11,
        slug: "buying-a-telescope"
      },
      {
        id: 16,
        title: "Selling a Telescope",
        excerpt: "Buying the right telescope to take your love of astronomy to the next level...",
        category: "Bargain",
        date: "Oct 10, 2023",
        tags: ["free", "deals"],
        images: ["/images/telescope.jpg"],
        image: "/images/telescope.jpg",
        popularity:11,
        slug: "buying-a-telescope"
      },
      {
        id: 14,
        title: "Buying a Telescope",
        excerpt: "Buying the right telescope to take your love of astronomy to the next level...",
        category: "Bargain",
        date: "Oct 30, 2023",
        tags: ["guides", "telescopes"],
        images: ["/images/telescope.jpg"],
        image: "/images/telescope.jpg",
        popularity:11,
        slug: "buying-a-telescope"
      },
    {
      id: 2,
      title: "How to choose the right hotel",
      excerpt: "So you're going abroad, you've chosen your destination and now you have to choose a hotel... {/n}So you're going abroad, you've chosen your destination and now you have to choose a hotel... {/n}",
      category: "Blog",
      date: "Oct 27, 2023",
      tags: ["hotels"],
      image: "/images/hotel.jpg",
      images: ["/images/telescope.jpg","/images/telescope.jpg"],
      popularity:11,
      slug: "buying-a-telescope"
    },
    {
      id: 3,
      title: "Maui helicopter tours",
      excerpt: "Maui helicopter tours are a great way to see the island from a different perspective...",
      category: "News",
      date: "Oct 26, 2023",
      images: ["/images/telescope.jpg"],
      tags: ["adventure"],
      popularity:11,
      image: "/images/helicopter.jpg",
      slug: "buying-a-telescope"
    }
  ]