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
    <div>
      <div className="">
        <div className="">
          <h6 className="text-sm font-medium">{title}</h6>
          <span className="text-sm text-slate-500">{date}</span>
        </div>

        <i className="fa-solid fa-thumbtack" onClick={onPinNote}></i>
      </div>
      <p className="">{content?.slice(0, 60)}</p>
    </div>
  );
};

export default NoteCard;
