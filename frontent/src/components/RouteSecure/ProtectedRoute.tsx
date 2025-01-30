import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { RootState } from "../../Redux/store"; // Adjust the path to your store

const ProtectedRoute = ({ children }:any) => {
  // Access the user state from Redux
  const user = useSelector((state: RootState) => state.user.user);

  if (!user) {
    // Redirect to sign-in page if user is not authenticated
    return <Navigate to="/auth/signin" replace />;
  }

  // If the user is authenticated, render the children (protected component)
  return children;
};

export default ProtectedRoute;
