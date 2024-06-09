import useFetchData from "@/hooks/useFetchData";
import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import { GiDrumKit, GiDrum } from "react-icons/gi";
import { ImHeadphones } from "react-icons/im";
import { DiCodeigniter } from "react-icons/di";
import { FaInstagram, FaPinterest, FaFacebook } from "react-icons/fa";

export default function Home() {
  const [currentPage, setCurrentPage] = useState(1); // Page number
  const [perPage] = useState(10); // Number of blogs per page

  const { alldata, loading } = useFetchData("/api/getblog");

  // Function to handle page change
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastblog = currentPage * perPage;
  const indexOfFirstblog = indexOfLastblog - perPage;
  const currentBlogs = alldata.slice(indexOfFirstblog, indexOfLastblog);

  const allblog = alldata.length;

  // Filter published blogs
  const publishedblogs = currentBlogs.filter((ab) => ab.status === "publish");

  const pageNumbers = [];

  for (let i = 1; i < Math.ceil(allblog / perPage); i++) {
    pageNumbers.push(i);
  }

  function extractFirstImageUrl(markdownContent) {
    // Check if markdowncontent is provided and non-empty
    if (!markdownContent || typeof markdownContent !== "string") {
      return null;
    }
    // Regular expression to match the first image url in markdown format [alt text](imageurl)
    const regex = /!\[.*?\]\((.*?)\)/;
    const match = markdownContent.match(regex);
    return match ? match[1] : null;
  }

  return (
    <>
      <Head>
        <title>BeatMaster Mind Blog</title>
        <meta name="description" content="BeatMaster Mind Blog" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <section className="header_data_section">
        <div className="container flex flex-sb w-100">
          <div className="leftheader_info">
            <h1>
              Explore <span>BeatMaster Mind</span>. <br />
            </h1>
            <h3>Electronic drum enthusiasts</h3>
            <div className="flex gap-2">
              <Link href="/contact">
                <button>Contact</button>
              </Link>
              <Link href="/about">
                <button>About</button>
              </Link>
            </div>
          </div>
          {/* <div className="rightheader_img">
            <div className="image_bg_top"></div>
            <div className="image_bg_top2"></div>
            <img src="/img/BEATMASTER_MIND3.png" alt="img" />
          </div> */}
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
                  {publishedblogs.map((blog) => {
                    // In the markdown content first image shows here
                    const firstImageUrl = extractFirstImageUrl(blog.description);
                    return (
                      <div className="blog" key={blog._id}>
                        <div className="blogimg">
                          {/* If no image in markdown, show noimage */}
                          <Link href={`/blog/${blog.slug}`}>
                            <img src={firstImageUrl || "/img/noimage.jpg"} alt={blog.title} />
                          </Link>
                        </div>
                        <div className="bloginfo">
                          <Link href={`/tag/${blog.tags[0]}`}>
                            <div className="blogtag">{blog.tags[0]}</div>
                          </Link>
                          <Link href={`/blog/${blog.slug}`}>
                            <h3>{blog.title}</h3>
                          </Link>
                          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.</p>
                          <div className="blogauthor flex gap-1">
                            <div className="blogaimg">
                              <img src="/img/profile_bg.png" />
                            </div>
                            <div className="flex flex-col flex-left gap-05">
                              <h4>BMM</h4>
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
            <div className="blogpagination">
              <div className="blogpagination">
                <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>
                  Previous
                </button>
                {pageNumbers
                  .slice(Math.max(currentPage - 3, 0), Math.min(currentPage + 2, pageNumbers.length))
                  .map((number) => (
                    <button
                      key={number}
                      onClick={() => paginate(number)}
                      className={currentPage === number ? "active" : ""}
                    >
                      {number}
                    </button>
                  ))}
                <button onClick={() => paginate(currentPage + 1)} disabled={currentBlogs.length < perPage}>
                  Next
                </button>
              </div>
            </div>
          </div>
          <div className="rightblog_info">
            <div className="topics_sec">
              <h2>Topics</h2>
              <div className="topics_list">
                <Link href="/topics/htmlcssjs">
                  <div className="topics">
                    <div className="flex flex-center topics_svg">
                      <GiDrumKit />
                    </div>
                    <h3>Drum Sets</h3>
                  </div>
                </Link>
                <Link href="/topics/htmlcssjs">
                  <div className="topics">
                    <div className="flex flex-center topics_svg">
                      <GiDrum />
                    </div>
                    <h3>Pads</h3>
                  </div>
                </Link>
                <Link href="/topics/htmlcssjs">
                  <div className="topics">
                    <div className="flex flex-center topics_svg">
                      <ImHeadphones />
                    </div>
                    <h3>Sound</h3>
                  </div>
                </Link>
                <Link href="/topics/htmlcssjs">
                  <div className="topics">
                    <div className="flex flex-center topics_svg">
                      <DiCodeigniter />
                    </div>
                    <h3>Hot topics</h3>
                  </div>
                </Link>
              </div>
            </div>
            <div className="tags_sec mt-3">
              <h2>Tags</h2>
              <div className="tags_list">
                <Link href="/tag/html">#Html</Link>
                <Link href="/tag/css">#Css</Link>
                <Link href="/tag/javascript">#JavaScript</Link>
                <Link href="/tag/nextjs">#Nextjs</Link>
                <Link href="/tag/reactjs">#Reactjs</Link>
                <Link href="/tag/database">#Database</Link>
              </div>
            </div>
            <div className="letstalk_sec mt-3">
              <h2>Let's Talk</h2>
              <div className="talk_sec">
                <h4>Want to know how we can help you find your first or next electronic drum kit?</h4>
                <div className="social_talks flex flex-center gap-1 mt-2">
                  <div className="st_icon">
                    <FaInstagram />
                  </div>
                  <div className="st_icon">
                    <FaPinterest />
                  </div>
                  <div className="st_icon">
                    <FaFacebook />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
