import jwt from "jsonwebtoken";
import { UserModel } from "../models/UserModel.js";

/*=========================================*/
/*=========================================*/
/*=========================================*/

// access token mdlwr
const verifyToken = (req, res, next) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json({ message: "No access token" });

  jwt.verify(token, process.env.JWT_ACCESS_SECRET, async (err, decoded) => {
    if (err) return res.status(401).json({ message: "Invalid or expired token" });
    // req.userId = decoded.id;
    req.userDecoded = await UserModel.findById(decoded.id).select("-password");
    next();
  });
};

/*=========================================*/

// refresh token mdlwr
const verifyRefreshToken = (req, res, next) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) return res.status(401).json({ message: "No refresh token" });

  jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, async (err, decoded) => {
    if (err) return res.status(401).json({ message: "Invalid refresh token" });
    req.userDecoded = await UserModel.findById(decoded.id).select("-password");
    next();
  });
};

/*=========================================*/

// verify token and only user mdlwr
const verifyTokenAndOnlyUser = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.userDecoded.id === req.params.id) {
      next();
    } else {
      res.status(403).json({ message: "not allowed, only user himself" });
    }
  });
};

/*=========================================*/

// check user mdlwr
const checkUser = (req, res, next) => {
  const token = req.cookies.accessToken;
  if (!token) {
    req.userDecoded = null;
    return next();
  }

  jwt.verify(token, process.env.JWT_ACCESS_SECRET, async (err, decoded) => {
    if (err) {
      req.userDecoded = null;
      return next();
    }

    req.userDecoded = await UserModel.findById(decoded.id).select("-password");
    next();
  });
};

/*=========================================*/

export {
  verifyToken,
  verifyRefreshToken,
  verifyTokenAndOnlyUser,
  checkUser
};