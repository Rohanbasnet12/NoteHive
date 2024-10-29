import React from "react";

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
    <div className="border-2 rounded p-4 hover:shadow-xl transition-all ease-in-out z-10 relative">
      <div className="flex items-center justify-between">
        <div className="">
          <h6 className="text-sm font-medium">{title}</h6>
          <span className="text-xs text-slate-500">{date}</span>
        </div>

        <i
          className={`${
            isPinned
              ? "hover:text-blue-500 text-xl cursor-pointer text-slate-300"
              : "text-slate-400"
          } fa-solid fa-thumbtack`}
          onClick={onPinNote}
        ></i>
      </div>
      <p className="">{content?.slice(0, 60)}</p>

      <div className="">
        <div className="text-xs text-slate-500">{tags}</div>
        <div className="flex items-center gap-2">
          <i class="fa-solid fa-pen hover:text-green-500" onClick={onEdit}></i>
          <i
            class="fa-solid fa-trash hover:text-red-500"
            onClick={onDelete}
          ></i>
        </div>
      </div>
    </div>
  );
};

export default NoteCard;
