import React from "react";
import { Link } from "react-router-dom";
//helper
import { prettyDate } from "../../helpers/prettydate";
import { sticker } from "../../helpers/sticker";

const Card = ({ fetchData }) => {

  return (
    <>
      {fetchData.map((data, index) => {
        return (
          <div
            className="card shadow p-3 rounded m-3"
            style={{ width: "18rem" }}
            key={index}
          >
            <img src={data.postimg} className="card-img-top" alt="post-img"  style={{width:'250px'}}/>

            <div className="card-body">
              <h5
                className="card-title"
                style={{ fontFamily: "Rampart One", fontSize: "27px" }}
              >
                {data.posttitle}
              </h5>
              <p className="card-text">
                {data.postbody.length > 150
                  ? data.postbody.substring(0, 150) + "..."
                  : data.postbody}
              </p>
              <Link to={`/post/${data._id}`} className="btn btn-primary">
                Have a look
              </Link>
            </div>
            <div
              className="card-footer d-flex justify-content-between"
              style={{
                height: "40px",
                background: "rgb(218, 176, 94)",
                border: "1px solid",
              }}
            >
              <img
                src={sticker(data.postcategory)}
                alt={data.postcategory}
                style={{ width: "30px" }}
              />

              <p>{prettyDate(data.createdAt)} days ago</p>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default Card;
