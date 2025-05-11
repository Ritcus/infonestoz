export const postsQuery = `*[_type == "post"]{
    _id,
    title,
    slug,
    content,
    date,
    category,
    tags,
    isFeatured,
    mainImage,
    popularity
  }`