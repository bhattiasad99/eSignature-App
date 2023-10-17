import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div>
      <div>
        <Link to="/">Home</Link>
        <Link to="/auth/login">Login</Link>
        <Link to="/auth/register">Register</Link>
        <Link to="/user/dashboard">Dashboard</Link>
      </div>
      <button>Login</button>
      <button>Logout</button>
    </div>
  );
};

export default Navbar;
