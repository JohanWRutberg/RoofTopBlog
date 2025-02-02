// frontend/app/blog/[slug]/page.js

import BlogPage from "./BlogPage"; // Importerar klientkomponenten
import axios from "axios";

// Funktion för att hämta bloggdata från API
async function getBlogData(slug) {
  const res = await axios.get(`${process.env.NEXT_PUBLIC_WEBSITE_URL}/api/getblog?slug=${slug}`);
  const blog = res.data[0];

  if (!blog) {
    return null;
  }

  return {
    ...blog,
    image: extractFirstImageUrl(blog.description),
    amazonLinks: extractAmazonLinks(blog.description)
  };
}

// Funktion för att extrahera den första bilden från markdown
function extractFirstImageUrl(markdownContent) {
  if (!markdownContent || typeof markdownContent !== "string") {
    return null;
  }
  const regex = /!\[.*?\]\((.*?)\)/;
  const match = markdownContent.match(regex);
  return match ? match[1] : null;
}

// Funktion för att extrahera Amazon-länkar från markdown
function extractAmazonLinks(markdownContent) {
  if (!markdownContent || typeof markdownContent !== "string") {
    return [];
  }
  const regex = /\[(.*?)\]\((https:\/\/amzn\.to\/.*?)\)/g;
  const links = [];
  let match;
  while ((match = regex.exec(markdownContent)) !== null) {
    links.push({ href: match[2], alt: match[1] });
  }
  return links;
}

// Server-side metadata generation (för SEO)
export async function generateMetadata({ params }) {
  const { slug } = params;

  const blog = await getBlogData(slug);

  if (!blog) {
    return {
      title: "Blog Post Not Found",
      description: "This blog post is not available."
    };
  }

  return {
    title: `${blog.title} | TopGear Tents`,
    description: blog.description.slice(0, 150),
    openGraph: {
      title: blog.title,
      description: blog.description.slice(0, 150),
      image: blog.image || "/default-image.png"
    },
    twitter: {
      card: "summary_large_image",
      title: blog.title,
      description: blog.description.slice(0, 150),
      image: blog.image || "/default-image.png"
    }
  };
}

// Serverkomponent som returnerar bloggdata och metadata
export default async function Page({ params }) {
  const { slug } = params;

  const blogData = await getBlogData(slug);

  if (!blogData) {
    return <div>Blog not found</div>;
  }

  return <BlogPage blog={blogData} />;
}
