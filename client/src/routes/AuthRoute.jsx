import { useSelector } from "react-redux";
import { Navigate, useParams } from "react-router-dom";

/*===========================================*/
/*===========================================*/
/*===========================================*/

const AuthRoute = ({ children }) => {
  const { currentUser, loading } = useSelector(state => state.auth);
  const { id } = useParams();

  if (loading) return null;
  if (!currentUser) return <Navigate to="/" replace />;

  // prevent any user see another user profile 
  if (id && currentUser._id !== id) return <Navigate to="/" replace />;

  return children;
}

export default AuthRoute;