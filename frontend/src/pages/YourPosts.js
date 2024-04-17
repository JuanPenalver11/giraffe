import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSnackbar } from "notistack";
import { useRecoilValue } from "recoil";
//component
import Card from "../component/YourPosts/Card";
import Spinner from "../component/Spinner";
//recoil
import { userAtom } from "../atoms/userAtom";

const YourPosts = () => {
  const [fetchData, setFetchData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deletePost, setDeletePost] = useState(false);


  const user = useRecoilValue(userAtom);

  const { enqueueSnackbar } = useSnackbar(userAtom);

  useEffect(() => {
    setLoading(true);
    const handleFetchData = async () => {
      try {
        const response = await axios.get(
          "https://l4rnrz4l-8000.asse.devtunnels.ms/api/post"
        );
        setFetchData(response.data);
      } catch (error) {
        enqueueSnackbar(error.response.data.error, { variant: "error" });
      } finally {
        setLoading(false);
      }
    };
    handleFetchData();
  }, [enqueueSnackbar, deletePost]);

  const handleDeletePost = () => {
    setDeletePost((prev) => !prev);
  };


  const userPosts = fetchData.filter((data) => data.postedBy === user._id);

  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <span
            className="badge"
            style={{
              background: "rgb(243, 159, 149)",
              border: "1px solid black",
            }}
          >
            <p
              className="fs-5 mt-2"
              style={{ fontFamily: "Rampart One", color: "black" }}
            >
              Your Posts
            </p>
          </span>
        </div>
      </div>
      <div className="row">
        <div className="col-12 d-flex flex-wrap justify-content-center">
          
          {loading ? (
            <Spinner />
          ) : userPosts.length === 0 ? (<h1 style={{ color: "white", margin:'200px'}}>You dont' have Post.</h1>) : (
            <Card
              userPosts={userPosts}
              handleDeletePost={handleDeletePost}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default YourPosts;
