import React, { useState, useEffect } from "react";
import { useRecoilValue } from "recoil";
import axios from "axios";
import { useSnackbar } from "notistack";
//recoil
import { userAtom } from "../../atoms/userAtom";
//component
import Spinner from "../Spinner";
import Form from './Form'


const ModifyProfile = ({setProfile}) => {
  const [fetchData, setFetchData] = useState([]);
  const [loading, setLoading] = useState(false);

  const user = useRecoilValue(userAtom);

  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    setLoading(true);
    const triggerFetchData = async () => {
      try {
        const response = await axios.get(
          "https://l4rnrz4l-8000.asse.devtunnels.ms/api/user/",
          {
            headers: { Authorization: `Bearer ${user.jwt}` },
          }
        );
        setFetchData(response.data);
      } catch (error) {
        enqueueSnackbar(error.response.data.error, { variant: "error" });
      } finally {
        setLoading(false);
      }
    };
    triggerFetchData();
  }, [enqueueSnackbar, user.jwt]);

  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <span
            className="badge"
            style={{
              background: "rgb(243, 159, 149)",
              border: "1px solid black",
            }}
          >
            <p
              className="fs-5 mt-2"
              style={{ fontFamily: "Rampart One", color: "black" }}
            >
              Your profile
            </p>
          </span>
        </div>
      </div>
      <div className="row">
        <div className="col-sm-12 col-md-9 col-lg-6  d-flex justify-content-center mx-auto">
          {loading ? (
            <Spinner />
          ) : (
            <Form fetchData={fetchData} user={user} setProfile={setProfile}/>
          )}
        </div>
      </div>
    </div>
  );
};

export default ModifyProfile;
