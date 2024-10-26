import React from "react";

const Background = () => {
  return (
    <div>
      <div
        className="wrapper flex items-center justify-center fixed top-[50%] left-[50%]"
        style={{ transform: "translate(-50%, -50%)" }}
      >
        <h1 className="md:text-[12vw] lg:text-[12vw] sm:text-[6vw] text-slate-900/20">
          NoteHive<span className="text-orange-600/40">.</span>
        </h1>
      </div>
    </div>
  );
};

export default Background;