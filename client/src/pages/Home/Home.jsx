import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import "./Home.css";

const Home = () => {
  return (
    <>
      <Navbar />
      <div id="home">
        <div id="home-background">
          <h1 className="text-[12vw] text-slate-300">NoteHive.</h1>
        </div>
      </div>
    </>
  );
};

export default Home;
