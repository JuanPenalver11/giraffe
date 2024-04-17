import React, { useState } from "react";
import {Link} from 'react-router-dom'
//helpers
import { sticker } from "../../helpers/sticker";
import { prettyDate } from "../../helpers/prettydate";
//icons
import rubbish from "../../images/garbage.png";
import modify from "../../images/compose.png";
//hooks
import useDeletePostHook from "./Hooks/DeletePostHook";
//component
import Spinner from "../../component/Spinner";


const Card = ({
  userPosts,
  handleDeletePost,
}) => {
  const [modifyIndex, setModifyIndex] = useState(null);

  const { loading, triggerDeletePost } = useDeletePostHook({
    handleDeletePost,
  });

  const handleModify = (index) => {
    setModifyIndex(index === modifyIndex ? null : index);
  };

  return (
    <>
      {userPosts.map((userPost, index) => {
        return (
          <div
            className="card shadow p-3 m-3 rounded"
            style={{ width: "18rem" }}
            key={index}
          >
            <img
              src={userPost.postimg}
              className="card-img-top"
              alt="post-img"
              style={{ width: "250px" }}
            />
            <div className="card-body">
              <h5 className="card-title">{userPost.posttitle}</h5>
              <p className="card-text">{userPost.postbody}</p>
              <div className="card-actions d-flex justify-content-end">
                {modifyIndex === index && loading ? (
                  <Spinner />
                ) : (
                  <button
                    className="btn"
                    onClick={() => {
                      triggerDeletePost(userPost._id);
                      handleModify(index);
                    }}
                  >
                    <img
                      src={rubbish}
                      alt="rubbish bin"
                      style={{ width: "25px" }}
                    />
                  </button>
                )}
                <Link
                  className="btn" to={`/modify/${userPost._id}`}
                >
                  <img
                    src={modify}
                    alt="modify-icon"
                    style={{ width: "25px" }}
                  />
                </Link>
              </div>
            </div>
            <div
              className="card-footer d-flex justify-content-between"
              style={{
                height: "40px",
                background: "rgb(218, 176, 94)",
                border: "1px solid",
              }}
            >
              <img
                src={sticker(userPost.postcategory)}
                alt={userPost.postcategory}
                style={{ width: "30px" }}
              />

              <p>{prettyDate(userPost.createdAt)} days ago</p>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default Card;
