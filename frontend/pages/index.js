import useFetchData from "@/hooks/useFetchData";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { GiDrumKit, GiDrum } from "react-icons/gi";
import { ImHeadphones } from "react-icons/im";
import { DiCodeigniter } from "react-icons/di";
import { FaInstagram, FaPinterest, FaFacebook } from "react-icons/fa";
import { LuTentTree, LuTent } from "react-icons/lu";
import { FaTent } from "react-icons/fa6";
import { GiCampingTent } from "react-icons/gi";
import { LuTrees } from "react-icons/lu";

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

  /* const allblog = alldata.length; */

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
        <title>TopGear Tents</title>
        <meta
          name="description"
          content="Explore our Blog about Roftop tents for all kinds of vehicle. Your indoor and outdoor adventure!"
        />
        {/* Facebook Meta Tags */}
        <meta property="og:url" content="https://www.topgeartents.com/" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="TopGear Tents Blog" />
        <meta
          property="og:description"
          content="Explore our Blog about Roftop tents for all kinds of vehicle. Your indoor and outdoor adventure!"
        />
        <meta property="og:image" content="https://topgeartents.comnull" />

        {/* Twitter Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="topgeartents.com" />
        <meta property="twitter:url" content="https://www.topgeartents.com/" />
        <meta name="twitter:title" content="TopGear tents" />
        <meta
          name="twitter:description"
          content="Explore our Blog about Rooftop tents for all kinds of vehicle. Your indoor and outdoor adventure!"
        />
        <meta name="twitter:image" content="https://topgeartents.comnull"></meta>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.png" />
      </Head>

      <section className="header_data_section">
        <img src="/img/TopGearTent.jpg" alt="Background" className="background-image opacity-90" />
        <div className="header-container flex flex-sb w-100">
          <div className="leftheader_info">
            <h1 data-aos="fade-right">
              <span>TopGear </span>Tents<span>.</span> <br />
            </h1>
            <h3 data-aos="fade-right">Your vehicle camping expert</h3>
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
        <div className="right-container flex flex-sb flex-start flex-wrap">
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
                              <img src="/img/Logo/TopGearTent_Logo.png" alt="logo" />
                            </div>
                            <div className="flex flex-col flex-left gap-05">
                              <h4>TopGear Tents</h4>
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
          <div className="rightblog_info">
            <div className="topics_sec">
              <h2>Topics</h2>
              <div className="topics_list">
                <Link href="/topics/rooftop">
                  <div className="topics">
                    <div className="flex flex-center topics_svg">
                      <LuTentTree />
                    </div>
                    <h3>Rooftop Tents</h3>
                  </div>
                </Link>
                <Link href="/topics/awning">
                  <div className="topics">
                    <div className="flex flex-center topics_svg">
                      <LuTent />
                    </div>
                    <h3>Awning Tents</h3>
                  </div>
                </Link>
                <Link href="/topics/hitch">
                  <div className="topics">
                    <div className="flex flex-center topics_svg">
                      <GiCampingTent />
                    </div>
                    <h3>Hitch-Mounted Tents</h3>
                  </div>
                </Link>
                <Link href="/topics/popup">
                  <div className="topics">
                    <div className="flex flex-center topics_svg">
                      <FaTent />
                    </div>
                    <h3>Pop-Up Tents for Cars</h3>
                  </div>
                </Link>
                <Link href="/topics/accessories">
                  <div className="topics">
                    <div className="flex flex-center topics_svg">
                      <LuTrees />
                    </div>
                    <h3>Accessories</h3>
                  </div>
                </Link>
                {/* Add other topics */}
              </div>
            </div>
            <div className="tags_sec mt-3">
              <h2>Tags</h2>
              <div className="tags_list">
                <Link href="/tag/accessories">#Accessories</Link>
                <Link href="/tag/bed">#Bed</Link>
                <Link href="/tag/brand">#Brand</Link>
                <Link href="/tag/budget">#Budget</Link>
                <Link href="/tag/camping">#Camping</Link>
                <Link href="/tag/canopy">#Canopy</Link>
                <Link href="/tag/car">#Car</Link>
                <Link href="/tag/cover">#Cover</Link>
                <Link href="/tag/destination">#Destination</Link>
                <Link href="/tag/guide">#Guide</Link>
                <Link href="/tag/hardshell">#Hardshell</Link>
                <Link href="/tag/jeep">#Jeep</Link>
                <Link href="/tag/premium">#Premium</Link>
                <Link href="/tag/rooftop">#Rooftop</Link>
                <Link href="/tag/setup">#Setup</Link>
                <Link href="/tag/shell">#Shell</Link>
                <Link href="/tag/summer">#Summer</Link>
                <Link href="/tag/suv">#SUV</Link>
                <Link href="/tag/tent">#Tent</Link>
                <Link href="/tag/tentbox">#Tentbox</Link>
                <Link href="/tag/truck">#Truck</Link>
                <Link href="/tag/vehicle">#Vehicle</Link>
                {/* Add other tags */}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
