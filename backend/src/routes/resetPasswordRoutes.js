import Router from "express";
//controllers
import {
  forgotPassword,
  userAuthorized,
  resetPassword,
} from "../controllers/resertPassword.js";
//middleware
import { authResetPassword } from "../middleware/authUser.js";

const route = Router();

route.post("/", forgotPassword);

route.get("/:id/:token", authResetPassword, userAuthorized);

route.post("/:id/:token", authResetPassword, resetPassword);


export default route;
