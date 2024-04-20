import React, { useState, useRef } from "react";
import { useParams } from "react-router-dom";
//helper
import { categories } from "../../helpers/categories";
//icon
import giraffe from "../../images/animal-kingdom.png";
import upload from "../../images/upload.png";
import avatar from "../../images/user.png";
import paper from "../../images/paper.png";
//hook
import usePrevImgHook from "../../Hook/usePrevImgHook";
import RenderPosthook from "./Hook/RenderPosthook";
import useModifyPostHook from "./Hook/useModifyPostHook";
//component
import Spinner from "../Spinner";

const Form = () => {
  const { idpost } = useParams();

  const { loadingFetch, fetchData } = RenderPosthook({ idpost });

  const [selectedCategory, setSelectedCategory] = useState(fetchData.category);

  const handleCategoryChange = (categoryName) => {
    setSelectedCategory(categoryName);
  };

  const fileRef = useRef(null);

  const { handleImgChange, imgUrl } = usePrevImgHook();

  const {
    loading,
    setImgPost,
    setTitlePost,
    setBodyPost,
    setCategoryPost,
    handleModifyPost,
  } = useModifyPostHook({ idpost, fetchData });

  return (
    <>
      {loadingFetch ? (
        <Spinner />
      ) : (
        <div className="container my-5">
          <form
            className="p-4 shadow rounded"
            style={{
              background: "rgb(123, 193, 223)",
              borderRadius: "15px",
              border: "solid 1px",
            }}
          >
            <div
              className="title d-flex justify-content-between"
              style={{
                fontFamily: "Rampart One",
                borderBottom: "0.2px solid black",
              }}
            >
              <h5 style={{ color: "black" }}>Modify Post</h5>
              <span>
                <img
                  src={giraffe}
                  alt="giraffe-icon"
                  style={{ width: "70px"}}
                />
              </span>
            </div>
            <div className="mt-4">
              <label>Post Image</label>
            </div>
            <div className="img-holder d-flex flex-wrap mt-1">
              <span>
                <img
                  src={imgUrl || fetchData.postimg || avatar}
                  alt="profile pic"
                  style={{
                    width: "250px",
                    height: "250px",
                    border: "1px solid black",
                    borderRadius:'10px'
                  }}
                />
              </span>
              <div className="btn-container">
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
                    onChange={handleImgChange}
                  />
                  <button
                    className="btn"
                    onClick={(e) => {
                      e.preventDefault();
                      setImgPost(imgUrl);
                    }}
                  >
                    <img src={paper} alt="upload" style={{ width: "25px" }} />{" "}
                  </button>
                </div>
              </div>
            </div>
            <div className="title-holder d-flex flex-column mt-3">
              <label htmlFor="title" className="title-form">
                Post Title
              </label>
              <input
                type="text"
                id="posttTitle"
                style={{ padding: "10px", borderRadius:'10px'}}
                defaultValue={fetchData.posttitle}
                onChange={(e) => {
                  setTitlePost(e.target.value);
                }}
              />
            </div>
            <div className="body-holder d-flex flex-column mt-3">
              <label htmlFor="body" className="body-form">
                Post Body
              </label>
              <textarea
                type="text"
                id="postBody"
                style={{ padding: "10px", borderRadius:'10px'}}
                defaultValue={fetchData.postbody}
                onChange={(e) => {
                  setBodyPost(e.target.value);
                }}
              ></textarea>
            </div>
            <div className="category-holder  m-3">
              <label className="mb-4">Post category</label>
              <div
                className="radio-holder d-flex flex-wrap"
                style={{ backgroundColor: "grey", borderRadius: "10px" }}
              >
                {categories.map((category, index) => {
                  return (
                    <div className="form-check m-3" key={index}>
                      <input
                        className="form-check-input"
                        type="radio"
                        name="category"
                        value={category.name}
                        id={`flexRadioDefault${index}`}
                        checked={selectedCategory === category.name}
                        onChange={() => {
                          handleCategoryChange(category.name);
                          setCategoryPost(category.name);
                        }}
                      />
                      <label
                        className="form-check-label"
                        htmlFor={`flexRadioDefault${index}`}
                        style={{ color: "white" }}
                      >
                        <span>
                          <img
                            src={category.icon}
                            alt={category.name}
                            style={{ width: "25px" }}
                          />
                        </span>{" "}
                        {category.name}
                      </label>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="btn-holder d-flex justify-content-end mt-5">
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleModifyPost}
              >
                {loading ? <Spinner /> : "Modify Post"}
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default Form;
