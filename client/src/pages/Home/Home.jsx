import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Background from "../../components/Background";
import NoteCard from "../../components/NoteCard";
import AddEditNote from "./AddEditNote";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import moment from "moment";
import Toast from "../../components/ToastMessage/Toast";
import EmptyCard from "../../components/EmptyCard";
import imgSrc from "../../assets/emptyCard.png";

Modal.setAppElement("#root");

const Home = () => {
  const [openAddEditModal, setOpenAddEditModal] = useState({
    isShown: false,
    type: "add",
    data: null,
  });

  const [showToastMsg, setShowToastMsg] = useState({
    isShown: false,
    message: "",
    type: "add",
  }); // Toast Message useState

  const [allNotes, setAllNotes] = useState([]); // Initialize as an empty array
  const [userInfo, setUserInfo] = useState(null);

  const [isSearch, setIsSearch] = useState(false); // UseState for isSearch Query

  const navigate = useNavigate();

  const handleEdit = (noteDetails) => {
    setOpenAddEditModal({ isShown: true, type: "edit", data: noteDetails });
  };

  const showToastMessage = (message, type) => {
    setShowToastMsg({
      isShown: true,
      message,
      type,
    });
  };

  const handleCloseToast = () => {
    setShowToastMsg({
      isShown: false,
      message: "",
    });
  };

  // Fetch user information
  const getUserInfo = async () => {
    try {
      const response = await axiosInstance("/get-user");
      if (response.data && response.data.user) {
        setUserInfo(response.data.user);
      }
    } catch (error) {
      if (error.response?.status === 401) {
        localStorage.clear();
        navigate("/login");
      }
    }
  };

  // Fetch all notes
  const getAllNotes = async () => {
    try {
      const response = await axiosInstance("/get-notes");
      if (response.data && response.data.notes) {
        // Assuming 'notes' is the key in the response
        setAllNotes(response.data.notes);
      }
    } catch (error) {
      if (error.response?.status === 401) {
        localStorage.clear();
        navigate("/login");
      }
    }
  };

  // Delete Note
  const deleteNote = async (data) => {
    try {
      const response = await axiosInstance.delete(`/delete-note/${data.id}`);

      if (response.data && !response.data.error) {
        showToastMessage("Note Deleted Successfully", "delete");
        getAllNotes();
      }
    } catch (error) {
      // Capture specific error message from backend or display a generic error
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        console.log("An unexpected error occurred. Please try again.");
      }
    }
  };

  // Search Note
  const searchNote = async (query) => {
    try {
      const response = await axiosInstance.get("/search-note", {
        params: { query },
      });

      if (response.data && response.data.notes) {
        setIsSearch(true);
        setAllNotes(response.data.notes);
      } else {
        setAllNotes([]); // Handle no results
      }
    } catch (error) {
      console.error(error.response?.data?.message || "Search failed.");
    }
  };

  useEffect(() => {
    getUserInfo();
    getAllNotes();
  }, []);

  return (
    <>
      <Navbar userInfo={userInfo} searchNote={searchNote} />
      <Background />
      <div id="home" className="w-full px-6 mt-5">
        <div className="container mx-auto">
          {allNotes.length > 0 ? (
            <div className="noteWrapper grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 gap-4 mt-8 bg-transparent">
              {allNotes.map((note) => (
                <NoteCard
                  key={note.id}
                  title={note.title}
                  date={moment(note.createdon).format("Do MMM YYYY")}
                  content={note.content}
                  tags={note.tags}
                  isPinned={note.ispinned}
                  onDelete={() => {
                    deleteNote(note);
                  }}
                  onEdit={() => {
                    handleEdit(note);
                  }}
                  onPinNote={() => {}}
                />
              ))}
            </div>
          ) : (
            <EmptyCard
              imgSrc={imgSrc}
              message={`Ready to capture your ideas, thoughts, and reminders? Click the 'Add' button to create your first note and get started!`}
            />
          )}
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
        onRequestClose={() => {
          setOpenAddEditModal({ isShown: false, type: "add", data: null });
        }}
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
        <AddEditNote
          type={openAddEditModal.type}
          noteData={openAddEditModal.data}
          onclose={() => {
            setOpenAddEditModal({ isShown: false, type: "add", data: null });
          }}
          getAllNotes={getAllNotes}
          showToastMessage={showToastMessage}
        />
      </Modal>
      <Toast
        isShown={showToastMsg.isShown}
        message={showToastMsg.message}
        type={showToastMsg.type}
        onClose={handleCloseToast}
      />
    </>
  );
};

export default Home;
