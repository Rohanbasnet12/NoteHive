import React, { useState } from "react";
import ProfileCard from "./ProfileCard";
import SearchBar from "./SearchBar";
import { useNavigate } from "react-router-dom";

const Navbar = ({ userInfo }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const navigate = useNavigate();

  // Handle LogOut
  const onLogOut = () => {
    localStorage.clear();
    navigate("/login");
  };

  const handleSearch = () => {
    setSearchQuery("");
  };

  return (
    <header className="z-50 sticky top-0 left-0 shadow-xl py-4 px-6">
      <nav id="navbar" className="flex items-center justify-between">
        <div className="nav-head">
          <h1 className="font-semibold text-xl">
            NoteHive
            <span className="text-orange-600">.</span>
          </h1>
        </div>
        <div className="nav-searchBar">
          <SearchBar
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
            }}
            handleSearch={handleSearch}
          />
        </div>
        <div className="nav-profile-card">
          <ProfileCard userInfo={userInfo} onLogOut={onLogOut} />
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
