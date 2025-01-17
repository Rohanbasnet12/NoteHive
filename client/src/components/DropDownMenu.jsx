import React from "react";

const DropDownMenu = ({ fullName, onLogOut, isMobile }) => {
  return (
    <>
      {isMobile ? (
        <div
          id="DropDownMenu"
          className="absolute border-2 rounded-lg top-[140px] left-[35%] p-4 z-50"
        >
          <h3 className="border-b-2 pb-3">{fullName}</h3>

          <li
            className="list-none mt-3 py-1 border bg-blue-300 flex items-center justify-center rounded-md font-semibold cursor-pointer"
            onClick={onLogOut}
          >
            LogOut
          </li>
        </div>
      ) : (
        <div
          id="DropDownMenu"
          className="absolute border-2 rounded-lg top-[85px] left-[87%] p-4 z-50"
        >
          <h3 className="border-b-2 pb-3">{fullName}</h3>

          <li
            className="list-none mt-3 py-1 border bg-blue-300 flex items-center justify-center rounded-md font-semibold cursor-pointer"
            onClick={onLogOut}
          >
            LogOut
          </li>
        </div>
      )}
    </>
  );
};

export default DropDownMenu;
