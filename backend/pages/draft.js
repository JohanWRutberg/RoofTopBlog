import Dataloading from "@/components/Dataloading";
import Loading from "@/components/Loading";
import useFetchData from "@/hooks/useFetchData";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { BsPostcard } from "react-icons/bs";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin6Fill } from "react-icons/ri";

export default function draft() {
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  // Change the number of blogs / pages to show on page
  const [perPage] = useState(5);
  // Fetch blogs form api endpoint with hooks
  const { alldata, loading } = useFetchData("/api/blogapi");

  // Function to handle page change
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  /* const indexOfLastblog = currentPage * perPage;
  const indexOfFirstblog = indexOfLastblog - perPage;
  const currentBlogs = alldata.slice(indexOfFirstblog, indexOfLastblog); */

  const allblog = alldata.length;

  // Search function
  const filteredBlog =
    searchQuery.trim() === ""
      ? alldata
      : alldata.filter((blog) => blog.title.toLowerCase().includes(searchQuery.toLowerCase()));

  const indexOfFirstblog = (currentPage - 1) * perPage;
  const indexOfLastblog = currentPage * perPage;

  const currentBlogs = filteredBlog.slice(indexOfFirstblog, indexOfLastblog);

  // Filtering draft blogs
  const draftBlogs = currentBlogs.filter((ab) => ab.status === "draft");
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(allblog / perPage); i++) {
    pageNumbers.push(i);
  }
  /*   // Pagination
  const [currentPage, setCurrentPage] = useState(1);

  // Change the number of blogs / pages to show on page
  const [perPage] = useState(4);

  // Fetch blogs form api endpoint with hooks
  const { alldata, loading } = useFetchData("/api/blogapi");

  // Function to handle page change
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastblog = currentPage * perPage;
  const indexOfFirstblog = indexOfLastblog - perPage;
  const currentBlogs = alldata.slice(indexOfFirstblog, indexOfLastblog);

  // Filtering draft blogs
  const draftBlogs = currentBlogs.filter((ab) => ab.status === "draft");

  const allblog = alldata.length;
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(allblog / perPage); i++) {
    pageNumbers.push(i);
  } */

  const { data: session, status } = useSession();
  const router = useRouter();

  // check if there is no active session and redirect to login page
  useEffect(() => {
    if (!session) {
      router.push("/login");
    }
  }, [session, router]);

  // loading state, loader or any other indicator
  if (status === "loading") {
    return (
      <div className="loadingdata flex flex-col flex-center wh_100">
        <Loading />
        <h1>Laddar...</h1>
      </div>
    );
  }

  if (session) {
    return (
      <>
        <div className="blogpage">
          <div className="titledashboard flex flex-sb">
            <div data-aos="fade-right">
              <h2>
                Alla Utkast <span>Bloggar</span>
              </h2>
              <h3>ADMIN PANEL</h3>
            </div>
            <div className="breadcrumb" data-aos="fade-left">
              <BsPostcard /> <span>/</span> <span>Utkast till blogg</span>
            </div>
          </div>
          <div className="blogstable" data-aos="fade-up">
            <table className="table table-styling">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Titel</th>
                  <th>Slug</th>
                  <th>Redigera / Ta bort</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <>
                    <tr>
                      <td>
                        <Dataloading />
                      </td>
                    </tr>
                  </>
                ) : (
                  <>
                    {draftBlogs.length === 0 ? (
                      <tr>
                        <td colSpan={4} className="text-center">
                          Inget utkast till blogg
                        </td>
                      </tr>
                    ) : (
                      draftBlogs.map((blog, index) => (
                        <tr key={blog._id}>
                          <td>{indexOfFirstblog + index + 1}</td>
                          <td>
                            <h3>{blog.title}</h3>
                          </td>
                          <td>
                            <pre>{blog.slug}</pre>
                          </td>
                          <td>
                            <div className="flex gap-2 flex-center">
                              <Link href={"/blogs/edit/" + blog._id}>
                                <button title="edit">
                                  <FaEdit />
                                </button>
                              </Link>
                              <Link href={"/blogs/delete/" + blog._id}>
                                <button title="delete">
                                  <RiDeleteBin6Fill />
                                </button>
                              </Link>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </>
                )}
              </tbody>
            </table>
            {draftBlogs.length === 0 ? (
              ""
            ) : (
              <div className="blogpagination">
                <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>
                  Föregående
                </button>
                {pageNumbers
                  .slice(Math.max(currentPage - 3, 0), Math.min(currentPage + 2, pageNumbers.length))
                  .map((number) => (
                    <button
                      key={number}
                      onClick={() => paginate(number)}
                      className={`${currentPage === number ? "active" : ""}`}
                    >
                      {number}
                    </button>
                  ))}
                <button onClick={() => paginate(currentPage + 1)} disabled={currentBlogs.length < perPage}>
                  Nästa
                </button>
              </div>
            )}
          </div>
        </div>
      </>
    );
  }
}
