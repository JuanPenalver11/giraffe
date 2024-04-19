import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import { createToken } from "../utils/tokenAndCookie.js";
import { v2 as cloudinary } from "cloudinary";
const avatar = "user.png";

//////////////////////////////////////////////////////////////////////////////
export const signup = async (req, res) => {
  //request info from body
  const { username, email, password } = req.body;
  try {
    //check user exist
    const userName = await User.findOne({ username });
    const userEmail = await User.findOne({ email });
    if (userName)
      return res.status(401).json({ error: "Username already exists" });
    if (userEmail)
      return res.status(401).json({ error: "Email already exists" });
    if (password.length < 6 || !password)
      return res
        .status(400)
        .json({ error: "Password must contain at least 6 characters" });
    //secure password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //else create user
    const newUser = await User.create({
      username: username,
      email: email,
      password: hashedPassword,
      profilePic: avatar,
    });
    //response
    res
      .status(201)
      .json({ _id: newUser._id, name: newUser.name, email: newUser.email });
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

    const jwt = createToken(user._id);

    //response
    res.status(200).send({ _id: user._id, username: user.username, jwt });
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
  // Get id from params
  const { id } = req.params;
  // Get info from body
  const { username, email, password } = req.body;
  // Get picture from body
  let { profilePic } = req.body;
  // Get id from token
  const userId = req.user._id;
  try {
    // Does user exist ?
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: "User not found" });
    // Check that id token is the same as id params
    if (id !== userId.toString())
      return res.status(400).json({ error: "Unauthorized" });
    // Define hashedPassword outside the if statement
    let hashedPassword = user.password;
    // Check if there is a new password to hash
    if (password) {
      const salt = await bcrypt.genSalt(10);
      hashedPassword = await bcrypt.hash(password, salt);
    }

    // Modify img
    if (profilePic && profilePic !== user.profilePic) {
      if (user.profilePic) {
        await cloudinary.uploader.destroy(
          user.profilePic.split("/").pop().split(".")[0]
        );
      }
      const uploadedResponse = await cloudinary.uploader.upload(profilePic);
      profilePic = uploadedResponse.secure_url;
    } else {
      profilePic = user.profilePic;
    }

    // Checkers
    const existingUsername = await User.findOne({ username });
    const existingEmail = await User.findOne({ email });

    if (existingUsername && existingUsername._id.toString() === userId) {
      username = existingUsername;
    } else if (existingUsername && existingUsername._id.toString() !== id) {
      return res.status(400).json({ error: "Username already exists" });
    }

    if (existingEmail && existingEmail._id.toString() === userId) {
      username = existingEmail;
    } else if (existingEmail && existingEmail._id.toString() !== id) {
      return res.status(400).json({ error: "Email already exists" });
    }

    // Update user
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

    res.status(200).json(updateUser);
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
      return res.status(400).json({ error: "Unauthorized" });
    //delete user picture from cloudinary
    if (user.profilePic) {
      await cloudinary.uploader.destroy(
        user.profilePic.split("/").pop().split(".")[0]
      );
    }
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
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


