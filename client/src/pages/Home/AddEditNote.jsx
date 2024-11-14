import React, { useState } from "react";
import TagInput from "../../components/TagInput";
import axiosInstance from "../../utils/axiosInstance";

const AddEditNote = ({ noteData, type, onclose, getAllNotes }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState([]);
  const [error, setError] = useState(null);

  // Add Note
  const addNewNote = async () => {
    try {
      const response = await axiosInstance.post("/add-note", {
        title,
        content,
        tags,
      });
      if (response.data && response.data.notes) {
        // Assuming 'notes' is the key in the response
        getAllNotes();
        onclose();
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message);
      }
    }
  };

  // Edit Note
  const editNote = async () => {};

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
      AddEditNote();
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
        Add
      </button>
    </div>
  );
};

export default AddEditNote;
