// import { useSelector } from "react-redux";
// import { Navigate, Outlet, useLocation } from "react-router-dom";
// import { selectIsAuthenticated } from "../modules/auth/redux/authSlice";

// export default function ProtectedRoute() {
//   const isAuthenticated = useSelector(selectIsAuthenticated);
//   const location = useLocation();

//   if (!isAuthenticated) {
//     return <Navigate to="/login" state={{ from: location }} replace />;
//   }

//   return <Outlet />;
// }


import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { selectIsAuthenticated } from "../modules/auth/redux/authSlice";
import Branding from "../modules/branding/Branding";

export default function ProtectedRoute() {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const location = useLocation();

  if (!isAuthenticated) {
    // ── Root ("/") shows the public landing page before login — everything else
    //    still redirects to /login exactly as before. ──
    if (location.pathname === "/") {
      return <Branding />;
    }
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
}
