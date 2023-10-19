import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { authActions } from "../../store/slices/auth";

const Navbar = () => {
  const dispatch = useDispatch();
  return (
    <div>
      <div>
        <Link to="/">Home</Link>
        <Link to="/user/dashboard">Dashboard</Link>
        <Link to="/auth/register">Register</Link>
      </div>
      <button
        onClick={() => {
          dispatch(authActions.login());
        }}
      >
        Login
      </button>
      <button
        onClick={() => {
          dispatch(authActions.logout());
        }}
      >
        Logout
      </button>
    </div>
  );
};

export default Navbar;
