import React, {useState, useEffect}from "react";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
//component
import Logout from "./Logout";
//recoil
import { userAtom } from "../atoms/userAtom";

const Navbar = ({profile}) => {

  const user = useRecoilValue(userAtom);

  const userLocal = JSON.parse(localStorage.getItem("user"));
  
  const [userName, setUserName] = useState(userLocal?.username );


  useEffect(()=>{
  if(!!profile){
    setUserName(profile)
  }
  },[profile])

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary shadow p-3 mb-5 sticky-top">
      <div className="container-fluid">
        <Link
          className="navbar-brand"
          to="/redirecthome"
          style={{ fontSize: "30px" }}
        >
          Giraffe
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav ms-auto">
            {user ? (
              <>
                <li className="nav-item me-2">
                  <div className="user d-flex mt-3">
                   <h4>{userName === user?.username ? userName : userLocal?.username}</h4>
                    <button
                      type="button"
                      className="btn dropdown-toggle dropdown-toggle-split"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <span className="visually-hidden">Toggle Dropdown</span>
                    </button>
                    <ul
                      className="dropdown-menu"
                      style={{
                        background: "white",
                      }}
                    >
                      <li>
                        <Link className="dropdown-item" to="/profile">
                          Profile
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" to="/yourposts">
                          Your Posts
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" to="/createpost">
                          Create Post
                        </Link>
                      </li>
                    </ul>
                  </div>
                </li>
                <li className="nav-link">
                  <Logout />
                </li>
              </>
            ) : (
              <>
                {" "}
                <li className="nav-item">
                  <Link className="nav-link" aria-current="page" to="/login">
                    Log in
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/signup">
                    Sign up
                  </Link>
                </li>{" "}
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
