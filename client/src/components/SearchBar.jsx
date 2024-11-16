import React from "react";

const SearchBar = ({ value, onChange, handleSearch }) => {
  return (
    <div id="searchBar">
      <div className="searchBar_wrapper border-2 border-gray-200 rounded-md flex items-center justify-between px-2 gap-2 bg-gray-100/70">
        <input
          type="text"
          placeholder="Search Notes"
          value={value}
          onChange={onChange}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          className="outline-none py-1 lg:w-[280px] md:w-[250px] smw-[200px] bg-transparent"
        />
        <button type="submit" onClick={handleSearch}>
          <i className="fa-solid fa-magnifying-glass bg-transparent text-gray-600 hover:text-black"></i>
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
