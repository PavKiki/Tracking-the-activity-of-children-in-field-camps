import React from "react";
import { Navigate, Outlet } from "react-router";

export function ProtectedRoute({ isAllowed, children }: {isAllowed: boolean, children: React.ReactNode}) {
    if (!isAllowed) {
      return <Navigate to="/" replace />;
    }
    return children ? <React.Fragment>{children}</React.Fragment> : <Outlet/>;
};