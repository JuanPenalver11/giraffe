import React, { useState } from "react";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { useSetRecoilState } from "recoil";
import { useSnackbar } from "notistack";
//recoil
import { userAtom } from "../../atoms/userAtom";
//component
import Spinner from "../Spinner";
//icon
import giraffe from "../../images/giraffenogo.png";

const DeleteModal = ({ showModal, setShowModal }) => {
  const [loading, setLoading] = useState(false);

  const user = useRecoilValue(userAtom);

  const setUser = useSetRecoilState(userAtom);


  const { enqueueSnackbar } = useSnackbar();

  const triggerDelete = async () => {
    setLoading(true);
    try {
      await axios.delete(
        `https://l4rnrz4l-8000.asse.devtunnels.ms/api/user/delete/${user._id}`,
        {
          headers: { Authorization: `Bearer ${user.jwt}` },
        }
      );
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setUser(null);
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
          style={{ background: "rgb(123, 193, 223", border: "1px solid" }}
        >
          <div className="modal-header d-flex justify-content-between">
            <h5 className="modal-title" style={{ fontFamily: "Rampart One" }}>
              Delete Profile
            </h5>
            <img src={giraffe} alt="giraffe-icon" style={{ width: "70px" }} />
          </div>
          <form>
            <div className="modal-body text-center">
              <p>Do you want to delete your profile?</p>
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
                className="btn btn-danger"
                onClick={triggerDelete}
              >
                {loading ? <Spinner /> : "Delete Profile"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
