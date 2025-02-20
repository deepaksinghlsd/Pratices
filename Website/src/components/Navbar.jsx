import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { logout } from "../firebase/auth";

const Navbar = () => {
  const { user } = useAuth();

  return (
    <nav className="p-4 bg-blue-500 text-white flex justify-between">
      <Link to="/">Home</Link>
      {user ? (
        <>
          <div className="flex gap-4">
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/image">Image</Link>
          </div>
          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <>
          <Link to="/login">Login</Link>
          <Link to="/signup">Signup</Link>
        </>
      )}
    </nav>
  );
};

export default Navbar;
