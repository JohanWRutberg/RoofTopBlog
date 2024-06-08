import axios from "axios";

const { useState, useEffect } = require("react");

function useFetchData(apiEndPoint) {
  const [alldata, setAlldata] = useState([]);
  const [loading, setLoading] = useState(true);
  const [initialLoad, setInitialLoad] = useState(true);

  useEffect(() => {
    if (initialLoad) {
      // Set initialload to false to prevent the api call on subsequent renders
      setInitialLoad(false);
      setLoading(false); // Set loading to false to show components initially
      return; // Exit useeffect
    }
    setLoading(true); // Set loading to true

    const fetchAllData = async () => {
      try {
        const res = await axios.get(apiEndPoint);
        const alldata = res.data;
        setAlldata(alldata);
        setLoading(false); // Set loading state to false after data has been fetched
      } catch (error) {
        console.error("Error fetching blog data", error);
        setLoading(false); // Set loading state to false even if error
      }
    };

    // Fetch blog data only if api endpoint exists
    if (apiEndPoint) {
      fetchAllData();
    }
  }, [initialLoad, apiEndPoint]);

  return { alldata, loading };
}

export default useFetchData;
