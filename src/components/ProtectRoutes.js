import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { Login } from "../Pages/Login";

const useAuth = () => {
  const user = { loggedIn: false };
  return user && user.loggedIn;
};

const ProtectedRoute = () => {
  const isAuth = useAuth();
  return isAuth ? <Outlet /> : <Navigate to={Login} />;
};

export default ProtectedRoute;
