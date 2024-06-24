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

export default function BlogPage() {
  const router = useRouter();
  const { slug } = router.query;

  const [blog, setBlog] = useState([""]);
  const [loading, setLoading] = useState(true);
  const [currentAltText, setCurrentAltText] = useState("");

  useEffect(() => {
    if (slug) {
      axios
        .get(`/api/getblog?slug=${slug}`)
        .then((res) => {
          const alldata = res.data;
          setBlog(alldata);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching blog", error);
        });
    }
  }, [slug]);

  useEffect(() => {
    if (!loading) {
      const links = document.querySelectorAll(".observed-link, .blog-content-link");
      const observerOptions = {
        root: null,
        rootMargin: "0px",
        threshold: 0.5
      };

      const observerCallback = (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setCurrentAltText(entry.target.getAttribute("alt") || entry.target.href);
          } else if (
            (!entry.isIntersecting &&
              entry.target.className === "observed-link" &&
              currentAltText === (entry.target.getAttribute("alt") || entry.target.href)) ||
            (entry.target.className === "blog-content-link" &&
              currentAltText === (entry.target.getAttribute("alt") || entry.target.href))
          ) {
            setCurrentAltText("");
          }
        });
      };

      const observer = new IntersectionObserver(observerCallback, observerOptions);

      links.forEach((link) => observer.observe(link));

      return () => {
        links.forEach((link) => observer.unobserve(link));
      };
    }
  }, [loading, blog, currentAltText]);

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
                        a: ({ href, children }) => (
                          <a href={href} className="observed-link" alt={children}>
                            {children}
                          </a>
                        ),
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
                  </div>
                </div>
                <div className="aff_container">
                  <div className="aff_img">
                    <h3>{currentAltText}</h3>
                  </div>
                </div>

                <div className="social_talks flex flex-center gap-1 mt-2">
                  <div className="st_icon_amazon">
                    <BsAmazon />
                  </div>
                  <div className="st_icon_amazon">
                    <BsAmazon />
                  </div>
                  <div className="st_icon_amazon">
                    <BsAmazon />
                  </div>
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
