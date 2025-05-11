import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import CodeInsightLogo from "../components/Logo";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Navbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(true); // Always show Logout for demo
  const [menuOpen, setMenuOpen] = useState(false);

  const pages = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Contact", path: "/contact" },
  ];

  const navigate = useNavigate(); // for redirecting
  const user = JSON.parse(localStorage.getItem("user"));
  // const user = useSelector((state) => state.user.user);

  console.log("User from redux", user);
  const handleAuthClick = async () => {
    try {
      await axios.post(
        "http://localhost:8000/auth/logout",
        {}, // No body needed
        {
          withCredentials: true, // Ensures cookies (like accessToken) are sent
        }
      );

      // Clear localStorage and update UI
      localStorage.removeItem("user");
      setIsAuthenticated(false);
      setMenuOpen(false);
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error.response?.data || error.message);
    }
  };

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  return (
    <nav className="bg-dark-secondary text-white shadow-md">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <CodeInsightLogo className="h-12 w-auto" />
        </Link>

        {/* Desktop Links */}
        <ul className="hidden md:flex space-x-6">
          {pages.map((page) => (
            <li key={page.name}>
              <Link
                to={page.path}
                className="hover:text-button-primary transition-colors"
              >
                {page.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* Auth Button Desktop */}
        {isAuthenticated && (
          <div
            className="hidden md:flex items-center space-x-4 text-dark-tertiary hover:text-red-500 transition-colors rounded-xs cursor-pointer"
            onClick={handleAuthClick}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-log-out mr-2"
            >
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
              <polyline points="16 17 21 12 16 7"></polyline>
              <line x1="21" x2="9" y1="12" y2="12"></line>
            </svg>
            <span>Sign Out</span>
          </div>
        )}

        {/* Hamburger Menu */}
        <button
          className="md:hidden focus:outline-none !bg-transparent"
          onClick={toggleMenu}
        >
          {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-dark-secondary px-6 pb-4 space-y-4">
          <ul className="flex flex-col space-y-2">
            {pages.map((page) => (
              <li key={page.name}>
                <Link
                  to={page.path}
                  onClick={() => setMenuOpen(false)}
                  className="block hover:text-button-primary transition-colors"
                >
                  {page.name}
                </Link>
              </li>
            ))}
          </ul>

          {/* Auth Button Mobile */}
          {isAuthenticated && (
            <div
              className="flex items-center space-x-4 text-dark-tertiary hover:text-red-500 transition-colors rounded-xs cursor-pointer"
              onClick={handleAuthClick}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-log-out mr-2"
              >
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                <polyline points="16 17 21 12 16 7"></polyline>
                <line x1="21" x2="9" y1="12" y2="12"></line>
              </svg>
              <span>Sign Out</span>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
