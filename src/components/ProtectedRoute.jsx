import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { setUser } from "../redux/features/user/userSlice";

const ProtectedRoute = () => {
  // states
  const [loading, setLoading] = useState(true);

  // redux
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const getUser = async () => {
    const response = await {
      success: true,
      data: {
        user: {
          username: "b1",
          email: "khiz6@gmail.com",
          password:
            "$2b$10$w1IFVpwXL11SLr6cvOuOnu9Yl3fcii1lyildzz7Pb.ADAB0zbnO4S",
          profileImage: "https://www.w3schools.com/howto/img_avatar.png",
          createdAt: {
            $date: "2025-04-24T13:48:32.761Z",
          },
          updatedAt: {
            $date: "2025-04-24T13:48:32.761Z",
          },
          __v: 0,
        },
      },
    };

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
