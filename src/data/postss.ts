import { Post } from '@/types/post';
import { v4 as uuidv4 } from 'uuid';

export function getPostsByCategory(category: string): Post[] {
    return posts.filter(post => post.category === category)
  }

export const posts : Post[] = [
  {
    id:1,
    title: 'Getting Started with Sanity CMS',
    slug: { _type: 'slug', current: 'getting-started-with-sanity' },
    content : [
      {
        _type: 'block',
        _key: uuidv4(),
        style: 'normal',
        markDefs: [],
        children: [
          {
            _type: 'span',
            _key: uuidv4(),
            text: 'Sanity is a powerful headless CMS that works perfectly with modern web applications.',
            marks: [],
          },
        ],
      },
    ],
    category: 'tutorial',
    date: new Date().toISOString(),
    tags: ['sanity', 'pwa', 'cms'],
    mainImage: {
      asset: {
        _ref: 'image-abc123-2000x3000-jpg', // Replace with actual image reference

      }
    },
    popularity: 10
  },
  {
    id: 2,
    title: 'Advanced PWA Techniques',
    slug: { _type: 'slug', current: 'advanced-pwa-techniques' },
    content: [
      {
        _type: 'block',
        _key: uuidv4(),
        style: 'normal',
        markDefs: [],
        children: [
          {
            _type: 'span',
            _key: uuidv4(),
            text: 'Sanity is a powerful headless CMS that works perfectly with modern web applications.',
            marks: [],
          },
        ],
      },
    ],
    category: 'tutorial',
    date: new Date(Date.now() - 86400000).toISOString(), // Yesterday
    tags: ['pwa', 'offline', 'performance'],
    mainImage: {
      asset: {
        _ref: 'image-ghi789-2000x3000-jpg' // Replace with actual image reference
      }
    },
    popularity: 25
  }
]