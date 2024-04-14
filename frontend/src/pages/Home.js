//dependencies
import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useSnackbar } from "notistack";
import { useParams, useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
//component
import Card from "../component/Home/Card";
import Spinner from "../component/Spinner";
import Filter from "../component/Home/Filter";
//recoil
import { userAtom } from "../atoms/userAtom";

const Home = () => {
  const user = useRecoilValue(userAtom);
  const { category } = useParams();

  //fetch data
  const [fetchData, setFetchData] = useState([]);
  const [loading, setLoading] = useState(false);

  //toast
  const { enqueueSnackbar } = useSnackbar();

  const navigate = useNavigate();

  const callAPI = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://l4rnrz4l-8000.asse.devtunnels.ms/api/post?postcategory=${
          !!category ? category : ""
        }`
      );
      setFetchData(response.data);
    } catch (error) {
      enqueueSnackbar(error.response.data.error, { variant: "error" });
    } finally {
      setLoading(false);
    }
  }, [enqueueSnackbar, category]);

  useEffect(() => {
    callAPI();
  }, [callAPI]);

  const handleCategory = (arg) => {
    navigate(`/${arg}`);
  };

  return (
    <div className="container my-5">
      <div className="row">
        <div className="col-12">
          {user && <Filter handleCategory={handleCategory} />}
        </div>
      </div>

      <div className="row justify-content-center">
        <div className=" d-flex flex-wrap justify-content-center col-12">
          {loading ? (
            <Spinner />
          ) : fetchData.length === 0 ? (
            <h2>There is no post available</h2>
          ) : (
            <Card fetchData={fetchData} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
