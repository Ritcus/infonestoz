export interface NavLink {
  href: string;
  label: string;
  isSpecial?: boolean;
}

export interface PostCategory {
  name: string;
  href: string;
  subCategories?: SubCategory[];
}

export interface SubCategory {
  name: string;
  href: string;
}

export const navLinks: NavLink[] = [
  { href: "/", label: "Home" },
  { href: "/offers-and-hacks", label: "Offers & Hacks", isSpecial: true },
  { href: "/posts", label: "Posts" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export const postCategories: PostCategory[] = [
  { name: "Blog", href: "/post/blog",
    subCategories:[
      {name:"Travel", href:"/post/blog/travel"},
      {name:"Health", href:"/post/blog/health"},
      {name:"Review & Recommendations", href:"/post/blog/review-&-recommendations"},
      {name:"Tips & Advice", href:"/post/blog/tips-&-advice"},
      {name:"Life Hacks", href:"/post/blog/life-hacks"},
      {name:"Finance", href:"/post/blog/finance"},
    ]
   },
  { name: "Bargain", href: "/post/bargain",
    subCategories:[
      {name:"Food", href:"/post/bargain/food"},
      {name:"Technology", href:"/post/bargain/technology"}
    ]
   },
  { name: "News", href: "/post/news" },
];

export const subPostCategories: PostCategory[] = [
  { name: "Blog", href: "/post/blog" },
  { name: "Bargain", href: "/post/bargain" },
  { name: "News", href: "/post/news" },
]