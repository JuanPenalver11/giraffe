import React from "react";
//icon
import giraffe from "../../images/giraffeformuser.png";
//hook
import ModifyProfileHook from "../Profile/Hook/ModifyProfileHook";
//component
import Spinner from "../Spinner";

const Form = ({ fetchData, user }) => {
  const { setEmail, setUsername, loading, triggerModifyProfile } =
    ModifyProfileHook({
      fetchData,
      user,
    });

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
          <div className="col-lg-6 col-sm-12 ms-3 mt-3 d-flex justify-content-center">
            <span>
              <img
                src={"avatar"}
                alt=""
                style={{
                  borderRadius: "50%",
                  width: "200px",
                  height: "200px",
                  border: "1px solid black",
                }}
              />
            </span>
          </div>
          <div className="col-lg-6 col-sm-12 d-flex flex-wrap justify-content-center p-5">
            <div style={{ marginBottom: "40px" }}>
              <label htmlFor="username">
                <h5>Username</h5>
              </label>
              <input
                type="text"
                id="username"
                defaultValue={fetchData.username}
                style={{ padding: "10px" }}
                onChange={(e)=>setUsername(e.target.value)}
              />
            </div>
            <div style={{ marginBottom: "40px" }}>
              <label htmlFor="email">
                <h5>Email</h5>
              </label>
              <input
                type="text"
                id="email"
                defaultValue={fetchData.email}
                style={{ padding: "10px" }}
                onChange={(e)=>setEmail(e.target.value)}
              />
            </div>
            <button className="btn btn-secondary m-3" type="button" onClick={triggerModifyProfile}>
              {loading ? <Spinner /> : "Modify Profile"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Form;
