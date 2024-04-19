import React, { useRef } from "react";
//icon
import giraffe from "../../images/giraffeformuser.png";
import upload from "../../images/upload.png";
import avatar from "../../images/user.png";
import paper from "../../images/paper.png";
//hook
import useModifyProfileHook from "./Hook/ModifyProfileHook";
import usePrevImgHook from "../../Hook/usePrevImgHook";
//component
import Spinner from "../Spinner";

const Form = ({ fetchData, user, setProfile }) => {
  const { setEmail, setUsername, setImage, loading, triggerModifyProfile } =
    useModifyProfileHook({
      fetchData,
      user,
      setProfile,
    });

  const fileRef = useRef(null);

  const { handleImgChange, imgUrl } = usePrevImgHook();

  const userImage = (arg) => {
    if (arg === "user.png") {
      return avatar;
    } else {
      return arg;
    }
  };

  return (
    <div className="container">
      <form
        className="shadow m-3 rounded"
        style={{
          background: "rgb(123, 193, 223)",
          border: "1px solid black",
          borderRadius: "10px",
        }}
      >
        <div
          className="title d-flex justify-content-between m-3"
          style={{
            fontFamily: "Rampart One",
            borderBottom: "0.2px solid white",
          }}
        >
          <h5 style={{ color: "black" }}>Modify Your Profile</h5>
          <span>
            <img src={giraffe} alt="giraffe-icon" style={{ width: "70px" }} />
          </span>
        </div>
        <div className="row d-flex justify-content-around">
          <div className="col-lg-6 col-md-9 col-sm-12 ms-3 mt-3 d-flex justify-content-center">
            <span>
              <img
                src={imgUrl || userImage(fetchData.profilePic)}
                defaultValue={avatar}
                alt="profile pic"
                style={{
                  borderRadius: "50%",
                  width: "150px",
                  height: "150px",
                  border: "1px solid black",
                }}
              />
            </span>
            <div className="btn-container d-flex flex-column">
              <div className="upload-div">
                <button
                  className="btn"
                  style={{ border: "none", background: "rgb(123, 193, 223)" }}
                  onClick={(e) => {
                    e.preventDefault();
                    fileRef.current.click();
                  }}
                >
                  <img src={upload} alt="upload" style={{ width: "25px" }} />{" "}
                </button>
                <input
                  className="form-control"
                  type="file"
                  hidden
                  ref={fileRef}
                  onChange={(e) => {
                    handleImgChange(e);
                    setImage(imgUrl);
                  }}
                />
              </div>
              <div className="send-img mt-5">
                <button
                  className="btn"
                  onClick={(e) => {
                    setImage(imgUrl);
                    e.preventDefault();
                  }}
                >
                  <img src={paper} alt="upload" style={{ width: "25px" }} />{" "}
                </button>
              </div>
            </div>
          </div>
          <div className="col-lg-10 col-md-11 col-sm-12 d-flex flex-wrap justify-content-center p-5">
            <div style={{ marginBottom: "40px", width: "100%" }}>
              <label htmlFor="username" style={{ width: "100%" }}>
                <h5>Username</h5>
              </label>
              <input
                type="text"
                id="username"
                defaultValue={fetchData.username}
                style={{ padding: "10px", width: "100%" }}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div style={{ marginBottom: "40px", width: "100%" }}>
              <label htmlFor="email" style={{ width: "100%" }}>
                <h5>Email</h5>
              </label>
              <input
                type="text"
                id="email"
                defaultValue={fetchData.email}
                style={{ padding: "10px", width: "100%" }}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div
              className="d-flex justify-content-center"
              style={{
                borderTop: "0.5px solid grey",
                width: "100%",
              }}
            >
              <button
                className="btn btn-secondary m-3"
                type="button"
                onClick={triggerModifyProfile}
              >
                {loading ? <Spinner /> : "Modify Profile"}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Form;
