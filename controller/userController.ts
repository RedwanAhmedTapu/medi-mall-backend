import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import User from "../models/User";
import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";
import path from "path";

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || "access-secret";
const REFRESH_TOKEN_SECRET =
  process.env.REFRESH_TOKEN_SECRET || "refresh-secret";

require("dotenv").config();
console.log("Email:", process.env.EMAIL);
console.log("Password:", process.env.PASSWORD);

const uploadPath = path.join(__dirname, "../public/uploads");

// Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    const photo = req.file?.filename;
    console.log(req.body);
    // Validate email and password
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email))
      return res.status(400).json({ message: "Invalid email address." });

    if (password.length < 6)
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters long." });
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User already registered with this email." });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Generate verification code
    const verificationCode = crypto.randomBytes(20).toString("hex");

    // Create user
    const user = new User({
      name,
      email,
      password: hashedPassword,
      photo: `/uploads/${photo}`,
      verificationCode,
    });
    await user.save();

    // Send verification email
    const verificationLink = `${process.env.DOMAIN}/verify-email?code=${verificationCode}`;
    await transporter.sendMail({
      from: process.env.EMAIL,
      to: email,
      subject: "Verify your email",
      text: `Please verify your email by clicking the following link: ${verificationLink}`,
    });

    res.status(201).json({
      message: "User registered. Please check your email for verification.",
    });
  } catch (error: any) {
    console.error("Error during registration:", error.message);
    res.status(500).json({
      message: "Server error during registration.",
      error: error.message,
    });
  }
};

export const verifyEmail = async (req: Request, res: Response) => {
  const { code } = req.query;
  console.log(code);

  try {
    const user = await User.findOne({ verificationCode: code });
    console.log(user, "us");
    if (!user) {
      return res.status(400).json({ message: "Invalid verification code." });
    } else {
      user.isVerified = true;
      user.verificationCode = "";
      await user.save();

      res
        .status(200)
        .json({ message: "Email verified successfully. You can now log in." });
    }
  } catch (error: any) {
    console.error("Error during email verification:", error.message);
    res.status(500).json({
      message: "Server error during email verification.",
      error: error.message,
    });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ message: "Invalid email or password." });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid email or password." });

    if (!user.isVerified)
      return res.status(400).json({ message: "Email not verified." });

    const accessToken = jwt.sign({ id: user._id }, ACCESS_TOKEN_SECRET, {
      expiresIn: "1h",
    });

    const refreshToken = jwt.sign({ id: user._id }, REFRESH_TOKEN_SECRET, {
      expiresIn: "1d",
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true, // true in production with HTTPS
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000, // 1 hour in milliseconds
    });

    res.json({ accessToken });
  } catch (error: any) {
    console.error("Error during login:", error.message);
    res
      .status(500)
      .json({ message: "Server error during login.", error: error.message });
  }
};

export const refreshToken = (req: Request, res: Response) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) return res.sendStatus(401);

  jwt.verify(refreshToken, REFRESH_TOKEN_SECRET, (err: any, user: any) => {
    if (err) return res.sendStatus(403);

    const accessToken = jwt.sign({ id: user.id }, ACCESS_TOKEN_SECRET, {
      expiresIn: "1h",
    });

    res.json({ accessToken });
  });
};
