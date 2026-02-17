import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import { UserModel, validateUpdate } from "../models/UserModel.js";

/*=========================================*/
/*=========================================*/
/*=========================================*/

/**
 *@desc update user
 *@route /api/user/update/:id
 *@method Put
 *@access private(login user himself)
*/
const updateUserCtrl = asyncHandler(
  async (req, res) => {

    // validate login
    const { error } = validateUpdate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    // check if user exists
    const { id } = req.params;
    const user = await UserModel.findById(id);
    if (!user) return res.status(400).json({ message: "User not exists!" });

    // in case user want to change his password, hash it in db
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
    }

    // update user data
    const updateUser = await UserModel.findByIdAndUpdate(
      id,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
        }
      },
      { new: true }
    ).select("-password");

    // send a message and update user without password to client
    res.status(200).json({
      updateUser,
      message: "User updated successfully"
    });

  }
);

/*=========================================*/

/**
 *@desc delete user
 *@route /api/user/delete/:id
 *@method Delete
 *@access private(user himself)
*/
const deleteUserCtrl = asyncHandler(
  async (req, res) => {
    const { id } = req.params;
    const user = await UserModel.findById(id);
    if (!user) return res.status(404).json({ message: "User dosent exists!" });

    await UserModel.findByIdAndDelete(id);

    //clear accessToken and refreshToken after delete account
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");

    res.status(200).json({
      success: true,
      message: "User deleted successfully!"
    });
  }
);

/*=========================================*/

/**
 *@desc get user profile
 *@route /api/user/get-user/:id
 *@method Get
 *@access private(login users only)
*/
const getUserCtrl = asyncHandler(
  async (req, res) => {
    const { id } = req.params;

    // get user with provided id and get it without pass,and show error msg
    const user = await UserModel.findById(id).select("-password");
    if (!user) return res.status(404).json({ message: "User doesn't exist with provided id!" });

    // generate token
    const accessToken = user.generateAccessToken();
    res.status(200).json({ user, accessToken });
  }
);

/*=========================================*/

/**
 *@desc get all users profile
 *@route /api/user/users
 *@method Get
 *@access private(login users only)
*/
const getUsersCtrl = asyncHandler(
  async (req, res) => {
    const users = await UserModel.find();
    res.status(200).json(users);
  }
);

/*=========================================*/

export {
  updateUserCtrl,
  deleteUserCtrl,
  getUserCtrl,
  getUsersCtrl
}; 