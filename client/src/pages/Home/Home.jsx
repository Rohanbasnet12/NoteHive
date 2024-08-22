import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import NoteCard from "../../components/Cards/NoteCard";

const Home = () => {
  return (
    <>
      <Navbar />
      <div id="home">
        <div
          id="home-background"
          className="position absolute top-[50%] left-[50%] z-10 opacity-30"
          style={{ transform: "translate(-50%, -50%)" }}
        >
          <h1 className="text-[12vw] text-slate-300">NoteHive.</h1>
        </div>
        <div className="container mx-auto">
          <div className="grid grid-cols-3 gap-4 mt-8">
            <NoteCard
              title="Meeting on 7th April"
              date="3rd April 2024"
              content="Meeting on 7th April date of information 3rd April 2024"
              tags="#meetings"
              isPinned={true}
              onEdit={() => {}}
              onDelete={() => {}}
              onPinNote={() => {}}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
