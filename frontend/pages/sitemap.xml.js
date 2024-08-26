import { connectToDatabase } from "../lib/mongodb";

const createSitemap = (posts) => {
  const baseUrl = process.env.NEXT_WEBSITE_URL;

  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <url>
        <loc>${baseUrl}</loc>
        <lastmod>${new Date().toISOString().split("T")[0]}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>1.0</priority>
      </url>
  `;

  posts.forEach((post) => {
    sitemap += `
      <url>
        <loc>${baseUrl}/blog/${post.slug}</loc>
        <lastmod>${new Date(post.updatedAt).toISOString().split("T")[0]}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.8</priority>
      </url>
    `;
  });

  sitemap += `
    </urlset>
  `;

  return sitemap;
};

export default async function SitemapXml(req, res) {
  if (req.method === "GET") {
    try {
      const { db } = await connectToDatabase();
      const posts = await db.collection("blogtest").find({}).toArray();
      const sitemap = createSitemap(posts);
      res.setHeader("Content-Type", "text/xml");
      res.write(sitemap);
      res.end();
    } catch (error) {
      console.error(error);
      res.status(500).end();
    }
  } else {
    res.setHeader("Allow", "GET");
    res.status(405).end("Method Not Allowed");
  }
}
