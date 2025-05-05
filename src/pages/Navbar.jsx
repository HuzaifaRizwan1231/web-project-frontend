import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import CodeInsightLogo from "./Logo";

const Navbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const pages = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Contact", path: "/contact" },
  ];

  const handleAuthClick = () => {
    setIsAuthenticated((prev) => !prev);
    setMenuOpen(false);
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
        <div className="hidden md:block">
          <button
            onClick={handleAuthClick}
            className="bg-button-primary text-white px-4 py-2 rounded-md hover:bg-opacity-90 transition-colors"
          >
            {isAuthenticated ? "Logout" : "Login"}
          </button>
        </div>

        <button
          className="md:hidden focus:outline-none !bg-transparent "
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
          <button
            onClick={handleAuthClick}
            className="w-full bg-button-primary text-white py-2 rounded-md hover:bg-opacity-90 transition-colors"
          >
            {isAuthenticated ? "Logout" : "Login"}
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
