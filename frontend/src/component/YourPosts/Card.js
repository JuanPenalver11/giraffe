import React, { useState } from "react";
//helpers
import { sticker } from "../../helpers/sticker";
import { prettyDate } from "../../helpers/prettydate";
//icons
import rubbish from "../../images/garbage.png";
import modify from "../../images/compose.png";
//hooks
import DeletePostHook from "./Hooks/DeletePostHook";
//component
import Spinner from "../../component/Spinner";
import ModifyPostModal from "./ModifyPostModal";

const Card = ({
  userPosts,
  handleDeletePost,
  setShowModal,
  showModal,
  handleModifyPost
}) => {
  const [modifyIndex, setModifyIndex] = useState(null);

  const { loading, triggerDeletePost } = DeletePostHook({
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
                src={userPost.postimage}
                className="card-img-top"
                alt="..."
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
                      onClick={() => (
                        triggerDeletePost(userPost._id), handleModify(index)
                      )}
                    >
                      <img
                        src={rubbish}
                        alt="rubbish bin"
                        style={{ width: "25px" }}
                      />
                    </button>
                  )}
                  <button className="btn" onClick={() => setShowModal(true)}>
                    <img
                      src={modify}
                      alt="modify-icon"
                      style={{ width: "25px" }}
                    />
                  </button>
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
              <ModifyPostModal
                userPost={userPost}
                showModal={showModal}
                setShowModal={setShowModal}
                handleModifyPost={handleModifyPost}
              />
            </div>
          );
        })}
    </>
  );
};

export default Card;
