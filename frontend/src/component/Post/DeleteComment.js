import React from "react";
import axios from "axios";
import { useSnackbar } from "notistack";
import { useRecoilValue } from "recoil";
import { useParams } from "react-router-dom";
//recoil
import { userAtom } from "../../atoms/userAtom";
//icon
import garbage from "../../images/garbage.png";

const DeleteComment = ({ commentId, handleDeletePost }) => {
  const { enqueueSnackbar } = useSnackbar();

  const { id } = useParams();

  const user = useRecoilValue(userAtom);

  const handleDelete = async () => {
    try {
      await axios.delete(
        `https://l4rnrz4l-8000.asse.devtunnels.ms/api/post/${id}/delete/${commentId}`,
        {
          headers: { Authorization: `Bearer ${user.jwt}` },
        }
      );
      handleDeletePost();
    } catch (error) {
      enqueueSnackbar(error.response.data.error, { variant: "error" });
    }
  };

  return (
    <>
      <button className="btn">
        <img
          src={garbage}
          alt="garbage"
          style={{ width: "25px" }}
          onClick={handleDelete}
        />
      </button>
    </>
  );
};

export default DeleteComment;
