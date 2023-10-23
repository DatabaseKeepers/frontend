import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext.jsx";
import LoadingSpinner from "./LoadingSpinner.jsx";

function PrivateRoute({ children }) {
  const roles = ["Physician", "Radiologist"];
  const { pathname } = useLocation();
  const { role, user } = useAuth();

  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    setLoading(true);
    if (role) setLoading(false);
    else if (user === null) setLoading(false);
  }, [pathname, role, user]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!loading && !roles.includes(role)) {
    alert("You are not authorized to view this page.");
    return <Navigate to="/" />;
  }

  return children || <Outlet />;
}

export default PrivateRoute;
