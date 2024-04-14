import { useState } from "react";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { useSnackbar } from "notistack";
//recoil
import { userAtom } from "../../../atoms/userAtom";

const ModifyPostModalHook = ({ userPost, handleModifyPost}) => {
  const [postTitle, setPostTitle] = useState(userPost.posttitle);
  const [postBody, setPostBody] = useState(userPost.postbody);
  const [postImg, setPostImg] = useState(userPost.postimage);
  const [postCategory, setPostCategory] = useState(userPost.postcategory);

  const [loading, setLoading] = useState(false);

  const user = useRecoilValue(userAtom);

  const { enqueueSnackbar } = useSnackbar();

  const modifyPost = async (arg) => {
    let data = {
        postcategory:postCategory,
        posttitle:postTitle,
        postbody:postBody,
        postimg:postImg
    };

    setLoading(true);

    try {
      await axios.patch(
        `https://l4rnrz4l-8000.asse.devtunnels.ms/api/post/modify/${arg}`,
        data,
        { headers: { Authorization: `Bearer ${user.jwt}` } }
      );
      handleModifyPost()
    } catch (error) {
      enqueueSnackbar(error.response.data.error, { variant: "error" });
    } finally {
      setLoading(false);
    }
  };

  return { modifyPost, loading, setPostBody, setPostCategory, setPostTitle, setPostImg, postCategory };
};

export default ModifyPostModalHook;
