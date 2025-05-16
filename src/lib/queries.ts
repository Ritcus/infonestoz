export const postsQuery = `*[_type == "post"]{
    _id,
    title,
    slug,
    content,
    publishedAt,
    category,
    tags,
    isFeatured,
    mainImage,
    readMinute,
    author {
      name,
      image
    },
    popularity
  }`