import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function blogPage() {
  const router = useRouter();
  const { slug } = router.query;

  const [blog, setBlog] = useState([""]);
  const [loading, setLoading] = useState(true);

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

  return (
    <>
      <div className="slugpage">
        <div className="container">
          <div className="topslug_titles">
            <h1 className="slugtitle">{loading ? <div>Loading...</div> : blog && blog[0]?.title}</h1>
          </div>
        </div>
      </div>
    </>
  );
}
