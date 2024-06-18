import Link from "next/link";
import { IoSearchSharp, IoMoonSharp, IoSearch } from "react-icons/io5";
import { FaXmark } from "react-icons/fa6";
import { HiBars3BottomRight } from "react-icons/hi2";
import { LuSun } from "react-icons/lu";
import { useEffect, useState } from "react";
import useFetchData from "@/hooks/useFetchData";

export default function Header() {
  // Searchbar open and close function
  const [searchopen, setSearchopen] = useState(false);

  // For open searchbar
  const openSearch = () => {
    setSearchopen(!searchopen);
  };

  // For close searchbar
  const closeSearch = () => {
    setSearchopen(false);
  };

  // Asidebar for mobile device
  const [aside, setAside] = useState(false);

  const asideOpen = () => {
    setAside(true);
  };

  const asideClose = () => {
    setAside(false);
  };

  // For mobile device close aside menu when click on link also
  const handleLinkClick = () => {
    setAside(false);
  };

  // Darkmode on/off
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    // Check local storage for darkmode preference on initial load
    const isDarkMode = localStorage.getItem("darkMode") === "true";
    setDarkMode(isDarkMode);
  }, []);

  useEffect(() => {
    // Apply dark mode styles when darkmode state changes
    if (darkMode) {
      document.body.classList.add("dark");
      localStorage.setItem("darkMode", true);
    } else {
      document.body.classList.remove("dark");
      localStorage.setItem("darkMode", false);
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode); // Toggle dark mode status
  };

  // Search data fetch
  const { alldata, loading } = useFetchData("/api/getblog");

  function removeSpecialCharacters(text) {
    return text.replace(/[^a-zA-Z0-9\s]/g, "");
  }

  function getFirstWords(text) {
    if (!text) return "";
    const cleanedText = removeSpecialCharacters(text);
    const words = cleanedText.split(" ");
    return words.slice(0, 10).join(" ") + "...";
  }

  // Filtering published blogs
  const publishedblogs = alldata.filter((ab) => ab.status === "publish");

  const [searchQuery, setSearchQuery] = useState("");
  // Filtering based on search query, search data from title
  const filteredBlogs =
    searchQuery.trim() === ""
      ? publishedblogs
      : publishedblogs.filter((blog) => blog.title.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <>
      <div className="header_sec">
        <div className="container header">
          <div className="header_logo">
            <Link href="/">
              <img src="/img/logo_2.PNG" alt="logo" width={150} height={80} />
            </Link>
          </div>
          <div className="searchbar">
            <IoSearchSharp />
            <input
              onClick={openSearch}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              type="search"
              placeholder="Discover our blog articles..."
            />
          </div>

          <div className="nav_list_dark">
            <ul>
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>
                <Link href="/">About</Link>
              </li>
              <li>
                <Link href="/">Contact</Link>
              </li>
            </ul>
            {/* For mobile devices */}
            <div className="navlist_mobile_ul">
              <button onClick={toggleDarkMode}>{darkMode ? <IoMoonSharp /> : <LuSun />}</button>
              <button onClick={openSearch}>
                <IoSearch />
              </button>
              <button onClick={asideOpen}>
                <HiBars3BottomRight />
              </button>
            </div>
            <div className="darkmode">
              <label className="switch">
                <input type="checkbox" checked={darkMode} onChange={toggleDarkMode} />
                <span className="slider_header"></span>
              </label>
            </div>
          </div>
        </div>
        <div className={`search_click ${searchopen ? "open" : ""}`}>
          <div className="searchab_input">
            <IoSearchSharp />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Discover our blog articles..."
            />
          </div>
          <div className="search_data text-start">
            {loading ? (
              <div className="wh-100 flex flex-center mt-2 pb-5">
                <div className="loader"></div>
              </div>
            ) : (
              <>
                {searchQuery ? (
                  <>
                    {filteredBlogs.slice(0, 3).map((blog) => {
                      return (
                        <Link onClick={closeSearch} className="blog" key={blog._id} href={`/blog/${blog.slug}`}>
                          <div className="bloginfo">
                            <div>
                              <h3>{blog.slug}</h3>
                            </div>
                            <p>{getFirstWords(blog.description)}</p>
                          </div>
                        </Link>
                      );
                    })}
                  </>
                ) : (
                  <div>No Search Result</div>
                )}
              </>
            )}
          </div>
          <div className="exit_search" onClick={closeSearch}>
            <div>
              <FaXmark />
            </div>
            <h4>ESC</h4>
          </div>
        </div>

        {/* Mobile navlist */}
        <div className={aside ? `navlist_mobile open` : "navlist_mobile"}>
          <div className="navlist_m_title flex flex-sb">
            <h1>BMM Blog</h1>
            <button onClick={asideClose}>
              <FaXmark />
            </button>
          </div>
          <hr />
          <h3 className="mt-3">Main Menu</h3>
          <ul onClick={handleLinkClick}>
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/">About</Link>
            </li>
            <li>
              <Link href="/">Contact</Link>
            </li>
          </ul>
          <hr />
          <h3 className="mt-3">Topics</h3>
          <ul onClick={handleLinkClick}>
            <li>
              <Link href="/topics/drumsets">Drum Sets</Link>
            </li>
            <li>
              <Link href="/topics/accessories">Accessories</Link>
            </li>
            <li>
              <Link href="/topics/sound">Sound</Link>
            </li>
            <li>
              <Link href="/topics/hot">Hot Topics</Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
