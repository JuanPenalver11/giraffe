import React, { useState } from "react";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { useSnackbar } from "notistack";

//icon
import giraffe from "../../images/giraffe3.png";
//recoil
import { userAtom } from "../../atoms/userAtom";
//component
import Spinner from "../Spinner";

const AddCommentModal = ({
  showModal,
  setShowModal,
  idPost,
  setComment,
  comment,
}) => {
  const user = useRecoilValue(userAtom);

  const [loading, setLoading] = useState(false);

  const { enqueueSnackbar } = useSnackbar();

  const sendComment = async () => {
    let data = {
      comment: comment,
    };

    setLoading(true);

    try {
      await axios.patch(
        `https://l4rnrz4l-8000.asse.devtunnels.ms/api/post/comment/${idPost}`,
        data,
        { headers: { Authorization: `Bearer ${user.jwt}` } }
      );
      setComment("");
    } catch (error) {
      enqueueSnackbar(error.response.data.error, { variant: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`modal ${showModal ? "show" : ""}`}
      tabIndex="-1"
      role="dialog"
      style={{ display: showModal ? "block" : "none" }}
    >
      <div className="modal-dialog" role="document">
        <div
          className="modal-content"
          style={{ background: "rgb(123, 193, 223", border:'1px solid'}}
        >
          <div className="modal-header d-flex justify-content-between">
            <h5 className="modal-title" style={{fontFamily:"Rampart One"}}>Add Comment</h5>
            <img src={giraffe} alt="giraffe-icon" style={{ width: "70px" }} />
          </div>
          <form>
            <div className="modal-body">
              <textarea
                style={{ width: "100%", padding: "10px" }}
                onChange={(e) => {
                  setComment(e.target.value);
                }}
              ></textarea>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setShowModal(false)}
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-warning"
                onClick={() => {
                  sendComment();
                  setShowModal(false);
                }}
              >
                {loading ? <Spinner /> : "Add Comment"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddCommentModal;
