export interface NavLink {
  href: string;
  label: string;
  isSpecial?: boolean;
}

export interface PostCategory {
  name: string;
  href: string;
}

export const navLinks: NavLink[] = [
  { href: '/', label: 'Home' },
  { href: '/welcome', label: 'Welcome', isSpecial: true },
  { href: '/posts', label: 'Posts' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' }
];

export const postCategories: PostCategory[] = [
  { name: 'Blog', href: '/postsCategories/blog' },
  { name: 'Commercial', href: '/postsCategories/commercial' },
  { name: 'Bargain', href: '/postsCategories/bargain' },
  { name: 'News', href: '/postsCategories/news' }
];