import { useState } from "react";
import axios from "axios";
import { useSnackbar } from "notistack";
import { useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
//recoil
import { userAtom } from "../../../atoms/userAtom";

const useModifyCommentHook = ({ handleModifyComment}) => {
  const [modifyComment, setModifyComment] = useState();



  const { enqueueSnackbar } = useSnackbar();

  const { idpost } = useParams();

  const user = useRecoilValue(userAtom);

  const triggerModification = async (arg) => {

    console.log('loading...')
    
      let newComment = modifyComment
      

    try {
      await axios.patch(
        `https://l4rnrz4l-8000.asse.devtunnels.ms/api/post/${idpost}/modify/${arg}`,
        { newComment },
        { headers: { Authorization: `Bearer ${user.jwt}` } }
      );
      handleModifyComment()
    } catch (error) {
      enqueueSnackbar(error.response.data.error, { variant: "error" });
    }finally{
      console.log('loading completed...')

    }
  };

  return {setModifyComment, triggerModification};
};

export default useModifyCommentHook;
