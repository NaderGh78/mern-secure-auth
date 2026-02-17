import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

/*===========================================*/
/*===========================================*/
/*===========================================*/

const PublicRoute = ({ children }) => {
  const { currentUser, loading } = useSelector(state => state.auth);

  if (loading) return null;
  if (currentUser) return <Navigate to="/" replace />;

  return children;
};

export default PublicRoute; 