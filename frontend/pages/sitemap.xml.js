import { getAllPosts } from "../lib/mongodb";

const sitemap = async () => {
  const posts = await getAllPosts();

  const postURLS =
    posts?.length > 0
      ? (posts[1] || []).map((blogtest) => ({
          url: `${process.env.NEXT_WEBSITE_URL}/blog/${blogtest?.slug}`,
          lastModified: new Date(blogtest?.publishedAt)
        }))
      : [];

  return [
    {
      url: `${process.env.NEXT_WEBSITE_URL}`,
      lastModified: new Date()
    },
    {
      url: `${process.env.NEXT_WEBSITE_URL}/blog`,
      lastModified: new Date()
    },
    ...postURLS
  ];
};
export default sitemap;
