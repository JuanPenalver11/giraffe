import React, { useState } from "react";
import { useRecoilValue } from "recoil";
import { userAtom } from "../../atoms/userAtom";
//hooks
import useDeleteCommentHook from "./Hooks/DeleteCommentHook";
import useModifyCommentHook from './Hooks/ModifyCommentHook'
//icons
import modify from "../../images/compose.png";
import garbage from "../../images/garbage.png";
import hardrive from "../../images/floppy-disk.png";
import avatar from "../../images/user.png";

const UserComment = ({ fetchData, handleDeletePost, handleModifyComment }) => {
  const [modifyIndex, setModifyIndex] = useState(null);
  const [save, setSave] = useState(true);

  const user = useRecoilValue(userAtom);
  const usercomment =
    fetchData && fetchData.postcomments ? fetchData.postcomments : [];

  // Hooks
  const { handleDelete } = useDeleteCommentHook({ handleDeletePost });
  const { setModifyComment, triggerModification } = useModifyCommentHook({
    handleModifyComment,
  });

  const handleModify = (index) => {
    setModifyIndex(index === modifyIndex ? null : index);
    setSave(true);
  };

  return (
    <>
      {usercomment
        .slice(0)
        .reverse()
        .map((comment, index) => (
          <div
            className="info-comment d-flex justify-content-between p-1 m-2"
            key={index}
            style={{
              borderBottom: "1px solid black",
              background: "rgb(218, 176, 94)",
            }}
          >
            <div className="user-info d-flex" style={{ width: "100% " }}>
              <div className="user-img">
                <img
                  src={comment.userProfilePic === 'user.png' ? avatar : comment.userProfilePic}
                  alt="user pic"
                  style={{
                    borderRadius: "50%",
                    height: "30px",
                    width: "30px",
                    margin: "15px",
                  }}
                />
              </div>

              <div className="user-info m-2" style={{ width: "100%" }}>
                <div className="d-flex">
                  <p style={{ fontWeight: "bold" }}>{comment.username}</p>
                </div>
                {modifyIndex === index && save ? (
                  <form className="d-flex flex-wrap">
                    <textarea
                      onChange={(e) => {
                        setModifyComment(e.target.value);
                      }}
                      defaultValue={comment.comment}
                      style={{ width: "80% ", padding: "5px" }}
                    ></textarea>

                    <button
                      className="btn"
                      onClick={(e) => {
                        e.preventDefault();
                        triggerModification(comment._id);
                        setSave(false);
                      }}
                      style={{ width: "5px", marginLeft: "-13px" }}
                    >
                      <img
                        src={hardrive}
                        alt="save-disc"
                        style={{ width: "25px" }}
                      />
                    </button>
                  </form>
                ) : (
                  <p>{comment.comment}</p>
                )}
              </div>
            </div>
            {user._id === comment.userId && (
              <div
                className="user-actions d-flex flex-wrap me-2"
                style={{ width: "10%" }}
              >
                <button
                  className="btn"
                  onClick={() => {
                    handleDelete(comment._id);
                  }}
                >
                  <img src={garbage} alt="garbage" style={{ width: "25px" }} />
                </button>

                <button
                  className="btn"
                  onClick={() => {
                    handleModify(index);
                  }}
                >
                  <img src={modify} alt="modify" style={{ width: "25px" }} />
                </button>
              </div>
            )}
          </div>
        ))}
    </>
  );
};

export default UserComment;
