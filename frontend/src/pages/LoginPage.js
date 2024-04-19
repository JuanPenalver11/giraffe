import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { useSnackbar } from "notistack";
import { Link } from "react-router-dom";

//recoil
import { userAtom } from "../atoms/userAtom";

//component
import Spinner from "../component/Spinner";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  //recoil
  const setUser = useSetRecoilState(userAtom);
  //toast
  const { enqueueSnackbar } = useSnackbar();
  //react-router
  const navigate = useNavigate();

  const authUser = async (e) => {
    e.preventDefault();

    const data = {
      username: username.toLowerCase().split(" ").join(""),
      password,
    };

    setLoading(true);

    try {
      const response = await axios.post(
        "https://l4rnrz4l-8000.asse.devtunnels.ms/api/user/login",
        data
      );
      setUsername("");
      setPassword("");
      localStorage.setItem("token", response.data.jwt);
      localStorage.setItem("user", JSON.stringify(response.data));
      navigate("/");
      setUser(response.data);
    } catch (error) {
      enqueueSnackbar(error.response.data.error, { variant: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid h-100">
      <div
        className="row justify-content-center h-100"
        style={{ marginTop: "10%" }}
      >
        <div className="col-lg-4">
          <form className="login shadow p-3 mb-5 rounded" onSubmit={authUser}>
            <div className="mb-3 mt-3">
              <label htmlFor="email" className="form-label">
                <b>UserName:</b>
              </label>
              <input
                type="username"
                className="form-control"
                id="username"
                placeholder="Enter username"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value.toLowerCase())}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="pwd" className="form-label">
                <b>Password:</b>
              </label>
              <input
                type="password"
                className="form-control"
                id="pwd"
                placeholder="Enter password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="form-check mb-3">
              <label className="form-check-label">
                <input
                  className="form-check-input"
                  type="checkbox"
                  name="remember"
                />{" "}
                Remember me
              </label>
            </div>
            <div className="d-flex justify-content-between">
              <button type="submit" className="btn btn-primary">
                {loading ? <Spinner /> : "Log in"}
              </button>
              <Link style={{ fontSize: "15px" }} to={'/checkemail'}>Reset Password</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
