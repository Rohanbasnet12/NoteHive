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

  const handleKeyDown = (s) => {
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
        <div className="flex items-center flex-wrap gap-2 mt-2">
          {tags.map((tag, index) => (
            <span key={index} className="">
              #{tag}
              <button
                onClick={() => {
                  handleRemoveTag(tag);
                }}
              >
                <i className="fa-solid fa-x" />
              </button>
            </span>
          ))}
        </div>
      )}

      <div className="flex items-center gap-4 mt-3 bg-white">
        <input
          type="text"
          className="text-sm bg-transparent border px-3 py-2 rounded outline-none"
          placeholder="Add tags"
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />

        <button
          className="w-8 h-8 rounded flex items-center justify-center border border-blue-700 hover:bg-blue-700 hover:text-white ease-in-out"
          onClick={() => {
            addNewTag();
          }}
        >
          <i className="fa-solid fa-plus text-xl font-bold text-blue-700 hover:text-white bg-transparent" />
        </button>
      </div>
    </div>
  );
};

export default TagInput;
