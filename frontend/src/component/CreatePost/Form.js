import React, { useState } from "react";
import { categories } from "../../helpers/categories";
import { useRecoilValue } from "recoil";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import axios from "axios";
//icon
import giraffe from "../../images/giraffe-bg-activity.png";
//recoil
import { userAtom } from "../../atoms/userAtom";

const Form = () => {
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleCategoryChange = (categoryName) => {
    setSelectedCategory(categoryName);
  };

  const [titlePost, SetTitlePost] = useState("");
  const [bodyPost, SetBodyPost] = useState("");
  const [imgPost, SetImgPost] = useState("");
  const [categoryPost, SetCategoryPost] = useState("");

  const user = useRecoilValue(userAtom);

  const { enqueueSnackbar } = useSnackbar();

  const navigate = useNavigate();

  const createPost = async () => {
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
        <div className="title-holder d-flex flex-column mt-4">
          <label htmlFor="title" className="title-form">
            Post Image
          </label>
          <input type="text" id="title" />
        </div>
        <div className="title-holder d-flex flex-column mt-3">
          <label htmlFor="title" className="title-form">
            Post Title
          </label>
          <input
            type="text"
            id="title"
            style={{ padding: "10px" }}
            onChange={(e) => {
              SetTitlePost(e.target.value);
            }}
          />
        </div>
        <div className="body-holder d-flex flex-column mt-3">
          <label htmlFor="body" className="body-form">
            Post Body
          </label>
          <textarea
            type="text"
            id="body"
            style={{ padding: "10px" }}
            onChange={(e) => {
              SetBodyPost(e.target.value);
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
                <div class="form-check m-3" key={index}>
                  <input
                    class="form-check-input"
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
                    class="form-check-label"
                    for={`flexRadioDefault${index}`}
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
          <button type="button" class="btn btn-primary" onClick={createPost}>
            Create Post
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;
