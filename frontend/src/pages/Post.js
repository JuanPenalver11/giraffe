import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useSnackbar } from "notistack";
//helpes
import { prettyDate } from "../helpers/prettydate";
import { sticker } from "../helpers/sticker";
//react-icons
import commentIcon from "../images/positive-comment.png";
//component
import Likes from "../component/Post/Likes";
import AddCommentModal from "../component/Post/AddCommentModal";
import UserComment from "../component/Post/UserComment";

const Post = () => {
  const [fetchData, setFetchData] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [comment, setComment] = useState("");
  const [deletePost, setDeletePost] = useState(false);
  const [modifyComment, setModifyComment] = useState(false);

  const { idpost } = useParams();
  //toast
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    console.log("Loading... ");
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://l4rnrz4l-8000.asse.devtunnels.ms/api/post/${idpost}`
        );
        setFetchData(response.data);
      } catch (error) {
        enqueueSnackbar(error.response.data.error, { variant: "error" });
      } finally {
        console.log("Loading Completed... ");
      }
    };
    fetchData();
  }, [idpost, enqueueSnackbar, comment, deletePost, modifyComment]);

  const handleDeletePost = () => {
    setDeletePost((prev) => !prev);
  };

  const handleModifyComment = () => {
    setModifyComment((prev) => !prev);
  };

  return (
    <div className="container my-5">
      {showModal && <div className="modal-backdrop fade show"></div>}
      <div className="row justify-content-center">
        <div className="col-lg-6 col-sm-12">
          <div className="card" style={{ borderRadius: "10px" }}>
            <div className="mx-auto">
              <img
                src={fetchData.postimg}
                className="card-img-top"
                alt={fetchData.posttitle}
                style={{
                  padding: "10px",
                  borderRadius: "20px",
                  width: "350px",
                }}
              />
            </div>

            <div className="card-icons d-flex justify-content-between">
              <div className="card-category ms-3 mt-3">
                <span>
                  <img
                    src={sticker(fetchData.postcategory)}
                    alt={fetchData.postcategory}
                    style={{ width: "40px" }}
                  />
                </span>
              </div>
              <div className="card-actions me-3 d-flex align-items-center mt-2">
                <Likes fetchData={fetchData} />
                <button
                  type="button"
                  className="btn"
                  onClick={() => setShowModal(true)}
                >
                  <img
                    src={commentIcon}
                    alt="commentIcon"
                    style={{ width: "40px" }}
                  />
                </button>
              </div>
            </div>
            <hr />
            <div className="card-body">
              <h5
                className="card-title"
                style={{ fontFamily: "Rampart One", fontSize: "27px" }}
              >
                {fetchData.posttitle}
              </h5>
              <p className="card-text">{fetchData.postbody}</p>
              <div className="d-flex justify-content-end">
                <p className="card-date">
                  {prettyDate(fetchData.createdAt)}
                  {prettyDate(fetchData.createdAt) === 1
                    ? " day ago"
                    : " days ago"}
                </p>
              </div>
            </div>
            <div className="card-footer">
              {fetchData.postcomments?.length === 0 ? (
                <p className="m-4">There are no comments</p>
              ) : (
                <UserComment
                  fetchData={fetchData}
                  handleDeletePost={handleDeletePost}
                  handleModifyComment={handleModifyComment}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      <AddCommentModal
        showModal={showModal}
        setShowModal={setShowModal}
        idPost={idpost}
        setComment={setComment}
        comment={comment}
      />
    </div>
  );
};

export default Post;
