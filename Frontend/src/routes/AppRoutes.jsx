import { createBrowserRouter, RouterProvider } from "react-router";
import AuthLayouts from "../layouts/AuthLayouts";
import Login from "../pages/Login";
import Register from "../pages/Register";
import MainLayouts from "../layouts/MainLayouts";
import Home from "../pages/Home";
import Public from "./protected/Public";
import Protected from "./protected/Protected";
import { useEffect } from "react";
import { axiosInstance } from "../config/axiosInstance";
import { useDispatch } from "react-redux";
import { addUser, removeUser } from "../state/authReducers";

const AppRoutes = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      try {
        let res = await axiosInstance.get("/api/auth/me");
        dispatch(addUser(res?.data?.user));
      } catch (error) {
        dispatch(removeUser());
        console.log("Error in me api", error);
      }
    })();
  }, []);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Public />,
      children: [
        {
          path: "",
          element: <AuthLayouts />,
          children: [
            {
              path: "",
              element: <Login />,
            },
            {
              path: "register",
              element: <Register />,
            },
          ],
        },
      ],
    },

    {
      path: "/home",
      element: <Protected />,
      children: [
        {
          path: "",
          element: <MainLayouts />,
          children: [
            {
              path: "",
              element: <Home />,
            },
          ],
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
};

export default AppRoutes;
