import React from "react";
import { useAuth } from "./components/AuthProvider";

const logout = () => {
  const { logout, isAuthenticated } = useAuth();

  return (
    isAuthenticated && (
      <button onClick={logout}>Logout</button>
    )
  );
};

export default logout;
