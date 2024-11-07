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
          <div className="noteWrapper grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 gap-4 mt-8">
            <NoteCard
              title="GYM"
              date="28 october 2024"
              content="Go to the GYM at 6:30"
              tags="#GYM"
              isPinned={true}
              onDelete={() => {}}
              onEdit={() => {}}
              onPinNote={() => {}}
            />
          </div>
        </div>
      </div>

      <button
        className="w-16 h-16 flex items-center justify-center rounded-2xl bg-blue-600 hover:bg-blue-500 absolute right-10 bottom-10 z-50"
        onClick={() => {}}
      >
        <i className="fa-solid fa-plus text-[32px] text-white bg-transparent" />
      </button>
    </>
  );
};

export default Home;
