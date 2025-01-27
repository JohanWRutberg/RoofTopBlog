"use client";
import axios from "axios";
import Image from "next/image";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function capitalizeFirstLetter(str) {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

async function fetchBlogData(tags) {
  try {
    const res = await axios.get(`/api/getblog?tags=${tags}`);
    return res.data;
  } catch (error) {
    console.error("Error fetching blog data:", error);
    return [];
  }
}

export default function CategoryPage() {
  const { tags } = useParams(); // Use useParams() to access the tag from the URL
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [blog, setBlog] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // Page number
  const [perPage] = useState(6); // Number of blogs per page

  useEffect(() => {
    // Ensure tags is not undefined before fetching data
    if (!tags) {
      console.error("Tags are undefined");
      router.push("/404"); // Redirect to 404 page if tags are missing
      return;
    }

    // Fetch blog data when the tags change
    const fetchBlogDataAndSetState = async () => {
      setLoading(true);
      const fetchedData = await fetchBlogData(tags);
      setBlog(fetchedData);
      setLoading(false);
    };

    fetchBlogDataAndSetState();
  }, [tags, router]);

  // Handle page changes
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastblog = currentPage * perPage;
  const indexOfFirstblog = indexOfLastblog - perPage;
  const currentBlogs = blog.slice(indexOfFirstblog, indexOfLastblog);

  const allblog = blog.length;
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(allblog / perPage); i++) {
    pageNumbers.push(i);
  }

  // Filter published blogs
  const publishedblogs = currentBlogs.filter((ab) => ab.status === "publish");

  function extractFirstImageUrl(markdownContent) {
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
    return words.slice(0, 20).join(" ") + "...";
  }

  return (
    <>
      <Head>
        <title>{tags ? `${capitalizeFirstLetter(tags)} | TopGear Tents` : "TopGear Tents"}</title>
        <meta name="keywords" content={tags || "Tags on TopGear Tents"} />
        <meta property="og:title" content={tags ? capitalizeFirstLetter(tags) : "Tags on TopGear Tents"} />
        <meta
          property="og:description"
          content={publishedblogs.length ? publishedblogs[0].description.slice(0, 150) : "Blog post on TopGear Tents"}
        />
        <meta property="og:image" content={publishedblogs[0]?.image || "/default-image.png"} />
        <meta property="og:url" content={`https://www.topgeartents.com${router.asPath}`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={tags ? capitalizeFirstLetter(tags) : "Tags on TopGear Tents"} />
        <meta
          name="twitter:description"
          content={publishedblogs.length ? publishedblogs[0].description.slice(0, 150) : "Blog post on TopGear Tents"}
        />
        <meta name="twitter:image" content={publishedblogs[0]?.image || "/default-image.png"} />
      </Head>

      <div className="blogpage">
        <div className="category_slug">
          <div className="container">
            <div className="category_title">
              <div className="flex gap-1">
                <h1>{loading ? "Loading..." : capitalizeFirstLetter(tags)}</h1>
                <span>{loading ? 0 : publishedblogs.filter((blog) => blog.tags).length}</span>
              </div>
            </div>
            <div className="category_blogs mt-3">
              {loading ? (
                <div className="wh-100 flex flex-center mt-2 pb-5">
                  <div className="loader"></div>
                </div>
              ) : (
                publishedblogs.map((item) => {
                  const firstImageUrl = extractFirstImageUrl(item.description);
                  return (
                    <div className="cate_blog" key={item._id}>
                      <Link href={`/blog/${item.slug}`}>
                        <Image src={firstImageUrl || "/img/noimage.jpg"} alt={item.title} height={830} width={1250} />
                      </Link>

                      <div className="bloginfo mt-2">
                        <Link href={`/tag/${item.tags[0]}`}>
                          <div className="blogtag">{item.tags[0]}</div>
                        </Link>
                        <Link href={`/blog/${item.slug}`}>
                          <h3>{item.title}</h3>
                        </Link>
                        <p>{getFirstWords(item.description)}</p>
                        <div className="blogauthor flex gap-1">
                          <div className="blogaimg">
                            <Image src="/img/Logo/TopGearTent_Logo.png" width={50} height={50} alt="logo" />
                          </div>
                          <div className="flex flex-col flex-left gap-05">
                            <h4>TopGear Tents</h4>
                            <span>
                              {new Date(item.createdAt).toLocaleDateString("en-US", {
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
                })
              )}
            </div>
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
      </div>
    </>
  );
}
