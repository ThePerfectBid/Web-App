// src/components/ProtectedRoute.tsx
import { useAuth } from "../context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";
import type { ReactNode } from "react";

interface ProtectedRouteProps {
  children?: ReactNode;
  roles?: string[];
}

export const ProtectedRoute = ({ children, roles }: ProtectedRouteProps) => {
  const { isAuthenticated, userData } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (roles && !roles.includes(userData?.roleId || "")) {
    return <Navigate to="/NotFound" replace />;
  }

  return children ? children : <Outlet />;
};
