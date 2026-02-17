import { Schema, model } from "mongoose";
import Joi from "joi";
import jwt from "jsonwebtoken";

/*=========================================*/
/*=========================================*/
/*=========================================*/

const userSchema = new Schema({
  username: {
    type: String,
    trim: true,
    minLength: 5,
    maxLength: 70,
    required: true
  },
  email: {
    type: String,
    trim: true,
    minLength: 5,
    maxLength: 70,
    required: true,
    unique: true
  },
  password: {
    type: String,
    trim: true,
    minLength: 5,
    required: true
  },
  profilePicture: {
    type: String,
    default: "/uploads/user-avatar.png"
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  refreshToken: String,
  resetPasswordToken: String,
  resetPasswordExpiresAt: Date,
  verificationToken: String,
  verificationTokenExpiresAt: Date,
}, { timestamps: true });

/*=========================================*/

// generate access token func
userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    { id: this._id },
    process.env.JWT_ACCESS_SECRET,
    { expiresIn: "15m" }
  );
};

// generate refresh token func
userSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    { id: this._id },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: "7d" }
  );
};

/*=========================================*/

// validate register user func
function validateRegister(obj) {
  const schema = Joi.object({
    username: Joi.string().trim().min(5).max(70).required(),
    email: Joi.string().trim().min(5).max(70).email().required(),
    password: Joi.string().trim().min(5).required()
  });
  return schema.validate(obj);
}

// validate login user func
function validateLogin(obj) {
  const schema = Joi.object({
    email: Joi.string().trim().min(5).max(70).email().required(),
    password: Joi.string().trim().min(5).required()
  });
  return schema.validate(obj);
}

// validate update user func
function validateUpdate(obj) {
  const schema = Joi.object({
    username: Joi.string().trim().min(5).max(70),
    email: Joi.string().trim().min(5).max(70).email(),
    password: Joi.string().trim().min(5)
  });
  return schema.validate(obj);
}

/*=========================================*/

// create model
const UserModel = new model("User", userSchema);

/*=========================================*/

export {
  UserModel,
  validateRegister,
  validateLogin,
  validateUpdate
};