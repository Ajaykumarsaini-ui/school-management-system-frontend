import { useEffect } from "react";
import { useNavigate } from "react-router";
import { getRoleFromToken , getToken } from "../auth/auth.js";

const ProtectedRoutes = ({ allowedRoles = [], children }) => {
  const navigate = useNavigate();
  const role = getRoleFromToken();
  const token = getToken();
  const isAuthorized = token && allowedRoles.includes(role);

  useEffect(() => {
    if (!token) {
      navigate("/login" && "/register");
    } else if (!allowedRoles.includes(role)) {
      navigate("/unauthorized"); // Create this page for 403-like error
    }
  }, [ allowedRoles, navigate]);

  if (!token || !isAuthorized) {
    return null; // Or a loader/spinner
  }

  return <>{children}</>;
};

export default ProtectedRoutes;
