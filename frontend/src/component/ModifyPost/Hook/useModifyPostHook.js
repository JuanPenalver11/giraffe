import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import { useRecoilValue } from "recoil";
//recoil
import { userAtom } from "../../../atoms/userAtom";

const useModifyPostHook = ({ idpost, fetchData }) => {
  const [imgPost, setImgPost] = useState(fetchData.postimg);
  const [titlePost, setTitlePost] = useState(fetchData.posttitle);
  const [bodyPost, setBodyPost] = useState(fetchData.postbody);
  const [categoryPost, setCategoryPost] = useState(fetchData.postcategory);


  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const { enqueueSnackbar } = useSnackbar();

  const user = useRecoilValue(userAtom);

  const handleModifyPost = async () => {
    setLoading(true);

    const data = {
      postcategory: categoryPost,
      posttitle: titlePost,
      postbody: bodyPost,
      postimg: imgPost,
    };
    try {
      await axios.patch(
        `https://l4rnrz4l-8000.asse.devtunnels.ms/api/post/modify/${idpost}`,
        data,
        {
          headers: { Authorization: `Bearer ${user.jwt}` },
        }
      );
      navigate('/yourposts');
    } catch (error) {
      enqueueSnackbar(error.response.data.error, { variant: "error" });
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    setImgPost,
    setTitlePost,
    setBodyPost,
    setCategoryPost,
    handleModifyPost,
  };
};

export default useModifyPostHook;
