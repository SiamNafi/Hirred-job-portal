import { useUser } from "@clerk/clerk-react";
import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { isSignedIn, user, isLoaded } = useUser();
  if (isLoaded && !isSignedIn && isSignedIn !== undefined) {
    return <Navigate to={"/?sign-in=true"} />;
  }
  return children;
};

export default ProtectedRoute;
