import React, { useState, useRef } from "react";
import { useRecoilValue } from "recoil";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import axios from "axios";
//icon
import giraffe from "../../images/giraffe-bg-activity.png";
import upload from "../../images/upload.png";
import avatar from "../../images/user.png";
import paper from "../../images/paper.png";
//recoil
import { userAtom } from "../../atoms/userAtom";
//hook
import usePrevImgHook from "../../Hook/usePrevImgHook";
//component
import Spinner from "../Spinner";
//helper 
import { categories } from "../../helpers/categories";


const Form = () => {
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleCategoryChange = (categoryName) => {
    setSelectedCategory(categoryName);
  };

  const fileRef = useRef(null);

  const { handleImgChange, imgUrl } = usePrevImgHook();

  const [titlePost, SetTitlePost] = useState("");
  const [bodyPost, SetBodyPost] = useState("");
  const [imgPost, SetImgPost] = useState("");
  const [categoryPost, SetCategoryPost] = useState("");
  const [loading, setLoading] = useState(false);

  const user = useRecoilValue(userAtom);

  const { enqueueSnackbar } = useSnackbar();

  const navigate = useNavigate();

  const createPost = async () => {
    setLoading(true);

    const data = {
      postcategory: categoryPost,
      posttitle: titlePost,
      postbody: bodyPost,
      postimg: imgPost,
    };

    try {
      await axios.post(
        "https://l4rnrz4l-8000.asse.devtunnels.ms/api/post/create",
        data,
        { headers: { Authorization: `Bearer ${user.jwt}` } }
      );
      SetTitlePost("");
      SetBodyPost("");
      SetImgPost("");
      SetCategoryPost("");
      navigate("/yourposts");
    } catch (error) {
      enqueueSnackbar(error.response.data.error, { variant: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
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
          <h5 style={{ color: "black" }}>Create Post</h5>
          <span>
            <img src={giraffe} alt="giraffe-icon" style={{ width: "70px" }} />
          </span>
        </div>
        <div className="mt-4">
          <label>Post Image</label>
        </div>
        <div className="img-holder d-flex flex-wrap mt-1">
          <span>
            <img
              src={imgUrl || avatar}
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
                <img src={upload} alt="upload" style={{ width: "25px"}} />{" "}
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
                  SetImgPost(imgUrl);
                }}
                required
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
            onChange={(e) => {
              SetTitlePost(e.target.value);
            }}
            required
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
            onChange={(e) => {
              SetBodyPost(e.target.value);
            }}
            required
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
                      SetCategoryPost(category.name);
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
            onClick={createPost}
          >
            {loading ? <Spinner /> : "Create Post"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;
