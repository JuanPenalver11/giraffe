import { useState, useEffect } from "react";
import axios from "axios";
import { useSnackbar } from "notistack";


const useRenderPosthook = ({idpost}) => {
  const [fetchData, setFetchData] = useState({});
  const [loadingFetch, setLoadingFetch] = useState(false);

  const { enqueueSnackbar } = useSnackbar();


  useEffect(() => {
    setLoadingFetch(true);

    const fetchDataPost = async () => {
      try {
        const response = await axios.get(
          `https://l4rnrz4l-8000.asse.devtunnels.ms/api/post/${idpost}`,

        );
        setFetchData(response.data);
      } catch (error) {
        enqueueSnackbar(error.response.data.error, { variant: "error" });
      } finally {
        setLoadingFetch(false);
      }
    };
    fetchDataPost();
  }, [idpost, enqueueSnackbar]);

  return { fetchData, loadingFetch };
};

export default useRenderPosthook;
