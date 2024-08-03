import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext/AuthContext";
import { useState } from "react";

const Header = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-gray-800 text-white px-4 md:px-20">
      <div className="container mx-auto flex justify-between items-center p-4">
        {/* Mobile Logo - Hidden on Desktop */}
        <div className="flex md:hidden items-center">
          <Link to="/welcome" onClick={() => setIsMenuOpen(false)}>
            <img src="/assets/download.svg" alt="Logo" className="h-8" />
          </Link>
        </div>

        <button
          className="md:hidden text-white focus:outline-none"
          onClick={toggleMenu}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>
        <nav
          className={`${
            isMenuOpen ? "block" : "hidden"
          } absolute top-16 left-0 w-full bg-gray-800 md:static md:flex md:justify-between md:items-center md:space-x-8 font-medium uppercase`}
        >
          {/* Desktop Logo - Hidden on Mobile */}
          <div className="hidden md:flex items-center">
            <Link to="/welcome" onClick={() => setIsMenuOpen(false)}>
              <img src="/assets/download.svg" alt="Logo" className="h-8 mr-8" />
            </Link>
          </div>

          <div className="flex flex-col md:flex-row md:items-center p-4 md:p-0 space-y-4 md:space-y-0 md:space-x-16">
            <Link
              to="/about"
              className="block py-2 text-center md:inline-block md:py-0 md:px-0"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            {isAuthenticated ? (
              <button
                onClick={() => {
                  handleLogout();
                  setIsMenuOpen(false);
                }}
                className="block mx-auto w-3/4 py-2 text-center bg-blue-500 rounded-md md:mt-0 md:ml-4 md:w-auto md:px-4 md:py-2 md:bg-blue-500 hover:bg-blue-400 focus:outline-none focus:bg-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-50"
              >
                Log out
              </button>
            ) : (
              <Link
                to="/login"
                className="block mx-auto w-3/4 py-2 text-center bg-blue-500 rounded-md md:mt-0 md:ml-4 md:w-auto md:px-4 md:py-2 md:bg-blue-500 hover:bg-blue-700"
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </Link>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
