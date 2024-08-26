import { connectToDatabase } from "../lib/mongodb";

export default async function sitemap() {
  const client = await connectToDatabase();
  const db = client.db("blogdata");
  const data = await db.collection("blogtest").find({}).toArray();

  const blog = data.map((item) => ({
    url: `${process.env.NEXT_WEBSITE_URL}/blog/${item.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly"
  }));
  return [
    {
      url: "https://www.beatmastermind.com",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: "1"
    },
    {
      url: "https://www.beatmastermind.com/about",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: "1"
    },
    {
      url: "https://www.beatmastermind.com/contact",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: "1"
    },
    {
      url: "https://www.beatmastermind.com/disclaimer",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: "1"
    },
    ...blog
  ];
}
