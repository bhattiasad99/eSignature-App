import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const Auth = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  if (isLoggedIn) {
    return <Navigate to="/user" />;
  }
  return (
    <>
      <Outlet />
    </>
  );
};

export default Auth;
