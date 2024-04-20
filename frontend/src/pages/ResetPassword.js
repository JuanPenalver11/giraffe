import React, { useState } from "react";
import axios from "axios";
import { useSnackbar } from "notistack";
import { useParams, useNavigate } from "react-router-dom";
//component
import Spinner from "../component/Spinner";

const ResetPassword = () => {
  const [loading, setLoading] = useState(false);
  const [resetpassword, setResetPassword] = useState("");

  const { enqueueSnackbar } = useSnackbar();

  const { id } = useParams();

  const { token } = useParams();

  const navigate = useNavigate();

  const handleResetPassword = async (e) => {
    e.preventDefault();

    setLoading(true);

    const data = {
      password: resetpassword,
    };

    try {
      const response = await axios.post(
        `https://l4rnrz4l-8000.asse.devtunnels.ms/api/reset/${id}/${token}`,
        data
      );
      if (response) {
        enqueueSnackbar(response.data, { variant: "success" });
        navigate("/login");
      }
    } catch (error) {
      enqueueSnackbar(error.response.data.error, { variant: "alert" });
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
          <form
            className="login shadow p-3 mb-5 rounded"
            onSubmit={handleResetPassword}
          >
            <div className="mb-3 mt-3">
              <label htmlFor="password" className="form-label">
                <b>Introduce new Password:</b>
              </label>
              <input
                type="password"
                className="form-control my-4"
                id="password"
                placeholder="Enter new Password"
                name="password"
                value={resetpassword}
                onChange={(e) => setResetPassword(e.target.value.toLowerCase())}
                required
              />
            </div>

            <div className="d-flex justify-content-between">
              <button type="submit" className="btn btn-primary">
                {loading ? <Spinner /> : "Change Password"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
