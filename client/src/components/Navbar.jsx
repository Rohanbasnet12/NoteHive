import React, { useState, useEffect } from "react";
import ProfileCard from "./ProfileCard";
import SearchBar from "./SearchBar";
import { useNavigate } from "react-router-dom";
import "../styles/navbar.css";

const Navbar = ({ userInfo, searchNote }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
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
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="z-50 sticky top-0 left-0 shadow-xl py-4 px-6">
      <nav className="flex items-center justify-between">
        {/* Logo */}
        <div className="nav-head">
          <h1 className="font-semibold text-xl">
            NoteHive
            <span className="text-orange-600">.</span>
          </h1>
        </div>

        {/* Hamburger icon for mobile */}
        {isMobile && (
          <button
            className="hamburger-icon text-black"
            onClick={toggleMenu}
            aria-label="Toggle Menu"
          >
            {isMenuOpen ? (
              <i className="fa-solid fa-xmark text-3xl font-bold"></i>
            ) : (
              <i className="fa-solid fa-bars text-2xl font-bold"></i>
            )}
          </button>
        )}

        {/* Desktop menu or Mobile dropdown */}
        <div
          className={`${
            isMobile
              ? `absolute top-[68px] right-0 border-t-2 border-black w-[80vw] h-[100svh] shadow-2xl p-6 transition-transform duration-300 ${
                  isMenuOpen ? "translate-x-0" : "translate-x-full hidden"
                }`
              : "flex items-center gap-4"
          }`}
        >
          <SearchBar
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            handleSearch={handleSearch}
          />
          {isMobile && <div className="py-3"></div>}
          <ProfileCard
            userInfo={userInfo}
            onLogOut={onLogOut}
            isMobile={isMobile}
          />
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
