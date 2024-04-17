import axios from "axios";
import { useSnackbar } from "notistack";
import { useRecoilValue } from "recoil";
import { useParams } from "react-router-dom";
//recoil
import { userAtom } from "../../../atoms/userAtom";

const useDeleteCommentHook = ({handleDeletePost}) => {
  const { enqueueSnackbar } = useSnackbar();

  const { idpost } = useParams();

  const user = useRecoilValue(userAtom);

  const handleDelete = async (arg) => {
    try {
      await axios.delete(
        `https://l4rnrz4l-8000.asse.devtunnels.ms/api/post/${idpost}/delete/${arg}`,
        {
          headers: { Authorization: `Bearer ${user.jwt}` },
        }
      );
      handleDeletePost()
    } catch (error) {
      enqueueSnackbar(error?.response?.data?.error, { variant: "error" });
    }
  };

  return {handleDelete};
};

export default useDeleteCommentHook;
