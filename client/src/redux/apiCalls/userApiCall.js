import { userActions } from "../slices/userSlice";
import { authActions } from "../slices/authSlice";
import request from "../../utils/request";
import { toast } from "react-toastify";

/*===========================================*/
/*===========================================*/
/*===========================================*/

// get all users
export function getAllUsers() {
  return async (dispatch) => {
    try {
      const { data } = await request.get(`/api/user/users`);
      dispatch(userActions.setAllUsers(data?.users));
    } catch (error) {
      const errorMessage = error.response?.data?.message;
      toast.error(errorMessage);
    }
  };
}

/*===========================================*/

// get user profile
export function getProfile(userId) {
  return async (dispatch) => {
    dispatch(userActions.setGetProfileLoading(true));
    try {
      const { data } = await request.get(`/api/user/get-user/${userId}`);
      dispatch(userActions.setProfile(data));
    } catch (error) {
      const errorMessage = error.response?.data?.message;
      toast.error(errorMessage);
    } finally {
      dispatch(userActions.setGetProfileLoading(false));
    }
  };
}

/*===========================================*/

// edit user profile
export function editProfile(userId, updateData) {
  return async (dispatch) => {
    dispatch(userActions.setUpdateProfileLoading(true));
    dispatch(userActions.setGetProfileLoading(true));
    try {
      const { data } = await request.put(`/api/user/update/${userId}`, updateData);
      dispatch(userActions.setUpdateProfile(data?.updateUser));

      //this in ordre to update the username in top menu without refresh the page,after we already update the user
      dispatch(authActions.setCurrentUser(data?.updateUser));
      toast.success(data?.message);
    } catch (error) {
      const errorMessage = error.response?.data?.message;
      toast.error(errorMessage);
    } finally {
      dispatch(userActions.setUpdateProfileLoading(false));
      dispatch(userActions.setGetProfileLoading(false));
    }
  };
}

/*===========================================*/

// remove user acc
export function remvoUserAcc(userId) {
  return async (dispatch) => {
    dispatch(userActions.setRemoveProfileLoading(true));
    try {
      const { data } = await request.delete(`/api/user/delete/${userId}`);
      dispatch(userActions.setDeleteUserAcc(userId));
      // remove access and refresh token after delete acc in order to make the curentuser to null
      dispatch(authActions.setCurrentUser(null));
      return data;
    } catch (error) {
      const errorMessage = error.response?.data?.message;
      toast.error(errorMessage);
    } finally {
      dispatch(userActions.setRemoveProfileLoading(false));
    }
  }
}