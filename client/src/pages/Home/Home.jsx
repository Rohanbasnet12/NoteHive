import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import Background from "../../components/Background";
import NoteCard from "../../components/NoteCard";
import AddEditNote from "./AddEditNote";
import Modal from "react-modal";

Modal.setAppElement("#root");
const Home = () => {
  const [openAddEditModal, setOpenAddEditModal] = useState({
    isShown: false,
    type: "add",
    data: null,
  });

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
        onClick={() => {
          setOpenAddEditModal({ isShown: true, type: "add", data: null });
        }}
      >
        <i className="fa-solid fa-plus text-[32px] text-white bg-transparent" />
      </button>

      <Modal
        isOpen={openAddEditModal.isShown}
        onRequestClose={() => {}}
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.3)",
          },
          content: {
            width: "40%",
            maxHeight: "80vh",
            backgroundColor: "white",
            borderRadius: "8px",
            margin: "auto",
            padding: "20px",
            overflow: "auto",
            top: "15%",
            left: "50%",
            transform: "translateX(-125%)",
            zIndex: 100,
          },
        }}
        contentLabel=""
        className="w-[40%] max-h-3/4 bg-white rounded-md mx-auto mt-18 p-5 overflow-scroll relative z-[100]"
      >
        <AddEditNote />
      </Modal>
    </>
  );
};

export default Home;
