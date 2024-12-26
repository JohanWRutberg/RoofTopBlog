import useFetchData from "@/hooks/useFetchData";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [currentPage, setCurrentPage] = useState(1); // Page number
  const [perPage] = useState(8); // Number of blogs per page

  const { alldata, loading } = useFetchData("/api/getblog");

  // Function to handle page change
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastblog = currentPage * perPage;
  const indexOfFirstblog = indexOfLastblog - perPage;
  const currentBlogs = alldata.slice(indexOfFirstblog, indexOfLastblog);

  const allblog = alldata.length;

  // Filter published blogs from all blogs
  const publishedblogs = alldata.filter((ab) => ab.status === "publish");

  const totalPublishedBlogs = publishedblogs.length;

  // Paginate based on published blogs count
  const totalPages = Math.ceil(totalPublishedBlogs / perPage);

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  function extractFirstImageUrl(markdownContent) {
    if (!markdownContent || typeof markdownContent !== "string") {
      return null;
    }
    const regex = /!\[.*?\]\((.*?)\)/;
    const match = markdownContent.match(regex);
    return match ? match[1] : null;
  }

  function removeSpecialCharacters(text) {
    return text.replace(/[^a-zA-Z0-9\s]/g, "");
  }

  function getFirstWords(text) {
    if (!text) return "";
    const cleanedText = removeSpecialCharacters(text);
    const words = cleanedText.split(" ");
    return words.slice(0, 30).join(" ") + "...";
  }

  return (
    <>
      <Head>
        <title>Beat Master Mind</title>
        <meta name="description" content="Beat Master Mind - Blog about Electronic drums and accessories!" />
        {/* Facebook Meta Tags */}
        <meta property="og:url" content="https://www.beatmastermind.com/" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Beat MasterMind Blog" />
        <meta property="og:description" content="Beat Master Mind - Blog about Electronic drums and accessories!" />
        <meta property="og:image" content="https://beatmastermind.comnull" />

        {/* Twitter Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="beatmastermind.com" />
        <meta property="twitter:url" content="https://www.beatmastermind.com/" />
        <meta name="twitter:title" content="Beat Master Mind" />
        <meta name="twitter:description" content="Beat Master Mind - Blog about Electronic drums and accessories!" />
        <meta name="twitter:image" content="https://beatmastermind.comnull"></meta>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.png" />
      </Head>

      <section className="header_data_section">
        <div className="container flex flex-sb w-100">
          <div className="leftheader_info">
            <h1 data-aos="fade-right" className="">
              Explore <span>Beat MasterMind</span>. <br />
            </h1>
            <h3 data-aos="fade-right">Your electronic drums expert</h3>
            <div className="flex gap-2">
              <Link href="/contact">
                <button>Contact</button>
              </Link>
              <Link href="/about">
                <button>About</button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="main_blog_section">
        <div className="container flex flex-sb flex-left flex-wrap">
          <div className="leftblog_sec">
            <h2>Recently Published</h2>
            <div className="blogs_sec">
              {loading ? (
                <div className="wh-100 flex flex-center mt-2 pb-5">
                  <div className="loader"></div>
                </div>
              ) : (
                <>
                  {publishedblogs.slice(indexOfFirstblog, indexOfLastblog).map((blog) => {
                    const firstImageUrl = extractFirstImageUrl(blog.description);
                    return (
                      <div className="blog flex" key={blog._id}>
                        <div className="blogimg">
                          <Link href={`/blog/${blog.slug}`}>
                            <Image
                              src={firstImageUrl || "/img/noimage.jpg"}
                              alt={blog.title}
                              width={800}
                              height={600}
                            />
                          </Link>
                        </div>
                        <div className="bloginfo">
                          <Link href={`/tag/${blog.tags[0]}`}>
                            <div className="blogtag">{blog.tags[0]}</div>
                          </Link>
                          <Link href={`/blog/${blog.slug}`}>
                            <h3>{blog.title}</h3>
                          </Link>
                          <p>{getFirstWords(blog.description)}</p>
                          <div className="blogauthor flex gap-1">
                            <div className="blogaimg">
                              <img src="/img/Beat_Master.PNG" alt="logo" />
                            </div>
                            <div className="flex flex-col flex-left gap-05">
                              <h4>Beat Master Mind</h4>
                              <span>
                                {new Date(blog.createdAt).toLocaleDateString("en-US", {
                                  month: "long",
                                  day: "numeric",
                                  year: "numeric"
                                })}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </>
              )}
            </div>

            {/* Pagination */}
            <div className="blogpagination">
              <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>
                Previous
              </button>
              {pageNumbers.map((number) => (
                <button
                  key={number}
                  onClick={() => paginate(number)}
                  className={currentPage === number ? "active" : ""}
                >
                  {number}
                </button>
              ))}
              <button
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === totalPages || publishedblogs.length < perPage}
              >
                Next
              </button>
            </div>
          </div>

          <div className="rightblog_info">{/* Other sections */}</div>
        </div>
      </section>
    </>
  );
}
