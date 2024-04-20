import React from "react";
import github from "../images/github.png";

const Footer = () => {
  return (
    <div
      style={{
        background: "rgb(243, 159, 149)",
        width: "100%",
        borderTop: "1px solid black",
        marginTop:'auto'
      }}
      className="text-center"
    >
      <h3>
        Created by Juan{" "}
        <a href="https://github.com/JuanPenalver11">
          <img src={github} alt="github-icon" style={{ width: "30px" }} />
        </a>
      </h3>
    </div>
  );
};

export default Footer;
