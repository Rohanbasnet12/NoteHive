import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import ProfileCard from "../Cards/ProfileCard";
import SearchBar from "../SearchBar/SearchBar";

const Navbar = () => {
  return (
    <header id="navbar" className="z-50 relative">
      <nav className="flex justify-between items-center">
        <div className="nav-head">
          <Link to={"/"}>
            <h1 className="text-xl font-medium">NoteHive</h1>
          </Link>
        </div>

        <div className="nav-search">
          <SearchBar />
        </div>

        <div className="nav-profile">
          <ProfileCard />
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
