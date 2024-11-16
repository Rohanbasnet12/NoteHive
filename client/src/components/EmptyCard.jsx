import React from "react";

const EmptyCard = ({ imgSrc, message }) => {
  return (
    <div className="flex flex-col items-center justify-center">
      <img
        src={imgSrc}
        alt="Empty Card image"
        className="w-90 bg-transparent -mt-14"
      />
      <p className="w-1/2 text-sm font-medium text-center text-slate-700 leading-7 -mt-24">
        {message}
      </p>
    </div>
  );
};

export default EmptyCard;
