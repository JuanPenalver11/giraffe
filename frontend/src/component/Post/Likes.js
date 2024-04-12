import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { useSnackbar } from "notistack";
//icons
import thumbsUp from "../../images/positive-vote.png";
import heartFilled from "../../images/heart.png";
import heartEmpty from "../../images/heart1.png";
//recoil
import { userAtom } from "../../atoms/userAtom";

const Likes = ({ fetchData }) => {
  const user = useRecoilValue(userAtom);
  const [likeData, setLikeData] = useState(0);
  const [like, setLike] = useState(false);

  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    const storedLikes = localStorage.getItem(`likes_${fetchData._id}`);
    if (storedLikes) {
      const parsedLikes = JSON.parse(storedLikes);
      setLikeData(parsedLikes.length);
      setLike(parsedLikes.includes(user._id));
    } else {
      setLikeData(fetchData.postlikes ? fetchData.postlikes.length : 0);
      setLike(
        fetchData.postlikes ? fetchData.postlikes.includes(user._id) : false
      );
    }
  }, [fetchData, user._id]);

  const handleLike = async () => {
    try {
      const response = await axios.patch(
        `https://l4rnrz4l-8000.asse.devtunnels.ms/api/post/like/${fetchData._id}`,
        {},
        { headers: { Authorization: `Bearer ${user.jwt}` } }
      );
      const updatedLikes = response.data.data;
      setLikeData(updatedLikes.length);
      setLike(updatedLikes.includes(user._id));

      localStorage.setItem(
        `likes_${fetchData._id}`,
        JSON.stringify(updatedLikes)
      );
    } catch (error) {
      enqueueSnackbar(error.response.data.error);
    }
  };

  return (
    <div className="fs-5">
      {likeData} <img src={thumbsUp} alt="thumbsUp" style={{ width: "30px" }} />{" "}
      <button className="btn" onClick={handleLike}>
        {like ? (
          <img src={heartFilled} alt="heartFilled" style={{ width: "30px" }} />
        ) : (
          <img src={heartEmpty} alt="heartFilled" style={{ width: "30px" }} />
        )}
      </button>
    </div>
  );
};

export default Likes;
