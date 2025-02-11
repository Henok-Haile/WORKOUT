import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSnackbar } from "notistack";
import "./styles/Navbar.css"; // ✅ Import Navbar Styles

const Navbar = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("token"));
  const [userEmail, setUserEmail] = useState(localStorage.getItem("userEmail") || ""); // ✅ Added useState

  const { enqueueSnackbar } = useSnackbar();
  
  // Listen for login/logout updates
  useEffect(() => {
    const updateAuth = () => {
      setIsAuthenticated(!!localStorage.getItem("token"));
      setUserEmail(localStorage.getItem("userEmail") || ""); // ✅ Update email on login
    };

    window.addEventListener("authChanged", updateAuth);

    return () => {
      window.removeEventListener("authChanged", updateAuth);
    };
  }, []);

  // ✅ Logout Function
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userEmail");
    setIsAuthenticated(false);
    setUserEmail(""); // ✅ Reset email on logout
    window.dispatchEvent(new Event("authChanged")); // ✅ Notify Navbar

    enqueueSnackbar("Logged out successfully!", { variant: "info" });
    
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <h2 className="logo">My WORKOUT GYM</h2>
      <div className="nav-links">
        {isAuthenticated ? (
          <>
            <span className="user-email">{userEmail}</span> {/* ✅ Show user email */}
            <button className="logout-btn" onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="nav-link">Login</Link>
            <Link to="/signup" className="nav-link">Signup</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
