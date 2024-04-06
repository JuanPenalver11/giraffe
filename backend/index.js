//dependencies
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
// import { v2 as cloudinary } from "cloudinary";
//utils
import { dbConnect } from "./utils/dbConnection.js";
//routes
import userRoutes from "./routes/userRoutes.js";
import postRoutes from "./routes/postRoutes.js";


const app = express();

dotenv.config();

dbConnect();

// //cloudinary api
// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

//middlewares
app.use(express.json({ limit: "60mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//routes
app.use("/api/user", userRoutes);
app.use("/api/post", postRoutes);

const PORT = process.env.PORT;

app.listen(
  PORT,
  console.log("Server in https://l4rnrz4l-4000.asse.devtunnels.ms/")
);
