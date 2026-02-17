import { createSlice } from "@reduxjs/toolkit";

/*===========================================*/
/*===========================================*/
/*===========================================*/

const authSlice = createSlice({
  name: "auth",
  initialState: {
    currentUser: null,
    loading: true,
    registerLoading: false,
    loginLoading: false,
    verifyLoading: false,
    forgotPassLoading: false,
    resetPassLoading: false,
  },
  reducers: {

    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
    },
    setRegisterLoading(state, action) {
      state.registerLoading = action.payload;
    },
    setLoginLoading(state, action) {
      state.loginLoading = action.payload;
    },
    setVerifyLoading(state, action) {
      state.verifyLoading = action.payload;
    },
    setForgotPassLoading(state, action) {
      state.forgotPassLoading = action.payload;
    },
    setResetPassLoading(state, action) {
      state.resetPassLoading = action.payload;
    },

  }
});

/*===========================================*/

const authActions = authSlice.actions;
const authReducer = authSlice.reducer;
export { authActions, authReducer }