import React from "react";
import ProfileCard from "./ProfileCard";

const Navbar = () => {
  return (
    <header className="z-50 sticky top-0 left-0 shadow-xl py-4 px-6">
      <nav id="navbar" className="flex items-center justify-between">
        <div className="nav-head">
          <h1 className="font-semibold text-xl">
            NoteHive
            <span className="text-orange-600">.</span>
          </h1>
        </div>
        <div className="nav-profile-card">
          <ProfileCard />
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
