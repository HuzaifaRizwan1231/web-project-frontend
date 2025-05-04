import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { setUser } from "../redux/features/user/userSlice";
import { getUserApiCall } from "../api/auth.api";

const ProtectedRoute = () => {
  // states
  const [loading, setLoading] = useState(true);

  // redux
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const getUser = async () => {
    const response = await getUserApiCall();

    if (response.success) {
      dispatch(setUser(response.data.user));
    }

    setLoading(false);
  };

  useEffect(() => {
    if (!user && loading) {
      getUser();
    }
  }, [user]);

  if (loading) {
    return <>Authenticating...</>;
  }

  return user !== null ? (
    <>
      <Outlet />
    </>
  ) : (
    <Navigate to="/login" />
  );
};

export default ProtectedRoute;
