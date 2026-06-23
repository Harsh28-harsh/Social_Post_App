import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="navbar">

      <div className="navbar-logo">
        🚀 TaskPlanet Social
      </div>

      <div className="navbar-links">
        {token ? (
          <>
            <Link
              to="/feed"
              className="nav-link"
            >
              Feed
            </Link>

            <button
              onClick={handleLogout}
              className="logout-btn"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="nav-link"
            >
              Login
            </Link>

            <Link
              to="/signup"
              className="signup-btn"
            >
              Signup
            </Link>
          </>
        )}
      </div>

    </nav>
  );
}

export default Navbar;