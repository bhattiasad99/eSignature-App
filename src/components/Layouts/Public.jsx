import { Outlet } from "react-router-dom";
import Navbar from "../organisms/Navbar";

const Public = () => {
  return (
    <main>
      <Navbar />
      <h1>public</h1>
      <Outlet />
    </main>
  );
};

export default Public;
