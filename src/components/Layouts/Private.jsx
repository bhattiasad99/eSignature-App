import { Outlet } from "react-router-dom";
import Navbar from "../organisms/Navbar";

const Private = () => {
  return (
    <div>
      <Navbar />
      <h1>private</h1>
      <Outlet />
    </div>
  );
};

export default Private;
