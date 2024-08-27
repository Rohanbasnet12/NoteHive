import React, { useState } from "react";

const TagInput = ({ tags, setTags }) => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const addNewTag = () => {
    if (inputValue.trim() !== "") {
      setTags([...tags, inputValue.trim()]);
      setInputValue("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      addNewTag();
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  return (
    <div>
      {tags?.length > 0 && (
        <div className="flex items-center gap-3 flex-wrap mt-2">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="flex gap-2 text-sm text-slate-900 bg-slate-100 px-3 py-1 rounded items-center justify-center"
            >
              # {tag}
              <button
                onClick={() => {
                  handleRemoveTag(tag);
                }}
              >
                <i className="fa-solid fa-xmark"></i>
              </button>
            </span>
          ))}
        </div>
      )}

      <div className="flex items-center gap-4 mt-4">
        <input
          type="text"
          className="text-sm bg-transparent px-3 py-2 rounded outline-none"
          style={{ border: "1px solid #9a9a9a" }}
          placeholder="Add tags"
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          value={inputValue}
        />

        <button
          className="w-9 h-9 flex items-center justify-center rounded border border-blue-700 hover:bg-blue-700"
          onClick={addNewTag}
        >
          <i className="fa-solid fa-plus text-2xl text-blue-700 hover:text-white"></i>
        </button>
      </div>
    </div>
  );
};

export default TagInput;
