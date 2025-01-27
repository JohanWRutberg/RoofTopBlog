"use client";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { BsAmazon } from "react-icons/bs";
import { LuTentTree, LuTent } from "react-icons/lu";
import { FaCarTunnel, FaTent } from "react-icons/fa6";
import { GiCampingTent } from "react-icons/gi";
import { LuTrees } from "react-icons/lu";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/cjs/styles/prism";
import remarkGfm from "remark-gfm";
import Head from "next/head"; // Import the next/head module

function extractFirstImageUrl(markdownContent) {
  if (!markdownContent || typeof markdownContent !== "string") {
    return null;
  }
  const regex = /!\[.*?\]\((.*?)\)/;
  const match = markdownContent.match(regex);
  return match ? match[1] : null;
}

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

export default function BlogPage() {
  const params = useParams(); // Correctly access route parameters
  const router = useRouter(); // Use for navigation
  const { slug } = params || {}; // Ensure params is not undefined

  const [blog, setBlog] = useState({});
  const [blogPostLinks, setBlogPostLinks] = useState([]);
  const [linkDetails, setLinkDetails] = useState([]); // Initialize linkDetails
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) {
      console.error("Slug is undefined");
      router.push("/404");
      return;
    }

    const fetchBlogData = async () => {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_WEBSITE_URL}/api/getblog?slug=${slug}`);
        const alldata = res.data;

        if (!alldata || alldata.length === 0) {
          console.error("No blog data found");
          router.push("/404");
          return;
        }

        const firstImageUrl = extractFirstImageUrl(alldata[0].description);
        const blogData = { ...alldata[0], image: firstImageUrl };
        setBlog(blogData);

        // Extract Amazon links from the blog description
        const amazonLinks = extractAmazonLinks(blogData.description);
        setLinkDetails(amazonLinks);

        // Fetch all blog posts for the latest blog list
        const allBlogsRes = await axios.get(`${process.env.NEXT_PUBLIC_WEBSITE_URL}/api/getblog`);
        const allBlogs = allBlogsRes.data;

        const sortedBlogs = allBlogs
          .filter((post) => post.status === "publish")
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .map((post) => ({
            href: `/blog/${post.slug}`,
            alt: post.title,
            image: extractFirstImageUrl(post.description),
            status: post.status,
            createdAt: post.createdAt
          }));

        setBlogPostLinks(sortedBlogs);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching blog:", error);
        router.push("/404");
      }
    };

    fetchBlogData();
  }, [slug, router]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!blog) {
    return <div>Blog not found</div>;
  }

  const calculateReadingTime = (text) => {
    const wordsPerMinute = 200;
    const words = text.trim().split(/\s+/).length;
    return Math.ceil(words / wordsPerMinute);
  };

  const readingTime = blog.description ? calculateReadingTime(blog.description) : 1;

  const Code = ({ node, inline, className, children, ...props }) => {
    const match = /language-(\w+)/.exec(className || "");
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
      navigator.clipboard.writeText(children);
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 3000);
    };

    if (inline) {
      return <code>{children}</code>;
    } else if (match) {
      return (
        <div style={{ position: "relative" }}>
          <SyntaxHighlighter
            style={dracula}
            language={match[1]}
            PreTag="pre"
            {...props}
            codeTagProps={{
              style: {
                padding: "0",
                borderRadius: "5px",
                overflowX: "auto",
                whiteSpace: "pre-wrap"
              }
            }}
          >
            {String(children).replace(/\n$/, "")}
          </SyntaxHighlighter>
          <button
            style={{
              position: "absolute",
              top: "0",
              right: "0",
              zIndex: "1",
              background: "#3d3d3d",
              color: "#fff",
              padding: "10px"
            }}
            onClick={handleCopy}
          >
            {copied ? "Copied" : "Copy code"}
          </button>
        </div>
      );
    } else {
      return (
        <code className="md-post-code" {...props}>
          {children}
        </code>
      );
    }
  };

  const MarkdownLink = ({ href, children }) => {
    const isAmazonLink = href.startsWith("https://amzn");
    return (
      <a
        href={href}
        className={`observed-link ${isAmazonLink ? "amazon-link" : ""}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        {isAmazonLink && (
          <span className="st_icon_amazon">
            <BsAmazon />
          </span>
        )}
        {children}
      </a>
    );
  };

  return (
    <>
      <Head>
        <title>{`${blog.title || "Blog Post"} | TopGear Tents`}</title>
        <meta
          name="description"
          content={
            blog.description
              ? blog.description.slice(0, 150)
              : "Explore our Blog about Rooftop tents for all kinds of vehicle. Your indoor and outdoor adventure!"
          }
        />
        <meta name="keywords" content={blog.title || "Blog post"} />
        <meta property="og:title" content={blog.title || "Blog Post"} />
        <meta
          property="og:description"
          content={blog.description ? blog.description.slice(0, 150) : "Blog post on TopGear Tents"}
        />
        <meta property="og:image" content={blog.image || "/default-image.png"} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={blog.title || "Blog Post"} />
        <meta
          name="twitter:description"
          content={blog.description ? blog.description.slice(0, 150) : "Blog post on TopGear Tents"}
        />
        <meta name="twitter:image" content={blog.image || "/default-image.png"} />
      </Head>

      <div className="slugpage">
        <div className="container">
          <div className="topslug_titles">
            <h1 className="slugtitle">{blog.title || "Untitled Post"}</h1>
            <h5>
              By <span>TopGear Tents</span>.{" "}
              {blog.createdAt
                ? new Date(blog.createdAt).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric"
                  })
                : "Unknown Date"}{" "}
              - <span>{readingTime} min read</span>
            </h5>
          </div>
          <div className="flex flex-sb flex-left pb-5 flex-wrap">
            <div className="leftblog_data_markdown">
              <div className="w-100 blogcontent">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    a: MarkdownLink,
                    code: Code
                  }}
                >
                  {blog.description}
                </ReactMarkdown>
              </div>
            </div>
            <div className="rightslug_data">
              <div className="slug_profile_info">
                <div className="slugprofile_sec">
                  <div className="slug_aff_img">
                    <Image
                      src="/img/vecteezy_amazon-logo-png-amazon-icon-transparent-png_19766240.png"
                      alt="brand"
                      width={300}
                      height={150}
                    />

                    <br />
                    <h5>Buy the products featured in blog post</h5>
                    <br />
                  </div>
                </div>
                <div className="aff_container">
                  <div className="aff_img">
                    <ul>
                      {linkDetails.map((link, index) => (
                        <li key={index}>
                          <MarkdownLink href={link.href}>{link.alt}</MarkdownLink>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              <div className="topics_sec">
                <h2>Latest Blog Posts</h2>
                <div className="slug_blog_links">
                  <br />
                  <div className="aff_container">
                    <div className="aff_img">
                      <ul>
                        {blogPostLinks
                          .filter((link) => link.status === "publish")
                          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                          .slice(0, 5)
                          .map((link, index) => (
                            <li key={index}>
                              <Link href={link.href} legacyBehavior>
                                <a className="flex flex-left">
                                  <div className="social_talks">
                                    <div className="st_icon_blog">
                                      <Image
                                        src={link.image || "/img/noimage.jpg"}
                                        alt={link.alt}
                                        width={100}
                                        height={100}
                                      />
                                    </div>
                                  </div>
                                  <span className="blog-link-alt">{link.alt}</span>
                                </a>
                              </Link>
                            </li>
                          ))}
                        <li className="">
                          <Link href="/">All blog posts</Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Topics section */}
              <div className="topics_sec">
                <h2>Topics</h2>
                <div className="topics_list">
                  <Link href="/topics/accessories">
                    <div className="topics">
                      <div className="flex flex-center topics_svg">
                        <LuTrees />
                      </div>
                      <h3>Accessories</h3>
                    </div>
                  </Link>
                  <Link href="/topics/awning">
                    <div className="topics">
                      <div className="flex flex-center topics_svg">
                        <LuTent />
                      </div>
                      <h3>Awning Tent</h3>
                    </div>
                  </Link>
                  <Link href="/topics/cartent">
                    <div className="topics">
                      <div className="flex flex-center topics_svg">
                        <FaCarTunnel />
                      </div>
                      <h3>Car Tent</h3>
                    </div>
                  </Link>
                  <Link href="/topics/hitch">
                    <div className="topics">
                      <div className="flex flex-center topics_svg">
                        <GiCampingTent />
                      </div>
                      <h3>Hitch-Mounted Tent</h3>
                    </div>
                  </Link>
                  <Link href="/topics/popup">
                    <div className="topics">
                      <div className="flex flex-center topics_svg">
                        <FaTent />
                      </div>
                      <h3>Pop-Up Tent for Car</h3>
                    </div>
                  </Link>
                  <Link href="/topics/rooftop">
                    <div className="topics">
                      <div className="flex flex-center topics_svg">
                        <LuTentTree />
                      </div>
                      <h3>Rooftop Tent</h3>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Optional: If you have client-side navigation and want to ensure meta tags update */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
          if (typeof window !== "undefined") {
            window.history.pushState({}, '', '${router.asPath}');
          }
        `
        }}
      />
    </>
  );
}
