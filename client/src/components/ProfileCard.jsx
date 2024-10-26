import React, { useState } from "react";
import DropDownMenu from "./DropDownMenu";

const ProfileCard = () => {
  const [ShowDropDown, SetShowDropDown] = useState(false);

  return (
    <div className="flex items-center justify-center gap-3">
      <div className="profile-border rounded-full border-2 h-[45px] w-[45px] flex items-center justify-center bg-slate-400">
        <h1
          onClick={() => SetShowDropDown((prev) => !prev)}
          className="bg-transparent text-xl font-bold cursor-pointer select-none"
        >
          P
        </h1>
      </div>
      <div className="dropDown-profile-item">
        {ShowDropDown && <DropDownMenu />}
      </div>
    </div>
  );
};

export default ProfileCard;
