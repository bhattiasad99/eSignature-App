import { Navigate, Outlet } from "react-router-dom";
import Navbar from "../organisms/Navbar";
import { useSelector } from "react-redux";

const Auth = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  if (isLoggedIn) {
    return <Navigate to="/user" />;
  }
  return (
    <div>
      {/* <Navbar /> */}
      <h1>auth</h1>
      <Outlet />
    </div>
  );
};

export default Auth;
