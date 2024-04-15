import { useState } from "react";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ModifyProfileHook = ({ fetchdata, user }) => {
  const [username, setUsername] = useState(fetchdata ? fetchdata.username : '');
  const [email, setEmail] = useState(fetchdata ? fetchdata.email : '');
  const [loading, setLoading] = useState(false);

  const { enqueueSnackbar } = useSnackbar();

  const navigate = useNavigate();

  const triggerModifyProfile = async () => {
    const data = {
      username: username,
      email: email,
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
    } catch (error) {
      enqueueSnackbar(error.response.data.error, { variant: "error" });
    } finally {
      setLoading(false);
      navigate("/profile");
    }
  };

  return { setUsername, setEmail, loading, triggerModifyProfile };
};

export default ModifyProfileHook;
