import axios from "axios";
import { useState } from "react";
import { useRecoilValue } from "recoil";
import { useSnackbar } from "notistack";
//recoil
import { userAtom } from "../../../atoms/userAtom";

const DeletePostHook = ({handleDeletePost}) => {
  const [loading, setLoading] = useState(false);

  const user = useRecoilValue(userAtom);

  const { enqueueSnackbar } = useSnackbar();

  const triggerDeletePost = async (arg) => {
    setLoading(true);
    try {
      await axios.delete(
        `https://l4rnrz4l-8000.asse.devtunnels.ms/api/post/delete/${arg}`,
        {
          headers: { Authorization: `Bearer ${user.jwt}` },
        }
      );
      handleDeletePost()
    } catch (error) {
      enqueueSnackbar(error.response.data.error, { variant: "error" });
    } finally {
      setLoading(false);
    }
  };

  return {loading, triggerDeletePost};
};

export default DeletePostHook;
