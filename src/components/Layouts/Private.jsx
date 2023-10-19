import { Navigate, Outlet } from "react-router-dom";
import Navbar from "../organisms/Navbar";
import { useSelector } from "react-redux";

const Private = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  if (!isLoggedIn) {
    return <Navigate to="/auth" />;
  }

  return (
    <div>
      <Navbar isLoggedIn={isLoggedIn} />
      <h1>private</h1>
      <Outlet />
    </div>
  );
};

export default Private;
