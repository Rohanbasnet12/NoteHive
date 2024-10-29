import React from "react";
import Navbar from "../../components/Navbar";
import Background from "../../components/Background";
import NoteCard from "../../components/NoteCard";

const Home = () => {
  return (
    <>
      <Navbar />
      <Background />
      <div id="home" className="w-full px-6 mt-5">
        <div className="container mx-auto">
          <NoteCard
            title="GYM"
            date="28 october 2024"
            content="Go to the GYM at 6:30"
          />
        </div>
      </div>
    </>
  );
};

export default Home;
