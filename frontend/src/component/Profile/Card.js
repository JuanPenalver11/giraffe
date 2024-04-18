import React, { useState } from "react";
import { Link } from "react-router-dom";
//icons
import giraffe from "../../images/giraffeformuser.png";
import avatar from '../../images/user.png'
//helper
import { prettyDate } from "../../helpers/prettydate";
//component
import DeleteModal from "./DeleteModal";

const Card = ({ fetchData }) => {
  const [showModal, setShowModal] = useState(false);


  return (
    <div className="container">
      {showModal && <div className="modal-backdrop fade show"></div>}
      <div
        className="card shadow m-3 rounded"
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
          <h5 style={{ color: "black" }}>Your Profile</h5>
          <span>
            <img src={giraffe} alt="giraffe-icon" style={{ width: "70px" }} />
          </span>
        </div>
        <div className="row d-flex justify-content-around">
          <div className="col-lg-6 col-md-9 col-sm-12 ms-3 mt-3 d-flex justify-content-center">
            <span>
              <img
                src={fetchData.profilePic === 'user.png' ? avatar : fetchData.profilePic }
                alt=""
                style={{
                  borderRadius: "50%",
                  width: "150px",
                  height: "150px",
                  border: "1px solid black",
                }}
              />
            </span>
          </div>
          <div className="col-lg-10 col-md-11 col-sm-12 p-5">
            <div style={{ marginBottom: "40px" }}>
              <h5 style={{ borderBottom: "1px solid black" }}>UserName</h5>
              <h6>{fetchData.username}</h6>
            </div>
            <div style={{ marginBottom: "40px" }}>
              <h5 style={{ borderBottom: "1px solid black" }}>Email</h5>
              <h6>{fetchData.email}</h6>
            </div>
            <div style={{ marginBottom: "40px" }}>
              <h5 style={{ borderBottom: "1px solid black" }}>User Since</h5>
              <h6>{prettyDate(fetchData.createdAt)} days ago</h6>
            </div>
          </div>
        </div>
        <div className="card-footer d-flex justify-content-around text-center">
          <button
            className="btn btn-warning my-3"
            type="button"
            onClick={() => setShowModal(true)}
          >
            Delete Profile
          </button>
          <Link className="btn btn-secondary my-3" type="button" to={`/profile/${fetchData._id}`}>
            Modify Profile
          </Link>
        </div>
      </div>
      <DeleteModal showModal={showModal} setShowModal={setShowModal} />
    </div>
  );
};

export default Card;
