import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <header id="navbar">
      <nav>
        <div className="nav-head">
          <Link to={"/"}>
            <h1 className="text-xl font-medium">NoteHive</h1>
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
