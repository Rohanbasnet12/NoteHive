import React from "react";

const Navbar = () => {
  return (
    <header className="z-50 sticky top-0 left-0 shadow-xl py-4 px-6">
      <nav id="navbar">
        <div className="nav-head">
          <h1 className="font-semibold text-xl">
            NoteHive
            <span className="text-orange-600">.</span>
          </h1>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
