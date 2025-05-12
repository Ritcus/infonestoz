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
  { href: "/", label: "Home" },
  { href: "/offers-and-money", label: "Offers & Money", isSpecial: true },
  { href: "/posts", label: "Posts" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export const postCategories: PostCategory[] = [
  { name: "Blog", href: "/post/blog" },
  { name: "Commercial", href: "/post/commercial" },
  { name: "Bargain", href: "/post/bargain" },
  { name: "News", href: "/post/news" },
];
