import express from 'express';
import {
  updateUserCtrl,
  getUserCtrl,
  getUsersCtrl,
  deleteUserCtrl
} from "../controllers/userController.js";
import { verifyTokenAndOnlyUser } from '../middlewares/verifyToken.js';
const router = express.Router();

/*=========================================*/
/*=========================================*/
/*=========================================*/

// /api/user/update/:id
router.route("/update/:id").put(verifyTokenAndOnlyUser, updateUserCtrl);

// /api/user/delete/:id
router.route("/delete/:id").delete(verifyTokenAndOnlyUser, deleteUserCtrl);

// /api/user/get-user/:id
router.route("/get-user/:id").get(verifyTokenAndOnlyUser, getUserCtrl);

// /api/user/users
router.route("/users").get(getUsersCtrl);

/*=========================================*/

export default router; 