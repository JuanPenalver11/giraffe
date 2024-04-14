import React from 'react'
//component 
import Form from '../component/CreatePost/Form'
const CreatePost = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <span
            className="badge"
            style={{
              background: "rgb(243, 159, 149)",
              border: "1px solid black",
            }}
          >
            <p className="fs-5 mt-2" style={{ fontFamily: "Rampart One" }}>
              Create Post
            </p>
          </span>
        </div>
      </div>
      <div className="row">
        <div className="col-sm-12 col-md-9 col-lg-6  d-flex justify-content-center mx-auto">
          <Form/>
        </div>
      </div>
    </div>
  )
}

export default CreatePost
