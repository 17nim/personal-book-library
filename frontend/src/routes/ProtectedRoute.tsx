import { Navigate, Outlet, useLocation } from "react-router-dom";
import { isAuthenticated } from "../auth/auth";

export const ProtectedRoute = () => {
  const location = useLocation();

  if (!isAuthenticated()) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return <Outlet />;
};
