import Link from "next/link";
import { IoHome, IoSettingsOutline } from "react-icons/io5";
import { BsPostcard } from "react-icons/bs";
import { MdOutlineAddPhotoAlternate, MdOutlinePending } from "react-icons/md";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Aside() {
  const router = useRouter();
  const [clicked, setClicked] = useState(false);
  const [activeLink, setActiveLink] = useState("/");

  const handleClick = () => {
    setClicked(!clicked);
  };

  const handleLinkClick = (link) => {
    setActiveLink(link);
    setClicked(false);
  };

  useEffect(() => {
    // Update active link state when the page is reloaded
    setActiveLink(router.pathname);
  }, [router.pathname]);

  return (
    <>
      <aside className="asideleft">
        <ul>
          <Link href="/">
            <li className={activeLink === "/" ? "navactive" : ""} onClick={() => handleLinkClick("/")}>
              <IoHome />
              <span>Dashboard</span>
            </li>
          </Link>
          <Link href="/blogs">
            <li className={activeLink === "/blogs" ? "navactive" : ""} onClick={() => handleLinkClick("/blogs")}>
              <BsPostcard />
              <span>Bloggar</span>
            </li>
          </Link>
          <Link href="/blogs/addblog">
            <li
              className={activeLink === "/blogs/addblog" ? "navactive" : ""}
              onClick={() => handleLinkClick("/blogs/addblog")}
            >
              <MdOutlineAddPhotoAlternate />
              <span>Blogg +</span>
            </li>
          </Link>
          <Link href="/draft">
            <li className={activeLink === "/draft" ? "navactive" : ""} onClick={() => handleLinkClick("/draft")}>
              <MdOutlinePending />
              <span>Utkast</span>
            </li>
          </Link>
          <Link href="/settings">
            <li className={activeLink === "/settings" ? "navactive" : ""} onClick={() => handleLinkClick("/settings")}>
              <IoSettingsOutline />
              <span>Inställning</span>
            </li>
          </Link>
        </ul>
      </aside>
    </>
  );
}
