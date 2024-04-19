//dependencies
import { Router } from "express";
//routes
import {
  signup,
  login,
  getUser,
  modifyUser,
  deleteUser,
  logout,
} from "../controllers/usercontrollers.js";
//auth
import { authUser } from "../middleware/authUser.js";
//middlware
const route = Router();
//routes
route.get("/", authUser, getUser);

route.post("/signup", signup);

route.post("/login", login);

route.post("/logout", logout);

route.patch("/update/:id", authUser, modifyUser);

route.delete("/delete/:id", authUser, deleteUser);



export default route;
