import { useState } from "react";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import axios from "axios";
//helper
import { defaultImg } from "../../../helpers/defaultImg";

const useModifyProfileHook = ({ fetchData, user, setProfile }) => {
  const [username, setUsername] = useState(fetchData?.username);
  const [email, setEmail] = useState(fetchData?.email);
  const [image, setImage] = useState(fetchData?.profilePic);

  const imageUser = () =>{
     if(image === 'user.png'){
    return defaultImg
  } else {
    return image
  }
  }
 
  
  const [loading, setLoading] = useState(false);

  const { enqueueSnackbar } = useSnackbar();

  const navigate = useNavigate();

  const triggerModifyProfile = async () => {
    const data = {
      username: username,
      email: email,
      profilePic: imageUser(image),
    };

    setLoading(true);
    try {
      await axios.patch(
        `https://l4rnrz4l-8000.asse.devtunnels.ms/api/user/update/${user._id}`,
        data,
        {
          headers: { Authorization: `Bearer ${user.jwt}` },
        }
      );
      const userData = JSON.parse(localStorage.getItem("user"));
      if (userData) {
        userData.username = username;
        localStorage.setItem("user", JSON.stringify(userData));
      }
      setProfile(data.username);
    } catch (error) {
      enqueueSnackbar(error.response.data.error, { variant: "error" });
    } finally {
      setLoading(false);
      navigate("/profile");
    }
  };

  return { setUsername, setEmail, loading, triggerModifyProfile, setImage };
};

export default useModifyProfileHook;
