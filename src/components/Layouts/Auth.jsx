import { Outlet } from "react-router-dom";
import Navbar from "../organisms/Navbar";

const Auth = () => {
  return (
    <div>
      <Navbar />
      <h1>auth</h1>
      <Outlet />
    </div>
  );
};

export default Auth;
