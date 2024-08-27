import React, { useState } from "react";
import TagInput from "../../components/Input/TagInput";

const AddEditNote = ({ noteData, type, onClose }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");

  const [error, setError] = useState(null);

  // Add Note
  const addNewNote = async () => {};

  //Edit Note
  const editNote = async () => {};

  const handleAddNote = () => {
    if (!title) {
      setError("Please enter the title");
      return;
    }
    if (!content) {
      setError("Please enter the content");
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
    <>
      <div className="container relative z-10">
        <button
          className="w-10 h-10 rounded-full flex items-center justify-center absolute -top-3 -right-3 hover:bg-slate-100"
          onClick={onClose}
        >
          <i className="fa-solid fa-xmark text-xl text-slate-400"></i>
        </button>

        <div className="flex flex-col gap-2">
          <label className="text-md text-slate-500">TITLE</label>
          <input
            type="text"
            className="text-3xl text-slate-900 outline-none"
            placeholder="Go To GYM at 5"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>

        <div className="flex flex-col gap-3 mt-4">
          <label className="text-md text-slate-500">CONTENT</label>
          <textarea
            type="text"
            className="text-sm text-slate-900 outline-none bg-slate-50 p-2 rounded-md"
            placeholder="Content"
            rows={10}
            value={content}
            onChange={({ target }) => setContent(target.value)}
          ></textarea>
        </div>

        <div className="mt-3">
          <label className="text-md text-slate-500">TAGS</label>
          <TagInput tags={tags} setTags={setTags} />
        </div>

        {error && <p className="text-red-500 text-xs pt-4">{error}</p>}
        <button
          className="bg-blue-700 text-white font-semibold rounded-xl shadow-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-violet-400 focus:ring-opacity-75 font-medium mt-5 p-3 w-full"
          onClick={handleAddNote}
        >
          ADD
        </button>
      </div>
    </>
  );
};

export default AddEditNote;
