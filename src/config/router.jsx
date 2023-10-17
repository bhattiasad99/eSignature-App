import { Navigate, createBrowserRouter } from "react-router-dom";
import ErrorPage from "../pages/not-found";
import Public from "../components/Layouts/Public";
import App from "../pages/root";
import Auth from "../components/Layouts/Auth";
import Register from "../pages/register";
import Login from "../pages/login";
import Private from "../components/Layouts/Private";
import { DASHBOARD, LOGIN, REGISTER } from "./constants";
import Dashboard from "../pages/dashboard";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Public />,
    errorElement: <ErrorPage />,
    children: [{ path: "", element: <App /> }],
  },
  {
    path: "/auth",
    element: <Auth />,
    errorElement: <ErrorPage />,
    children: [
      { path: "", element: <Navigate to={LOGIN} /> },
      { path: LOGIN, element: <Login /> },
      { path: REGISTER, element: <Register /> },
    ],
  },
  {
    path: "/user",
    element: <Private />,
    children: [
      {
        path: "",
        element: <Navigate to={DASHBOARD} />,
      },
      {
        path: DASHBOARD,
        element: <Dashboard />,
      },
    ],
  },
]);
