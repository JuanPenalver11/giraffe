import React from "react";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
//component
import Logout from "./Logout";
//recoil
import { userAtom } from "../atoms/userAtom";



const Navbar = () => {
  const user = useRecoilValue(userAtom);

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary shadow p-3 mb-5">
      <div className="container-fluid" >
        <Link className="navbar-brand" to="/redirecthome" style={{fontSize:'30px'}}>
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
              <li className="nav-item">
                <Logout />
              </li>
            ) : (
              <>
                {" "}
                <li className="nav-item">
                  <Link
                    className="nav-link active"
                    aria-current="page"
                    to="/login"
                  >
                    Log in
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/signup" >
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
