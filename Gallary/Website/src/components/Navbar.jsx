import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { logout } from "../firebase/auth";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { user } = useAuth();
  const navigate = useNavigate(); // Initialize useNavigate

  const handleLogout = async () => {
    await logout();
    navigate("/login"); // Correct way to navigate after logout
  };

  return (
    <nav className="p-4 bg-blue-500 text-white flex justify-between">
      {user ? (
        <>
          <div>
            <Link to="/">Image</Link>
          </div>
          <button onClick={handleLogout}>Logout</button>
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
