import User from "../models/userModel.js";
import { createPasswordToken } from "../utils/tokenAndCookie.js";
import bcrypt from "bcrypt";
import nodemailer from "nodemailer";

export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    // check email existance
    const user = await User.find({ email });
    if (!user || user === undefined || user === null) {
      res.status(404).json({ error: "User not found" });
    }

    // if email generate token
    const token = createPasswordToken(user[0]._id);
    const link = `http://localhost:3000/resetpassword/${user[0]._id}/${token}`;

    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_EMAIL,
        pass: process.env.GMAIL_PASSWORD,
      },
    });

    var mailOptions = {
      from: "youremail@gmail.com",
      to: email,
      subject: "Reset your Giraffe Password",
      text: link,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });

    res
      .status(200)
      .json({ message: "A reset email has being send to your email" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const userAuthorized = async (req, res) => {
  const { id } = req.params;
  const userId = req.user._id;

  try {
    //check user
    const user = await User.findByID({ id });

    if (!user) {
      res.status(401).json({ error: "User not found " });
    }

    //check user auth
    if (id.toString() !== userId.toString())
      return res.status(400).json({ error: "User not Authorized" });

    res.status(200).json({ message: "User verified" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const resetPassword = async (req, res) => {
  const { id } = req.params;
  const { password } = req.body;
  const userId = req.user._id;

  try {
    //check user
    const user = await User.findById(id);

    if (!user) {
      res.status(401).json({ error: "User not found " });
    }

    //check user auth
    if (id.toString() !== userId.toString())
      return res.status(400).json({ error: "User not Authorized" });

    //passwordcheck
    if (!password || password.length < 6)
      return res
        .status(400)
        .json({ error: "Password must contain at least 6 characters" });
    //secure password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    await User.findByIdAndUpdate(
      id,
      { $set: { password: hashedPassword } }
    );

    res.status(200).json({ message: "Password updated" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
