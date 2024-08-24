import React, { useState } from "react";
import TagInput from "../../components/Input/TagInput";

const AddEditNote = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");

  return (
    <div className="container relative z-10">
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

      <button
        className="bg-blue-700 text-white font-semibold rounded-xl shadow-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-violet-400 focus:ring-opacity-75 font-medium mt-5 p-3 w-full"
        onClick={() => {}}
      >
        ADD
      </button>
    </div>
  );
};

export default AddEditNote;
