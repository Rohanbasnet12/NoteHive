import React from "react";

const ProfileCard = () => {
  return (
    <div className="flex items-center justify-center gap-3">
      <div className="profile-border rounded-full border-2 h-[45px] w-[45px] flex items-center justify-center bg-slate-400">
        <h1 className="bg-transparent text-xl font-bold">P</h1>
      </div>
      <div className="dropDown-profile-item"></div>
    </div>
  );
};

export default ProfileCard;
