import { authActions } from "../slices/authSlice";
import request from "../../utils/request";
import { toast } from "react-toastify";

/*===========================================*/
/*===========================================*/
/*===========================================*/

// register user
export function registerUser(userData) {
  return async (dispatch) => {
    dispatch(authActions.setRegisterLoading(true));
    try {
      const { data } = await request.post("/api/auth/register", userData);
      toast.success(data?.message);
      return data;
    } catch (error) {
      const errorMessage = error.response?.data?.message;
      toast.error(errorMessage);
    } finally {
      dispatch(authActions.setRegisterLoading(false));
    }
  }
}

/*===========================================*/

// verify email
export function verifyEmail(code) {
  return async (dispatch) => {
    dispatch(authActions.setVerifyLoading(true));
    try {
      const { data } = await request.post("/api/auth/verify-email", { code });
      // console.log(data)
      toast.success(data?.message)
      return data;
    } catch (error) {
      const errorMessage = error.response?.data?.message;
      toast.error(errorMessage);
    } finally {
      dispatch(authActions.setVerifyLoading(false));
    }
  }
}

/*===========================================*/

// forgot password
export function forgotPassword(email) {
  return async (dispatch) => {
    dispatch(authActions.setForgotPassLoading(true));
    try {
      const { data } = await request.post("/api/auth/forgot-password", { email });
      toast.success(data?.message);
      return data;
    } catch (error) {
      const errorMessage = error.response?.data?.message;
      toast.error(errorMessage);
    } finally {
      dispatch(authActions.setForgotPassLoading(false));
    }
  }
}

/*===========================================*/

// reset password
export function resetPassword(password, token) {
  return async (dispatch) => {
    dispatch(authActions.setResetPassLoading(true));
    try {
      const { data } = await request.post(`/api/auth/reset-password/${token}`, { password });
      // toast.success(data?.message);
      return data;
    } catch (error) {
      const errorMessage = error.response?.data?.message;
      toast.error(errorMessage);
    } finally {
      dispatch(authActions.setResetPassLoading(false));
    }
  }
}

/*===========================================*/

// login user
export function loginUser(userData) {
  return async (dispatch) => {
    dispatch(authActions.setLoginLoading(true));
    try {
      const { data } = await request.post("/api/auth/login", userData);
      dispatch(authActions.setCurrentUser(data?.user));
      toast.success(data?.message);
      return data;
    } catch (error) {
      const errorMessage = error.response?.data?.message;
      toast.error(errorMessage);
    } finally {
      dispatch(authActions.setLoginLoading(false));
    }
  }
}

/*===========================================*/

// logout user
export function logoutUser() {
  return async (dispatch) => {
    try {
      const { data } = await request.post("/api/auth/logout");
      dispatch(authActions.setCurrentUser(null));
      toast.success(data?.message);
      return data;
    } catch (error) {
      const errorMessage = error.response?.data?.message;
      toast.error(errorMessage);
      return { success: false };
    }
  };
}

/*===========================================*/

// get me or get current login user
export function getMe() {
  return async (dispatch) => {
    try {
      const { data } = await request.get("/api/auth/me");
      dispatch(authActions.setCurrentUser(data));
    } catch (err) {
      // dispatch(authActions.setCurrentUser(null));
      console.log(err)
    }
  };
}

/*===========================================*/

// google oAuth
export function googleAuth(userData) {
  return async (dispatch) => {
    dispatch(authActions.setLoginLoading(true));
    try {
      const { data } = await request.post("/api/auth/google-auth", userData);
      dispatch(authActions.setCurrentUser(data?.user));
      toast.success(data?.message);
      return data;
    } catch (error) {
      const errorMessage = error.response?.data?.message;
      toast.error(errorMessage);
    } finally {
      dispatch(authActions.setLoginLoading(false));
    }
  }
} 