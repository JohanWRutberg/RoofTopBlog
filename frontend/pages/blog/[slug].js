import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { BsAmazon } from "react-icons/bs";
import { DiCodeigniter } from "react-icons/di";
import { GiDrum, GiDrumKit } from "react-icons/gi";
import { ImHeadphones } from "react-icons/im";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { allyDark } from "react-syntax-highlighter/dist/cjs/styles/prism";
import remarkGfm from "remark-gfm";
import Head from "next/head"; // Import the next/head module
import { RiArticleLine } from "react-icons/ri";

function extractFirstImageUrl(markdownContent) {
  if (!markdownContent || typeof markdownContent !== "string") {
    return null;
  }
  const regex = /!\[.*?\]\((.*?)\)/;
  const match = markdownContent.match(regex);
  return match ? match[1] : null;
}

export default function BlogPage() {
  const router = useRouter();
  const { slug } = router.query;

  const [blog, setBlog] = useState([""]);
  const [loading, setLoading] = useState(true);
  const [linkDetails, setLinkDetails] = useState([]);
  const [blogPostLinks, setBlogPostLinks] = useState([]); // New state for blog post links

  // Fetch the specific blog post based on the slug
  useEffect(() => {
    if (slug) {
      axios
        .get(`/api/getblog?slug=${slug}`)
        .then((res) => {
          const alldata = res.data;
          const firstImageUrl = extractFirstImageUrl(alldata[0].description);
          setBlog([{ ...alldata[0], image: firstImageUrl }]);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching blog", error);
        });
    }
  }, [slug]);

  // Fetch all blog post titles and images for backlinks
  useEffect(() => {
    axios
      .get("../api/getblog")
      .then((res) => {
        const blogPosts = res.data;
        const postLinks = blogPosts.map((post) => ({
          href: `/blog/${post.slug}`,
          alt: post.title,
          image: extractFirstImageUrl(post.description),
          status: post.status,
          createdAt: post.createdAt
        }));
        setBlogPostLinks(postLinks);
      })
      .catch((error) => {
        console.error("Error fetching all blog posts", error);
      });
  }, []);

  useEffect(() => {
    if (!loading) {
      const links = document.querySelectorAll(".observed-link");
      const details = Array.from(links)
        .map((link) => ({
          alt: link.getAttribute("alt") || link.href,
          href: link.href
        }))
        .filter((link) => link.href.includes("https://amzn"));
      setLinkDetails(details);
    }
  }, [loading, blog]);

  // Calculate reading time
  const calculateReadingTime = (text) => {
    const wordsPerMinute = 200; // Average reading speed
    const words = text.split(/\s+/).length;
    const minutes = Math.ceil(words / wordsPerMinute);
    return minutes;
  };

  const readingTime = blog[0].description ? calculateReadingTime(blog[0].description) : 1;

  // Markdown code highlighter
  const Code = ({ node, inline, className, children, ...props }) => {
    const match = /language-(\w+)/.exec(className || "");

    const [copied, setCopied] = useState(false);
    // Copy code function
    const handleCopy = () => {
      navigator.clipboard.writeText(children);
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 3000); // 3 seconds
    };

    if (inline) {
      return <code>{children}</code>;
    } else if (match) {
      return (
        <div style={{ position: "relative" }}>
          <SyntaxHighlighter
            style={allyDark}
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

  return (
    <>
      {!loading && (
        <Head>
          <title>{blog[0].title} | Beat Master Mind</title>
          <meta name="description" content={blog[0].description.slice(0, 150)} />
          <meta property="og:title" content={blog[0].title} />
          <meta property="og:description" content={blog[0].description.slice(0, 150)} />
          <meta property="og:image" content={blog[0].image || "/default-image.png"} />
          <meta property="og:url" content={`https://www.beatmastermind.com${router.asPath}`} />
        </Head>
      )}

      <div className="slugpage">
        <div className="container">
          <div className="topslug_titles">
            <h1 className="slugtitle">{loading ? <div>Loading...</div> : blog && blog[0]?.title}</h1>
            <h5>
              By <span>BeatMaster</span>. Published in{" "}
              <span>{loading ? <div>Loading...</div> : blog && blog[0]?.blogcategory.join(" - ")}</span>.{" "}
              {blog &&
                new Date(blog[0].createdAt).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric"
                })}{" "}
              -<span> {readingTime} min read</span>
            </h5>
          </div>

          {/* Blog data section */}
          <div className="flex flex-sb flex-left pb-5 flex-wrap">
            <div className="leftblog_data_markdown">
              {loading ? (
                <div className="wh-100 flex flex-center mt-3">
                  <div className="loader"></div>
                </div>
              ) : (
                <>
                  <div className="w-100 blogcontent">
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      components={{
                        a: ({ href, children }) => {
                          const isAmazonLink = href.startsWith("https://amzn");
                          return (
                            <a
                              href={href}
                              className="observed-link"
                              alt={children}
                              target={isAmazonLink ? "_blank" : "_self"}
                              rel={isAmazonLink ? "noopener noreferrer" : undefined}
                            >
                              {children}
                            </a>
                          );
                        },
                        code: Code
                      }}
                    >
                      {blog[0].description}
                    </ReactMarkdown>
                  </div>
                </>
              )}
            </div>
            <div className="rightslug_data">
              <div className="slug_profile_info">
                <div className="slugprofile_sec">
                  <div className="slug_aff_img">
                    <Image
                      src="/img/vecteezy_amazon-logo-png-amazon-icon-transparent-png_19766240.png"
                      alt="brand"
                      width={500}
                      height={200}
                    />

                    <br />
                    <p>Buy the products featured in the blog post here:</p>
                    <br />
                  </div>
                </div>
                <div className="aff_container">
                  <div className="aff_img">
                    <ul>
                      {linkDetails.map((link, index) => (
                        <li key={index}>
                          <Link href={link.href} legacyBehavior>
                            <a className="flex flex-left" target="_blank" rel="noopener noreferrer">
                              <div className="social_talks">
                                <div className="st_icon_amazon">
                                  <BsAmazon />
                                </div>
                              </div>
                              <span className="link-alt">{link.alt}</span>
                            </a>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="slug_aff_img mt-15">
                  <p>
                    As an Amazon Associate, we earn from qualifying purchases. This means that if you click on a link to
                    an Amazon product on this site and make a purchase, we may receive a commission at no additional
                    cost to you. This helps support the site and allows us to continue providing useful content.
                    <br />
                    <br />
                    Thank you for your support!
                  </p>
                </div>
              </div>
              <div className="topics_sec">
                <h2>Topics</h2>
                <div className="topics_list">
                  <Link href="/topics/drumsets">
                    <div className="topics">
                      <div className="flex flex-center topics_svg">
                        <GiDrumKit />
                      </div>
                      <h3>Drum Sets</h3>
                    </div>
                  </Link>
                  <Link href="/topics/accessories">
                    <div className="topics">
                      <div className="flex flex-center topics_svg">
                        <GiDrum />
                      </div>
                      <h3>Accessories</h3>
                    </div>
                  </Link>
                  <Link href="/topics/sound">
                    <div className="topics">
                      <div className="flex flex-center topics_svg">
                        <ImHeadphones />
                      </div>
                      <h3>Sound</h3>
                    </div>
                  </Link>
                  <Link href="/topics/hot">
                    <div className="topics">
                      <div className="flex flex-center topics_svg">
                        <DiCodeigniter />
                      </div>
                      <h3>Hot topics</h3>
                    </div>
                  </Link>
                </div>
              </div>

              {/* Render blog post links as backlinks */}
              <div className="topics_sec mt-3">
                <h2>Last 5 Blog Posts</h2>
                <div className="slug_blog_links">
                  <br />
                  <div className="aff_container">
                    <div className="aff_img">
                      <ul>
                        {blogPostLinks
                          .filter((link) => link.status === "publish")
                          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) // Sort by date, newest first
                          .slice(0, 5) // Get the top 5 latest posts
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
                        <li>
                          <Link href="/">All blog posts</Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
