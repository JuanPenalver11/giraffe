import React from "react";
//icon
import giraffe from '../../images/giraffemodify.png'
//component
import Spinner from "../Spinner";
//helper
import { categories } from "../../helpers/categories";
//hook
import ModifyPostModalHook from "../YourPosts/Hooks/ModifyPostModalHook";

const ModifyPostModal = ({
  showModal,
  setShowModal,
  userPost,
  handleModifyPost,
}) => {
  //hook
  const {
    modifyPost,
    loading,
    setPostBody,
    setPostCategory,
    setPostTitle,
    setPostImg,
    postCategory,
  } = ModifyPostModalHook({ userPost, handleModifyPost });

  return (
    <div
      className={`modal ${showModal ? "show" : ""}`}
      tabIndex="-1"
      role="dialog"
      style={{ display: showModal ? "block" : "none" }}
    >
      <div className="modal-dialog" role="document">
        <div
          className="modal-content"
          style={{ background: "rgb(123, 193, 223", border:'1px solid'}}
        >
          <div className="modal-header d-flex justify-content-between">
            <h5 className="modal-title" style={{fontFamily:"Rampart One"}}>Modify Post</h5>
            <img src={giraffe} alt="giraffe-icon" style={{ width: "70px" }} />
          </div>
          <form>
            <div className="modal-body">
              <div className="img-holder m-3">
                <label htmlFor="post-img">Post Image</label>
                <input type="text" id="post-img" className="form-control" />
              </div>
              <div className="title-holder  m-3">
                <label htmlFor="post-title">Post title</label>
                <input
                  type="text"
                  id="post-title"
                  className="form-control"
                  defaultValue={userPost.posttitle}
                  onChange={(e) => {
                    setPostTitle(e.target.value);
                  }}
                />
              </div>
              <div className="body-holder  m-3">
                <label htmlFor="post-body">Post body</label>
                <textarea
                  id="post-body"
                  type="text"
                  className="form-control"
                  style={{ padding: "10px" }}
                  defaultValue={userPost.postbody}
                  onChange={(e) => {
                    setPostBody(e.target.value);
                  }}
                ></textarea>
              </div>
              <div className="category-holder  m-3">
                <label className="mb-4">Post category</label>
                <div className="radio-holder d-flex flex-wrap" style={{background:'grey', borderRadius:'10px'}}>
                  {categories.map((category, index) => {
                    return (
                      <div class="form-check m-3">
                        <input
                          class="form-check-input"
                          type="radio"
                          name={category.name}
                          checked={postCategory === category.name}
                          value={""}
                          id={`flexRadioDefault${index}`}
                          onChange={() => {
                            setPostCategory(category.name);
                          }}
                        />
                        <label
                          class="form-check-label"
                          for={`flexRadioDefault${index}`}
                          style={{color:'white'}}
                        >
                          <span >
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
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setShowModal(false)}
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-warning"
                onClick={() => {
                  modifyPost(userPost._id);
                  setShowModal(false)
                }}
              >
                {loading ? <Spinner />  : "Modify Post"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ModifyPostModal;
