import React, { useState } from "react";
import axios from "axios";
import { useSnackbar } from "notistack";
//component
import Spinner from "../component/Spinner";

const CheckEmail = () => {
  const [loading, setLoading] = useState(false);
  const [emailchecked, setEmailChecked] = useState("");


  const { enqueueSnackbar } = useSnackbar();

  const handleCheckEmail = async (e) => {

    e.preventDefault();

    setLoading(true);
    const data = {
      email: emailchecked,
    };
    try {
      const response = await axios.post(
        "https://l4rnrz4l-8000.asse.devtunnels.ms/api/reset/",
        data
      );
      enqueueSnackbar(response.data.message, { variant: "success" });
    } catch (error) {
      enqueueSnackbar(error.response.data.error, { variant: "alert" });
    } finally{
        setLoading(false)
    }
  };

  return (
    <div className="container-fluid h-100">
      <div
        className="row justify-content-center h-100"
        style={{ marginTop: "10%" }}
      >
        <div className="col-lg-4">
          <form className="login shadow p-3 mb-5 rounded" onSubmit={handleCheckEmail}>
            <div className="mb-3 mt-3">
              <label htmlFor="email" className="form-label">
                <b>Introduce your Email:</b>
              </label>
              <input
                type="email"
                className="form-control my-4"
                id="email"
                placeholder="Enter username"
                name="email"
                value={emailchecked}
                onChange={(e) => setEmailChecked(e.target.value.toLowerCase())}
                required
              />
            </div>
            <div className="d-flex justify-content-between">
              <button type="submit" className="btn btn-primary">
                {loading ? <Spinner /> : "Check email"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CheckEmail;
