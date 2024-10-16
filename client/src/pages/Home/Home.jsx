import React from "react";
import Navbar from "../../components/Navbar";
import Background from "../../components/Background";

const Home = () => {
  return (
    <>
      <Navbar />
      <Background />
      <div id="home" className="w-full px-6 mt-5">
        <div className="home-content">
          <h1>This is the Home Page!</h1>
        </div>
      </div>
    </>
  );
};

export default Home;
