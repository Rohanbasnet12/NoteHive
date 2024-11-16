import React, { useState, useEffect } from "react";
import ProfileCard from "./ProfileCard";
import SearchBar from "./SearchBar";
import { useNavigate } from "react-router-dom";
import "../styles/navbar.css";

const Navbar = ({ userInfo, searchNote }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false); // To detect screen size
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // Detect if screen is smaller than 768px
    };

    handleResize(); // Check on mount
    window.addEventListener("resize", handleResize); // Listen for resize

    return () => {
      window.removeEventListener("resize", handleResize); // Cleanup on unmount
    };
  }, []);

  const onLogOut = () => {
    localStorage.clear();
    navigate("/login");
  };

  const handleSearch = () => {
    if (searchQuery) {
      searchNote(searchQuery);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen); // Toggle the menu state
  };

  return (
    <header className="z-50 sticky top-0 left-0 shadow-xl py-4 px-6">
      <nav className="flex items-center justify-between">
        <div className="nav-head">
          <h1 className="font-semibold text-xl">
            NoteHive
            <span className="text-orange-600">.</span>
          </h1>
        </div>

        {/* Hamburger icon */}
        {isMobile && (
          <button
            className="hamburger-icon"
            onClick={toggleMenu}
            aria-label="Toggle Menu"
          >
            {isMenuOpen ? (
              <i className="fa-solid fa-xmark text-3xl font-bold"></i> // Close icon
            ) : (
              <i className="fa-solid fa-bars text-2xl font-bold"></i> // Hamburger icon
            )}
          </button>
        )}

        {/* Show SearchBar and ProfileCard if menu is not open */}
        {(isMobile ? isMenuOpen : true) && (
          <div className="flex items-center">
            <SearchBar
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              handleSearch={handleSearch}
            />
            <ProfileCard userInfo={userInfo} onLogOut={onLogOut} />
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
