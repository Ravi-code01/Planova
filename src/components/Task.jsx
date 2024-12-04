import React, { useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { MdOutlineDragIndicator } from "react-icons/md";
// Import the Modal component

const Task = ({ id, title, handleEditTask, handleDeleteTask }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="task relative flex w-full touch-none items-center justify-between rounded-md border bg-gray-100 px-2 hover:bg-gray-200"
    >
      <div className="flex items-center">
        <span className="text-gray-400">
          <MdOutlineDragIndicator />
        </span>
        <span className={`truncate p-3 pl-2 text-xs md:text-sm`}>{title}</span>
      </div>
    </div>
  );
};

export default Task;
