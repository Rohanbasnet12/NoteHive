import React from "react";
import { LuPin } from "react-icons/lu";

const NoteCard = ({
  title,
  date,
  content,
  tags,
  isPinned,
  onEdit,
  onDelete,
  onPinNote,
}) => {
  return (
    <div className="border-2 rounded p-4 hover:shadow-xl transition-all ease-in-out">
      <div className="flex items-center justify-between">
        <div className="">
          <h6 className="text-sm font-medium">{title}</h6>
          <span className="text-xs text-slate-500">{date}</span>
        </div>

        <LuPin
          className={`text-xl cursor-pointer hover:text-blue-600 ${
            isPinned ? "text-blue-600" : "text-slate-400"
          }`}
          onClick={onPinNote}
        />
      </div>
      <p className="text-xs text-slate-600 mt-2">{content?.slice(0, 60)}</p>

      <div className="flex items-center justify-between mt-2">
        <div className="text-xs text-blue-800">
          {tags.map((item, index) => (
            <span key={index}> #{item} </span>
          ))}
        </div>
        <div className="flex items-center gap-4">
          <i
            className="fa-solid text-slate-500 fa-pen hover:text-green-500"
            onClick={onEdit}
          ></i>
          <i
            className="fa-solid text-slate-500 fa-trash hover:text-red-500"
            onClick={onDelete}
          ></i>
        </div>
      </div>
    </div>
  );
};

export default NoteCard;
