import React, { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import NoteCard from "../../components/Cards/NoteCard";
import AddEditNote from "./AddEditNote";
import Modal from "react-modal";

const Home = () => {
  const [openAddEditModal, setOpenAddEditModal] = useState({
    isShown: false,
    type: "add",
    data: null,
  });

  return (
    <>
      <Navbar />
      <div id="home">
        <div
          id="home-background"
          className="position absolute top-[50%] left-[50%] opacity-30"
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

      <div id="addBtn" className="fixed bottom-10 right-10 z-20">
        <button
          className="w-16 h-16 rounded-2xl flex items-center justify-center bg-blue-600 hover:bg-blue-500"
          onClick={() => {
            setOpenAddEditModal({
              isShown: true,
              type: "add",
              data: null,
            });
          }}
        >
          <i className="fa-solid fa-plus text-white text-2xl font-bold"></i>
        </button>
      </div>

      <Modal
        isOpen={openAddEditModal.isShown}
        onRequestClose={() => {}}
        style={{
          overlay: {
            boxShadow: "2px 2px 20px 12px #5a5a5a",
            backgroundColor: "rgba(0, 0, 0, 0.2)",
          },
        }}
        contentLabel=""
        className="w-[40%] max-h-3/4 bg-white rounded-md mx-auto mt-14 p-5"
      >
        <AddEditNote
          onClose={() => {
            setOpenAddEditModal({
              isShown: false,
              type: "add",
              data: null,
            });
          }}
        />
      </Modal>
    </>
  );
};

export default Home;
