import React from "react";

const ProfileCard = () => {
  return (
    <div className="flex items-center gap-5">
      <div className="flex items-center justify-center userName border bg-slate-200 shadow-md rounded-full w-[50px] h-[50px]">
        <h2 className="font-medium text-2xl">R</h2>
      </div>

      <div className="logOut-btn">
        <button className="border rounded-md px-3 py-1 bg-slate-300">
          logOut
        </button>
      </div>
    </div>
  );
};

export default ProfileCard;
