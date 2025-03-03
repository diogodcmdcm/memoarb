import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";

const ProtectedRoute = ({ children }) => {

  //código provisório, a confirmação de autenticação deverá ser obdita de useAuth
  const storedUser = sessionStorage.getItem("authUser");  
  let isAuthenticated = storedUser === "true";

  //const { isAuthenticated } = useAuth();
  //console.log("isAuthenticated: " + isAuthenticated);

  return isAuthenticated ? children : <Navigate to="/" />;
};

export default ProtectedRoute;