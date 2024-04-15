import React from "react";
import { useSetRecoilState } from "recoil";
import axios from "axios";
import { useSnackbar } from "notistack";
//recoil
import { userAtom } from "../atoms/userAtom";
//react-icon
import { TbLogout } from "react-icons/tb";

const Logout = () => {
  const setUser = useSetRecoilState(userAtom);
  //toaster
  const { enqueueSnackbar } = useSnackbar();

  const handleLogout = async () => {
    try {
      await axios.post(
        "https://l4rnrz4l-8000.asse.devtunnels.ms/api/user/logout"
      );
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      setUser(null);
    } catch (error) {
      enqueueSnackbar(error.message, { variant: "error" });
    }
  };

  return (
    <button className="btn" onClick={handleLogout}>
      <TbLogout size={30} />
    </button>
  );
};

export default Logout;
