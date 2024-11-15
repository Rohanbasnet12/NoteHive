import React, { useState } from "react";
import TagInput from "../../components/TagInput";
import axiosInstance from "../../utils/axiosInstance";

const AddEditNote = ({ noteData, type, onclose, getAllNotes }) => {
  const [title, setTitle] = useState(noteData?.title || "");
  const [content, setContent] = useState(noteData?.content || "");
  const [tags, setTags] = useState(noteData?.tags || []);
  const [error, setError] = useState(null);

  // Add Note
  const addNewNote = async () => {
    try {
      const response = await axiosInstance.post("/add-note", {
        title,
        content,
        tags,
      });

      // Check for successful response; adjust if needed based on backend response structure
      if (response.data && response.data.success) {
        // Assuming your backend sends a success indicator
        getAllNotes(); // Refresh the notes list
        onclose(); // Close the modal after successfully adding the note
      } else {
        setError("Failed to add note. Please try again."); // Show generic error if success is missing
      }
    } catch (error) {
      // Capture specific error message from backend or display a generic error
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message);
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    }
  };

  // Edit Note
  const editNote = async () => {
    try {
      const response = await axiosInstance.put(`/edit-note/${noteData.id}`, {
        title,
        content,
        tags,
        isPinned: noteData.isPinned,
      });

      if (response.data && response.data.success) {
        getAllNotes();
        onclose(); // Close the modal after successfully adding the note
      } else {
        setError("Failed to edit note. Please try again.");
      }
    } catch (error) {
      // Capture specific error message from backend or display a generic error
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message);
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    }
  };

  const handleAddNote = () => {
    if (!title) {
      setError("Please Enter the title");
      return;
    }
    if (!content) {
      setError("Please Enter the content");
      return;
    }

    setError("");

    if (type === "edit") {
      editNote();
    } else {
      addNewNote();
    }
  };

  return (
    <div className="bg-white relative">
      <button
        className="w-10 h-10 rounded-full flex items-center justify-center absolute -top-3 -right-3 hover:bg-slate-500"
        onClick={onclose}
      >
        <i className="fa-solid fa-xmark text-xl text-slate-400 bg-transparent" />
      </button>

      <div className="flex flex-col gap-2 bg-white">
        <label className="text-xs text-slate-400 bg-white" htmlFor="edit-title">
          Title
        </label>
        <input
          id="edit-title"
          type="text"
          className="text-2xl text-slate-900 outline-none bg-white"
          placeholder="title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div className="flex flex-col gap-2 mt-4 bg-white">
        <label
          className="text-xs text-slate-400 bg-white"
          htmlFor="edit-description"
        >
          Content
        </label>
        <textarea
          id="edit-description"
          className="text-sm text-slate-900 outline-none bg-slate-50 p-2 rounded"
          placeholder="content..."
          rows={10}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>

      <div className="mt-3 bg-white">
        <label className="text-xs text-slate-400 bg-white" htmlFor="edit-tags">
          Tags
        </label>
        <TagInput tags={tags} setTags={setTags} />
      </div>

      {error && (
        <p className="text-red-500 text-xs pt-4 bg-transparent">{error}</p>
      )}
      <button
        className="btn-primary font-medium mt-5 p-3"
        onClick={handleAddNote}
      >
        {type === "edit" ? "Update" : "Add"}
      </button>
    </div>
  );
};

export default AddEditNote;
