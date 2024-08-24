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
    <div className="border-2 p-4 rounded hover:shadow-xl transition-all ease relative">
      <div className="flex items-center justify-between">
        <div>
          <h6 className="text-sm font-medium">{title}</h6>
          <span className="text-xs text-slate-500">{date}</span>
        </div>

        <i
          className="fa-solid fa-thumbtack text-blue-500"
          onClick={onPinNote}
        ></i>
      </div>

      <p className="text-xm text-slate-600 mt-2">{content?.slice(0, 60)}</p>
      <div className="flex items-center justify-between mt-2">
        <div className="text-xs text-slate-500">{tags}</div>

        <div className="flex items-center gap-4 text-slate-400">
          <i className="fa-solid fa-pen" onClick={onEdit}></i>
          <i className="fa-solid fa-trash" onClick={onDelete}></i>
        </div>
      </div>
    </div>
  );
};

export default NoteCard;
