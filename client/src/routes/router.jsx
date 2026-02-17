import { createBrowserRouter } from "react-router-dom";
import {
  About,
  Contact,
  ForgotPassword,
  Home,
  Login,
  NotFound,
  Register,
  ResetPassword,
  UserProfile,
  UserProfileView,
  UserUpdateProfle,
  VerificationEmail
} from "../allPagesPaths";
import Layout from "../layout/Layout";
import AuthRoute from "./AuthRoute";
import PublicRoute from "./PublicRoute";

/*=========================================*/
/*=========================================*/
/*=========================================*/

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "login", element: <PublicRoute><Login /></PublicRoute> },
      { path: "register", element: <PublicRoute><Register /></PublicRoute> },
      { path: "verify-email", element: <VerificationEmail /> },
      { path: "forgot-password", element: <ForgotPassword /> },
      { path: "reset-password/:token", element: <ResetPassword /> },
      { path: "about", element: <About /> },
      { path: "contact", element: <Contact /> },
      {
        path: "/user-profile/:id",
        element: <AuthRoute><UserProfile /></AuthRoute>,
        children: [
          { index: true, element: <UserProfileView /> },
          { path: "edit", element: <UserUpdateProfle /> }
        ],
      },
      { path: "*", element: <NotFound /> }
    ]
  },
]);