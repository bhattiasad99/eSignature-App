import { Outlet } from "react-router-dom";
import Navbar from "../organisms/Navbar";

const Public = () => {
  return (
    <Navbar>
      <Outlet />
    </Navbar>
  );
};

export default Public;
