import { getSortedPostsData } from "../lib/mongodb";

// Use a dynamic base URL depending on the environment
const BASE_URL = process.env.NODE_ENV === "development" ? "http://localhost:3000" : "https://www.beatmastermind.com";

function formatDate(date) {
  const d = new Date(date);
  if (isNaN(d.getTime())) {
    // Check for invalid date
    console.error("Invalid date:", date);
    return "2024-01-01"; // Default date
  }
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0"); // Months are 0-based
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function generateSiteMap(posts) {
  return `<?xml version="1.0" encoding="UTF-8"?>
      <urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9">
        <!-- Add the static URLs manually -->
        <url>
          <loc>${BASE_URL}</loc>
        </url>
        <url>
          <loc>${BASE_URL}/about</loc>
        </url>
        <url>
          <loc>${BASE_URL}/contact</loc>
        </url>
        <url>
          <loc>${BASE_URL}/disclaimer</loc>
        </url>
        ${posts
          .map(({ slug, createdAt }) => {
            const lastmod = createdAt ? formatDate(createdAt) : "2024-01-01"; // Default date if necessary
            return `
              <url>
                <loc>${`${BASE_URL}/blog/${slug}`}</loc>
                <lastmod>${lastmod}</lastmod>
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
