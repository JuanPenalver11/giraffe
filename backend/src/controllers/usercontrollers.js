import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import { generateTokenAndSetCookie } from "../utils/tokenAndCookie.js";
// import { v2 as cloudinary } from "cloudinary";

//////////////////////////////////////////////////////////////////////////////
export const signup = async (req, res) => {
  //request info from body
  const { username, email, password } = req.body;
  try {
    //check user doesn't exist
    const userName = await User.findOne({ username });
    const userEmail = await User.findOne({ email });
    if (userName)
      return res.status(401).json({ error: "Username already exist" });
    if (userEmail)
      return res.status(401).json({ error: "Email already exist" });
    //secure password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    //else create user
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });
    //response
    if (newUser) {
      generateTokenAndSetCookie(newUser._id, res);
      res
        .status(201)
        .json({ _id: newUser._id, name: newUser.name, email: newUser.email });
    } else {
      res.satus(400).json({ error: "Incorrect Data" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
//////////////////////////////////////////////////////////////////////////////
export const login = async (req, res) => {
  //request info from body
  const { username, password } = req.body;
  try {
    //look for user
    const user = await User.findOne({ username });
    //if user doesn't exist
    if (!user) return res.status(404).send({ error: "User not found" });
    //compare password
    const isPassword = await bcrypt.compare(password, user.password);

    if (!isPassword)
      return res.status(400).send({ error: "Incorrect password" });

    generateTokenAndSetCookie(user._id, res);

    //response
    res.status(200).send({ _id: user._id, name: user.name, email: user.email });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
//////////////////////////////////////////////////////////////////////////////
export const getUser = async (req, res) => {
  //get id by auth middleware
  const id = req.user._id;
  try {
    //check if user exist
    const user = await User.findById(id);
    if (!user) return res.status(404).json({ error: "User not found" });
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
//////////////////////////////////////////////////////////////////////////////
export const modifyUser = async (req, res) => {
  //get id from params
  const { id } = req.params;
  //get info from body
  const { username, email, password } = req.body;
  //get picture from body
  let { profilePic } = req.body;
  //get id from token
  const userId = req.user._id;
  try {
    //does user exist ?
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: "User not found" });
    //check that id token is the same has id params
    if (id !== userId.toString())
      return res
        .status(400)
        .json({ error: "Unauthorized" });
    //define hashedPassword outside the if statement
    let hashedPassword = user.password;
    //check if there is a new password to hash
    if (password) {
      const salt = await bcrypt.genSalt(10);
      hashedPassword = await bcrypt.hash(password, salt);
    }
    // //define image outside statemen
    // let profilePic = user.profilePic
    // //check if there is a new profile picture
    // if (profilePic){
    //     //if there is already a picture destoy it in cloudinary
    //     if(user.profilePic){
    //         await cloudinary.uploader.destroy(user.profilePic.split('/').pop().split('.')[0])
    //     }
    //     //then upload new picture
    //     const uploadedResponse = await cloudinary.uploader.upload(profilePic)
    //     profilePic = uploadedResponse.secure_url
    // }
    //update user
    const updateUser = await User.findByIdAndUpdate(
      id,
      {
        username,
        email,
        password: hashedPassword,
        profilePic,
      },
      { new: true }
    );
    res.status(200).json({ updateUser });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
//////////////////////////////////////////////////////////////////////////////
export const deleteUser = async (req, res) => {
  //get id from params
  const { id } = req.params;
  //get id from token
  const userId = req.user._id;
  try {
    //check if user exist
    let user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: "User not found" });
    //check id token with id params
    if (id !== userId.toString())
      return res
        .status(400)
        .json({ error: "Unauthorized" });
    //find user and delete
    await User.findByIdAndDelete(userId);

    res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
//////////////////////////////////////////////////////////////////////////////
export const logout = async (req, res) => {
  try {
    //method to delete jwtoken
    res.cookie("jwt", "", { maxAge: 1 });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};