export const postsQuery = `*[_type == "post"]{
    id,
    title,
    slug,
    content,
    date,
    category,
    tags,
    mainImage,
    popularity
  }`