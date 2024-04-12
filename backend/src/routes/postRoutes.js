//dependencies
import { Router } from "express";
//auth
import { authUser } from "../middleware/authUser.js";
// //routes
import {
  getPosts,
  getPostById,
  createPost,
  modifyPost,
  deletePost,
  likePost,
  commentPost,
  modifyComment, 
  deleteComment
} from "../controllers/postcontrollers.js";
//middleware
const routes = Router();
//routes
routes.get("/", getPosts);

routes.get("/:idpost", getPostById);

routes.post("/create", authUser, createPost);

routes.patch("/modify/:idpost", authUser, modifyPost);

routes.delete("/delete/:idpost", authUser, deletePost);

routes.patch("/like/:idpost", authUser, likePost);

routes.patch("/comment/:idpost", authUser, commentPost);

routes.patch("/:idpost/modify/:idcomment", authUser, modifyComment)

routes.delete("/:idpost/delete/:idcomment", authUser, deleteComment)

export default routes;
