import { getSortedPostsData } from "../lib/mongodb";

// Use a dynamic base URL depending on the environment
const BASE_URL = process.env.NODE_ENV === "development" ? "http://localhost:3000" : "https://www.beatmastermind.com";

function generateSiteMap(posts) {
  return `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9">
      <!-- Add the static URLs manually -->
      <url>
        <loc>${BASE_URL}</loc>
      </url>
      <url>
        <loc>${BASE_URL}/portfolio</loc>
      </url>
      <url>
        <loc>${BASE_URL}/blog</loc>
      </url>
      ${posts
        .map(({ slug }) => {
          return `
            <url>
              <loc>${`${BASE_URL}/blog/${slug}`}</loc>
            </url>
          `;
        })
        .join("")}
    </urlset>
  `;
}

export async function getServerSideProps({ res }) {
  try {
    // Await the sorted posts data
    const posts = await getSortedPostsData();

    // Generate the XML sitemap with the blog data
    const sitemap = generateSiteMap(posts);

    // Set the response header to return XML content
    res.setHeader("Content-Type", "text/xml");
    res.write(sitemap);
    res.end();

    return {
      props: {} // No props needed since we are directly returning XML content
    };
  } catch (error) {
    console.error("Error generating sitemap:", error);
    res.statusCode = 500;
    res.end();
    return {
      props: {} // Return empty props in case of an error
    };
  }
}

// The component does not render anything because it's handled on the server
export default function SiteMap() {
  return null;
}
