import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import { UserModel, validateRegister, validateLogin } from "../models/UserModel.js";
import {
  sendPasswordResetEmail,
  sendResetSuccessEmail,
  sendVerificationEmail,
  sendWelcomeEmail
} from "../resend/email.js";

/*=========================================*/
/*=========================================*/
/*=========================================*/

/**
 *@desc register new user 
 *@route /api/auth/register
 *@method Post
 *@access public
*/

const registerCtrl = asyncHandler(
  async (req, res) => {
    const { username, email, password } = req.body;

    // error validation
    const { error } = validateRegister(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    // check if user exists with provided email and show error msg
    const findUser = await UserModel.findOne({ email });
    if (findUser) return res.status(400).json({ message: "User exists!" });

    // hash the password and save user in database
    const hashedPass = await bcrypt.hash(password, 10);
    const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();

    const user = new UserModel({
      username,
      email,
      password: hashedPass,
      verificationToken,
      verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000, // 24 hours 
    });

    await user.save();

    // send jsut the user without passwod
    const { password: _, ...userWithoutPass } = user.toObject();
    await sendVerificationEmail(user.email, verificationToken);

    res.status(201).json({
      success: true,
      user: userWithoutPass,
      message: "Success registration!",
      // message: "An email sent to your account please verify.",
    });
  });

/*=========================================*/

/**
 *@desc login user 
 *@route /api/auth/login
 *@method Post
 *@access private(register user himself)
*/
const loginCtrl = asyncHandler(
  async (req, res) => {
    const { email, password } = req.body;

    // error validation
    const { error } = validateLogin(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    // check if user not exists with provided email and show error msg
    const user = await UserModel.findOne({ email });
    if (!user) return res.status(400).json({ message: "Wrong credentials!" });

    // compare the between the user pass and body pass, show error msg in case not mathing
    const isMatched = await bcrypt.compare(password, user.password);
    if (!isMatched) return res.status(400).json({ message: "Wrong credentials!" });

    // generate access and refresh token
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    // ******************************************************
    // ******************************************************
    // uncomment this later
    // ******************************************************
    // ******************************************************
    // check if the user alrady isVerified
    // const isVerified = user.isVerified;
    // if (!isVerified) {
    //   return res
    //     .status(400)
    //     .json({ success: false, message: "Email not verified" });
    // }

    // ******************************************************
    // ******************************************************
    // ******************************************************

    const isProd = process.env.NODE_ENV === "production";

    // cookie accessToken
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: isProd,           // HTTPS only in production
      sameSite: isProd ? "none" : "lax",
      maxAge: 15 * 60 * 1000,   // 15 min
    });

    // cookie refreshToken
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: isProd,
      sameSite: isProd ? "none" : "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    // send jsut the user without passwod
    const { password: _, ...userWithoutPass } = user.toObject();

    res.status(200).json({
      success: true,
      user: userWithoutPass,
      message: `${userWithoutPass.username},Welcome back!`
    });
  });

/*=========================================*/

/**
 *@desc google oAuth
 *@route /api/auth/google-auth
 *@method Post
 *@access public
*/
const googleAuthCtrl = asyncHandler(
  async (req, res) => {
    const { email, name, googlePhotoUrl } = req.body;

    // check environment
    const isProd = process.env.NODE_ENV === "production";

    let user = await UserModel.findOne({ email });

    /*================ LOGIN ==================*/

    if (user) {
      const accessToken = user.generateAccessToken();
      const refreshToken = user.generateRefreshToken();

      // accessToken cookie
      res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: isProd,             // true on Render, false on local
        sameSite: isProd ? "none" : "lax",
        maxAge: 15 * 60 * 1000,     // 15 min
      });

      // refreshToken cookie
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: isProd,
        sameSite: isProd ? "none" : "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      });

      const { password, ...userWithoutPass } = user.toObject();

      return res.status(200).json({
        success: true,
        user: userWithoutPass,
        message: `${name},Welcome back!`
      });
    }

    /*============== REGISTER =================*/

    // generate password with Math random
    const generatedPassword =
      Math.random().toString(36).slice(-8) +
      Math.random().toString(36).slice(-8);

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(generatedPassword, salt);

    const newUser = new UserModel({
      username:
        name.toLowerCase().split(" ").join("") +
        Math.random().toString(9).slice(-4),
      email,
      password: hashedPassword,
      profilePicture: googlePhotoUrl || "/uploads/user-avatar.png",
      isVerified: true
    });

    await newUser.save();

    const accessToken = newUser.generateAccessToken();
    const refreshToken = newUser.generateRefreshToken();

    // accessToken cookie
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: isProd,
      sameSite: isProd ? "none" : "lax",
      maxAge: 15 * 60 * 1000,
    });

    // refreshToken cookie
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: isProd,
      sameSite: isProd ? "none" : "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    const { password, ...userWithoutPass } = newUser.toObject();

    return res.status(200).json({
      success: true,
      user: userWithoutPass,
      message: `Welcome ${name}!`
    });
  });

/*=========================================*/

/**
 *@desc logout user 
 *@route /api/auth/logout
 *@method Post
 *@access private(login user himself)
*/
const logoutCtrl = asyncHandler(
  async (req, res) => {
    //clear accessToken and refreshToken
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");

    res.status(200).json({
      success: true,
      message: "Logged out successfully"
    });
  }
);

/*=========================================*/

/**
 *@desc refresh token
 *@route /api/auth/refresh-token
 *@method Post
 *@access private(login user himself)
*/
const refreshTokenCtrl = asyncHandler(
  async (req, res) => {

    // find the login user with error msg in case not exists
    const user = await UserModel.findById(req.userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    // generate token
    const accessToken = user.generateAccessToken();

    // cookie accessToken
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 15 * 60 * 1000,
    });

    res.json({ message: "Access token refreshed" });
  });

/*=========================================*/

/**
 *@desc get login user
 *@route /api/auth/me
 *@method Post
 *@access private(login user himself)
*/
const getMeCtrl = asyncHandler(
  async (req, res) => {

    // no login user 
    if (!req.userDecoded) return res.status(200).json(null);

    // alrady exist login user
    res.status(200).json(req.userDecoded);
  });

/*=========================================*/

/**
 *@desc verify email
 *@route /api/auth/verify-email
 *@method Post
 *@access public 
*/
const verifyEmailCtrl = asyncHandler(
  async (req, res) => {
    const { code } = req.body;
    try {
      const user = await UserModel.findOne({
        verificationToken: code,
        verificationTokenExpiresAt: { $gt: Date.now() },
      });

      if (!user) {
        return res.status(400).json({ success: false, message: "Invalid or expired verification code" });
      }

      user.isVerified = true;
      user.verificationToken = undefined;
      user.verificationTokenExpiresAt = undefined;
      await user.save();

      await sendWelcomeEmail(user.email, user.username);

      res.status(200).json({
        success: true,
        message: "Email verified successfully",
        user: {
          ...user._doc,
          password: undefined,
        },
      });
    } catch (error) {
      console.log("error in verifyEmail ", error);
      res.status(500).json({ success: false, message: "Server error" });
    }
  }
);

/*=========================================*/

/**
 *@desc forgot password
 *@route /api/auth/forgot-password
 *@method Post
 *@access public 
*/
const forgotPasswordCtrl = asyncHandler(
  async (req, res) => {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: "Enter your email!" });

    const user = await UserModel.findOne({ email });
    if (!user) return res.status(404).json({ message: "User doesn't exist with provided email!" });

    // Generate reset token
    const resetToken = crypto.randomBytes(20).toString("hex");
    const resetPasswordExpiresAt = Date.now() + 1 * 60 * 60 * 1000; // 1 hour

    user.resetPasswordToken = resetToken;
    user.resetPasswordExpiresAt = resetPasswordExpiresAt;
    await user.save();

    await sendPasswordResetEmail(user.email, `${process.env.CLIENT_URL}/reset-password/${resetToken}`);
    res.status(200).json({ success: true, message: "Password reset link sent to your email" });
  }
);

/*=========================================*/

/**
 *@desc reset password
 *@route /api/auth/reset-password/:token
 *@method Post
 *@access public 
*/
const resetPasswordCtrl = asyncHandler(
  async (req, res) => {

    const { token } = req.params;
    const { password } = req.body;
    if (!password) return res.status(400).json({ message: "Enter new password!" });

    const user = await UserModel.findOne({
      resetPasswordToken: token,
      resetPasswordExpiresAt: { $gt: Date.now() }
    });
    if (!user) return res.status(404).json({ message: "User doesn't exist!" });

    // update password
    const salt = await bcrypt.genSalt(10);
    const hahashedPassword = await bcrypt.hash(password, salt);

    user.password = hahashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpiresAt = undefined;
    await user.save();

    const { password: _, ...userWithoutPass } = user.toObject();

    await sendResetSuccessEmail(user.email);

    res.status(200).json({ success: true, message: "Password reset successful" });
  }
);

/*=========================================*/

export {
  registerCtrl,
  loginCtrl,
  googleAuthCtrl,
  logoutCtrl,
  refreshTokenCtrl,
  getMeCtrl,
  verifyEmailCtrl,
  forgotPasswordCtrl,
  resetPasswordCtrl
}; 