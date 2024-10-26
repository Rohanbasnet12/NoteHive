import React from "react";

const SearchBar = () => {
  return (
    <div id="searchBar">
      <div className="searchBar_wrapper border-2 border-black rounded-md flex items-center justify-between px-2 gap-2">
        <input type="text" className="outline-none w-full py-1" />
        <button>
          <i class="fa-solid fa-magnifying-glass bg-transparent"></i>
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
