import React, { useState } from "react";
import DropDownMenu from "./DropDownMenu";

const ProfileCard = ({ userInfo, onLogOut }) => {
  const [showDropDown, setShowDropDown] = useState(false);

  // If userInfo is not available, render the loader
  if (!userInfo || !userInfo.username) {
    return null;
  }

  return (
    <div className="flex items-center justify-center gap-3">
      <div className="profile-border rounded-full border-2 h-[45px] w-[45px] flex items-center justify-center bg-slate-400">
        <h1
          onClick={() => setShowDropDown((prev) => !prev)}
          className="bg-transparent text-xl font-bold cursor-pointer select-none"
        >
          {userInfo.username[0].toUpperCase()}
        </h1>
      </div>
      <div className="dropDown-profile-item">
        {showDropDown && (
          <DropDownMenu fullName={userInfo.username} onLogOut={onLogOut} />
        )}
      </div>
    </div>
  );
};

export default ProfileCard;
