import { createSlice } from "@reduxjs/toolkit";

/*===========================================*/
/*===========================================*/
/*===========================================*/

const userSlice = createSlice({
  name: "profile",
  initialState: {
    profile: null,
    allUsers: [],
    getProfileLoading: false,
    getUpdateProfileLoading: false,
    removeProfileLoading: false,
  },
  reducers: {

    // get profile
    setProfile: (state, action) => {
      state.profile = action.payload;
    },

    /*==================*/

    // get all users
    setAllUsers: (state, action) => {
      state.allUsers = action.payload;
    },

    /*==================*/

    // update singel profile
    setUpdateProfile(state, action) {
      state.profile = action.payload;
    },

    /*==================*/

    // remove user acc
    setDeleteUserAcc(state, action) {
      const id = action.payload;
      state.allUsers = state.allUsers.filter(u => u._id !== id);
    },

    /*======== ALL LOADING ==========*/

    setGetProfileLoading(state, action) {
      state.getProfileLoading = action.payload;
    },

    /*==================*/

    setUpdateProfileLoading(state, action) {
      state.getUpdateProfileLoading = action.payload;
    },

    /*==================*/

    setRemoveProfileLoading(state, action) {
      state.removeProfileLoading = action.payload;
    }

  }
});

/*===========================================*/

const userActions = userSlice.actions;
const userReducer = userSlice.reducer;
export { userActions, userReducer }