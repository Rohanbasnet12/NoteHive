import React from "react";

const AddEditNote = () => {
  return (
    <div className="bg-white">
      <div className="flex flex-col gap-2 bg-white">
        <label className="text-xs text-slate-400 bg-white" label="edit-title">
          Title
        </label>
        <input
          id="edit-title"
          type="text"
          className="text-2xl text-slate-900 outline-none bg-white"
          placeholder="Go To Gym at 8"
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
          type="text"
          className="text-sm text-slate-900 outline-none bg-slate-50 p-2 rounded"
          placeholder="Content"
          rows={10}
        />
      </div>

      <div className="mt-3 bg-white">
        <label className="text-xs text-slate-400 bg-white" htmlFor="edit-tags">
          Tags
        </label>
      </div>

      <button className="btn-primary font-medium mt-5 p-3" onClick={() => {}}>
        Add
      </button>
    </div>
  );
};

export default AddEditNote;
