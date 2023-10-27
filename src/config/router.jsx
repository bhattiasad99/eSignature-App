import { Navigate, createBrowserRouter } from "react-router-dom";
import ErrorPage from "../pages/not-found";
import Public from "../components/Layouts/Public";
import Auth from "../components/Layouts/Auth";
import Register from "../pages/register";
import Login from "../pages/login";
import Private from "../components/Layouts/Private";
import {
  EMAIL_SENT,
  FORGOT_PASSWORD,
  LOGIN,
  REGISTER,
  MY_DOCUMENTS,
  MY_SIGNATURES,
  PROFILE,
} from "./constants";
import MyDocuments from "./../pages/my-documents";
import MyDocument from "./../pages/my-document";
import CreateDoc from "./../pages/create-doc";
import MySignatures from "./../pages/my-signatures";
import Profile from "./../pages/profile";
import ForgotPassword from "../pages/forgot-password";
import EmailSent from "../pages/email-sent";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Public />,
    errorElement: <ErrorPage />,
    children: [{ path: "", element: <Navigate to="/user" /> }],
  },
  {
    path: "/auth",
    element: <Auth />,
    errorElement: <ErrorPage />,
    children: [
      { path: "", element: <Navigate to={LOGIN} /> },
      { path: LOGIN, element: <Login /> },
      { path: FORGOT_PASSWORD, element: <ForgotPassword /> },
      { path: EMAIL_SENT, element: <EmailSent /> },
      { path: REGISTER, element: <Register /> },
    ],
  },
  {
    path: "/user",
    element: <Private />,
    children: [
      {
        path: "",
        element: <Navigate to={MY_DOCUMENTS.name} />,
      },
      {
        path: MY_DOCUMENTS.name,
        element: <MyDocuments />,
      },
      {
        path: `${MY_DOCUMENTS.name}/:id`,
        element: <MyDocument />,
      },
      {
        path: `${MY_DOCUMENTS.name}/create-doc`,
        element: <CreateDoc />,
      },
      {
        path: MY_SIGNATURES.name,
        element: <MySignatures />,
      },
      {
        path: PROFILE.name,
        element: <Profile />,
      },
    ],
  },
]);
