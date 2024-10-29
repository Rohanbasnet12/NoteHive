import React from "react";

const SearchBar = ({ value, onChange, handleSearch }) => {
  return (
    <div id="searchBar">
      <div className="searchBar_wrapper border-2 border-gray-500 rounded-md flex items-center justify-between px-2 gap-2">
        <input
          type="text"
          name="searchBar"
          id="searchBar"
          placeholder="Search Notes"
          value={value}
          onChange={onChange}
          className="outline-none py-1 lg:w-[280px] md:w-[250px] smw-[200px]"
        />

        <button type="submit" onClick={handleSearch}>
          <i className="fa-solid fa-magnifying-glass bg-transparent text-gray-600 hover:text-black"></i>
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
