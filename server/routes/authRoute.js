import express from 'express';
import {
  registerCtrl,
  loginCtrl,
  refreshTokenCtrl,
  getMeCtrl,
  logoutCtrl,
  googleAuthCtrl,
  verifyEmailCtrl,
  forgotPasswordCtrl,
  resetPasswordCtrl
} from "../controllers/authController.js";
import { verifyRefreshToken, checkUser } from "../middlewares/verifyToken.js";
const router = express.Router();

/*=========================================*/
/*=========================================*/
/*=========================================*/

// /api/auth/register
router.post("/register", registerCtrl);

// /api/auth/login
router.post("/login", loginCtrl);

// /api/auth/logout
router.post("/logout", logoutCtrl);

// /api/auth/me 
router.get("/me", checkUser, getMeCtrl);

// /api/auth/refresh-token
router.post("/refresh-token", verifyRefreshToken, refreshTokenCtrl);

// /api/auth/verify-email
router.post("/verify-email", verifyEmailCtrl);

// /api/auth/forgot-password
router.post("/forgot-password", forgotPasswordCtrl);

// /api/auth/reset-password/:token
router.post("/reset-password/:token", resetPasswordCtrl);

// /api/auth/google-auth
router.post('/google-auth', googleAuthCtrl);

/*=========================================*/

export default router; 