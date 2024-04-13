import mongoose from "mongoose";

const postSchema = mongoose.Schema(
  {
    //indicate post's owner
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    postcategory: {
      type: String,
      required: true,
    },
    posttitle: {
      type: String,
      required: true,
      maxLength: 20,
      unique: true,
    },
    postbody: {
      type: String,
      unique: true,
    },
    postimg: {
      type: String,
    },
    postlikes: {
      //like owner
      type: [mongoose.Schema.Types.ObjectId],
      ref: "User",
      default: [],
    },
    postcomments: [
      {
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        comment: {
          type: String,
          required: true,
        },
        userProfilePic: {
          type: String,
        },
        username: {
          type: String,
        }, 
      },
    ],
  },
  { timestamps: true }
);

const Posts = mongoose.model("Posts", postSchema);

export default Posts;
