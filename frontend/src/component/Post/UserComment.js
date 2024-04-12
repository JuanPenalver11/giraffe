import React from "react";
import giraffe from "../../images/giraffe3.png";
import { useRecoilValue } from "recoil";
//recoil
import { userAtom } from "../../atoms/userAtom";
//component
import DeleteComment from "./DeleteComment";
import ModifyComment from "./ModifyComment";

const UserComment = ({ fetchData, handleDeletePost }) => {
  const user = useRecoilValue(userAtom);

  let usercomment =
    fetchData && fetchData.postcomments ? fetchData.postcomments : [];

  return (
    <>
      {usercomment
        .slice(0)
        .reverse()
        .map((comment, index) => {
          return (
            <div
              className="info-comment d-flex  justify-content-between p-2 m-2 "
              key={index}
              style={{
                borderBottom: "1px solid black",
                background: "rgb(218, 176, 94)",
              }}
            >
              <div className="user-info d-flex m-2">
                <img
                  src={giraffe}
                  alt="giraffe"
                  style={{ width: "40px", margin: "15px" }}
                />
                <div className="user-info m-2">
                  <p style={{ fontWeight: "bold" }}>{comment.username}</p>
                  <p>{comment.comment}</p>
                </div>
              </div>
              {user._id === comment.userId ? (
                <div className="user-actions d-flex">
                  <DeleteComment
                    commentId={comment._id}
                    handleDeletePost={handleDeletePost}
                  />
                  <ModifyComment commentId={comment._id} />
                </div>
              ) : (
                ""
              )}
            </div>
          );
        })}
    </>
  );
};

export default UserComment;
