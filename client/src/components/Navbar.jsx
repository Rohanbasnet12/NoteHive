import React, { useState } from "react";
import ProfileCard from "./ProfileCard";
import SearchBar from "./SearchBar";
import { useNavigate } from "react-router-dom";

const Navbar = ({ userInfo, searchNote }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const onLogOut = () => {
    localStorage.clear();
    navigate("/login");
  };

  const handleSearch = () => {
    if (searchQuery) {
      searchNote(searchQuery);
    }
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
        <SearchBar
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          handleSearch={handleSearch}
        />
        <ProfileCard userInfo={userInfo} onLogOut={onLogOut} />
      </nav>
    </header>
  );
};

export default Navbar;
