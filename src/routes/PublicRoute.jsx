import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { selectIsAuthenticated } from "../modules/auth/redux/authSlice";

export default function PublicRoute() {
  const isAuthenticated = useSelector(selectIsAuthenticated);

  if (isAuthenticated) {
    return <Navigate to="/vendors/register" replace />;
  }

  return <Outlet />;
}
