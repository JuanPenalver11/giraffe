import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";

//component
import Spinner from "../component/Spinner";

const SignupPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  //toast
  const { enqueueSnackbar } = useSnackbar();

  const navigate = useNavigate();

  const createUser = async (e) => {
    e.preventDefault();

    setLoading(true);

    const data = {
      username: username,
      email: email,
      password: password,
    };

    try {
      await axios.post(
        "https://l4rnrz4l-8000.asse.devtunnels.ms/api/user/signup",
        data
      );
      setUsername("");
      setEmail("");
      setPassword("");
      navigate("/login");
    } catch (error) {
      enqueueSnackbar(error.response.data.error, { variant: "error" });
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid h-100" >
      <div
        className="row justify-content-center h-100"
        style={{ marginTop: "10%" }}
      >
        <div className="col-lg-4">
          <form
            onSubmit={createUser}
            className="signup shadow p-3 mb-5 rounded"
          >
            <div className="mb-3 mt-3">
              <label htmlFor="username" className="form-label">
                <b>UserName:</b>
              </label>
              <input
                type="text"
                className="form-control"
                id="username"
                placeholder="Enter username"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
              />
            </div>
            <div className="mb-3 mt-3">
              <label htmlFor="email" className="form-label">
              <b>Email:</b>
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
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
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              {loading ? <Spinner /> : "Sign up"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
