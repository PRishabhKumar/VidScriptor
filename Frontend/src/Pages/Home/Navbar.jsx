import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Styles/NavbarStyle.css";
import AuthContext from "../../Contexts/AuthContext.jsx";

function Navbar() {
  const { handleLogout } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [logoutMessage, setLogoutMessage] = useState("");
  const navigate = useNavigate();

  const onLogout = () => {
    handleLogout();
    setLogoutMessage("You have been logged out successfully...");
    setTimeout(() => {
      setLogoutMessage("");
    }, 2000);
    setTimeout(() => {
      navigate("/auth");
    }, 2000);
  };

  return (
    <nav className="navbar-container">
      {logoutMessage && (
        <div className="logout-success-msg">
          <div className="success-icon">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </div>
          <span>{logoutMessage}</span>
        </div>
      )}
      <div className="navbar-content">
        {/* Brand */}
        <div
          onClick={() => {
            navigate("/");
          }}
          className="navbar-brand"
        >
          <div className="nav-logo-icon">VS</div>
          <span className="nav-brand-text">VidScriptor</span>
        </div>

        {/* Desktop Navigation */}
        <div className="navbar-links">
          <Link to="/home" className="nav-link active">
            Dashboard
          </Link>
          <Link to="/history" className="nav-link">
            History
          </Link>
          <Link to="/templates" className="nav-link">
            Templates
          </Link>
        </div>

        {/* Right Actions */}
        <div className="navbar-actions">
          <button className="create-new-btn">
            <span>+</span> New Script
          </button>

          <div className="divider-vertical"></div>

          <div className="user-profile">
            <div className="user-avatar">
              <span>U</span>
            </div>
            <button className="logout-btn" onClick={onLogout}>
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                <polyline points="16 17 21 12 16 7"></polyline>
                <line x1="21" y1="12" x2="9" y2="12"></line>
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu Toggle */}
        <div
          className="mobile-toggle"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <div className={`hamburger ${isMenuOpen ? "open" : ""}`}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
