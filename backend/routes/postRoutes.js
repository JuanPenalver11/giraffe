//dependencies
import { Router } from "express";
//auth
import { authUser } from "../middleware/authUser.js";
// //routes
import {
  getPosts,
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

routes.post("/create", authUser, createPost);

routes.patch("/modify/:id", authUser, modifyPost);

routes.delete("/delete/:id", authUser, deletePost);

routes.patch("/like/:id", authUser, likePost);

routes.patch("/comment/:id", authUser, commentPost);

routes.patch("/:idpost/modify/:idcomment", authUser, modifyComment)

routes.delete("/:idpost/delete/:idcomment", authUser, deleteComment)

export default routes;
