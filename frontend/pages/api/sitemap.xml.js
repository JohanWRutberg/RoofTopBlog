import { Blog } from "@/models/blog";
import { mongooseConnect } from "@/lib/mongoose";

export default async function handler(req, res) {
  await mongooseConnect();

  // Fetch all blog slugs
  const blogs = await Blog.find({}, { slug: 1 });

  // Base URL for your site
  const baseUrl = "https://www.beatmastermind.com";

  // URLs to include in sitemap
  const staticPaths = [
    `${baseUrl}/`,
    `${baseUrl}/blog/`,
    `${baseUrl}/tag/`,
    `${baseUrl}/topics/`,
    `${baseUrl}/contact`, // Add static URL for contact page
    `${baseUrl}/disclaimer`, // Add static URL for disclaimer page
    `${baseUrl}/about` // Add static URL for about page
  ];

  // Dynamically generate blog URLs
  const blogPaths = blogs.map((blog) => `${baseUrl}/blog/${blog.slug}`);

  // Combine all paths
  const allPaths = [...staticPaths, ...blogPaths];

  // Generate XML content
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${allPaths
    .map((url) => {
      return `
    <url>
      <loc>${url}</loc>
    </url>
  `;
    })
    .join("")}
</urlset>`;

  // Set response content type
  res.setHeader("Content-Type", "text/xml");

  // Send the sitemap content
  res.status(200).send(sitemap);
}
