import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./slices/authSlice";
import { userReducer } from "./slices/userSlice";
import { todosReducer } from "./slices/todosSlice";

/*===========================================*/
/*===========================================*/
/*===========================================*/

const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: userReducer,
    todos: todosReducer,
  }
});

export default store;